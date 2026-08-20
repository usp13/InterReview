import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { RiAiGenerate } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { backendUrl } from '../App';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';

function Auth({ isModel = false, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          isModel ? 'max-w-md rounded-2xl p-6 sm:p-8' : 'max-w-xl rounded-3xl p-8 sm:p-12'
        } border border-white/10 bg-black/60 shadow-[0_0_80px_rgba(16,185,129,0.08)] backdrop-blur-2xl`}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0], y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-3 text-white shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          >
            <FaBrain size={isModel ? 24 : 28} />
          </motion.div>
          <h2 className="mt-3 text-lg font-bold text-white tracking-wide">InterReview</h2>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isSignUp
              ? 'Start practicing realistic AI mock interviews today.'
              : 'Sign in to access your dashboard and continue practicing.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="mt-6 flex rounded-xl bg-white/5 p-1 border border-white/5">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setAuthMessage('');
            }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-300 ${
              !isSignUp ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setAuthMessage('');
            }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-300 ${
              isSignUp ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaUser size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
              <FaEnvelope size={16} />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
              <FaLock size={16} />
            </div>
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {authMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-amber-400 font-medium"
            >
              {authMessage}
            </motion.p>
          )}

          {isSuccess && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-emerald-400 font-medium"
            >
              Success! Logging you in...
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isSigningIn}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 text-sm font-semibold text-slate-950 shadow-lg hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 transition"
          >
            {isSigningIn ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0b0f19] px-3 py-1 text-slate-500 rounded-full border border-white/5 font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <motion.button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isSigningIn}
          whileHover={{ scale: isSigningIn ? 1 : 1.02 }}
          whileTap={{ scale: isSigningIn ? 1 : 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white py-3 font-semibold text-slate-900 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FcGoogle size={20} />
          <span>Google</span>
        </motion.button>

        {!isModel && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-xs italic text-slate-500"
          >
            "Every expert was once a beginner. Start your next interview with confidence."
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Auth;