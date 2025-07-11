'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/'); // redirect to home page
  };

  if (!isLoggedIn) {
    return <p className="p-6">Redirecting to login...</p>;
  }

  return (
    <div className="flex h-screen bg-black">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <Link
              href="/dashboard/profile"
              className={`block px-3 py-2 rounded hover:text-blue-400 ${
                pathname === '/dashboard/profile' ? 'bg-blue-600 font-semibold' : ''
              }`}
            >
              Profile
            </Link>
            <Link
              href="/dashboard/agent"
              className={`block px-3 py-2 rounded hover:text-blue-400 ${
                pathname === '/dashboard/agent' ? 'bg-blue-600 font-semibold' : ''
              }`}
            >
              Agent
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
