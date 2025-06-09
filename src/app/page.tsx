import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Sign Up Page</h1>
        <p className="text-gray-400">Click this button to sign up</p>
        <Link href="/signup">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
