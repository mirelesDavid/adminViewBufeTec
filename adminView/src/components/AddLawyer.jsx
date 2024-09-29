import React, { useState } from 'react';
import { addLawyer, registerUser } from '../services/api';
import './AddLawyer.css';

const AddLawyer = () => {
  const [lawyer, setLawyer] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    contrasena: '',
    experiencia: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLawyer({ ...lawyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await registerUser({
        nombre: lawyer.nombre,
        email: lawyer.email,
        contrasena: lawyer.contrasena,
        rol: 'abogado'
      });

      const id_usuario = userResponse.data.id;

      await addLawyer({
        id_usuario,
        especialidad: lawyer.especialidad,
        experiencia: lawyer.experiencia
      });

      setMessage('Lawyer added successfully');
    } catch (error) {
      setMessage('Error adding lawyer');
    }
  };

  return (
    <div className="add-lawyer-form-container">
      <h2 className="add-lawyer-title">Add Lawyer</h2>
      {message && <div className="add-lawyer-confirmation-banner">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="add-lawyer-input-container">
          <input type="text" name="nombre" value={lawyer.nombre} onChange={handleChange} className="add-lawyer-input" placeholder=" " />
          <label className="add-lawyer-label">Name:</label>
        </div>
        <div className="add-lawyer-input-container">
          <input type="text" name="especialidad" value={lawyer.especialidad} onChange={handleChange} className="add-lawyer-input" placeholder=" " />
          <label className="add-lawyer-label">Specialty:</label>
        </div>
        <div className="add-lawyer-input-container">
          <input type="email" name="email" value={lawyer.email} onChange={handleChange} className="add-lawyer-input" placeholder=" " />
          <label className="add-lawyer-label">Email:</label>
        </div>
        <div className="add-lawyer-input-container">
          <input type="password" name="contrasena" value={lawyer.contrasena} onChange={handleChange} className="add-lawyer-input" placeholder=" " />
          <label className="add-lawyer-label">Password:</label>
        </div>
        <div className="add-lawyer-input-container">
          <input type="text" name="experiencia" value={lawyer.experiencia} onChange={handleChange} className="add-lawyer-input" placeholder=" " />
          <label className="add-lawyer-label">Experience:</label>
        </div>
        <button type="submit" className="add-lawyer-button">Add Lawyer</button>
      </form>
    </div>
  );
};

export default AddLawyer;
