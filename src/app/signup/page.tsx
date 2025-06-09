'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
  
  


    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Failed to save user' });
      } else {
        setStatus({ type: 'success', message: 'User saved successfully!' }); 
        router.push('/login');
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong' });
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      {status && (
        <p
          className={`mb-4 text-center ${
            status.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Sign Up'}
        </button>
      </form>
    </main>
  );
}
