import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { backendUrl } from '../App';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';
import loginHero from '../assets/login-hero.jpg';

function Auth({ isModel = false, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoogleAuth = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    setAuthMessage('');
    setIsSuccess(false);

    try {
      const response = await signInWithPopup(auth, provider);
      const userObj = response.user;
      const displayName = userObj.displayName;
      const userEmail = userObj.email;

      const result = await axios.post(
        `${backendUrl}/api/auth/google`,
        { name: displayName, email: userEmail },
        { withCredentials: true }
      );

      setIsSuccess(true);
      setTimeout(() => {
        dispatch(SetUserData(result.data.user));
        if (typeof onClose === 'function') onClose();
        navigate('/', { replace: true });
      }, 800);
    } catch (error) {
      console.error('Google Auth Error:', error);
      dispatch(SetUserData(null));
      setAuthMessage(error.response?.data?.message || 'Google authentication was interrupted. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (isSigningIn) return;

    if (!email || !password || (isSignUp && !name)) {
      setAuthMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setAuthMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSigningIn(true);
    setAuthMessage('');
    setIsSuccess(false);

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignUp ? { name, email, password } : { email, password };

      const result = await axios.post(
        `${backendUrl}${endpoint}`,
        payload,
        { withCredentials: true }
      );

      setIsSuccess(true);
      setTimeout(() => {
        dispatch(SetUserData(result.data.user));
        if (typeof onClose === 'function') onClose();
        navigate('/', { replace: true });
      }, 800);
    } catch (error) {
      console.error('Email Auth Error:', error);
      setAuthMessage(error.response?.data?.message || 'An error occurred. Please verify your credentials.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center ${
        isModel
          ? 'py-2'
          : 'min-h-screen bg-[#03070b] px-4 py-10 sm:px-6 lg:px-8'
      }`}
    >
      {!isModel && (
        <>
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-[80px]"
          />
          <motion.div
            animate={{ x: [0, -90, 0], y: [0, 60, 0], scale: [1.1, 0.95, 1.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full ${
          isModel ? 'max-w-md rounded-2xl' : 'max-w-4xl rounded-3xl'
        } border border-white/10 bg-[#060a12]/85 shadow-[0_0_80px_rgba(16,185,129,0.08)] backdrop-blur-2xl overflow-hidden`}
      >
        <div className={`grid ${isModel ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Form Column */}
          <div className="p-6 sm:p-10 flex flex-col justify-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0], y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-2.5 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <FaBrain size={24} />
              </motion.div>
              <h2 className="text-xs font-bold text-emerald-400 tracking-widest uppercase">InterReview</h2>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-slate-400 px-4">
                {isSignUp
                  ? 'Start practicing realistic AI mock interviews today.'
                  : 'Sign in to access your dashboard and continue practicing.'}
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="flex rounded-lg bg-white/5 p-1 border border-white/5">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setAuthMessage('');
                  setShowPassword(false);
                }}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all duration-300 ${
                  !isSignUp ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setAuthMessage('');
                  setShowPassword(false);
                }}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all duration-300 ${
                  isSignUp ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                        <FaUser size={14} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <FaEnvelope size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <FaLock size={14} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={isSignUp ? "min 6 characters" : "••••••••"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {authMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-amber-400 font-medium text-center"
                >
                  {authMessage}
                </motion.p>
              )}

              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-400 font-medium text-center"
                >
                  Success! Logging you in...
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isSigningIn}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 transition mt-2"
              >
                {isSigningIn ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0e17] px-3 py-1 text-slate-500 rounded-full border border-white/5 font-semibold tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <motion.button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSigningIn}
              whileHover={{ scale: isSigningIn ? 1 : 1.01 }}
              whileTap={{ scale: isSigningIn ? 1 : 0.99 }}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </motion.button>

            {!isModel && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-[11px] italic text-slate-500 mt-2"
              >
                "Every expert was once a beginner. Start your next interview with confidence."
              </motion.p>
            )}
          </div>

          {/* Visual Column */}
          {!isModel && (
            <div className="relative hidden md:block bg-slate-950 border-l border-white/10 overflow-hidden">
              <img
                src={loginHero}
                alt="AI Interview Dashboard Illustration"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.75] opacity-90 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                <p className="text-lg font-bold tracking-wide bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered Assessment
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Conduct realistic mock coding, technical Q&A, and HR behavior reviews with detailed feedback.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;