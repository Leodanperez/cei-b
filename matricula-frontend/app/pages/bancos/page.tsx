"use client";

import fetchData from "@/app/components/api/apiData";
import Breadcrumb from "@/app/components/Breadcrumb";
import Paginator from "@/app/components/pagination";
import showToast from "@/app/components/utils/toastify";
import FeatherIcon from "feather-icons-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Banco = {
  id: number;
  codigo: string;
  direccion: string;
  nombre: string;
};

type IBanco = {
  data: Banco[];
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
};

type DtoResponse = {
  status: number;
  message: string;
};

const Banco = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [esModoEditar, setEsModoEditar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listaBancos, setListBancos] = useState<Banco[] | null>(null);
  const [buscar, setBuscar] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [seleccionarBancoId, setSeleccionarBancoId] = useState<number | null>(
    null
  );
  const [banco, setBanco] = useState({
    nombre: "",
    direccion: "",
    codigo: "",
  });

  const MySwal = withReactContent(Swal);

  const handleCerrar = () => {
    setOpenModal(false);
    setSeleccionarBancoId(null);
    setEsModoEditar(false);
    setValidated(false);
    setBanco({
      nombre: "",
      direccion: "",
      codigo: "",
    });
  };

  const handleAbrirModal = () => setOpenModal(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const date = new Date();

    //Obtener anio, dia
    const year = date.getFullYear().toString();
    const day = date.getDate().toString();

    let code = banco.codigo;

    if (name === "nombre") {
      const bankCode = value
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

      code = bankCode + day + year;
    }

    setBanco({ ...banco, [name]: value.toUpperCase(), codigo: code });
  };

  const crearBanco = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // aplicar logica de validaciones
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
      /* if (!banco.nombre || !banco.direccion || !banco.codigo) {
        showToast({ message: "Campos obligatorios", type: "warning" });
        return;
      } */
    }

    e.preventDefault();

    try {
      if (esModoEditar && seleccionarBancoId) {
        const resultado = await fetchData<DtoResponse>(
          `/actualizar-banco/${seleccionarBancoId}`,
          {
            method: "PUT",
            data: banco,
          }
        );

        showToast({ message: resultado.message, type: "success" });
      } else {
        const resultado = await fetchData<DtoResponse>("/crear-banco", {
          method: "POST",
          data: banco,
        });

        showToast({ message: resultado.message, type: "success" });
      }
      obtnerBancos(buscar, page);
      handleCerrar();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = (banco: Banco) => {
    setEsModoEditar(true);
    setSeleccionarBancoId(banco.id);
    setBanco({
      nombre: banco.nombre,
      direccion: banco.direccion,
      codigo: banco.codigo,
    });
    setOpenModal(true);
  };

  const handleEliminar = async (id: number) => {
    MySwal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resultado = await fetchData<DtoResponse>(
          `/eliminar-banco/${id}`,
          {
            method: "DELETE",
          }
        );

        showToast({ message: resultado.message, type: "success" });
        obtnerBancos(buscar, page);
      }
    });
  };

  const obtnerBancos = useCallback(
    async (buscar: string, page: number) => {
      try {
        const resultado = await fetchData<IBanco>(
          `/obtener-bancos?nombre=${buscar}&page=${page}&perPage=${perPage}`
        );
        setListBancos(resultado.data);
        setTotal(resultado.total);
        setLastPage(resultado.lastPage);
      } catch (error) {
        console.log(error);
      }
    },
    [perPage]
  );

  const handleBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscar(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    obtnerBancos(buscar, page);
  }, [buscar, obtnerBancos, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
          value={buscar}
          onChange={handleBuscarChange}
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
            {listaBancos ? (
              listaBancos.map((banco, index) => (
                <tr key={banco.id}>
                  <td className="centered-cell">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="centered-cell">{banco.nombre}</td>
                  <td className="centered-cell">{banco.direccion}</td>
                  <td className="centered-cell">{banco.codigo}</td>
                  <td className="centered-cell text-center">
                    <Button
                      variant="primary-outline"
                      type="submit"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEditar(banco)}
                    >
                      <FeatherIcon icon="edit-2" />
                    </Button>
                    <Button
                      variant="danger-outline"
                      type="submit"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleEliminar(banco.id)}
                    >
                      <FeatherIcon icon="trash-2" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Paginator
          currentPage={page}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        />
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

        <Form noValidate validated={validated} onSubmit={crearBanco}>
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
              <Form.Control.Feedback type="invalid">
                Por favor ingrese el nombre del banco
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Por favor ingrese la direccion
              </Form.Control.Feedback>
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
                disabled={true}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese el codigo
              </Form.Control.Feedback>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleCerrar}>
              Cerrar
            </Button>
            <Button variant="outline-primary" type="submit">
              {esModoEditar ? "Editar Banco" : "Agregar Banco"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Banco;
