import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const firebase = useFirebase();
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await firebase.signup(email, pass);
        console.log(res);
    }
    return (
        <div className="container">
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>

    )
}

export default Register