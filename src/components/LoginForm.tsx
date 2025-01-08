
// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Reset error before new submission
  
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      const response = await axios.post('/api/login', credentials);
  
      if (response.status === 200) {
        const { token, user } = response.data;
  
        login(token, user); // Pass token and user details to AuthContext
        localStorage.setItem('token', token); // Save token in localStorage
        localStorage.setItem('userId', user.id); // Save user ID in localStorage
        router.push('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Food Precision Rx</h2>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
         {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => router.push('/registrationform')}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Go to Registration
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
