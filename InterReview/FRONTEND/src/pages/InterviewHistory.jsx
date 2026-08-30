import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { FaArrowLeft, FaBriefcase, FaCalendarAlt, FaStar } from "react-icons/fa";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          backendUrl + "/api/interview/get-interview",
          { withCredentials: true }
        );

        //console.log(result.data);
        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03070b] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.04)_0%,_transparent_40%,_rgba(255,255,255,0.03)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate("/")}
              className="mt-1 rounded-full border border-white/10 bg-white/10 p-3 shadow-[0_0_20px_rgba(16,185,129,0.14)] transition hover:bg-white/20"
            >
              <FaArrowLeft className="text-emerald-300" />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-white">
                Interview History
              </h1>

              <p className="mt-2 text-slate-400">
                Track your past interviews and performance reports
              </p>
            </div>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            {interviews.length} {interviews.length === 1 ? "Session" : "Sessions"}
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className="rounded-[1.8rem] border border-white/10 bg-black/70 p-10 text-center shadow-[0_0_60px_rgba(16,185,129,0.12)] backdrop-blur-xl">
            <p className="text-lg text-slate-300">
              No interviews found. Start your first interview!
            </p>
          </div>
        ) : (



          <div className="grid gap-5">
            {interviews.map((item) => {
              const status = item.status || "completed";
              const statusStyles =
                status.toLowerCase() === "pending"
                  ? "bg-amber-500/10 text-amber-300 border-amber-400/20"
                  : status.toLowerCase() === "in progress"
                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/20"
                  : "bg-emerald-500/10 text-emerald-300 border-emerald-400/20";

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/report/${item._id}`)}
                  className="cursor-pointer rounded-[1.6rem] border border-white/10 bg-black/70 p-6 shadow-[0_0_45px_rgba(16,185,129,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] backdrop-blur-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    {/* Left */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold capitalize text-white">
                          {item.role}
                        </h2>
                        <span className={`rounded-full border px-3 py-1 text-sm ${statusStyles}`}>
                          {status}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-slate-400">
                        <FaBriefcase className="text-emerald-400" />
                        <span className="capitalize">{item.mode} Interview</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <FaStar className="text-yellow-500" />
                        <span className="text-3xl font-bold text-emerald-400">
                          {item.finalScore ?? item.finalscore ?? 0}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400">Final Score</p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="font-medium">Experience:</span>
                      <span>
                        {item.experience}{" "}
                        {Number(item.experience) === 1 ? "Year" : "Years"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <FaCalendarAlt />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewHistory;