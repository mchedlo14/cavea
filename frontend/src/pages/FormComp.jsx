import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
const FormComp = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [location, setLocation] = useState('');
    const [locationOptions] = useState(['მთავარი ოფისი', 'კავეა გალერია', 'კავეა თბილისი მოლი', 'კავეა ისთ ფოინთი', 'კავეა სითი მოლი']);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || isNaN(price) || !location) {
            setError('Please fill in all the fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/v1/inventory-management/inventories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, location }),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
            setError('Error adding product');
        }
    };

    useEffect(() => {
        console.log(location)
    }, [location])

    console.log(typeof price)
    return (
        <div className='container' style={{ width: '30%' }}>

            <Form onSubmit={handleSubmit} col-md-8 mx-auto>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="დასახელება"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>ფასი</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="შეიყვანეთ ფასი"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Location</Form.Label>
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

                <Button variant="primary" type="submit" className='mt-3'>
                    Add Product
                </Button>
            </Form>
        </div>
    )
}

export default FormComp