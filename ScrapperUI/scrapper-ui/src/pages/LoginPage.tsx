import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../config/endpoint.config';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/rootReducer';

// Define your API URL
const API_URL = `${BACKEND_ENDPOINT}/users/validate`;

const LoginPage = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState)=> state.auth)
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, { emailId: emailId, password });
      const authDetails = {
        isAuthenticated: true,
        emailId: response?.data?.emailId,
        name: response?.data?.name,
        password: response?.data?.password,
        phone: response?.data?.phoneNumber
      }
      dispatch({
        type: "SET_AUTH_DETAILS",
        payload: {
            authDetails: authDetails
        }
      })
      navigate("/")
      localStorage.setItem('auth', JSON.stringify(authDetails));
      
      setIsLoading(false);
    } catch (error: any) {
      setError('An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Button
          component={Link}
          to="/sign-up"
          variant="text"
          sx={{ textTransform: 'none' }}
        >
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginPage;
