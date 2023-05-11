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
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    );
};

export default PaginationComp;
