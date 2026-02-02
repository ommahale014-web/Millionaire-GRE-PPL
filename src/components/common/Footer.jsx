import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100 py-12 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-white font-bold mb-3 text-lg">Millionaire-GRE</h3>
          <p className="text-sm text-blue-200 leading-relaxed">
            Practice GRE with confidence and improve your scores with our premium platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/#free-tests" className="hover:text-white transition-colors">Tests</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link href="/#free-tests" className="hover:text-white transition-colors">Free Practice</Link></li>
            <li><Link href="/guide" className="hover:text-white transition-colors">GRE Guide</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-blue-200">support@millionairegre.com</p>
        </div>

      </div>

      <div className="text-center text-xs text-blue-400 mt-10 border-t border-blue-900/50 pt-8">
        © 2026 Millionaire-GRE. All rights reserved.
      </div>
    </footer>
  );
}