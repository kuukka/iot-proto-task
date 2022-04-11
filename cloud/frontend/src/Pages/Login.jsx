import React, { useState } from 'react';
import Page from '../Template/Page';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Api from '../utils/Api';
import {Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'

const Login = ({setToken, setUsername}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("Login error");

    const handleSubmit = async e => {
        e.preventDefault();

        const token = await Api.post('/api/auth/login', JSON.stringify({
            email,
            password
        }))
        .then(Api.handleError)
        .then(data => data.json())
        .catch(e => {
            if(e.code === 401) {
                setLoginError("Email or password incorrect, Please check login credentials.");
            } else if(e.code === 400) {
                setLoginError("Invalid credentials given. Please check login credentials.");
            } else {
                setLoginError("Error occured while processing login. Please contact site administration");
            }
            return null;
        });
        
        if(token !== null) {
            setToken(token);
            setUsername(token);
        }
    }

    return (
        <Page>
            <Row className='mt-3'>
                <Col xs={12} sm={8} md={6}>
                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit}>
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Password"
                                value={password}
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Link to="/signup">
                                <Form.Text>Signup</Form.Text>
                            </Link>
                        </Form.Group>
                        {loginError !== null &&
                            <Alert variant="danger" onClose={() => setLoginError(null)} dismissible>                               
                                {loginError}                                
                            </Alert>                        
                        }
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Page>
    )
}

export default Login;