import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Armchair,
  CalendarDays,
  TicketCheck,
  Settings,
  ShieldCheck,
  Bell,
  Search,
} from "lucide-react";

const ADMIN_NAV = [
  {
    name: "Dashboard & Reports",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  { name: "Movies", path: "/admin/movies", icon: Film },
  { name: "Auditoriums & Seats", path: "/admin/auditoriums", icon: Armchair },
  { name: "Showtimes", path: "/admin/showtimes", icon: CalendarDays },
  { name: "Bookings", path: "/admin/bookings", icon: TicketCheck },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F141F] border-r border-slate-800/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60">
            <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center text-[#0B0E14] font-black text-sm">
              C
            </div>
            <div>
              <div className="font-bold text-sm tracking-wider text-slate-100">
                CINELUX
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                OPERATIONS CORE
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="px-4 py-6 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Admin Navigation
            </div>
            {ADMIN_NAV.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-amber-500 text-[#0B0E14] font-semibold shadow-sm shadow-amber-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#161B26]"
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Node Telemetry Card */}
        <div className="p-4 border-t border-slate-800/60 m-3 rounded-lg bg-[#141A26] border text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CineLink v3.4 SECURE</span>
          </div>
          <p className="text-slate-500 text-[10px]">Node: HALL-OPS-PRIME</p>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0F141F]/60 backdrop-blur px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">
              Admin / Console
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              LIVE OPERATIONS ACTIVE
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-[#161B26] border border-slate-800 text-slate-400 hover:text-slate-200">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                AV
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-slate-200">Alex Vance</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Super Administrator
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Outlet */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
