"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAdminLogin } from "@/actions/admin_B/auth.actions";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    setLoading(true);
    setError("");

    const { success, message } = await handleAdminLogin(email, password);

    if (!success) {
      setError(message);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white relative overflow-hidden px-4">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>

      <main className="w-full max-w-sm relative z-10">
        <div className="bg-indigo-50/90 backdrop-blur-md rounded-xl shadow-lg border border-indigo-200 p-6">

          <div className="text-center mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-blue-200">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Admin Portal
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Secure login for Millionaire GRE admins
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide ml-1">Email Address</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white/70 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide ml-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white/70 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="mt-3 p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs text-center flex items-center justify-center gap-2 font-medium">
              <span>⚠️ {error}</span>
            </div>
          )}

          <button
            onClick={handleLoginClick}
            disabled={loading}
            className="w-full mt-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Access Dashboard
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <footer className="py-6 text-center text-xs text-slate-500">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Millionaire GRE • Restricted Access
        </footer>
      </main>
    </div>
  );
}
