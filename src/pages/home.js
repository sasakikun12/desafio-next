import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getAllProducts, addProduct } from "@/resources/products";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import VerticalNavbar from "@/components/VerticalNav";

export default function Home() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("products");
  const router = useRouter();
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  const isProduct = () => selected === "products";
  const isSale = () => selected === "sales";
  const selectedButtonLabel = () =>
    isProduct() ? "Novo produto" : isSale() ? "Nova venda" : "Novo Desconto";

  const toggleModal = (item, action) => {
    console.log("toggle modal");
  };

  const removeObj = ({ token, id }) => {
    console.log("remove obj");
  };

  const handleAddProduct = () => {
    const product = {
      name: "Produto 6",
      description: "Produto Caro",
      value: "120.00",
      quantity: "1",
      type: "digital",
      userId: "26",
      link: "http://google.com",
    };
    addProduct(token, product)
      .then((response) => {
        setProducts(response.data.products || []);
        toast.success("Produto inserido com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Falha ao inserir o novo produto");
      });
  };

  useEffect(() => {
    if (token && userId) {
      switch (selected) {
        case "products":
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
          console.log("sales");
          break;
        case "discounts":
          console.log("discounts");
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
          <Button className="my-4" onClick={handleAddProduct}>
            {selectedButtonLabel()}
          </Button>
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
                        <Button onClick={() => toggleModal(listItem, "edit")}>
                          Editar
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
    </Container>
  );
}
