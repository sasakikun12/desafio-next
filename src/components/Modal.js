import { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import {
  addProduct,
  editProduct,
  addDiscount,
  editDiscount,
} from "@/resources/products";
import { addSale, editSale } from "@/resources/sales";
import { toast } from "react-toastify";

function FormModal({
  action,
  toggleModal,
  listItem,
  selected,
  userId,
  token,
  setData,
}) {
  const [text, setText] = useState("");
  const [products, setProducts] = useState(listItem || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleSuccess = (message, data) => {
      toggleModal({}, "");
      setData((prevList) => [...prevList, data.products]);
      toast.success(message);
    };

    const handleError = (error) => {
      console.log(error);
      const errorMessage = error.response?.data?.error || "Erro desconhecido";
      toast.error(errorMessage);
    };

    const performOperation = async (operationFn, successMessage, entityObj) => {
      try {
        const response = await operationFn(token, entityObj);
        handleSuccess(successMessage, response.data);
      } catch (error) {
        handleError(error);
      }
    };

    const entityMap = {
      products: {
        create: [addProduct, "Produto criado com sucesso!"],
        edit: [editProduct, "Produto editado com sucesso!"],
      },
      sales: {
        create: [addSale, "Venda cadastrada com sucesso!"],
        edit: [editSale, "Venda editada com sucesso!"],
      },
      discount: {
        create: [addDiscount, "Desconto cadastrado com sucesso!"],
        edit: [editDiscount, "Desconto editado com sucesso!"],
      },
    };

    const [operationFn, successMessage] = entityMap[selected][action] || [];

    if (operationFn && successMessage) {
      const entityObj = { ...products, userId };
      await performOperation(operationFn, successMessage, entityObj);
    }
  };

  const onProductChange = (e) => {
    const { name, value } = e.target;

    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    switch (selected) {
      case "discounts":
        setText(`${action === "created" ? "Novo" : "Editar"} Desconto`);
        break;
      case "sales":
        setText(`${action === "created" ? "Nova" : "Editar"} Venda`);
        break;
      default:
        setText(`${action === "created" ? "Novo" : "Editar"} Produto`);
        break;
    }
  }, [selected, action]);

  return (
    <>
      <Modal show={true} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={false} onSubmit={handleSubmit} id="form">
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  value={products.name || ""}
                  onChange={onProductChange}
                  disabled={action === "edit"}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor insira um nome!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationType"
                className="mt-3"
              >
                <Form.Label>Tipo do Produto</Form.Label>
                <Form.Select
                  name="type"
                  onChange={onProductChange}
                  disabled={action === "edit"}
                  required
                  value={products.type || ""}
                >
                  <option disabled value="">
                    Selecione
                  </option>
                  <option value="simples">Simples</option>
                  <option value="digital">Digital</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                controlId="validationValue"
                className="mt-3"
              >
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  name="value"
                  required
                  type="number"
                  step={0.01}
                  min={0}
                  value={products.value || ""}
                  onChange={onProductChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor insira um valor!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                controlId="validationDescription"
                className="mt-3"
              >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  value={products.description || ""}
                  onChange={onProductChange}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                controlId="validationQuantity"
                className="mt-3"
              >
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  name="quantity"
                  required
                  type="number"
                  value={products.quantity || ""}
                  onChange={onProductChange}
                  min={1}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor insira uma quantidade!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                controlId="validationLink"
                className="mt-3"
              >
                <Form.Label>Link</Form.Label>
                <Form.Control
                  name="link"
                  required={products.type === "digital"}
                  type="text"
                  value={products.link || ""}
                  onChange={onProductChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor insira um link!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Fechar
          </Button>
          <Button variant="primary" type="submit" form="form">
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModal;
