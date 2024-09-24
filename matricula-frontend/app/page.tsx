"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5454",
  headers: {
    "Content-Type": "application/json",
  },
});

type IBanco = {
  id: number;
  nombre: string;
  direccion: string;
  codigo: string;
};

export default function Home() {
  //variable
  const [bancos, setBancos] = useState<IBanco[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [banco, setBanco] = useState({
    nombre: "",
    direccion: "",
    codigo: "",
  });

  const handleCerrar = () => setOpenModal(false);
  const handleAbrirModal = () => setOpenModal(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanco({ ...banco, [name]: value.toUpperCase() });
  };

  const crearBanco = async (e: FormEvent<HTMLFormElement>) => {
    
  }

  useEffect(() => {
    //funcion de flecha
    const obtenerBancos = async () => {
      try {
        const response = await axiosInstance("/obtner-bancos", {});
        // Asignar valor a la variable setBancos
        setBancos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerBancos();
  }, []);

  return (
    <>
      <div>
        <button className="btn btn-outline-primary" onClick={handleAbrirModal}>
          Agregar banco
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Direccion</th>
              <th scope="col">Codigo</th>
            </tr>
          </thead>
          <tbody>
            {bancos?.map((valor, index) => (
              <tr key={index}>
                <th scope="row">{valor.id}</th>
                <td>{valor.nombre}</td>
                <td>{valor.direccion}</td>
                <td>{valor.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={openModal} onHide={handleCerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Banco</Modal.Title>
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
}
