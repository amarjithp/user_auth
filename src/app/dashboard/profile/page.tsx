'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEmail(parsed.email);
    }
  }, []);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await fetch('/api/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          originalEmail: user.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Updated successfully');
        // update local storage
        localStorage.setItem('loggedInUser', JSON.stringify({ ...user, email }));
      } else {
        setStatus(data.error || 'Update failed');
      }
    } catch (err) {
      setStatus('Something went wrong');
    }
  };

  if (!user) return <p className="p-6">Loading user...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-black rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>

      <div className="space-y-3">
        <label className="block">
          <span className="text-white">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-white">New Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
        {status && <p className="text-sm text-green-600">{status}</p>}
      </div>
    </div>
  );
}
