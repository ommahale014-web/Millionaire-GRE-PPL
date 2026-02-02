"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getPublishedTests } from "@/actions/student/test.actions";

import {
  BookOpen,
  Target,
  FileText,
  Clock,
  ArrowRight,
  Trophy,
  Users,
  Award,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const freeTestsRef = useRef(null);
  const [freeTests, setFreeTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTestClick = (testId) => {
    router.push(`/tests/${testId}/start`);
  };

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await getPublishedTests();
        if (response.success) {
          const testsWithMeta = response.data.map((test) => ({
            id: test.id,
            title: test.title,
            subtitle: "Practice Test",
            questions: 20,
            duration: "30 mins",
            difficulty: "Medium",
            icon: BookOpen,
          }));
          setFreeTests(testsWithMeta);
        } else {
          console.error("Failed to fetch tests:", response.error);
        }
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTests();
  }, []);

  return (
    <>
      <Navbar />

      <main className="text-gray-900 bg-sky-50">

        {/* HERO */}
        <section className="relative bg-gradient-to-b from-sky-50 to-white overflow-hidden pt-20 pb-28">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/80 to-transparent" />
          <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-blue-600 text-sm font-medium border border-blue-100 shadow-sm mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                #1 Rated GRE Practice Platform
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Master the GRE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  with Confidence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Join thousands of students achieving 320+ scores. Realistic practice tests, detailed analytics, and intelligent study tools.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() =>
                    freeTestsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Start Practice
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium px-4">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block perspective-1000">
              {/* 1. Main Question Card */}
              <div className="relative z-20 bg-white rounded-2xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">GRE® Verbal Practice</span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-1/3 bg-slate-100 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                    <div className="h-4 w-4/6 bg-slate-100 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="h-10 border border-slate-200 rounded-lg bg-slate-50"></div>
                    <div className="h-10 border-2 border-blue-600 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm">Correct Answer</div>
                    <div className="h-10 border border-slate-200 rounded-lg bg-slate-50"></div>
                    <div className="h-10 border border-slate-200 rounded-lg bg-slate-50"></div>
                  </div>
                </div>
              </div>

              {/* 2. Floating Success Badge */}
              <div className="absolute -right-8 top-12 z-30 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-[bounce_4s_infinite]">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Trophy className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Target Score</p>
                    <p className="text-lg font-bold text-slate-900">330+</p>
                  </div>
                </div>
              </div>

              {/* 4. Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-200 rounded-full blur-[80px] opacity-40 z-0 -translate-y-4 translate-x-4"></div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>

        {/* 2. FEATURES SECTION */}
        <section className="py-24 bg-sky-50">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Why Top Scorers Choose Us
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
              Optimized for performance, designed for results.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { title: "Real Exam Simulation", desc: "Adaptive testing engine that mimics the actual GRE algorithm.", icon: BookOpen },
              { title: "Deep Analytics", desc: "Identify weak spots with question-level performance breakdowns.", icon: Target },
              { title: "Proven Strategies", desc: "Learn time-management and solving techniques from experts.", icon: Trophy },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>


        {/* 3. FREE TESTS SECTION (Main CTA) */}
        <section
          id="free-tests"
          ref={freeTestsRef}
          className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white"
        >
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Start Now</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Free Practice Tests
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                No commitment required. Experience the quality of our questions instantly.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : freeTests.length === 0 ? (
              <div className="text-center p-12 bg-white/60 backdrop-blur rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500">No free tests currently available.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {freeTests.map((test) => {
                  const Icon = test.icon;
                  return (
                    <div
                      key={test.id}
                      onClick={() => handleTestClick(test.id)}
                      className="cursor-pointer group bg-white border border-slate-200 rounded-2xl p-8 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowRight className="w-6 h-6 text-indigo-600 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{test.title}</h3>
                            <p className="text-slate-500 text-sm">{test.subtitle}</p>
                          </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Free</span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-slate-100 pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{test.questions} Questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{test.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>


        {/* 4. ABOUT SECTION */}
        <section
          id="about"
          className="py-24 bg-sky-50"
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

            <div className="order-2 md:order-1 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
              {/* Abstract Gradient Background for 'About' image placeholder */}
              <div className="absolute inset-0 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10">
                <span className="text-9xl font-bold opacity-20">GRE</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <p className="text-white font-medium text-lg leading-snug">"Empowering students worldwide to achieve their academic dreams."</p>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                About MillionaireGRE
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  We are dedicated to democratizing GRE preparation. Our mission is to provide high-quality, accessible practice materials that help students maximize their potential and achieve their dream scores.
                </p>
                <p>
                  Founded by a team of educators and tech enthusiasts, MillionaireGRE combines pedagogical expertise with modern technology to create effectively structured practice tests that mirror the real exam experience.
                </p>
              </div>

              <div className="pt-4 flex gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-slate-500 flex items-center">
                  Trusted by 50,000+ Students
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="py-24 bg-sky-50 relative">
          {/* Section Background Decoration to make it pop */}
          <div className="absolute inset-0 bg-blue-50/50"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Get Connected</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                Contact Our Team
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Email Card */}
              <div className="bg-white rounded-2xl p-8 border border-blue-100 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
                <p className="text-slate-500 text-sm mb-4">Response within 24 hours</p>
                <a href="mailto:support@millionairegre.com" className="text-blue-600 font-semibold hover:underline">
                  support@millionairegre.com
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-8 border border-blue-100 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Phone Support</h3>
                <p className="text-slate-500 text-sm mb-4">Mon-Fri, 9am-6pm IST</p>
                <a href="tel:+919876543210" className="text-indigo-600 font-semibold hover:underline">
                  +91 987 654 3210
                </a>
              </div>

              {/* Instagram Card */}
              <div className="bg-white rounded-2xl p-8 border border-blue-100 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Instagram</h3>
                <p className="text-slate-500 text-sm mb-4">Daily Tips & Updates</p>
                <a href="https://instagram.com/millionairegre" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold hover:underline">
                  @millionairegre
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>

        {/* 6. STATS SECTION (Bottom) */}
        <section className="bg-sky-50/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Students", value: "50K+", icon: Users },
                { label: "Practice Tests", value: "500+", icon: FileText },
                { label: "Avg Score", value: "320+", icon: Award },
                { label: "Success Rate", value: "98%", icon: CheckCircle },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-4 group hover:-translate-y-1 transition-transform">
                  <div className="mb-3 p-3 bg-white rounded-2xl shadow-sm group-hover:bg-blue-600 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
