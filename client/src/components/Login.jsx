import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Logo from '../assets/image/logo.png'; // Adjust the path as necessary

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            console.log("✅ Login successful:", res.data);
            navigate("/dashboard");
        } catch (err) {
            console.error("❌ Login error:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-light px-3">
            <Row className="w-100 justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                        <Row className="g-0">
                            {/* Left branding / logo panel */}
                            <Col
                              md={5}
                              className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-0"
                              style={{
                                background: 'linear-gradient(135deg, #1d3557, #457b9d)',
                                color: 'white',
                              }}
                            >
                              <div className="text-center px-4">
                                <img
                                  src={Logo}
                                  alt="Logo"
                                  className="img-fluid mb-4"
                                  style={{ maxHeight: '100%', width: 'auto' , borderRadius: '50%'}}
                                />
                              </div>
                            </Col>

                            {/* Right form panel */}
                            <Col xs={12} md={7} className="bg-white p-4 p-md-5">
                                <h3 className="text-center mb-4 fw-bold">Sign In</h3>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="rounded-3"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="rounded-3"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 rounded-3 fw-semibold py-2"
                                    >
                                        Login
                                    </Button>

                                    <div className="text-center mt-3">
                                        <small className="text-muted">
                                            Don't have an account?{" "}
                                            <Button
                                                variant="link"
                                                className="p-0"
                                                onClick={() => navigate("/register")}
                                            >
                                                Register
                                            </Button>
                                        </small>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
