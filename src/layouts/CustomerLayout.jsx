import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Film, Ticket, User } from 'lucide-react';

export default function CustomerLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-[#0F141F]/80 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black text-lg">
              C
            </span>
            <span className="font-bold text-xl tracking-wider text-slate-100">
              CINE<span className="text-amber-500">LUX</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition hover:text-amber-400 ${
                location.pathname === '/' ? 'text-amber-500' : 'text-slate-400'
              }`}
            >
              Now Showing
            </Link>
            <Link
              to="/coming-soon"
              className={`transition hover:text-amber-400 ${
                location.pathname === '/coming-soon' ? 'text-amber-500' : 'text-slate-400'
              }`}
            >
              Coming Soon
            </Link>
          </nav>
        </div>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search movies, genres..."
              className="w-full bg-[#161B26] border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <Link
            to="/my-tickets"
            className="flex items-center gap-2 bg-[#161B26] hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 transition"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-500" />
            <span>My Tickets</span>
          </Link>

          <Link
            to="/login"
            className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:border-amber-500/40 transition"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600 bg-[#0B0E14]">
        © 2026 CineLux Multiplex Theatres. Encrypted Cinematic Identity Services.
      </footer>
    </div>
  );
}