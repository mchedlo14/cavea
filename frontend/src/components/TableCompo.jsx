import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import '../index.css'
import PaginationComp from './Pagination/PaginationComp';
import Loader from './Loader/Loader';



const TableCompo = () => {
    const [movieData, setMovieData] = useState([]);
    const [location,setLocation] = useState('ყველა')
    const [id, setId] = useState(0);
    const [locationOptions] = useState(['მთავარი ოფისი', 'კავეა გალერია', 'კავეა თბილისი მოლი', 'კავეა ისთ ფოინთი', 'კავეა სითი მოლი']);


    const getMovies = async () => {
        if (id < 0) {
            setId(0);
        } else {
            const queryParam = location ? `&location=${location}` : '';
            const idQueryParam = id ? `?page=${id}`:'';
            const limit = `&limit=${20}`;
            const res = await fetch(`http://localhost:4000/api/v1/inventory-management/inventories${idQueryParam}${limit}${queryParam}&order_by=&ordering_direction=asc`);
            const data = await res.json();
            setMovieData(data);
            console.log(data)
        }
    }

    console.log(location)
    const handleDelete = async (id) => {
        console.log(id)
        // try {
        //     const res = await fetch(`http://localhost:3000/inventories/${id}`, {
        //         method: 'DELETE',
        //     });
        //     if (res.ok) {
        //         const newMovieData = movieData.filter((product) => product.id !== id);
        //         setMovieData(newMovieData);
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    }

    const navigate = useNavigate()


    useEffect(() => {
        getMovies()
    }, [id,location])



    const handleSelectChange = (e) => {
        console.log(e.target.value)
        setLocation(e.target.value)
    }
    return (
        <>
            {
                movieData.length === 0 ? <Loader movieData={movieData}/>
                    :
                    <div className='container'>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <Form.Group>
                                <Form.Label>აირჩიეთ ადგილმდებარეობა</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={location}
                                    onChange={(e) => handleSelectChange(e)}
                                >
                                    <option value="ყველა">ყველა</option>
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
                                {/* {movieData.data.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.location}</td>
                                        <td><Button variant="danger" onClick={() => handleDelete(product.id)}>წაშლა</Button>{' '}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </Table>

                        <PaginationComp setId={setId} id={id} totalItems={movieData.length}/>

                        <button onClick={() => setId(id + 1)}>next</button>
                        <button onClick={() => setId(id - 1)}>previus</button>
                    </div>

            }
        </>
    )
}

export default TableCompo