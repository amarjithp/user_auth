  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { useAuth } from '@/context/AuthContext';
  import users from '@/data/users.json';

  export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      try {
        const found = users.find(
          (u: any) => u.email === form.email && u.password === form.password
        );

        if (found) {
          login();
          localStorage.setItem('loggedInUser', JSON.stringify(found));
          router.push('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
        setError('Error reading users');
      }
    };

    return (
      <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-white"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </main>
    );
  }
