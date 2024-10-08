"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import { FormEvent, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";

const Banco = () => {
  const [esModoEditar, setEsModoEditar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [banco, setBanco] = useState({
    nombre: "",
    direccion: "",
    codigo: "",
  });

  const handleCerrar = () => {
    setOpenModal(false);
    setEsModoEditar(false);
  };

  const handleAbrirModal = () => setOpenModal(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanco({ ...banco, [name]: value.toUpperCase() });
  };

  const crearBanco = async (e: FormEvent<HTMLFormElement>) => {};

  const handleEditar = () => {
    setEsModoEditar(true);
    setOpenModal(true);
  };

  return (
    <>
      <Breadcrumb title="Listado de bancos" />

      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="primary-outline"
          className="btn btn-outline-primary"
          onClick={handleAbrirModal}
        >
          <FeatherIcon icon="plus" />
          Agregar Banco
        </Button>
        <Form.Control
          className="form-control w-50"
          type="text"
          placeholder="Buscar bancos..."
        />
      </div>

      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">BANCO</th>
              <th scope="col">DIRECCIÓN</th>
              <th scope="col">CÓDIGO</th>
              <th scope="col" className="text-center">
                OPCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="centered-cell">1</td>
              <td className="centered-cell">BCP</td>
              <td className="centered-cell">LIMA - PACHACAMAC</td>
              <td className="centered-cell">BCP2024</td>
              <td className="centered-cell text-center">
                <Button
                  variant="primary-outline"
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleEditar}
                >
                  <FeatherIcon icon="edit-2" />
                </Button>
                <Button
                  variant="danger-outline"
                  type="submit"
                  className="btn btn-outline-danger btn-sm ms-2"
                >
                  <FeatherIcon icon="trash-2" />
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="text-center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination className="justify-content-end">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>

      <Modal
        show={openModal}
        onHide={handleCerrar}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {esModoEditar ? "Editar Banco" : "Agregar Banco"}
          </Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={crearBanco}>
          <Modal.Body>
            <Form.Label className="form-label">BANCO</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="home" />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Nombre del banco"
                name="nombre"
                value={banco.nombre}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <Form.Label className="form-label">DIRECCIÓN</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="framer" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Dirección del banco"
                name="direccion"
                value={banco.direccion}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <Form.Label className="form-label">CODIGO</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="tag" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Código"
                name="codigo"
                value={banco.codigo}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleCerrar}>
              Cerrar
            </Button>
            <Button variant="outline-primary" onClick={handleCerrar}>
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Banco;
