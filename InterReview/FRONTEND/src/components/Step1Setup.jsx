import React, { useState } from "react";
import { motion } from "motion/react";
import axios from 'axios' ; 
import { useNavigate } from "react-router-dom";
import {
  BsRobot,
} from "react-icons/bs";

import {
  FaBriefcase,
  FaFileDownload,
  FaFileUpload,
  FaUserTie,
  FaExclamationTriangle
} from 'react-icons/fa' ;

import { backendUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData } from "../redux/userSlice";


function Step1Setup({ onStart }) {

  const navigate = useNavigate();
  const [ role, setRole ] = useState("") ;
  const [ experience, setExperience ] = useState("") ;
  const [ mode , setMode ] = useState("technical" ) ; 
  
  const [ resumeFile, setresumeFile ] = useState(null) ;

  const [ loading, setLoading ] = useState(false) ;
  const [ projects, setProjects ] = useState([]) ;
  const [ skills, setSkills ] = useState([]) ;
  const [ resumeText, setresumeText ] = useState("") ;
  const [ analysisDone, setAnalysisDone ] = useState(false) ;
  const [ analyzing, setAnalyzing ] = useState(false) ;
  const [ errorText, setErrorText ] = useState("") ;

  const { userData } = useSelector((state) => state.user) ; 

  const dispatch = useDispatch() ; 

  // const backendUrl = 'http://localhost:8000'

  const handleUploadResume = async () => {
    
    if( !resumeFile || analyzing ) return ; 
    setAnalyzing(true) 

    const formadata = new FormData()
    formadata.append("resume" , resumeFile)

    try {
      const result = await axios.post( backendUrl + "/api/interview/resume" , formadata , { withCredentials:true})

      console.log( result.data )

      setRole( result.data.role || "") ; 
      setExperience( result.data.experience || "") ; 
      setProjects( result.data.projects || []) ;
      setSkills( result.data.skills || []) ; 
      setresumeText( result.data.resumeText || "") ; 
      setAnalysisDone(true)

      setAnalyzing(false)

    } catch (error) {
      console.log( error )
      setAnalyzing(false)
      
    }

  }


  const handleStart = async () => {
    setLoading(true);
    setErrorText("");
    try {
      
      const result = await axios.post( backendUrl + '/api/interview/generate-questions' , 
        { role , experience , mode , resumeText , projects , skills } 
        , {withCredentials: true} )

        console.log( result.data ) ; 


        if( userData){
          dispatch( SetUserData({...userData , credits: result.data.creditsLeft }))
        }

        setLoading(false) ; 
        onStart(result.data) ; 
   
      } catch (error) {
        console.log(error.response);
        console.log(error.response?.data);
        console.log(error.response?.status);
        setLoading(false);
        setErrorText(error.response?.data?.message || "Failed to generate questions. Please check your network and try again.");
      }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-hidden bg-[#05070b] text-slate-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.24),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.18),_transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05)_0%,_transparent_40%,_rgba(255,255,255,0.03)_100%)]" />

      {/* Floating Back to Home button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur hover:bg-white/10 transition group cursor-pointer shadow-md"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-400">
            <BsRobot size={12} />
          </div>
          <span>Back to Home</span>
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/75 shadow-[0_0_80px_rgba(16,185,129,0.14)] backdrop-blur-xl lg:grid lg:grid-cols-[1.05fr_0.95fr]">

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_45%),linear-gradient(135deg,_rgba(8,12,20,0.95),_rgba(4,8,14,0.96))] p-8 sm:p-10 lg:p-12"
          >
            <motion.div
              animate={{ x: [0, 24, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -34, 0], y: [0, 26, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl"
            />

            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0], y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-emerald-400/30 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-[0_0_35px_rgba(16,185,129,0.35)]"
            >
              <BsRobot size={38} />
            </motion.div>

            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              AI Powered Interview
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Configure Your
              <span className="mt-2 block text-emerald-400">Dream Interview</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-300 sm:text-lg">
              Simulate realistic HR and technical interviews with adaptive AI,
              resume-aware questions, confidence analysis, and detailed performance insights.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "🎯 Personalized Question Flow",
                "🎤 Real-Time Voice Interview",
                "📊 AI Performance Evaluation",
                "⚡ Adaptive Follow-up Questions",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur"
                >
                  <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
                  <span className="font-medium text-slate-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#06080d]/95 p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Step 01
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Interview Setup
              </h2>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Build your next interview experience with a polished dark UI.
              </p>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <FaUserTie className="absolute left-4 top-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Enter Role"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
              </div>

              <div className="relative">
                <FaBriefcase className="absolute left-4 top-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Enter Experience (e.g. 2-3 years)"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                />
              </div>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="technical">Technical Interview</option>
                <option value="hr">HR Interview</option>
              </select>

              {!analysisDone && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => document.getElementById("resumeUpload").click()}
                  className="cursor-pointer rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center transition hover:border-emerald-400 hover:bg-emerald-500/10"
                >
                  <FaFileUpload className="mx-auto mb-3 text-4xl text-emerald-400" />

                  <input
                    type="file"
                    accept="application/pdf"
                    id="resumeUpload"
                    className="hidden"
                    onChange={(e) => setresumeFile(e.target.files[0])}
                  />

                  <p className="font-medium text-slate-300">
                    {resumeFile ? resumeFile.name : "Click to upload resume (optional)."}
                  </p>

                  {resumeFile && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadResume();
                      }}
                      className="mt-4 rounded-xl bg-emerald-500 px-5 py-2 text-center font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </motion.button>
                  )}
                </motion.div>
              )}

              {analysisDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">Resume Analysis Result</h3>

                  {projects.length > 0 && (
                    <div>
                      <p className="mb-1 font-medium text-slate-200">Projects:</p>
                      <ul className="list-inside list-disc space-y-1 text-slate-400">
                        {projects.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.length > 0 && (
                    <div>
                      <p className="mb-1 font-medium text-slate-200">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                          <span key={i} className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <motion.button
                onClick={handleStart}
                disabled={!role || !experience || loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-lg font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.25)] transition duration-300 hover:from-emerald-400 hover:to-cyan-400 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-300"
              >
                {loading ? "Starting Interview ..." : "Start Interview"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Insufficient credits warning dialog */}
      {errorText && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c0f16] p-6 text-center shadow-[0_0_60px_rgba(239,68,68,0.14)]"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <FaExclamationTriangle size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              {errorText.toLowerCase().includes("credits") ? "Insufficient Credits" : "System Error"}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              {errorText.toLowerCase().includes("credits") 
                ? "You need at least 10 credits to start an AI mock interview session. Your current balance is insufficient."
                : errorText}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setErrorText("")}
                className="flex-1 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
              >
                Close
              </button>
              {errorText.toLowerCase().includes("credits") && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorText("");
                    navigate("/pricing");
                  }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-slate-950 shadow-md hover:opacity-90 transition"
                >
                  Buy Credits
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default Step1Setup;






