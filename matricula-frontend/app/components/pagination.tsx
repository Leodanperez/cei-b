import Pagination from "react-bootstrap/Pagination";

interface PaginatorProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      onPageChange(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // boton de First and Previous
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // numero de paginas
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(
      lastPage,
      currentPage + Math.floor(visiblePages / 2)
    );

    if (endPage - startPage + 1 < visiblePages) {
      if (startPage > 1) {
        endPage = Math.min(
          lastPage + (visiblePages - (endPage - startPage + 1))
        );
      } else {
        startPage = Math.max(
          1,
          endPage - (visiblePages - (endPage - startPage + 1))
        );
      }
    }

    if (startPage > 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < lastPage) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" />);
    }

    // Botones siguiente, atras
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(lastPage)}
        disabled={currentPage === lastPage}
      />
    );

    return items;
  };

  return (
    <Pagination className="justify-content-end">
      {renderPaginationItems()}
    </Pagination>
  );
};

export default Paginator;
