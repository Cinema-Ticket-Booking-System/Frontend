import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, EyeOff, User } from "lucide-react";
import { useAuth } from "../../context/useAuth";

import brandClapperIcon from "../../assets/auth/brand-clapper.svg";
import masksBadgeIcon from "../../assets/auth/masks-badge.svg";
import atIcon from "../../assets/auth/at-icon.svg";
import lockIcon from "../../assets/auth/lock-icon.svg";
import eyeIcon from "../../assets/auth/eye-icon.svg";
import arrowRightIcon from "../../assets/auth/arrow-right.svg";
import shieldLockIcon from "../../assets/auth/shield-lock.svg";
import roleAppliedIcon from "../../assets/auth/role-applied.svg";
import footerShieldIcon from "../../assets/auth/footer-shield.svg";

const DEMO_ROLES = [
  {
    id: "customer",
    label: "Customer Portal",
    email: "alex.rivera@cinelux.com",
    password: "password123",
    dotClass: "bg-[#56E5A9]",
  },
  {
    id: "scanner",
    label: "Auditorium Scanner",
    email: "checker@cinelux.com",
    password: "password123",
    dotClass: "bg-[#FFC174]",
  },
  {
    id: "admin",
    label: "Operations Lead",
    email: "admin@cinelux.com",
    password: "password123",
    dotClass: "bg-[#FFB3B6]",
  },
];

function getDefaultRouteForRole(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "scanner") return "/admin/bookings";
  return "/";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("alex.rivera@cinelux.com");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState("customer");
  const [toastMessage, setToastMessage] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignIn = activeTab === "signin";

  const handleTabSwitch = (nextTab) => {
    setActiveTab(nextTab);
    setError("");
    setToastMessage(null);
    if (nextTab === "register") {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelectedRoleId(null);
    } else if (!email) {
      setEmail("alex.rivera@cinelux.com");
      setPassword("password123");
      setSelectedRoleId("customer");
    }
  };

  const handleDemoRoleFill = (roleItem) => {
    setActiveTab("signin");
    setEmail(roleItem.email);
    setPassword(roleItem.password);
    setSelectedRoleId(roleItem.id);
    setError("");
    setToastMessage({
      title: `Role applied — ${roleItem.label}`,
      tag: "SYSTEM",
    });
  };

  const handleForgotKey = () => {
    setError("");
    setToastMessage({
      title: "Demo passkey is password123, or pick a Fast Role below.",
      tag: "HINT",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    if (!isSignIn) {
      if (!fullName.trim()) {
        setError("Please enter your full name to create an account.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = isSignIn
        ? await login({ email: email.trim(), password, rememberMe })
        : await register({
            name: fullName.trim(),
            email: email.trim(),
            password,
            rememberMe,
          });

      const signedRole = response?.user?.role || "customer";
      const requestedPath = location.state?.from?.pathname;
      const canAccessRequested =
        requestedPath &&
        (!requestedPath.startsWith("/admin") ||
          signedRole === "admin" ||
          signedRole === "scanner");

      navigate(
        canAccessRequested ? requestedPath : getDefaultRouteForRole(signedRole),
        { replace: true },
      );
    } catch (err) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-[#F8FAFC] flex flex-col justify-between">
      {/* Header (FIX-01: guaranteed #0B0E14 dark viewport + high-contrast logo) */}
      <header className="w-full flex flex-col items-center justify-center py-8 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={brandClapperIcon}
            alt="CineLux logo"
            className="w-[23.33px] h-[18.67px] shrink-0"
          />
          <span className="font-['Plus_Jakarta_Sans',Inter,sans-serif] font-bold text-[28px] leading-[36px] tracking-[1.4px] uppercase text-[#F8FAFC]">
            CINE<span className="text-[#FFC174]">LUX</span>
          </span>
        </Link>
        <div className="pt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC174]" />
          <span className="font-mono font-medium text-[11px] leading-[14px] tracking-[1.1px] uppercase text-[#94A3B8]">
            AUDITORIUM ACCESS GATE
          </span>
        </div>
      </header>

      {/* Main Card */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-4 py-4">
        <div className="relative w-full max-w-[460px] flex flex-col gap-4">
          {/* Ambient warm glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-72 rounded-full bg-[#FFC174]/10 blur-[64px]"
          />

          <section className="relative w-full bg-[#151A23] rounded-[12px] p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_8px_10px_-6px_rgba(0,0,0,0.25)] border border-[#1E2638] overflow-hidden flex flex-col gap-4">
            {/* Top 4px amber accent gradient */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-60"
            />

            {/* Card Heading */}
            <div className="flex flex-col items-center pb-2 text-center">
              <div className="mb-2 w-12 h-12 rounded-[12px] bg-[#1E2436] shadow-inner flex items-center justify-center">
                <img
                  src={masksBadgeIcon}
                  alt=""
                  className="w-[25.67px] h-[23.33px]"
                />
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[20px] leading-[26px] tracking-[-0.5px] text-[#F8FAFC]">
                {isSignIn ? "Sign In to CineLux" : "Create CineLux Account"}
              </h1>
              <p className="mt-1 text-[12px] leading-[16px] text-[#94A3B8]">
                {isSignIn
                  ? "Sign in to manage bookings, held seats, and QR boarding passes"
                  : "Register to reserve seats, complete checkout, and store QR passes"}
              </p>
            </div>

            {/* Dual Sign In / Create Account Tabs */}
            <div
              role="tablist"
              aria-label="Authentication mode"
              className="w-full bg-[#0B0E14] p-1 rounded-[8px] flex items-center"
            >
              <button
                type="button"
                role="tab"
                aria-selected={isSignIn}
                onClick={() => handleTabSwitch("signin")}
                className={`flex-1 py-2 rounded-[4px] font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] transition cursor-pointer ${
                  isSignIn
                    ? "bg-[#1E2436] text-[#E1E2EB] shadow-sm"
                    : "text-[#94A3B8] hover:text-[#E1E2EB]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isSignIn}
                onClick={() => handleTabSwitch("register")}
                className={`flex-1 py-2 rounded-[4px] font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] transition cursor-pointer ${
                  !isSignIn
                    ? "bg-[#1E2436] text-[#E1E2EB] shadow-sm"
                    : "text-[#94A3B8] hover:text-[#E1E2EB]"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
              {!isSignIn && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="auth-full-name"
                    className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] text-[#F8FAFC]"
                  >
                    <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>Full Name</span>
                  </label>
                  <input
                    id="auth-full-name"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-[#0B0E14] text-[#E1E2EB] placeholder:text-slate-600 text-[14px] leading-[20px] px-4 py-2.5 rounded-[8px] border border-transparent focus:border-[#F59E0B]/60 focus:outline-none transition"
                  />
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-email"
                  className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] text-[#F8FAFC]"
                >
                  <img
                    src={atIcon}
                    alt=""
                    className="w-[13.33px] h-[13.33px] shrink-0"
                  />
                  <span>Email Address</span>
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedRoleId(null);
                  }}
                  placeholder="alex.rivera@cinelux.com"
                  className="w-full bg-[#0B0E14] text-[#E1E2EB] placeholder:text-slate-600 text-[14px] leading-[20px] px-4 py-2.5 rounded-[8px] border border-transparent focus:border-[#F59E0B]/60 focus:outline-none transition"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="auth-password"
                    className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] text-[#F8FAFC]"
                  >
                    <img
                      src={lockIcon}
                      alt=""
                      className="w-[10.67px] h-[14px] shrink-0"
                    />
                    <span>Password / Passkey</span>
                  </label>
                  {isSignIn && (
                    <button
                      type="button"
                      onClick={handleForgotKey}
                      className="text-[12px] leading-[16px] text-[#FFC174] hover:text-[#F59E0B] transition cursor-pointer"
                    >
                      Forgot key?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignIn ? "current-password" : "new-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0B0E14] text-[#E1E2EB] placeholder:text-slate-600 font-mono font-semibold text-[13px] leading-[16px] tracking-[0.65px] pl-4 pr-10 py-2.5 rounded-[8px] border border-transparent focus:border-[#F59E0B]/60 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 p-1 text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <img
                        src={eyeIcon}
                        alt=""
                        className="w-[16.5px] h-[11.25px]"
                      />
                    )}
                  </button>
                </div>
              </div>

              {!isSignIn && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="auth-confirm-password"
                    className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] text-[#F8FAFC]"
                  >
                    <img
                      src={lockIcon}
                      alt=""
                      className="w-[10.67px] h-[14px] shrink-0"
                    />
                    <span>Confirm Password</span>
                  </label>
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0B0E14] text-[#E1E2EB] placeholder:text-slate-600 font-mono font-semibold text-[13px] leading-[16px] tracking-[0.65px] px-4 py-2.5 rounded-[8px] border border-transparent focus:border-[#F59E0B]/60 focus:outline-none transition"
                  />
                </div>
              )}

              {/* Remember Me */}
              <label className="pt-1 flex items-center gap-2 cursor-pointer select-none">
                <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="w-4 h-4 rounded-[2.5px] border border-slate-700 bg-[#0B0E14] peer-checked:bg-[#F59E0B] peer-checked:border-[#F59E0B] flex items-center justify-center transition">
                    {rememberMe && (
                      <Check className="w-3 h-3 text-[#0B0E14] stroke-[3]" />
                    )}
                  </span>
                </span>
                <span className="text-[12px] leading-[16px] text-[#94A3B8]">
                  Remember this device • Preserve session token for 30 days
                </span>
              </label>

              {error && (
                <div
                  role="alert"
                  className="rounded-[8px] bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-[12px] text-rose-300"
                >
                  {error}
                </div>
              )}

              {/* Primary Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-[#0B0E14] font-['Plus_Jakarta_Sans',Inter,sans-serif] font-bold text-[16px] leading-[22px] py-3 rounded-[8px] shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>
                    {isSubmitting
                      ? isSignIn
                        ? "Signing In..."
                        : "Creating Account..."
                      : isSignIn
                        ? "Sign In to Account"
                        : "Create Account"}
                  </span>
                  <img
                    src={arrowRightIcon}
                    alt=""
                    className="w-[12px] h-[12px] shrink-0"
                  />
                </button>
              </div>
            </form>

            {/* Secondary Switch Prompt */}
            <div className="flex items-center justify-center gap-1.5 text-[12px] leading-[16px]">
              <span className="text-[#94A3B8]">
                {isSignIn ? "New to CineLux?" : "Already have an account?"}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleTabSwitch(isSignIn ? "register" : "signin")
                }
                className="font-bold text-[#FFC174] hover:text-[#F59E0B] transition cursor-pointer"
              >
                {isSignIn ? "Create Account" : "Sign In"}
              </button>
            </div>

            {/* Demo Fast Roles Divider */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 h-px bg-[#1D2026]" />
              <span className="font-mono font-medium text-[11px] leading-[14px] tracking-[1.1px] uppercase text-[#94A3B8]">
                DEMO FAST ROLES
              </span>
              <div className="flex-1 h-px bg-[#1D2026]" />
            </div>

            {/* 3 Demo Fast Roles Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              {DEMO_ROLES.map((roleItem) => {
                const isSelected = selectedRoleId === roleItem.id;
                return (
                  <button
                    key={roleItem.id}
                    type="button"
                    onClick={() => handleDemoRoleFill(roleItem)}
                    className={`w-full p-2.5 rounded-[8px] flex items-center justify-between text-left transition cursor-pointer border ${
                      isSelected
                        ? "bg-[#1E2436] border-[#F59E0B]/30"
                        : "bg-[#0B0E14] border-transparent hover:bg-[#181F30]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${roleItem.dotClass}`}
                      />
                      <div className="min-w-0">
                        <div className="font-['Plus_Jakarta_Sans',Inter,sans-serif] font-semibold text-[15px] leading-[22px] text-[#E1E2EB] truncate">
                          {roleItem.label}
                        </div>
                        <div className="font-mono font-medium text-[11px] leading-[14px] tracking-[0.44px] text-[#94A3B8] truncate">
                          {roleItem.email}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-[11px] leading-[14px] tracking-[0.44px] text-[#94A3B8] shrink-0 ml-2">
                      AUTO-FILL ↵
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Card Security Metadata */}
            <div className="pt-3 flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-1.5">
                <img
                  src={shieldLockIcon}
                  alt=""
                  className="w-[10.29px] h-[11.92px] shrink-0"
                />
                <span className="font-mono font-medium text-[11px] leading-[14px] tracking-[0.44px] text-[#94A3B8]">
                  SHA-256 HMAC • Session Handshake v2.4
                </span>
              </div>
              <p className="text-[11px] leading-[16.5px] text-[#94A3B8]/70">
                Academic Capstone Prototype • Multi-tier RBAC Enforcement Active
              </p>
            </div>
          </section>

          {/* Role Applied / Hint Toast */}
          {toastMessage && (
            <div
              role="status"
              className="w-full bg-[#1D2026] border border-[#1E2638] rounded-[8px] p-3 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={roleAppliedIcon}
                  alt=""
                  className="w-[15px] h-[15px] shrink-0"
                />
                <span className="text-[12px] leading-[16px] text-[#E1E2EB] truncate">
                  {toastMessage.title}
                </span>
              </div>
              <span className="font-mono font-medium text-[11px] leading-[14px] tracking-[0.55px] uppercase text-[#94A3B8] shrink-0 ml-2">
                {toastMessage.tag}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 flex flex-wrap items-center justify-center gap-3 text-[12px] leading-[16px] text-[#94A3B8]">
        <span className="flex items-center gap-2">
          <img
            src={footerShieldIcon}
            alt=""
            className="w-[9.33px] h-[11.67px] shrink-0"
          />
          <span>Encrypted Cinematic Identity Services</span>
        </span>
        <span className="text-[#32353C]">•</span>
        <span>© 2026 CineLux Multiplex Theatres. All rights reserved.</span>
      </footer>
    </div>
  );
}
