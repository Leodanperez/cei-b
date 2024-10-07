"use client";

import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();

  const estaActivo = (nombreRuta: string) => {
    return currentPath === nombreRuta
      ? "nav-link d-flex align-items-center gap-2 active"
      : "nav-link d-flex align-items-center gap-2";
  };

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className={estaActivo("/")} href="/">
                <FeatherIcon icon="home" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/bancos")}
                href={"/pages/bancos"}
              >
                <FeatherIcon icon="database" />
                Bancos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/alumnos")}
                href={"/pages/alumnos"}
              >
                <FeatherIcon icon="users" />
                Estudiantes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/apoderados")}
                href={"/pages/apoderados"}
              >
                <FeatherIcon icon="users" />
                Apoderados
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/matricula")}
                href={"/pages/matricula"}
              >
                <FeatherIcon icon="book-open" />
                Matriculas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/pagos")}
                href={"/pages/pagos"}
              >
                <FeatherIcon icon="credit-card" />
                Pagos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={estaActivo("/pages/reportes")}
                href={"/pages/reportes"}
              >
                <FeatherIcon icon="bar-chart-2" />
                Reportes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
