import React, { useState } from 'react';
import Page from '../Template/Page';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Api from '../utils/Api';

const Signup = ({setToken}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(password !== password2) {
            alert("Passwords do not match!");
            return false;
        }

        const response = await Api.post('/api/auth/signup', JSON.stringify({
            name,
            email,
            password
        }))
        .then(data => data.json());

        if(!response.token) {
            alert("User already exists");
            return false;
        }

        setToken(response);
    }

    return (
        <Page>
            <Row className='mt-3'>
                <Col xs={4}>
                    <h1>Signup</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={e => setName(e.target.value)}  
                            />    
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                autoComplete="username"
                                onChange={e => setEmail(e.target.value)}  
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Password"
                                value={password}
                                autoComplete="new-password"
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Password again</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Password"
                                value={password2}
                                autoComplete="new-password"
                                onChange={e => setPassword2(e.target.value)} 
                            />
                        </Form.Group>
              
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Page>
    )
}

export default Signup;