import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import '../index.css'
import Loader from './Loader/Loader';



const TableCompo = () => {
    const [movieData, setMovieData] = useState([]);
    const [location, setLocation] = useState('')
    const [id, setId] = useState(0);
    const [column, setColumn] = useState('')
    const [locationOptions] = useState(['მთავარი ოფისი', 'კავეა გალერია', 'კავეა თბილისი მოლი', 'კავეა ისთ ფოინთი', 'კავეა სითი მოლი']);
    const [filterOptions] = useState(['ფასი', 'სახელი']);




    const getMovies = async () => {
        if (id < 0) {
            setId(0);
        } else {
            const queryParam = location !== undefined ? `location=${location}` : '';
            const idQueryParam = id >= 0 ? `page=${id}` : '';
            const limit = `limit=${20}`;
            //column name
            const orderBy = column !== undefined ? `order_by=${column}` : '';

            console.log(orderBy)

            const res = await fetch(`http://localhost:4000/api/v1/inventory-management/inventories?${idQueryParam}&${limit}&${orderBy}&ordering_direction=asc&${queryParam}`, { method: 'GET' });
            const data = await res.json();
            if((data.data).length === 0){
                setLocation('ყველა')
            }else{

                setMovieData(data.data);
            }
            console.log(data.data)
        }
    }

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
    }, [id, location, column])



    const handleSelectChange = (e) => {
        // console.log(e.target.value)
        setLocation(e.target.value)
    }

    const handleFilterSelect = (e) => {

        console.log(e.target.value)
        if (e.target.value === 'ფასი') {
            setColumn('price')
        } else if (e.target.value === 'სახელი') {
            setColumn('name')
        } else {
            setColumn(e.target.value)
        }
    }
    return (
        <>
            {
                movieData.length == 0 ? <Loader movieData={movieData} />
                    :
                    <div className='container'>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div>

                                <Form.Group>
                                    <Form.Label>აირჩიეთ ადგილმდებარეობა</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={location}
                                        onChange={(e) => handleSelectChange(e)}
                                    >
                                        <option value="">ყველა</option>
                                        {locationOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label> ფილტრაცია</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={location}
                                        onChange={(e) => handleFilterSelect(e)}
                                    >
                                        <option value="">ფილტრაცია</option>
                                        {filterOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                            </div>


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
                                        <td><Button variant="danger" onClick={() => handleDelete(product.id)}>წაშლა</Button>{' '}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                        <>
                            <Button variant="primary" onClick={() =>(
                                 setId(id - 1),
                                 console.log(id)
                            )}>წინა</Button>{' '}
                            <Button variant="primary" onClick={() => setId(id + 1)}>შემდეგი</Button>{' '}
                        </>
                    </div>

            }
        </>
    )
}

export default TableCompo