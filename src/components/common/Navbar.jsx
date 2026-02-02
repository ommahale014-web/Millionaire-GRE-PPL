import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-50/80 backdrop-blur-md border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif transform -rotate-6">M</span>
          MillionaireGRE
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 mx-auto">
          <Link onClick={() => {
            const section = document.getElementById("free-tests");
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
            href="/#free-tests"
            className="hover:text-blue-600 transition-colors">
            Tests
          </Link>

          <Link onClick={() => {
            const section = document.getElementById("about");
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
            href="/#about"
            className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/guide" className="hover:text-blue-600 transition-colors">
            Guide
          </Link>

          <Link onClick={() => {
            const section = document.getElementById("contact");
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
            href="/#contact"
            className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/admin/login"
          className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Admin Login
        </Link>

      </div>
    </nav >
  );
}
