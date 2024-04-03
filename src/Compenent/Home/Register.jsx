import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../feautures/AuthSlice";
import { fetchSpecialite } from "../../Services/SpecialiteServices";
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Menu from "./Menu";
import Footer from "./Footer";

function Register() {
  const dispatch = useDispatch();
  const [specialite, setSpecialite] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    adresse: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    avatar: "",
    matricule: "",
    certification: "",
    specialiteID: "",
    role: "patient" // Par défaut, le rôle est défini comme "patient"
  });
  const [error, setError] = useState(false);
  const { isSuccess, isError, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchSpecialite()
      .then(res => {
        setSpecialite(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div>
      <Menu />
      <div className="container py-5">
        <h1 className="text-center mb-4">Inscription</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control type="text" placeholder="Nom" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Prénom" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </Col>
          </Row>
          <Form.Control type="text" placeholder="Adresse" name="adresse" value={formData.adresse} onChange={handleInputChange} required className="mb-3" />
          <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required className="mb-3" />
          <Form.Control type="text" placeholder="Numéro de téléphone" name="phone" value={formData.phone} onChange={handleInputChange} required className="mb-3" />
          <Form.Control type="password" placeholder="Mot de passe" name="password" value={formData.password} onChange={handleInputChange} required className="mb-3" />
          <Form.Control type="password" placeholder="Confirmer le mot de passe" name="password2" value={formData.password2} onChange={handleInputChange} required className="mb-3" />
          <Form.Control as="select" value={formData.role} onChange={handleInputChange} name="role" required className="mb-3">
            <option value="patient">Patient</option>
            <option value="doctor">Médecin</option>
          </Form.Control>
          {formData.role === "doctor" && (
            <>
              <Form.Control type="text" placeholder="Matricule Fiscale" name="matricule" value={formData.matricule} onChange={handleInputChange} required className="mb-3" />
              <Form.Control type="text" placeholder="Certification" name="certification" value={formData.certification} onChange={handleInputChange} required className="mb-3" />
              <Form.Control as="select" value={formData.specialiteID} onChange={handleInputChange} name="specialiteID" required className="mb-3">
                <option value="">Choisir la spécialité</option>
                {specialite.map(s => (
                  <option key={s._id} value={s._id}>{s.nomsep}</option>
                ))}
              </Form.Control>
            </>
          )}
          <Form.Control type="file" name="avatar" onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })} className="mb-3" />
          <Button variant="primary" type="submit" className="w-100 mb-3">S'inscrire</Button>
          {isError && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
        <p className="text-center">Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link></p>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
