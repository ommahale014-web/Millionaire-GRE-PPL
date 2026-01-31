import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

// export default function HomePage() {
//   return (
//     <>
    
//     <div>Home Page</div>
//     </>
//   )
// }

import Link from "next/link";

export default function HomePage() {
  return (
    <>
    <main className="text-gray-900">
      <Navbar/>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:justify-between py-20">
          
          {/* TEXT */}
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Achieve Your Best <span className="text-yellow-300">GRE Score</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Practice GRE-style questions, take mock tests, track progress and improve your scores.
            </p>
            <Link
              href="/tests"
              className="inline-block bg-yellow-300 text-indigo-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-400 transition"
            >
              Start Free Test
            </Link>
          </div>

          

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-4xl font-bold text-indigo-600">10,000+</h3>
            <p className="mt-2 text-gray-600">Practice Questions</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-4xl font-bold text-indigo-600">95%</h3>
            <p className="mt-2 text-gray-600">Student Satisfaction</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-4xl font-bold text-indigo-600">320+</h3>
            <p className="mt-2 text-gray-600">Avg. Expected GRE</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-800">
            What We Offer
          </h2>
          <p className="text-gray-600 mt-2">
            Everything you need to prepare for the GRE confidently.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* FEATURE CARD */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            
            <h4 className="font-semibold text-lg">Full-Length Tests</h4>
            <p className="text-gray-600 mt-1">Real timed practice</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            
            <h4 className="font-semibold text-lg">Topic Practice</h4>
            <p className="text-gray-600 mt-1">Focus & improve weak areas</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            
            <h4 className="font-semibold text-lg">Detailed Analytics</h4>
            <p className="text-gray-600 mt-1">Track progress visually</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
    
            <h4 className="font-semibold text-lg">GRE Style</h4>
            <p className="text-gray-600 mt-1">Authentic difficulty</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-800">How It Works</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <Link href="/signup">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl cursor-pointer transition">
    
              <h3 className="font-bold text-xl">Register</h3>
              <p className="text-gray-600 mt-2">Create your free account</p>
            </div>
          </Link>

          <Link href="/tests">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl cursor-pointer transition">
              
              <h3 className="font-bold text-xl">Take Test</h3>
              <p className="text-gray-600 mt-2">Practice GRE tests</p>
            </div>
          </Link>

          <Link href="/student/result">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl cursor-pointer transition">
              
              <h3 className="font-bold text-xl">Get Score</h3>
              <p className="text-gray-600 mt-2">Instant performance report</p>
            </div>
          </Link>

        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
