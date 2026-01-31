import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-white font-bold mb-3">Millionaire-GRE</h3>
          <p className="text-sm">
            Practice GRE with confidence and improve your scores.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/tests">Tests</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tests">Free Practice</Link></li>
            <li><Link href="/guide">GRE Guide</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">support@millionairegre.com</p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2026 Millionaire-GRE. All rights reserved.
      </div>
    </footer>
  );
}