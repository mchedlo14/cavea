import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';


const PaginationComp = ({ setId, id, totalItems }) => {
    const [activePage, setActivePage] = useState(1);
    const totalPages = Math.ceil(totalItems / 20);

    const handlePageClick = (event) => {
        setId(Number(event.target.text));
    };

    const handleSelect = (pageNumber) => {
        setActivePage(pageNumber);
        setId(pageNumber);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Pagination.Item
                    key={i}
                    active={i === activePage}
                    onSelect={handleSelect}
                    eventKey={i}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    };

    return (
        <Pagination>
            <Pagination.First onClick={() => setActivePage(1)} />
            <Pagination.Prev
                onClick={() => setActivePage(activePage > 1 ? activePage - 1 : 1)}
                disabled={activePage === 1}
            />
            {getPageNumbers()}
            <Pagination.Next
                onClick={() =>
                    setActivePage(activePage < totalPages ? activePage + 1 : totalPages)
                }
                disabled={activePage === totalPages}
            />
            <Pagination.Last onClick={() => setActivePage(totalPages)} />
        </Pagination>
    );
};

export default PaginationComp;
