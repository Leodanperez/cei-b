"use client";

import FeatherIcon from "feather-icons-react";
import { Button, Form } from "react-bootstrap";

interface BuscadorProps {
  onOpenModal: () => void;
  btnTitleAdd: string;
  btnTitleReport: string;
  onOpenReport: () => void;
}

const Buscador: React.FC<BuscadorProps> = ({
  onOpenModal,
  btnTitleAdd,
  btnTitleReport,
  onOpenReport,
}) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <Button
        variant="primary-outline"
        className="btn btn-outline-primary"
        onClick={onOpenModal}
      >
        <FeatherIcon icon="plus" />
        {btnTitleAdd}
      </Button>
      <Form.Select className="form-select w-25">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
      <Form.Control
        className="form-control w-50"
        type="text"
        placeholder="Buscar matriculados..."
      />
      <Button
        variant="warning-outline"
        className="btn btn-outline-warning "
        onClick={onOpenReport}
      >
        <FeatherIcon icon="download" size={20} className="me-2" />
        {btnTitleReport}
      </Button>
    </div>
  );
};

export default Buscador;
