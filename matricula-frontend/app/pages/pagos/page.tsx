"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import Buscador from "@/app/components/Buscador";
import showToast from "@/app/components/utils/toastify";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Pagos = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const MySwal = withReactContent(Swal);

  const openModalPago = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const eliminarPagos = () => {
    MySwal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#F2385A",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#049DD9",
      iconColor: "#F2B705",
      color: "#011F26",
      backdrop: false,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          text: "Eliminado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#049DD9",
          iconColor: "#1AD95D",
        });
        showToast({ message: "Eliminado correctamente", type: "success" });
      }
    });
  };

  return (
    <>
      <Breadcrumb title="Pagos" />
      <Buscador
        onOpenModal={openModalPago}
        btnTitleAdd="Agregar pagos"
        btnTitleReport="Reporte"
        onOpenReport={openModalPago}
      />
      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">RECIBO</th>
              <th scope="col">FECHA</th>
              <th scope="col">COD MATRICULA</th>
              <th scope="col">ESTUDIANTE</th>
              <th scope="col">CONCEPTO</th>
              <th scope="col">MEDIO DE PAGO</th>
              <th scope="col">MONTO</th>
              <th scope="col" className="text-center">
                OPCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="centered-cell">1</td>
              <td className="centered-cell">
                <Button
                  variant="dark-outline"
                  className="btn btn-outline-dark btn-sm"
                >
                  <FeatherIcon icon="download" />
                </Button>
              </td>
              <td className="centered-cell">11/11/2024</td>
              <td className="centered-cell">LP769576806</td>
              <td className="centered-cell">LEODAN PEREZ</td>
              <td className="centered-cell">Mensualidad (Mayo)</td>
              <td className="centered-cell">BCP</td>
              <td className="centered-cell">S/ 100.00</td>
              <td className="centered-cell text-center">
                <Button
                  variant="primary-outline"
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                >
                  <FeatherIcon icon="edit-2" />
                </Button>
                <Button
                  variant="danger-outline"
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={eliminarPagos}
                >
                  <FeatherIcon icon="trash-2" />
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={9} className="text-center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
            <tr>
              <td colSpan={9} className="text-center">
                No hay datos disponibles
              </td>
            </tr>
          </tbody>
        </Table>
        {/* <Paginator
          currentPage={page}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        /> */}
      </div>

      <Modal
        show={openModal}
        onHide={closeModal}
        centered
        size="xl"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar matricula</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <h6>Datos del estudiante</h6>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">
                  CODIGO DE MATRICULA
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Control autoFocus type="text" />
                  <Button variant="outline-primary">
                    <FeatherIcon icon="search" /> Buscar
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label className="form-label">ALUMNO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Control type="text" disabled readOnly name="alumno" />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">AULA</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="home" />
                  </InputGroup.Text>
                  <Form.Control type="text" disabled readOnly name="aula" />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="form-label">MATRICULA</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="costoMatricula"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="form-label">MENSUALIDAD</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="mensualidadFinal"
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <hr className="my-6 mx-n4" />
            <h6>Detalles del pago</h6>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">CONCEPTO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Select
                    aria-label="Default select example"
                    name="tipoPago"
                    required
                  >
                    <option>Seleccione...</option>
                    <option value="mensualidad">Mensualidad</option>
                    <option value="matricula">Matricula</option>
                    <option value="otros">Otros</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">CANAL DE PAGO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Select
                    aria-label="Default select example"
                    name="bancoId"
                    required
                  >
                    <option>Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">MONTO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="monto"
                    placeholder="Monto"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">
                  MENSUALIDAD A PAGAR
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="calendar" />
                  </InputGroup.Text>
                  <Form.Select
                    aria-label="Default select example"
                    name="mesCorrespondiente"
                  >
                    <option>Seleccione...</option>
                    <option value="1">Marzo</option>
                    <option value="2">Abril</option>
                    <option value="3">Mayo</option>
                    <option value="4">Junio</option>
                    <option value="5">Julio</option>
                    <option value="6">Agosto</option>
                    <option value="7">Septiembre</option>
                    <option value="8">Octubre</option>
                    <option value="9">Noviembre</option>
                    <option value="10">Diciembre</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">NUMERO DE TICKET</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="bookmark" />
                  </InputGroup.Text>
                  <Form.Control type="text" name="numeroTicket" required />
                </InputGroup>
              </Form.Group>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Pagos;
