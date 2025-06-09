import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <Link href="/dashboard/profile" className="block hover:text-blue-400">Profile</Link>
          <Link href="/dashboard/agent" className="block hover:text-blue-400">Agent</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
    </div>
  );
}
