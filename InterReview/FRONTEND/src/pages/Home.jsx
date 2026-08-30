import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaChevronDown,
  FaChevronUp,
  FaRobot,
  FaMicrophone,
  FaClock,
  FaRegFilePdf,
  FaBriefcase,
  FaCode,
  FaSmile,
  FaCoins,
  FaPlay,
  FaStar,
} from 'react-icons/fa';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import AuthModel from '../components/AuthModel.jsx';

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  // Active FAQ index state
  const [activeFaq, setActiveFaq] = useState(null);

  // Demo panel animation states
  const [demoState, setDemoState] = useState(0); // 0: question, 1: typing answer, 2: grading, 3: completed
  const [demoAnswerText, setDemoAnswerText] = useState('');

  const fullAnswer = 'To clean up resources, return a function from the useEffect hook. It executes before unmounting...';

  useEffect(() => {
    let timer;
    if (demoState === 0) {
      setDemoAnswerText('');
      timer = setTimeout(() => setDemoState(1), 2000);
    } else if (demoState === 1) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullAnswer.length) {
          setDemoAnswerText((prev) => prev + fullAnswer.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setDemoState(2);
        }
      }, 40);
      return () => clearInterval(interval);
    } else if (demoState === 2) {
      timer = setTimeout(() => setDemoState(3), 2000);
    } else if (demoState === 3) {
      timer = setTimeout(() => setDemoState(0), 4000);
    }
    return () => clearTimeout(timer);
  }, [demoState]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does the AI evaluate my interview responses?',
      a: 'Our AI processes your transcript and compares it with software engineering best practices, matching your target job role and experience. It grades your technical accuracy, communication clarity, and pacing.',
    },
    {
      q: 'How many credits does a mock interview session require?',
      a: 'Each 5-question role-specific mock interview session costs exactly 10 credits. You can purchase additional packs on our Pricing page starting at just $4.99.',
    },
    {
      q: 'Do I get free credits when I register?',
      a: 'Yes! Every new user receives 100 free interview credits upon registration, allowing you to practice up to 10 mock interviews absolutely free.',
    },
    {
      q: 'Can I export my grading report as a PDF?',
      a: 'Absolutely. Upon finishing your interview, a comprehensive analysis dashboard is compiled. You can export this report as a PDF file to share with mentors or track offline.',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#03070b] text-slate-100">
      {/* Background neon glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.15),_transparent_32%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.03)_0%,_transparent_50%,_rgba(255,255,255,0.02)_100%)] pointer-events-none" />

      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 flex-1">
        
        {/* 1. Cinematic Hero Section */}
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-2 text-sm font-semibold text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)] backdrop-blur">
                <span>AI-Powered Next-Gen Interview Coach</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Master your next technical{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                  mock interview
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Practice tailored, role-specific technical and behavioral mock sessions with real-time speech analytics, adaptive AI follow-up questions, and instant grading.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate('/interview');
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 font-bold text-slate-950 shadow-md cursor-pointer"
                >
                  Start Interview Session
                </motion.button>
                <motion.button
                  onClick={() => navigate('/pricing')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-bold text-white hover:bg-white/10 transition cursor-pointer"
                >
                  Explore Pricing Plans
                </motion.button>
              </div>
            </div>

            {/* Hero Right: Live Animated AI Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl border border-white/10 bg-black/60 p-6 shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl overflow-hidden"
              >
                {/* Simulator Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full bg-red-500/40 border border-red-500/20" />
                    <span className="h-3.5 w-3.5 rounded-full bg-amber-500/40 border border-amber-500/20" />
                    <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/40 border border-emerald-500/20" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Simulator active</span>
                </div>

                {/* Simulated Interview Panel */}
                <div className="space-y-4 min-h-[220px]">
                  
                  {/* AI Question */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <FaRobot size={14} />
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/5 p-3.5 text-xs text-slate-200">
                      <p className="font-semibold text-emerald-400 mb-1">AI Interviewer</p>
                      <p>How does the resource cleanup work inside the React useEffect hook?</p>
                    </div>
                  </div>

                  {/* Candidate Typing Animation */}
                  {demoState >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-end"
                    >
                      <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-xs text-slate-200 max-w-[80%]">
                        <p className="font-semibold text-cyan-400 text-right mb-1">You (Candidate)</p>
                        <p className="italic">{demoAnswerText || 'Typing response...'}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* AI Grading Spinner */}
                  {demoState === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 justify-center text-xs text-slate-400 py-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-4.5 w-4.5 rounded-full border-2 border-emerald-400 border-t-transparent"
                      />
                      <span>AI evaluates your communication & accuracy...</span>
                    </motion.div>
                  )}

                  {/* Grading Result */}
                  {demoState === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center space-y-2"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Grading Successful</p>
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <p className="text-slate-500 font-bold">ACCURACY</p>
                          <p className="text-emerald-400 font-extrabold text-sm mt-0.5">94%</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <p className="text-slate-500 font-bold">PACING</p>
                          <p className="text-emerald-400 font-extrabold text-sm mt-0.5">Good</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <p className="text-slate-500 font-bold">CONFIDENCE</p>
                          <p className="text-cyan-400 font-extrabold text-sm mt-0.5">High</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            </div>

          </div>
        </div>



        {/* 3. Steps to Get Started */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-wider text-slate-500 uppercase">How It Works</h2>
            <p className="text-3xl font-extrabold text-white mt-1">Practice in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <FaBriefcase size={22} />,
                step: 'Step 01',
                title: 'Set Target Role',
                desc: 'Upload a resume or select parameters like software developer, QA engineer, or HR manager.'
              },
              {
                icon: <FaMicrophone size={22} />,
                step: 'Step 02',
                title: 'Start Voice Simulation',
                desc: 'Answer five live questions generated in real-time. Speeches are recorded and transcribed.'
              },
              {
                icon: <FaRegFilePdf size={22} />,
                step: 'Step 03',
                title: 'Receive Grade Report',
                desc: 'Get granular metrics, pacing corrections, confidence evaluations, and downloadable reports.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl border border-white/10 bg-black/40 p-6 shadow-md"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Advanced AI Capabilities (Features Grid) */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-wider text-slate-500 uppercase">Core Features</h2>
            <p className="text-3xl font-extrabold text-white mt-1">Supercharge your interview preparation</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: <FaCode size={20} />,
                title: 'Technical Interview Mode',
                desc: 'Solve database schema layouts, algorithms, frameworks, and system design problems in depth.'
              },
              {
                icon: <FaRobot size={20} />,
                title: 'HR Behavioral Mode',
                desc: 'Answer tough behavioral, situational, and conflict resolution scenarios with structured grading.'
              },
              {
                icon: <FaSmile size={20} />,
                title: 'Confidence & Voice Detection',
                desc: 'Grades vocal clarity, pauses, speaking velocity, filler words, and vocal delivery confidence.'
              },
              {
                icon: <FaCoins size={20} />,
                title: 'Flexible Credits System',
                desc: 'Choose how you top up. Earn mock points or replenish immediately with pricing packages.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-6 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 shrink-0 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. FAQs Section (Accordion) */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-wider text-slate-500 uppercase">Got Questions?</h2>
            <p className="text-3xl font-extrabold text-white mt-1">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <FaChevronUp className="text-emerald-400" /> : <FaChevronDown className="text-slate-400" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <p className="p-5 text-sm leading-relaxed text-slate-400">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <Footer />

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Home;