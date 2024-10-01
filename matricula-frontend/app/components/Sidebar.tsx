import Link from "next/link";

const Sidebar = () => {
    return (
        <>
            <Link href="/pages/bancos">Banco</Link> <br />
            <Link href="/pages/alumnos">Alumno</Link><br />
            <Link href="/pages/apoderados">Apoderado</Link> <br />
            <Link href="/pages/matricula">MAtricula</Link><br />
        </>
    )
}

export default Sidebar;