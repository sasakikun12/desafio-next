import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  getAllProducts,
  getAllDiscounts,
  removeProduct,
} from "@/resources/products";
import { getAllSales } from "@/resources/sales";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import VerticalNavbar from "@/components/VerticalNav";

export default function Home() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("products");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [text, setText] = useState("");
  const [edit, setEdit] = useState({});
  const router = useRouter();
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  const isProduct = () => selected === "products";
  const isSale = () => selected === "sales";

  const removeObj = ({ token, id }) => {
    removeProduct(token, id)
      .then(() => {
        setData(data.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Falha ao buscar os produtos");
      });
  };

  const toggleModal = (item, action) => {
    setModalOpen(!modalOpen);
    setSelectedAction(action);
    setEdit(item);
  };

  useEffect(() => {
    if (token && userId) {
      switch (selected) {
        case "products":
          setText("Novo Produto");
          getAllProducts(token, userId)
            .then((response) => {
              setData(response.data.products || []);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Falha ao buscar os produtos");
            });
          break;
        case "sales":
          setText("Nova Venda");
          getAllSales(token, userId)
            .then((response) => {
              setData(response.data.products || []);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Falha ao buscar as vendas");
            });
          break;
        case "discounts":
          setText("Novo Desconto");
          getAllDiscounts(token, userId)
            .then((response) => {
              setData(response.data.products || []);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Falha ao buscar os descontos");
            });
          break;
      }
    }
  }, [token, userId, selected]);

  return (
    <Container fluid className="h-100 ">
      <Row>
        <Navbar />
      </Row>
      <Row>
        <Col md={1} className="border-end">
          <VerticalNavbar setSelected={setSelected} />
        </Col>
        <Col md={11}>
          <div className="d-flex justify-content-end rounded my-5">
            <Button variant="primary" onClick={() => toggleModal({}, "create")}>
              {text}
            </Button>
          </div>

          {data[0] ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {isProduct() ? (
                    <>
                      <th scope="col">Id Produto</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Link</th>
                    </>
                  ) : isSale() ? (
                    <>
                      <th scope="col">Id Venda</th>
                      <th scope="col">Id Produto</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Data Venda</th>
                    </>
                  ) : (
                    <>
                      <th scope="col">Id Desconto</th>
                      <th scope="col">Id Produto</th>
                      <th scope="col">Data Inicial</th>
                      <th scope="col">Data Final</th>
                      <th scope="col">Hora Inicial</th>
                      <th scope="col">Hora Final</th>
                    </>
                  )}
                  <th scope="col">Valor</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Remover</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((listItem, index) => (
                    <tr key={index} className="align-middle">
                      <td>{listItem.id}</td>
                      {isProduct() ? (
                        <>
                          <td>{listItem.name}</td>
                          <td>{listItem.description}</td>
                          <td>{listItem.quantity}</td>
                          <td>{listItem.link}</td>
                        </>
                      ) : isSale() ? (
                        <>
                          <td>{listItem.productId}</td>
                          <td>{listItem.quantity}</td>
                          <td>{listItem.saleDate}</td>
                        </>
                      ) : (
                        <>
                          <td>{listItem.productId}</td>
                          <td>{listItem.startDate}</td>
                          <td>{listItem.endDate}</td>
                          <td>{listItem.startTime}</td>
                          <td>{listItem.endTime}</td>
                        </>
                      )}
                      <td>{listItem.value}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => toggleModal(listItem, "edit")}
                        >
                          {"Editar"}
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => removeObj({ token, id: listItem.id })}
                        >
                          {" "}
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <p className="mt-4 text-center">No data available</p>
          )}
        </Col>
      </Row>
      {modalOpen && (
        <Modal
          action={selectedAction}
          isOpen={modalOpen}
          toggleModal={toggleModal}
          listItem={edit}
          selected={selected}
          userId={userId}
          token={token}
          setData={setData}
        />
      )}
    </Container>
  );
}
