import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const TableCompo = () => {
    const [movieData, setMovieData] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [url, setUrl] = useState('')
    const [id, setId] = useState(0)


    const getMovies = async () => {
        const res = await fetch(`http://localhost:3000/inventories/${id}`)
        const data = await res.json()
        setMovieData(data)
    }
    

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const res = await fetch(`http://localhost:3000/inventories/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const newMovieData = movieData.filter((product) => product.id !== id);
                setMovieData(newMovieData);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const navigate = useNavigate()


    useEffect(() => {
        getMovies()
    }, [id])
    return (
        <>
            {
                movieData.length < 0 ? <>Loading</>
                    :
                    <>
                        <Table striped bordered hover style={{padding:'20px'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                    <th>Operation</th>
                                    <th><Button variant='success' onClick={() => navigate('/add')}>Add</Button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {movieData.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.location}</td>
                                        <td><Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>{' '}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <button onClick={() => setId(id + 1)}>next</button>
                        <button onClick={() => setId(id - 1)}>previus</button></>
            }
        </>
    )
}

export default TableCompo