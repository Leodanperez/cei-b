"use client";

import fetchData from "@/app/components/api/apiData";
import Breadcrumb from "@/app/components/Breadcrumb";
import Paginator from "@/app/components/pagination";
import showToast from "@/app/components/utils/toastify";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type IAlumno = {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  genero: string;
  fechaNac: string;
};

type DtoResponse = {
  status: number;
  message: string;
};

interface IApiResponse {
  data: IAlumno[];
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

const Alumno = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [esModoEditar, setEsModoEditar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listaAlumnos, setListaAlumnos] = useState<IAlumno[] | null>(null);
  const [buscar, setBuscar] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [seleccionarAlumnoId, setSeleccionarAlumnoId] = useState<number | null>(
    null
  );
  const [alumno, setAlumno] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    email: "",
    genero: "",
    fechaNac: "",
  });

  const MySwal = withReactContent(Swal);
  const today = new Date().toISOString().split("T")[0];

  const handleCerrar = () => {
    setOpenModal(false);
    setSeleccionarAlumnoId(null);
    setEsModoEditar(false);
    setValidated(false);
    setAlumno({
        dni: "",
        nombres: "",
        apellidos: "",
        email: "",
        genero: "",
        fechaNac: "",
      });
  };

  const handleAbrirModal = () => setOpenModal(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAlumno({ ...alumno, [name]: value });
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
      if (esModoEditar && seleccionarAlumnoId) {
        const resultado = await fetchData<DtoResponse>(
          `/alumno/${seleccionarAlumnoId}`,
          {
            method: "PUT",
            data: alumno,
          }
        );

        showToast({ message: resultado.message, type: "success" });
      } else {
        const resultado = await fetchData<DtoResponse>("/alumno", {
          method: "POST",
          data: alumno,
        });

        if (resultado.status === 422) {
          showToast({ message: resultado.message, type: "error" });
        } else {
          showToast({ message: resultado.message, type: "success" });
        }
      }
      obtnerBancos(buscar, page);
      handleCerrar();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = (banco: IAlumno) => {
    setEsModoEditar(true);
    setSeleccionarAlumnoId(banco.id);
    setAlumno({
        dni: alumno.dni,
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        email: alumno.email,
        genero: alumno.genero,
        fechaNac: moment(alumno.fechaNac).format("YYYY-MM-DD"),
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
          `/alumno/${id}`,
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
        const resultado = await fetchData<IApiResponse>(
          `/alumnos?dni=${buscar}&page=${page}&perPage=${perPage}`
        );
        setListaAlumnos(resultado.data);
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

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    obtnerBancos(buscar, page);
  }, [buscar, obtnerBancos, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const descargarExcel = async () => {
    try {
      setLoading(true);
      const resultado = await fetchData<any>(`/exportar-excel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
        },
        responseType: "blob",
      });

      console.log(resultado);

      if (!resultado) {
        showToast({ message: "Error al descargar el archuvo", type: "error" });
      }

      const blob = new Blob([resultado], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bancos.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const descargarPdf = async () => {
    try {
      setLoading(true);
      const resultado = await fetchData<any>(`/reporte`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
        },
        responseType: "blob",
      });

      console.log(resultado);

      if (!resultado) {
        showToast({ message: "Error al descargar el archuvo", type: "error" });
      }

      const blob = new Blob([resultado], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bancos.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        <Form.Select
          className="form-select w-25"
          value={perPage}
          onChange={handlePerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Form.Select>
        <Form.Control
          className="form-control w-50"
          type="text"
          placeholder="Buscar bancos..."
          value={buscar}
          onChange={handleBuscarChange}
        />
        <Button
          variant="warning-outline"
          className="btn btn-outline-warning "
          onClick={descargarExcel}
          disabled={loading}
        >
          <FeatherIcon icon="download" size={20} className="me-2" />
          {loading ? "Descargando..." : "Descargar"}
        </Button>
      </div>

      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DNI</th>
              <th scope="col">NOMBRES Y APELLIDOS</th>
              <th scope="col" className="text-center">
                GENERO
              </th>
              <th scope="col">FECHA NACIMIENTO</th>
              <th scope="col" className="text-center">
                OPCIONES
              </th>
            </tr>
          </thead>
          <tbody>
          {listaAlumnos ? (
                listaAlumnos.map((item, index) => (
                  <tr key={item.id}>
                    <td className="centered-cell">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="centered-cell">{item.dni}</td>
                    <td className="centered-cell">
                      {item.nombres} {item.apellidos}
                    </td>
                    <td className="centered-cell text-center">{item.genero}</td>
                    <td className="centered-cell">
                      {moment(item.fechaNac).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center centered-cell">
                      <Button
                        variant="primary-outline"
                        type="submit"
                        onClick={() => handleEditar(item)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <FeatherIcon icon="edit-2" />
                      </Button>
                      <Button
                        variant="danger-outline"
                        type="submit"
                        onClick={() => handleEliminar(item.id)}
                        className="btn btn-outline-danger btn-sm ms-2"
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {esModoEditar ? "Editar Estudiante" : "Agregar Estudiante"}
          </Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={crearBanco}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">DNI</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Control
                    autoFocus
                    type="number"
                    placeholder="Número de DNI"
                    name="dni"
                    value={alumno.dni}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">NOMBRES</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nombres"
                    name="nombres"
                    value={alumno.nombres}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">APELLIDOS</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="users" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={alumno.apellidos}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">EMAIL</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="mail" />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={alumno.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">GENERO</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="command" />
                  </InputGroup.Text>
                  <Form.Select
                    value={alumno.genero}
                    onChange={handleChange}
                    name="genero"
                    required
                  >
                    <option>Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="OTROS">Otros</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">FECHA NACIMIENTO</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="calendar" />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="fechaNac"
                    value={alumno.fechaNac}
                    onChange={handleChange}
                    required
                    max={today}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
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

export default Alumno;
