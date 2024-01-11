import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

function List() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        isb: "",
        price: "",
        coverPic: "",
    })
    const firebase = useFirebase();
    const submitHandler = async (e) => {
        console.log("object");
        e.preventDefault();
        const res = await firebase.handleCreateList(data);
        navigate("/")
    }
    return (
        <div className="container mt-5">
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Book Name" value={data?.name} onChange={e => { setData(prev => { return { ...prev, name: e.target.value } }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>ISB Number</Form.Label>
                    <Form.Control type="text" placeholder="ISB Number" value={data?.isb} onChange={e => { setData(prev => { return { ...prev, isb: e.target.value } }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" value={data?.price} onChange={e => { setData(prev => { return { ...prev, price: e.target.value } }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Cover Picture</Form.Label>
                    <Form.Control type="file" onChange={e => { setData(prev => { return { ...prev, coverPic: e.target.files[0] } }) }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Book
                </Button>
            </Form>
        </div>

    )
}

export default List