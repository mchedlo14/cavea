import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import '../index.css'


const TableCompo = () => {
    const [movieData, setMovieData] = useState([])
    const [id, setId] = useState(0);
    const [locationOptions] = useState(['მთავარი ოფისი', 'კავეა გალერია', 'კავეა თბილისი მოლი', 'კავეა ისთ ფოინთი', 'კავეა სითი მოლი']);



    const getMovies = async () => {

        if (id < 0) {
            setId(0)
        } else {

            const res = await fetch(`http://localhost:3000/inventories/${id}`)
            const data = await res.json()
            setMovieData(data)
        }
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
                    <div className='container'>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">აირჩიეთ ადგილმდებაროება</option>
                                    {locationOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Button variant='success' onClick={() => navigate('/add')} className="custom-btn-width">დამატება</Button>


                        </div>
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>სახელი</th>
                                    <th>ფასი</th>
                                    <th>ადგილმდებარეობა</th>
                                    <th>მოქმედება</th>
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
                        <button onClick={() => setId(id - 1)}>previus</button>
                    </div>

            }
        </>
    )
}

export default TableCompo