import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { createUser } from '../apis/useApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        emailId: '',
        phoneNumber: '',
        password: '',
      });
    const dispatch = useDispatch()
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
      const mutation = useMutation({
        mutationFn: createUser, // Explicitly type the mutation function
        onSuccess: (res) => {
            const authDetails = {
                isAuthenticated: true,
                emailId: res?.emailId,
                name: res?.name,
                password: res?.password,
                phone: res?.phoneNumber
              }
        dispatch({
            type: "SET_AUTH_DETAILS",
            payload: {
                authDetails: authDetails
            }
          })
          localStorage.setItem('auth', JSON.stringify(authDetails))
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message || 'Something went wrong');
        },
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(form); // Pass the `form` object to the mutation
      };
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Signup
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="emailId"
          value={form.emailId}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Already have a account? {' '}
        <Button
          component={Link}
          to="/"
          variant="text"
          sx={{ textTransform: 'none' }}
        >
          Login
        </Button>
      </Typography>
    </Container>
  );
};

export default Signup;
