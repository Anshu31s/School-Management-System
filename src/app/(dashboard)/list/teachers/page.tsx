'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TeacherRegisterForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post('/api/teachers', form);
      setMessage('User created successfully!');
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Something went wrong.';
      setMessage(errMsg);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-center">Register Teacher</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Creating...' : 'Register'}
      </button>

      {message && (
        <p className="text-center text-sm mt-2 text-gray-700">{message}</p>
      )}
    </form>
  );
}
