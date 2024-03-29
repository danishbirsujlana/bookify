import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"
import { useFirebase } from '../context/Firebase';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const firebase = useFirebase();
    useEffect(() => {
        if(firebase.loggedIn) {
            //navigate
            navigate("/");
        }
    },[firebase, navigate])
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await firebase.login(email, pass);
        console.log(res);
    }
    return (
        <div className="container mt-5">
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
                <Button variant="warning" type="submit">
                    Login
                </Button>
            </Form>
            <h5 className="mt-2">OR</h5>
            <Button onClick={firebase.loginWithGoogle} variant="danger" type="button">
                Signin with Google
            </Button>
        </div>

    )
}

export default Login;