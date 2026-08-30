import React from "react";
import { motion } from "framer-motion";
import {
  BsRobot,
  BsGithub,
  BsLinkedin,
  BsTwitterX,
  BsEnvelope,
} from "react-icons/bs";

import { SiLinktree } from "react-icons/si";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#03070b] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-3 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <BsRobot size={24} />
              </div>

              <h2 className="text-2xl font-bold">InterReview</h2>
            </div>

            <p className="leading-7 text-slate-300">
              Practice AI-powered HR and technical interviews with adaptive questioning,
              confidence analysis, resume-based sessions, and detailed performance insights.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-slate-300">
              <li className="cursor-pointer transition hover:text-emerald-400">Home</li>
              <li className="cursor-pointer transition hover:text-emerald-400">Features</li>
              <li className="cursor-pointer transition hover:text-emerald-400">Pricing</li>
              <li className="cursor-pointer transition hover:text-emerald-400">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Connect</h3>

            <div className="mb-6 flex gap-4">
              {[
                { icon: BsGithub, url: "https://github.com/usp13" },
                { icon: BsLinkedin, url: "https://linkedin.com/in/utsavpanchal1304" },
                { icon: BsTwitterX, url: "https://x.com/theutsavpanchal?s=09" },
                { icon: BsEnvelope, url: "mailto:utsavpanchal1304@gmail.com?subject=Feedback%20regarding%20InterReview" },
                { icon: SiLinktree, url: "https://linktr.ee/USP8" },
          
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={index}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition hover:bg-emerald-500/20"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>

            <p className="text-sm text-slate-400">
              Built with love for students, developers, and job seekers.
            </p>
          </div>
        </div>

        <div className="my-10 border-t border-white/10"></div>

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} InterReview. All rights reserved.</p>
          <p>AI Mock Interviews • Resume Analysis • Confidence Detection</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;