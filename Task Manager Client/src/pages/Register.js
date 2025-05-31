import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from "@mui/material";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // useForm for validation
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/register', data);
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
  <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
    <h2>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)}style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Name" variant="outlined" fullWidth {...register("name", { required: "Name is required" })}
          InputProps={{ startAdornment: <FaUser /> }} error={!!errors.name} helperText={errors.name?.message} />

        <TextField label="Email" variant="outlined" fullWidth {...register("email", { required: "Email is required" })}
          InputProps={{ startAdornment: <FaEnvelope /> }} error={!!errors.email} helperText={errors.email?.message} />

        <TextField label="Password" type="password" variant="outlined" fullWidth {...register("password", { required: "Password is required" })}
          InputProps={{ startAdornment: <FaLock /> }} error={!!errors.password} helperText={errors.password?.message} />

        <Button type="submit" variant="contained" color="primary">Register</Button>
    </form>
    <Button variant="text" color="primary" component={Link} to="/login">
    Already have an account? Login
    </Button>
  </div>
  );
};

export default Register;
