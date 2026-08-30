import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillDashCircleFill, BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaCoins, FaUser, FaHistory, FaSignOutAlt, FaCreditCard, FaTimes, FaRobot } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App";
import { SetUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeMenus = () => {
    setShowCreditPopup(false);
    setShowUserPopup(false);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setFeedbackMessage("");
    closeMenus();

    try {
      await axios.get(backendUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(SetUserData(null));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setFeedbackMessage("Logout hit a snag. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative z-50 flex justify-center px-4 pt-6 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-6"
      >
        {/* Brand logo & name */}
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-colors duration-300">
            <FaRobot size={20} className="text-emerald-400 group-hover:text-cyan-400 transition-colors duration-300" />
          </div>

          <h1 className="text-lg font-bold tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-300 sm:text-xl">
            InterReview
          </h1>
        </div>

        {/* Mid Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <button
            onClick={() => navigate("/")}
            className="hover:text-white transition-colors cursor-pointer relative py-1"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              if (!userData) {
                setShowAuth(true);
                return;
              }
              navigate("/history");
            }}
            className="hover:text-white transition-colors cursor-pointer relative py-1"
          >
            History
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="hover:text-white transition-colors cursor-pointer relative py-1"
          >
            Pricing
          </button>
        </div>

        {/* Profile & Credits Controls */}
        <div className="flex items-center gap-3">
          {/* Credits Counter badge */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  closeMenus();
                  setShowAuth(true);
                  return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/10 sm:px-4"
            >
              <FaCoins className="text-emerald-400" />
              <span>{userData ? userData.credits : 100} Credits</span>
            </button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-[#06080d] p-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credits Status</span>
                    <button onClick={() => setShowCreditPopup(false)} className="text-slate-500 hover:text-white">
                      <FaTimes size={12} />
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400 mb-4">
                    Each AI mock interview costs exactly 10 credits. Top up your balance to keep practicing.
                  </p>
                  <button
                    onClick={() => {
                      setShowCreditPopup(false);
                      navigate("/pricing");
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-xs font-bold text-slate-950 transition hover:opacity-90 shadow-md"
                  >
                    Buy More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            {userData ? (
              <button
                onClick={() => {
                  setShowUserPopup(!showUserPopup);
                  setShowCreditPopup(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-bold text-white transition hover:border-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
              >
                {userData.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => {
                  closeMenus();
                  setShowAuth(true);
                }}
                className="rounded-xl bg-white px-4 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100 cursor-pointer"
              >
                Sign In
              </button>
            )}

            <AnimatePresence>
              {showUserPopup && userData && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 z-50 mt-3 w-60 rounded-2xl border border-white/10 bg-[#06080d] p-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                  <div className="border-b border-white/10 pb-3 mb-3">
                    <p className="text-sm font-bold text-white truncate">{userData.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{userData.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserPopup(false);
                      navigate("/history");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs font-semibold text-slate-300 transition hover:bg-white/5"
                  >
                    <FaHistory className="text-slate-400" />
                    <span>Interview History</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserPopup(false);
                      navigate("/pricing");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs font-semibold text-slate-300 transition hover:bg-white/5"
                  >
                    <FaCreditCard className="text-slate-400" />
                    <span>Pricing Plans</span>
                  </button>

                  {feedbackMessage && (
                    <p className="mt-2 text-center text-[10px] text-amber-400">{feedbackMessage}</p>
                  )}

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="mt-2 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs font-semibold text-red-400 transition hover:bg-red-500/10 cursor-pointer"
                  >
                    <FaSignOutAlt />
                    <span>{isLoggingOut ? "Signing out..." : "Logout"}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Navbar;