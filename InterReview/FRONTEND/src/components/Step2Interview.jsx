import React, { useEffect } from 'react' ; 
import malevideo from '../assets/Videos/male-ai.mp4'
import femalevideo from '../assets/Videos/FemaleAI.mp4'
import Timer from './Timer';
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash, FaRobot } from 'react-icons/fa';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios' ;
import { backendUrl } from '../App';
import { BsArrowBarRight } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";



function Step2Interview( {interviewData , onFinish }) {

  const navigate = useNavigate();

  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setisIntroPhase] = useState(true);
  const [isMicOn, setisMicOn] = useState(true);
  const [isAIPlaying, setisAIPlaying] = useState(true);

  const [currentIndex, setcurrentIndex] = useState(0);
  const [answer, setanswer] = useState("");
  const [feedback, setfeetback] = useState("");

  // const [timeLeft, settimeLeft] = useState(
  //   questions[0]?.timeLeft || 60
  // );

  const [timeLeft, settimeLeft] = useState(
    questions[0]?.timeLimit ?? 60
);


  const [selectVoice, setselectVoice] = useState(null);
  const [voiceGender, setvoiceGender] = useState("male");
  const [subtitle, setsubtitle] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  const isAIPlayingRef = useRef(true);
  const isMicOnRef = useRef(true);
  const isSubmittingRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex + 1 >= questions.length;

  const videosource =
    voiceGender === "male" ? malevideo : femalevideo;




    useEffect(() => {
      isAIPlayingRef.current = isAIPlaying;
    }, [isAIPlaying]);

    useEffect(() => {
      isMicOnRef.current = isMicOn;
    }, [isMicOn]);

    useEffect(() => {
      isSubmittingRef.current = isSubmitting;
    }, [isSubmitting]);




  /* ----------------------- Load Voices ----------------------- */

  useEffect(() => {

    const loadVoices = () => {

      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setselectVoice(femaleVoice);
        setvoiceGender("female");
        return;
      }

      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setselectVoice(maleVoice);
        setvoiceGender("male");
        return;
      }

      setselectVoice(voices[0]);
      setvoiceGender("male");
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };

  }, []);

  /* ----------------------- Reset Timer ----------------------- */


    useEffect(() => {
    if (currentQuestion) {
      settimeLeft(currentQuestion.timeLimit ?? 60);
    }
  }, [currentQuestion]);

  // useEffect(() => {

  //   if (currentQuestion) {
  //     settimeLeft( currentQuestion.timeLeft );
  //   }

  // }, [currentQuestion]);

  /* ----------------------- Mic ----------------------- */

  const startMic = () => {

    if (!recognitionRef.current) return;
    if (isAIPlaying) return;

    try {
      recognitionRef.current.start();
    } catch (err) {
      // ignore "already started"
      
    }
  };

  const stopMic = () => {

    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
    } catch {}
  };

  const toggleMic = () => {
    const nextState = !isMicOn;
    isMicOnRef.current = nextState;
    setisMicOn(nextState);

    if (nextState) {
      startMic();
    } else {
      stopMic();
    }
  };

  /* ----------------------- Speak ----------------------- */

 const speakText = (text) => {

  return new Promise((resolve) => {

    if (!window.speechSynthesis || !selectVoice) {
      resolve();
      return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    const humanText = text
      .replace(/,/g, ", ...")
      .replace(/\./g, ". ...");

    const utterance = new SpeechSynthesisUtterance(humanText);

    utterance.voice = selectVoice;
    utterance.rate = 1.1;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    utterance.onstart = () => {

      setisAIPlaying(true);

      stopMic();

      videoRef.current?.play();

      setsubtitle(text);
    };

    utterance.onend = () => {

      videoRef.current?.pause();

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }

      // AI finished speaking
      setisAIPlaying(false);

      setTimeout(() => {

        setsubtitle("");

        resolve();

      }, 300);
    };

    utterance.onerror = () => {

      setisAIPlaying(false);

      resolve();
    };

    window.speechSynthesis.speak(utterance);

  });

};

  /* ----------------------- Intro & Questions ----------------------- */

  useEffect(() => {

  if (!selectVoice) return;

  let cancelled = false;

  const runInterview = async () => {

    if (cancelled) return;

    if (isIntroPhase) {

      await speakText(
        `Hi ${userName}, it's great to meet you today. I hope you are feeling confident about the interview.`
      );

      if (cancelled) return;

      await speakText(
        "I will ask you a few questions. Just answer naturally and take your time. So, let's begin."
      );

      if (cancelled) return;

      setisIntroPhase(false);
      return;
    }

    if (!currentQuestion) return;

    await new Promise((r) => setTimeout(r, 800));

    if (cancelled) return;

    if (currentIndex === questions.length - 1) {
      await speakText(
        "Alright, this one might be a bit more challenging."
      );

      if (cancelled) return;
    }

    await speakText(currentQuestion.question);

    if (cancelled) return;

    // Start listening ONLY after the question has completely finished
    if (isMicOn) {
      startMic();
    }
  };

  runInterview();

  return () => {
    cancelled = true;
  };

}, [
  selectVoice,
  isIntroPhase,
  currentIndex,
]);

  /* ----------------------- Timer ----------------------- */




          useEffect(() => {

          if (isIntroPhase) return;
          if (!currentQuestion) return;
          if (isSubmitting) return;
          if (isAIPlaying) return;

          const timer = setInterval(() => {

            settimeLeft(prev => {

              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }

              return prev - 1;
            });

          }, 1000);

          return () => clearInterval(timer);

        }, [
          isIntroPhase,
          currentQuestion,
          isSubmitting,
          isAIPlaying
        ]);




  // useEffect(() => {

  //   if (isIntroPhase) return;
  //   if (!currentQuestion) return;
  //   if (isSubmitting) return;

  //   const timer = setInterval(() => {

  //     settimeLeft((prev) => {

  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         return 0;
  //       }

  //       return prev - 1;

  //     });

  //   }, 1000);

  //   return () => clearInterval(timer);

  // }, [
  //   isIntroPhase,
  //   currentQuestion,
  //   isSubmitting,
  // ]);


    /* ----------------------- Speech Recognition ----------------------- */

    useEffect(() => {

  if (!("webkitSpeechRecognition" in window)) return;

  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {

    // Ignore anything while AI is speaking
    if (isAIPlayingRef.current) return;

    const transcript =
      event.results[event.results.length - 1][0].transcript;

    setanswer(prev =>
      prev ? prev + " " + transcript : transcript
    );
  };

  recognition.onend = () => {

    // Restart only if mic is ON, AI is NOT speaking, and NOT submitting
    if (
      isMicOnRef.current &&
      !isAIPlayingRef.current &&
      !isSubmittingRef.current
    ) {
      try {
        recognition.start();
      } catch(error) {
        console.log(error)
      }
    }
  };

  recognition.onerror = (event) => {
    console.log("Speech Recognition:", event.error);
  };

  recognitionRef.current = recognition;

  return () => {
    recognition.stop();
    recognition.abort();
  };

}, []);


  /* ----------------------- Submit Answer ----------------------- */

  const submitAnswer = async () => {
    
    if( isSubmitting ) return  ;
    stopMic() ; 
    setisSubmitting(true) ; 

    try {
      
      const result = await axios.post( backendUrl + '/api/interview/submit-answer' , {
        interviewId , 
        questionIndex: currentIndex , 
        answer , 
        timeTaken : currentQuestion.timeLimit - timeLeft 
      }, {withCredentials: true })


      // setfeetback(result.data.feedback) ; 

      // speakText( result.data.feedback ) ; 

      // setisSubmitting( false ) ; 


      setfeetback(result.data.feedback);

      await speakText(result.data.feedback);

      setisSubmitting(false);


    } catch (error) {
      
      console.log( error)
      setisSubmitting( false ) ; 

    }
  }
  


  /* ----------------------- Finish Interview ----------------------- */



      const finishInterview = async () => {

        stopMic();
        setisMicOn(false);

        window.speechSynthesis.cancel();

        try {

            await axios.post(
                backendUrl + "/api/interview/finish",
                {
                    interviewId,
                },
                {
                    withCredentials: true,
                }
            );

            navigate("/report/" + interviewId);

        } catch (error) {

            console.log(error);

        }
    };

    
 

  /* ----------------------- Auto Submit ----------------------- */

  useEffect(() => {

    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (
      timeLeft === 0 &&
      !isSubmitting &&
      !feedback
    ) {
      submitAnswer();
    }

  }, [
    timeLeft,
    isSubmitting,
    feedback,
    currentQuestion,
    isIntroPhase,
  ]);


  /* ----------------------- Cleanup ----------------------- */

  useEffect(() => {

    return () => {

      if (recognitionRef.current) {

        try {
          recognitionRef.current.stop();
          recognitionRef.current.abort();
        } catch(error) {
          console.log( error )
        }

      }

      window.speechSynthesis.cancel();

    };

  }, []);


    /* ----------------------- Next Question ----------------------- */

  const handleNext = async () => {

    window.speechSynthesis.cancel();
    stopMic();

    setanswer("");
    setfeetback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText(
      "Alright, let's move on to the next question."
    );

    setcurrentIndex((prev) => prev + 1);

    setTimeout(() => {

      if (isMicOn) {
        startMic();
      }

    }, 500);
  };



  console.log("timeLeft state:", timeLeft);


  /* ----------------------- JSX ----------------------- */


  
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03070b] px-3 py-4 text-slate-100 sm:px-4 sm:py-6 lg:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.24),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.04)_0%,_transparent_40%,_rgba(255,255,255,0.03)_100%)]" />

      {/* Floating Abort/Home Button */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to abort the current interview? Your credits will not be refunded.")) {
              window.speechSynthesis.cancel();
              stopMic();
              navigate("/");
            }
          }}
          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-red-400 backdrop-blur hover:bg-red-500/10 transition group cursor-pointer shadow-md"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            <FaRobot size={12} />
          </div>
          <span>Abort Interview</span>
        </button>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 shadow-[0_0_90px_rgba(16,185,129,0.14)] backdrop-blur-xl lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_45%),linear-gradient(135deg,_rgba(8,12,20,0.95),_rgba(4,8,14,0.96))] p-4 sm:p-6 lg:w-[38%] lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-5 flex w-full max-w-md items-center justify-between rounded-full border border-emerald-400/20 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <span className="font-medium">Interview Session</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">
              {isAIPlaying ? "AI Speaking" : "Listening"}
            </span>
          </div>

          <div className="w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_0_35px_rgba(16,185,129,0.2)]">
            <video
              src={videosource}
              key={videosource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="h-auto w-full object-cover"
            />
          </div>

          {subtitle && (
            <div className="mt-5 w-full max-w-md rounded-[1.2rem] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-center text-sm font-medium leading-relaxed text-slate-200 sm:text-base">
                {subtitle}
              </p>
            </div>
          )}

          <div className="mt-5 w-full max-w-md rounded-[1.4rem] border border-white/10 bg-white/5 p-5 shadow-[0_0_35px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Interview Status</span>
              <span className="text-sm font-semibold text-emerald-400">
                {isAIPlaying ? "AI Speaking" : "Ready"}
              </span>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex justify-center">
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-2xl bg-black/30 p-3">
                <div className="text-2xl font-bold text-emerald-400">{currentIndex + 1}</div>
                <div className="mt-1 text-sm text-slate-400">Current Question</div>
              </div>
              <div className="rounded-2xl bg-black/30 p-3">
                <div className="text-2xl font-bold text-cyan-400">{questions.length}</div>
                <div className="mt-1 text-sm text-slate-400">Total Questions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-4 sm:p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Step 02</p>
              <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">AI Smart Interview</h2>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {userName || "Candidate"}
            </div>
          </div>

          {!isIntroPhase && (
            <div className="mb-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400 sm:text-sm">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <div className="text-base font-semibold leading-relaxed text-slate-100 sm:text-lg">
                {currentQuestion?.question}
              </div>
            </div>
          )}

          <div className="relative mt-2">
            <motion.div
              animate={
                isMicOn
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(16,185,129,0.15)",
                        "0 0 18px rgba(16,185,129,0.35)",
                        "0 0 0px rgba(16,185,129,0.15)",
                      ],
                    }
                  : { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }
              }
              transition={{ duration: 1.8, repeat: isMicOn ? Infinity : 0 }}
              className="rounded-[1.3rem]"
            >
              <motion.textarea
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                whileFocus={{ scale: 1.01 }}
                placeholder={
                  isMicOn ? "Listening... You can also type your answer here." : "Type your answer here..."
                }
                onChange={(e) => setanswer(e.target.value)}
                value={answer}
                rows={8}
                className="min-h-[220px] w-full resize-none rounded-[1.3rem] border border-white/10 bg-white/5 p-5 text-[15px] leading-7 text-slate-100 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 focus:shadow-lg sm:p-6"
              />
            </motion.div>
          </div>

          {!feedback ? (
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={toggleMic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  animate={
                    isMicOn
                      ? {
                          boxShadow: [
                            "0 0 0px rgba(16,185,129,0.3)",
                            "0 0 18px rgba(16,185,129,0.7)",
                            "0 0 0px rgba(16,185,129,0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all sm:h-14 sm:w-14 ${
                    isMicOn ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-white/10"
                  }`}
                >
                  {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                </motion.button>

                <motion.button
                  onClick={submitAnswer}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-[1.1rem] bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.24)] transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:py-4"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-slate-950 border-t-transparent"
                      />
                      <span>Analyzing your answer...</span>
                    </div>
                  ) : (
                    "Submit Answer"
                  )}
                </motion.button>
              </div>

              {isMicOn && !isSubmitting && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-sm font-medium text-emerald-300">Listening...</span>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-[1.4rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 shadow-[0_0_30px_rgba(16,185,129,0.12)]"
            >
              <p className="mb-5 leading-7 font-medium text-slate-100">{feedback}</p>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-[1rem] bg-gradient-to-r from-emerald-600 to-cyan-600 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg"
              >
                {isLastQuestion ? "Complete Interview" : "Next Question"}
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                  <BsArrowBarRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )  
}

export default Step2Interview

