import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField,Button } from '@mui/material';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // useForm for validation
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      localStorage.setItem('token', response.data.token);
      alert('Login successful! Redirecting to dashboard...');
      navigate('/dashboard'); // Redirect to Dashboard after login
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Email" variant="outlined" fullWidth {...register("email", { required: "Email is required" })}
          InputProps={{ startAdornment: <FaEnvelope /> }} error={!!errors.email} helperText={errors.email?.message} />

        <TextField label="Password" type="password" variant="outlined" fullWidth {...register("password", { required: "Password is required" })}
          InputProps={{ startAdornment: <FaLock /> }} error={!!errors.password} helperText={errors.password?.message} />

        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
      <Button variant="text" color="primary" component={Link} to="/">
        Don't have an account? Register
      </Button>
    </div>
  );
};

export default Login;
