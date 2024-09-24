"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

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
        <Modal.Body>
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Ingrese banco"
            id="nombre"
            name="nombre"
            value={banco.nombre}
          />
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Ingrese direccion"
            id="direccion"
            name="direccion"
            value={banco.direccion}
          />
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Ingrese codigo"
            id="codigo"
            name="codigo"
            value={banco.codigo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleCerrar}>
            Cerrar
          </Button>
          <Button variant="outline-primary" onClick={handleCerrar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
