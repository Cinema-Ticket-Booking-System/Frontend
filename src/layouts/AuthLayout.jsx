import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col items-center justify-center p-4">
      <Outlet />
    </div>
  );
}