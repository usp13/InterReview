import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaLock, FaCheck, FaTimes, FaCoins } from 'react-icons/fa';
import { BiAtom } from 'react-icons/bi';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import AuthModel from '../components/AuthModel.jsx';
import { SetUserData } from '../redux/userSlice.js';
import { backendUrl } from '../App.jsx';

function Pricing() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [showAuth, setShowAuth] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null); // { name, credits, price }
  const [checkoutStep, setCheckoutStep] = useState('none'); // 'none', 'form', 'loading', 'success'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'netbanking'
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successCredits, setSuccessCredits] = useState(0);

  const plans = [
    {
      name: 'Starter Pack',
      credits: 50,
      price: '₹299',
      priceRaw: 299,
      creditsRaw: 50,
      description: 'Perfect for quick practice before an upcoming interview.',
      features: [
        '5 full AI mock interviews (10 credits each)',
        'Adaptive follow-up questions',
        'Standard communication evaluation',
        'Email customer support',
      ],
      popular: false,
      color: 'from-slate-700 to-slate-800',
      glow: 'rgba(255,255,255,0.05)',
    },
    {
      name: 'Pro Pack',
      credits: 150,
      price: '₹799',
      priceRaw: 799,
      creditsRaw: 150,
      description: 'Best for active job seekers looking to sharpen their skills.',
      features: [
        '15 full AI mock interviews',
        'Advanced technical & HR adaptive modules',
        'Confidence & pacing evaluation',
        'Downloadable PDF performance reports',
        'Priority AI response processing',
        '24/7 priority customer support',
      ],
      popular: true,
      color: 'from-emerald-500/10 to-cyan-500/10',
      glow: 'rgba(16,185,129,0.15)',
    },
    {
      name: 'Elite Pack',
      credits: 400,
      price: '₹1,999',
      priceRaw: 1999,
      creditsRaw: 400,
      description: 'Designed for bootcamps, seniors, and long-term interview preparation.',
      features: [
        '40 full AI mock interviews',
        'Resume custom parsing questions',
        'Detailed communication & technical grading',
        'Unlimited PDF downloads & sharing links',
        'Early access to new interview models',
        'Dedicated customer success agent',
      ],
      popular: false,
      color: 'from-purple-950/20 to-indigo-950/20',
      glow: 'rgba(168,85,247,0.1)',
    },
  ];

  const handlePurchaseClick = (plan) => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    setSelectedPack(plan);
    setCheckoutStep('form');
    setErrorMsg('');
  };

  const handleSimulatePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (paymentMethod === 'card') {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        setErrorMsg('Please fill in all card details.');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setErrorMsg('Card number must be 16 digits.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g. user@upi).');
        return;
      }
    }

    setCheckoutStep('loading');

    // Simulate API call delay
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/purchase-credits`,
          { creditsAmount: selectedPack.creditsRaw },
          { withCredentials: true }
        );

        dispatch(SetUserData(response.data));
        setSuccessCredits(selectedPack.creditsRaw);
        setCheckoutStep('success');
      } catch (err) {
        console.error(err);
        setErrorMsg(err.response?.data?.message || 'Payment simulation failed. Please try again.');
        setCheckoutStep('form');
      }
    }, 2000);
  };

  const resetForm = () => {
    setCheckoutStep('none');
    setSelectedPack(null);
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setUpiId('');
    setErrorMsg('');
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#03070b] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.15),_transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.03)_0%,_transparent_50%,_rgba(255,255,255,0.02)_100%)]" />

      <Navbar />

      <div className="relative z-10 flex-1 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Pricing Plans designed for{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                your success
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-400"
            >
              Get credits to start customized, AI-powered mock interviews. Each session costs exactly 10 credits.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative flex flex-col justify-between rounded-[2rem] border ${
                  plan.popular ? 'border-emerald-500/40 bg-black/60 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'border-white/10 bg-black/40'
                } p-8 backdrop-blur-xl transition-all`}
                style={{
                  boxShadow: plan.popular ? `0 0 50px rgba(16, 185, 129, 0.15)` : `0 0 40px ${plan.glow}`,
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-white tracking-wide">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  </div>
                  
                  {/* Credits Counter badge */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-semibold text-emerald-400">
                    <FaCoins className="text-emerald-400" />
                    <span>{plan.credits} Interview Credits</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-400">{plan.description}</p>

                  <ul className="mt-6 space-y-3.5 border-t border-white/5 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                        <FaCheck className="mt-1 text-emerald-400 shrink-0" size={13} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <motion.button
                    onClick={() => handlePurchaseClick(plan)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full rounded-2xl py-3.5 font-bold transition ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/15 border border-white/10 shadow-sm'
                    }`}
                  >
                    Buy Pack
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <Footer />

      {/* Simulated Stripe/UPI Checkout Dialog Overlay */}
      <AnimatePresence>
        {checkoutStep !== 'none' && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#070b12] p-6 sm:p-8 shadow-[0_0_80px_rgba(16,185,129,0.18)] backdrop-blur-2xl"
            >
              {checkoutStep !== 'loading' && (
                <button
                  onClick={resetForm}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <FaTimes size={18} />
                </button>
              )}

              {/* Form Step */}
              {checkoutStep === 'form' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                      <FaCreditCard className="text-emerald-400" />
                      Simulated Checkout
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Complete payment for the <strong>{selectedPack?.name}</strong> ({selectedPack?.credits} Credits)
                    </p>
                  </div>

                  {/* Pricing Overview Row */}
                  <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                    <span className="text-sm text-slate-300 font-medium">Grand Total</span>
                    <span className="text-2xl font-extrabold text-white">{selectedPack?.price}</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex border-b border-white/10 pb-2">
                    {['card', 'upi'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => { setPaymentMethod(method); setErrorMsg(''); }}
                        className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 border-b-2 ${
                          paymentMethod === method
                            ? 'text-emerald-400 border-emerald-400'
                            : 'text-slate-500 border-transparent hover:text-slate-300'
                        }`}
                      >
                        {method === 'card' ? 'Credit Card' : 'UPI Payment'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSimulatePayment} className="space-y-4">
                    {paymentMethod === 'card' ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name on Card</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Number</label>
                          <input
                            type="text"
                            required
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={(e) => {
                              // format card number
                              const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                              const matches = val.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || '';
                              const parts = [];
                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }
                              setCardNumber(parts.length > 0 ? parts.join(' ') : val);
                            }}
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiry</label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                                if (val.length > 2) {
                                  val = val.substring(0, 2) + '/' + val.substring(2);
                                }
                                setCardExpiry(val);
                              }}
                              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CVV</label>
                            <input
                              type="password"
                              required
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">UPI ID</label>
                        <input
                          type="text"
                          required
                          placeholder="username@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                        />
                        <p className="text-[11px] text-slate-500">Payments can be simulated using any standard UPI handle format.</p>
                      </div>
                    )}

                    {errorMsg && (
                      <p className="text-xs font-medium text-amber-400 mt-2">{errorMsg}</p>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 font-bold text-slate-950 shadow-lg hover:opacity-95"
                    >
                      <FaLock size={14} className="text-slate-900" />
                      Simulate Successful Payment
                    </motion.button>
                  </form>
                </div>
              )}

              {/* Loading Step */}
              {checkoutStep === 'loading' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-12 w-12 rounded-full border-4 border-emerald-500 border-t-transparent"
                  />
                  <h3 className="text-lg font-semibold text-white">Verifying Transaction...</h3>
                  <p className="text-sm text-slate-400 text-center max-w-xs">
                    Simulating payment validation and secure credentials check via Sandbox environment.
                  </p>
                </div>
              )}

              {/* Success Step */}
              {checkoutStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
                  
                  {/* Confetti simulation using CSS Keyframes in SVG */}
                  <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <FaCheckCircle size={40} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
                    <p className="text-sm text-slate-300">
                      We've credited <strong className="text-emerald-400 font-semibold">{successCredits} Credits</strong> to your profile.
                    </p>
                    <p className="text-xs text-slate-400">
                      Your current credit balance: <strong className="text-white">{userData?.credits} Credits</strong>
                    </p>
                  </div>

                  <motion.button
                    onClick={resetForm}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 rounded-xl bg-white text-slate-950 px-8 py-2.5 font-bold shadow-md hover:bg-slate-50 transition"
                  >
                    Back to Platform
                  </motion.button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Pricing;