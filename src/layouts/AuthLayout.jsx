import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-[#F8FAFC] flex flex-col">
      <Outlet />
    </div>
  );
}
