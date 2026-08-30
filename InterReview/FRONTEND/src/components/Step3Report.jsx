// // import React from 'react'
// // import { FaArrowLeft } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';

// // function Step3Report( { report }) {

// //   // if no report 
// //   if( !report ){
// //     return(
// //       <div className='min-h-screen flex items-center justify center'>
// //         <p className=' text-gray-700 text-lg'>
// //           Loading report ... 
// //         </p>
// //       </div>
// //     );
// //   }

// //   const navigate = useNavigate() ; 


// //   const {

// //     finalScore = 0 ,
// //     confidence = 0 ,
// //     communication = 0 ,
// //     correctness = 0 ,
// //     questionWiseScore = [],

// //   } = report ; 

// //   const questionScoreData = questionWiseScore.map((score,index) =>({

// //     name : `Q${index+1}` , 
// //     score : score.score || 0 
// //   }))

// //   const skills = [

// //     {label : "Confidence" , value: confidence },
// //     {label : "Communication" , value: communication },
// //     {label : "Correctness" , value: correctness },

// //   ] ;

// //   let performanceText = "" ; 
// //   let shorttagline = "" ; 

// //   if( finalScore >= 8 ){
// //     performanceText = "Ready for Job opprotunities." ; 
// //     shorttagline = "Excelent clarity and structures responces." ; 
// //   }
// //   else if( finalScore >= 5 ){
// //     performanceText = "Needs minor improvement before interviews." ; 
// //     shorttagline = "Good fondation , needs more refinement." ;

// //   }
// //   else {
// //     performanceText = "Significant improvement required." ; 
// //     shorttagline = "Work on clarity and confidence." ; 
// //   }




// //   return (
// //     <div className='min-h-screen bg-linear-to-br from-gray-50 to-green-50
// //     sm:px-6 lg:px-10 py-8'>

// //       <div className='mb-8 flrx flex-col sm:flex-row sm:items-center
// //       sm:justify-between gap-4'>


// //         {/* Heading */}
// //         <div className="mb-10 flex items-start gap-4">
// //           <button
// //             onClick={() => navigate("/history")}
// //             className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-lg transition"
// //           >
// //             <FaArrowLeft className="text-gray-600" />
// //           </button>

// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-800">
// //               Interview Analytics Dashboard
// //             </h1>

// //             <p className="text-gray-500 mt-2">
// //               AI Powered Perfomance Insights
// //             </p>
// //           </div>
// //         </div>


// //         <button className='bg-emerald-500 hover:bg-emerald-800 text-white
// //         py-3 rounded-xl shadow-md transition-all duration-300 font-semibold
// //         text-sm sm:text-base'>
// //           Download PDF
// //         </button>
// //       </div>
// //     </div>

// //   )
// // }

// // export default Step3Report






// import React from "react";
// import {
//   ResponsiveContainer,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// import {
//   FaCheckCircle,
//   FaChartLine,
//   FaMicrophone,
//   FaBrain,
//   FaTrophy,
//   FaBolt,
// } from "react-icons/fa";

// import { motion } from "framer-motion";

// function Step3Report({ report }) {
//   // Loading State
//   if (!report) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-[#071320]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1,
//             ease: "linear",
//           }}
//           className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent"
//         />
//       </div>
//     );
//   }

//   const {
//     finalScore = 0,
//     confidence = 0,
//     communication = 0,
//     correctness = 0,
//     questionWiseScore = [],
//   } = report;

//   const questionScoreData = questionWiseScore.map((score, index) => ({
//     name: `Q${index + 1}`,
//     score: score.score || 0,
//   }));

//   const skills = [
//     {
//       label: "Confidence",
//       value: confidence,
//       icon: <FaMicrophone />,
//     },
//     {
//       label: "Communication",
//       value: communication,
//       icon: <FaBolt />,
//     },
//     {
//       label: "Correctness",
//       value: correctness,
//       icon: <FaBrain />,
//     },
//   ];

//   const radarData = skills.map((s) => ({
//     skill: s.label,
//     value: s.value,
//   }));

//   let performanceText = "";
//   let shortTagline = "";
//   let badgeColor = "";

//   if (finalScore >= 8) {
//     performanceText = "Ready for Job Opportunities";
//     shortTagline =
//       "Excellent confidence, communication and structured responses.";
//     badgeColor = "from-green-500 to-emerald-400";
//   } else if (finalScore >= 5) {
//     performanceText = "Almost Interview Ready";
//     shortTagline =
//       "Strong fundamentals. A little more practice will make a huge difference.";
//     badgeColor = "from-yellow-400 to-orange-500";
//   } else {
//     performanceText = "Needs More Practice";
//     shortTagline =
//       "Focus on confidence, communication and answering structure.";
//     badgeColor = "from-red-500 to-pink-500";
//   }

//   const percentage = finalScore * 10;
//   const radius = 85;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset =
//     circumference - (percentage / 100) * circumference;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-[#071320] text-white px-6 py-10"
//     >
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Heading */}
//         <motion.div
//           initial={{ y: -40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//         >
//           <h1 className="text-5xl font-bold">
//             Interview Report
//           </h1>

//           <p className="text-gray-400 mt-3 text-lg">
//             AI Generated Performance Analysis
//           </p>
//         </motion.div>

//         {/* Hero */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Circular Score */}
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
//           >
//             <h2 className="text-2xl font-semibold mb-8">
//               Final Score
//             </h2>

//             <div className="flex justify-center">
//               <div className="relative w-60 h-60">
//                 <svg
//                   className="w-full h-full rotate-[-90deg]"
//                 >
//                   <circle
//                     cx="120"
//                     cy="120"
//                     r={radius}
//                     stroke="#233548"
//                     strokeWidth="14"
//                     fill="transparent"
//                   />

//                   <motion.circle
//                     initial={{
//                       strokeDashoffset: circumference,
//                     }}
//                     animate={{
//                       strokeDashoffset,
//                     }}
//                     transition={{
//                       duration: 1.8,
//                     }}
//                     cx="120"
//                     cy="120"
//                     r={radius}
//                     stroke="#22d3ee"
//                     strokeWidth="14"
//                     strokeLinecap="round"
//                     fill="transparent"
//                     strokeDasharray={circumference}
//                   />
//                 </svg>

//                 <div className="absolute inset-0 flex flex-col justify-center items-center">
//                   <motion.h1
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{
//                       delay: 0.6,
//                     }}
//                     className="text-6xl font-bold"
//                   >
//                     {finalScore}
//                   </motion.h1>

//                   <span className="text-gray-400">
//                     /10
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`mt-8 bg-gradient-to-r ${badgeColor} rounded-xl p-4`}
//             >
//               <h3 className="font-bold text-xl flex items-center gap-2">
//                 <FaTrophy />
//                 {performanceText}
//               </h3>

//               <p className="mt-2">
//                 {shortTagline}
//               </p>
//             </div>
//           </motion.div>

//           {/* Radar */}
//           <motion.div
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
//           >
//             <h2 className="text-2xl font-semibold mb-8">
//               Skill Distribution
//             </h2>

//             <ResponsiveContainer
//               width="100%"
//               height={350}
//             >
//               <RadarChart data={radarData}>
//                 <PolarGrid />

//                 <PolarAngleAxis dataKey="skill" />

//                 <PolarRadiusAxis
//                   domain={[0, 10]}
//                 />

//                 <Radar
//                   dataKey="value"
//                   stroke="#06b6d4"
//                   fill="#06b6d4"
//                   fillOpacity={0.5}
//                 />
//               </RadarChart>
//             </ResponsiveContainer>
//           </motion.div>
//         </div>

//         {/* Skills */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="rounded-3xl bg-white/5 border border-white/10 p-8"
//         >
//           <h2 className="text-2xl font-semibold mb-8">
//             Skill Breakdown
//           </h2>

//           <div className="space-y-8">
//             {skills.map((skill, index) => (
//               <motion.div
//                 key={skill.label}
//                 initial={{
//                   x: -40,
//                   opacity: 0,
//                 }}
//                 whileInView={{
//                   x: 0,
//                   opacity: 1,
//                 }}
//                 transition={{
//                   delay: index * 0.15,
//                 }}
//               >
//                 <div className="flex justify-between mb-2">
//                   <div className="flex gap-3 items-center">
//                     <span className="text-cyan-400 text-xl">
//                       {skill.icon}
//                     </span>

//                     <span className="font-semibold">
//                       {skill.label}
//                     </span>
//                   </div>

//                   <span>{skill.value}/10</span>
//                 </div>

//                 <div className="h-4 rounded-full bg-gray-700 overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     whileInView={{
//                       width: `${skill.value * 10}%`,
//                     }}
//                     transition={{
//                       duration: 1,
//                     }}
//                     className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Question Chart */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{
//             opacity: 1,
//           }}
//           viewport={{ once: true }}
//           className="rounded-3xl bg-white/5 border border-white/10 p-8"
//         >
//           <h2 className="text-2xl font-semibold mb-8 flex gap-3 items-center">
//             <FaChartLine />

//             Question Wise Performance
//           </h2>

//           <ResponsiveContainer
//             width="100%"
//             height={350}
//           >
//             <BarChart data={questionScoreData}>
//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />

//               <YAxis domain={[0, 10]} />

//               <Tooltip />

//               <Bar
//                 dataKey="score"
//                 radius={[10, 10, 0, 0]}
//                 fill="#06b6d4"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Summary */}
//         <motion.div
//           initial={{
//             y: 60,
//             opacity: 0,
//           }}
//           whileInView={{
//             y: 0,
//             opacity: 1,
//           }}
//           viewport={{ once: true }}
//           className="rounded-3xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/20 p-8"
//         >
//           <h2 className="text-3xl font-bold flex gap-3 items-center">
//             <FaCheckCircle />

//             Interview Summary
//           </h2>

//           <p className="mt-6 leading-8 text-lg text-gray-300">
//             Your interview demonstrates a{" "}
//             <span className="font-bold text-cyan-400">
//               Final Score of {finalScore}/10
//             </span>
//             . The evaluation indicates{" "}
//             <span className="font-semibold">
//               {performanceText.toLowerCase()}
//             </span>
//             . Continue improving communication,
//             confidence and technical depth to maximize
//             performance in future interviews.
//           </p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default Step3Report;








import React, { useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  FaCheckCircle,
  FaChartLine,
  FaMicrophone,
  FaBrain,
  FaTrophy,
  FaBolt,
  FaDownload,
  FaHome,
  FaRobot,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Step3Report({ report }) {
  const navigate = useNavigate();
  const reportRef = useRef(null);

  // ---------------- Loading ----------------

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03070b] text-slate-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent"
        />
      </div>
    );
  }

  // ---------------- Data ----------------

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    {
      label: "Confidence",
      value: confidence,
      icon: <FaMicrophone />,
    },
    {
      label: "Communication",
      value: communication,
      icon: <FaBolt />,
    },
    {
      label: "Correctness",
      value: correctness,
      icon: <FaBrain />,
    },
  ];

  const skillBarData = skills.map((skill) => ({
    skill: skill.label,
    value: skill.value,
  }));

  let performanceText = "";
  let shortTagline = "";
  let badgeColor = "";

  if (finalScore >= 8) {
    performanceText = "Ready for Job Opportunities";
    shortTagline =
      "Outstanding interview performance with excellent clarity and confidence.";
    badgeColor = "from-emerald-500 to-green-600";
  } else if (finalScore >= 5) {
    performanceText = "Almost Interview Ready";
    shortTagline =
      "Strong fundamentals. Small improvements can significantly boost performance.";
    badgeColor = "from-green-400 to-emerald-500";
  } else {
    performanceText = "Needs More Practice";
    shortTagline =
      "Continue improving communication, confidence and structured answers.";
    badgeColor = "from-orange-400 to-red-500";
  }

  // ---------------- Circular Score ----------------

  const percentage = finalScore * 10;

  const radius = 85;

  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  // ---------------- Download PDF ----------------

  const downloadPDF = () => {

    const doc = new jsPDF();

    let currentY = 20;

    // =========================================
    // HEADER
    // =========================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(16, 185, 129);

    doc.text("Interview Report", 14, currentY);

    currentY += 8;

    doc.setFontSize(12);
    doc.setTextColor(100);

    doc.text(
        "AI Generated Performance Analysis",
        14,
        currentY
    );

    currentY += 5;

    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);

    doc.line(14, currentY, 196, currentY);

    currentY += 12;

    // =========================================
    // OVERALL SCORE
    // =========================================

    doc.setFontSize(18);
    doc.setTextColor(0);

    doc.text("Overall Score", 14, currentY);

    currentY += 12;

    doc.setFontSize(34);
    doc.setTextColor(16,185,129);

    doc.text(`${finalScore}/10`,14,currentY);

    currentY += 12;

    doc.setFontSize(15);
    doc.setTextColor(0);

    doc.text(performanceText,14,currentY);

    currentY += 8;

    doc.setFontSize(11);

    const summary = doc.splitTextToSize(
        shortTagline,
        180
    );

    doc.text(summary,14,currentY);

    currentY += summary.length * 6 + 8;

    // =========================================
    // SKILL SUMMARY
    // =========================================

    autoTable(doc,{

        startY: currentY,

        head:[["Metric","Score (/10)"]],

        body:[

            ["Confidence",confidence],

            ["Communication",communication],

            ["Correctness",correctness]

        ],

        theme:"grid",

        headStyles:{
            fillColor:[16,185,129]
        }

    });

    currentY = doc.lastAutoTable.finalY + 12;

    // =========================================
    // QUESTION TABLE
    // =========================================

    doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.5);
doc.line(14, currentY, 196, currentY);

currentY += 8;

doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.setTextColor(16,185,129);

doc.text("Question-wise Evaluation",14,currentY);

currentY += 8;

doc.setFontSize(11);
doc.setTextColor(120);

doc.text(
    `${questionWiseScore.length} Questions Evaluated`,
    14,
    currentY
);

currentY += 8;

autoTable(doc, {

    startY: currentY,

    theme: "striped",

    tableWidth: "auto",

    head: [[
        "Question",
        "Difficulty",
        "Score",
        "AI Feedback"
    ]],

    body: questionWiseScore.map((item) => [

        item.question,

        item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1),

        `${item.score.toFixed(1)} / 10`,

        item.feedback

    ]),

    styles: {

        font: "helvetica",

        fontSize: 9,

        cellPadding: 5,

        overflow: "linebreak",

        valign: "middle",

        textColor: [55,55,55],

        lineColor: [225,225,225],

        lineWidth: 0.2

    },

    headStyles: {

        fillColor: [16,185,129],

        textColor: [255,255,255],

        fontStyle: "bold",

        fontSize: 10,

        halign: "center",

        valign: "middle"

    },

    alternateRowStyles: {

        fillColor: [247,253,250]

    },

    columnStyles: {

        0: {
            cellWidth: 75,
            halign: "left",
            fontStyle: "bold"
        },

        1: {
            cellWidth: 28,
            halign: "center"
        },

        2: {
            cellWidth: 20,
            halign: "center"
        },

        3: {
            cellWidth: 67,
            halign: "left"
        }

    },

    didParseCell: function (data) {

        // Difficulty colors
        if (data.section === "body" && data.column.index === 1) {

            const value = data.cell.raw.toLowerCase();

            if (value === "easy") {
                data.cell.styles.textColor = [34,197,94];
            }
            else if (value === "medium") {
                data.cell.styles.textColor = [245,158,11];
            }
            else {
                data.cell.styles.textColor = [239,68,68];
            }

            data.cell.styles.fontStyle = "bold";
        }

        // Score color
        if (data.section === "body" && data.column.index === 2) {

            const score = parseFloat(data.cell.raw);

            if (score >= 8) {
                data.cell.styles.textColor = [34,197,94];
            }
            else if (score >= 5) {
                data.cell.styles.textColor = [245,158,11];
            }
            else {
                data.cell.styles.textColor = [239,68,68];
            }

            data.cell.styles.fontStyle = "bold";
        }

    }

});

currentY = doc.lastAutoTable.finalY + 12;




//Each question summary 

doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(16,185,129);

doc.text("Question-wise Analysis",14,currentY);

currentY += 10;



  questionWiseScore.forEach((item,index)=>{

    const pageHeight = doc.internal.pageSize.getHeight();

    const questionLines = doc.splitTextToSize(
        item.question,
        165
    );

    const answerLines = doc.splitTextToSize(
        item.answer?.trim()
            ? item.answer
            : "No answer submitted.",
        165
    );

    const feedbackLines = doc.splitTextToSize(
        item.feedback,
        165
    );

    const cardHeight =
        30 +
        questionLines.length * 5 +
        answerLines.length * 5 +
        feedbackLines.length * 5 +
        55;

    if(currentY + cardHeight > pageHeight - 20){
        doc.addPage();
        currentY = 20;
    }

    

    // ============================
    // Card Background
    // ============================

    doc.setFillColor(248,250,252);

    doc.roundedRect(
        12,
        currentY-4,
        186,
        cardHeight,
        4,
        4,
        "F"
    );

    // Question Number

    doc.setFontSize(15);

    doc.setFont("helvetica","bold");

    doc.setTextColor(16,185,129);

    doc.text(
        `Question ${index+1} (${item.difficulty.toUpperCase()})`,
        18,
        currentY+4
    );

    currentY += 12;

    // Question

    doc.setFontSize(11);

    doc.setTextColor(0);

    const question = doc.splitTextToSize(
        item.question,
        165
    );

    doc.text(question,18,currentY);

    currentY += question.length*5 + 4;

    // Answer

    doc.setFont("helvetica","bold");

    doc.text("Your Answer:",18,currentY);

    currentY += 6;

    doc.setFont("helvetica","normal");

    const answer = doc.splitTextToSize(
        item.answer && item.answer.trim() !== ""
            ? item.answer
            : "No answer submitted.",
        165
    );

    doc.text(answer,18,currentY);

    currentY += answer.length*5 + 6;

    // Overall Score

    doc.setFont("helvetica","bold");

    doc.text(
        `Overall Score : ${item.score.toFixed(1)}/10`,
        18,
        currentY
    );

    currentY += 8;

    // Progress Bars

    const drawBar = (label,value)=>{

        doc.setFontSize(10);

        doc.setFont("helvetica","normal");

        doc.text(label,18,currentY);

        // background

        doc.setFillColor(230,230,230);

        doc.roundedRect(
            55,
            currentY-3,
            80,
            4,
            2,
            2,
            "F"
        );

        // fill

        doc.setFillColor(16,185,129);

        doc.roundedRect(
            55,
            currentY-3,
            value*8,
            4,
            2,
            2,
            "F"
        );

        doc.setFont("helvetica","bold");

        doc.text(
            `${value.toFixed(1)}/10`,
            145,
            currentY
        );

        currentY += 8;

    };

    drawBar("Correctness",item.correctness);

    drawBar("Confidence",item.confidence);

    drawBar("Communication",item.communication);

    currentY += 2;

    // Feedback

    doc.setFont("helvetica","bold");

    doc.text("AI Feedback",18,currentY);

    currentY += 6;

    doc.setFont("helvetica","normal");

    doc.setTextColor(70);

    const feedback = doc.splitTextToSize(
        item.feedback,
        165
    );

    doc.text(feedback,18,currentY);

    currentY += feedback.length*5 + 15;

});

// =========================================
// INTERVIEW SUMMARY
// =========================================

const summaryPageHeight = doc.internal.pageSize.getHeight();

if (currentY + 80 > summaryPageHeight - 20) {
    doc.addPage();
    currentY = 20;
}

// Section Divider
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.5);
doc.line(14, currentY, 196, currentY);

currentY += 8;

// Section Title
doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(16, 185, 129);

doc.text("Interview Summary", 14, currentY);

currentY += 10;

// Summary Card
doc.setFillColor(245, 253, 247);

doc.roundedRect(
    14,
    currentY - 4,
    182,
    72,
    5,
    5,
    "F"
);

// Overall Score
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.setTextColor(90);

doc.text("Overall Score", 20, currentY + 8);

doc.setFont("helvetica", "bold");
doc.setFontSize(30);
doc.setTextColor(16,185,129);

doc.text(`${finalScore.toFixed(1)}/10`,20,currentY+23);

// Performance Badge
doc.setFont("helvetica","bold");
doc.setFontSize(15);
doc.setTextColor(0);

doc.text(
    performanceText,
    72,
    currentY + 18
);

// Tagline
doc.setFont("helvetica","normal");
doc.setFontSize(10);
doc.setTextColor(100);

const tagline = doc.splitTextToSize(
    shortTagline,
    110
);

doc.text(
    tagline,
    72,
    currentY + 27
);

// Divider inside card
doc.setDrawColor(220);
doc.line(
    20,
    currentY + 42,
    190,
    currentY + 42
);

// Performance Breakdown
doc.setFont("helvetica","bold");
doc.setFontSize(12);
doc.setTextColor(16,185,129);

doc.text(
    "Performance Breakdown",
    20,
    currentY + 52
);

doc.setFont("helvetica","normal");
doc.setFontSize(11);
doc.setTextColor(70);

doc.text(
    `Confidence      : ${confidence.toFixed(1)} / 10`,
    20,
    currentY + 60
);

doc.text(
    `Communication : ${communication.toFixed(1)} / 10`,
    80,
    currentY + 60
);

doc.text(
    `Correctness    : ${correctness.toFixed(1)} / 10`,
    150,
    currentY + 60
);

currentY += 85;





//     // =========================================
//     // INTERVIEW SUMMARY
//     // =========================================

//     doc.setFontSize(18);

//     doc.setTextColor(16,185,129);

//     doc.text(
//         "Interview Summary",
//         14,
//         currentY
//     );

//     currentY += 8;

//     doc.setFontSize(11);

//     doc.setTextColor(70);

//     const finalSummary = doc.splitTextToSize(

//         `Your interview received an overall score of ${finalScore}/10.

// Confidence: ${confidence}/10
// Communication: ${communication}/10
// Correctness: ${correctness}/10

// ${performanceText}.

// ${shortTagline}`,

//         180

//     );

//     doc.text(
//         finalSummary,
//         14,
//         currentY
//     );

    // =========================================
    // FOOTER
    // =========================================

    const pageHeight =
        doc.internal.pageSize.height;

    doc.setDrawColor(220);

    doc.line(
        14,
        pageHeight - 15,
        196,
        pageHeight - 15
    );

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
        "Generated by InterReview Platform",
        14,
        pageHeight - 8
    );

    doc.save("Interview_Report.pdf");
    

};











//   const downloadPDF = () => {

//     const doc = new jsPDF();

//     doc.setFontSize(24);
    
//     doc.setTextColor(16,185,129);

//     doc.text("Interview Report",20,25);

//     doc.setFontSize(12);

//     doc.setTextColor(80);

//     doc.text(
//         "AI Generated Performance Analysis",
//         20,
//         35
//     );

//     //----------------------------------------

//     doc.setDrawColor(16,185,129);

//     doc.line(20,40,190,40);

//     //----------------------------------------

//     doc.setFontSize(18);

//     doc.text("Overall Score",20,55);

//     doc.setFontSize(40);

//     doc.setTextColor(16,185,129);

//     doc.text(`${finalScore}/10`,20,75);

//     //----------------------------------------

//     doc.setFontSize(16);

//     doc.setTextColor(0);

//     doc.text("Performance",20,95);

//     doc.setFontSize(12);

//     doc.text(performanceText,20,105);

//     doc.text(shortTagline,20,113);

//     //----------------------------------------


//     doc.setFontSize(18);
//     doc.setTextColor(16, 185, 129);

//     doc.text(
//         "Question-wise Performance",
//         14,
//         doc.lastAutoTable.finalY + 15
//     );

// autoTable(doc, {

//     startY: doc.lastAutoTable.finalY + 22,

//     head: [[
//         "#",
//         "Question",
//         "Difficulty",
//         "Score",
//         "Confidence",
//         "Feedback"
//     ]],

//     body: questionWiseScore.map((item, index) => [

//         index + 1,

//         item.question,

//         item.difficulty?.toUpperCase() || "-",

//         `${item.score}/10`,

//         `${item.confidence}/10`,

//         item.feedback ||
//         item.aiFeedback ||
//         item.analysis ||
//         "No feedback available"

//     ]),

//     theme: "striped",

//     styles: {

//         fontSize: 9,

//         cellPadding: 3,

//         overflow: "linebreak",

//         valign: "top",

//         lineColor: [220,220,220],

//         lineWidth: 0.1,

//     },

//     headStyles: {

//         fillColor: [16,185,129],

//         textColor: 255,

//         halign: "center",

//         fontStyle: "bold",

//         fontSize: 10,

//     },

//     alternateRowStyles: {

//         fillColor: [245,253,247]

//     },

//     columnStyles: {

//         0: {
//             cellWidth: 10,
//             halign: "center"
//         },

//         1: {
//             cellWidth: 75
//         },

//         2: {
//             cellWidth: 22,
//             halign: "center"
//         },

//         3: {
//             cellWidth: 18,
//             halign: "center"
//         },

//         4: {
//             cellWidth: 24,
//             halign: "center"
//         },

//         5: {
//             cellWidth: "auto"
//         }

//     }

// });

//     // autoTable(doc,{
//     //     startY:125,

//     //     head:[
//     //         ["Metric","Score"]
//     //     ],

//     //     body:[
//     //         ["Confidence",confidence],
//     //         ["Communication",communication],
//     //         ["Correctness",correctness],
//     //     ],

//     //     theme:"grid",

//     //     headStyles:{
//     //         fillColor:[16,185,129]
//     //     }
//     // });

//     // //----------------------------------------

//     // autoTable(doc,{

//     //     startY:doc.lastAutoTable.finalY+15,

//     //     head:[
//     //         [
//     //             "Question",
//     //             "Score"
//     //         ]
//     //     ],

//     //     body:questionWiseScore.map((q,index)=>[
//     //         `Question ${index+1}`,
//     //         `${q.score}/10`
//     //     ]),

//     //     headStyles:{
//     //         fillColor:[16,185,129]
//     //     }

//     // });

//     //----------------------------------------

//     doc.save("Interview_Report.pdf");

// }

  // const downloadPDF = async () => {
  //   const input = reportRef.current;

  //   const canvas = await html2canvas(input, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: "#ffffff",
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pdfWidth = pdf.internal.pageSize.getWidth();

  //   const pdfHeight =
  //     (canvas.height * pdfWidth) / canvas.width;

  //   let heightLeft = pdfHeight;

  //   let position = 0;

  //   pdf.addImage(
  //     imgData,
  //     "PNG",
  //     0,
  //     position,
  //     pdfWidth,
  //     pdfHeight
  //   );

  //   heightLeft -= pdf.internal.pageSize.getHeight();

  //   while (heightLeft > 0) {
  //     position = heightLeft - pdfHeight;

  //     pdf.addPage();

  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       0,
  //       position,
  //       pdfWidth,
  //       pdfHeight
  //     );

  //     heightLeft -= pdf.internal.pageSize.getHeight();
  //   }

  //   pdf.save("Interview_Report.pdf");
  // };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03070b] text-slate-100">

      {/* Floating Background */}

      <motion.div
        animate={{
          x: [0, 180, -120, 0],
          y: [0, -100, 120, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-emerald-200/40 blur-[140px] -top-24 -left-24"
      />

      <motion.div
        animate={{
          x: [0, -120, 150, 0],
          y: [0, 120, -120, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[350px] h-[350px] rounded-full bg-green-300/30 blur-[120px] bottom-0 right-0"
      />

      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, 80, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[220px] h-[220px] rounded-full bg-emerald-300/20 blur-[100px] top-1/2 left-1/2"
      />

      <div
        ref={reportRef}
        className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-10"
      >

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-5xl font-black text-white">
              Interview Report
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              AI Generated Performance Analytics Dashboard
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate("/")}
              className="flex items-center gap-3 border border-white/10 bg-white/5 text-white px-7 py-4 rounded-2xl shadow-md font-semibold cursor-pointer"
            >
              <FaHome />
              Back to Home
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={downloadPDF}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 px-7 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.24)] font-semibold cursor-pointer"
            >
              <FaDownload />
              Download PDF
            </motion.button>
          </div>
        </motion.div>

        {/* FINAL SCORE  */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Score Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .7,
            }}
            whileHover={{
              y: -8,
            }}
            className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_60px_rgba(16,185,129,0.12)] p-10 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Final Score
            </h2>

            <div className="flex justify-center">

              <div className="relative w-64 h-64">

                <svg className="w-full h-full -rotate-90">

                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="16"
                    fill="transparent"
                  />

                  <motion.circle
                    initial={{
                      strokeDashoffset: circumference,
                    }}
                    animate={{
                      strokeDashoffset,
                    }}
                    transition={{
                      duration: 2,
                    }}
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="#10B981"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={circumference}
                  />

                </svg>

                <div className="absolute inset-0 flex flex-col justify-center items-center">

                  <motion.h1
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: .6,
                    }}
                    className="text-6xl font-black text-white"
                  >
                    {finalScore}
                  </motion.h1>

                  <p className="text-slate-400 text-lg">
                    /10
                  </p>

                </div>

              </div>

            </div>

            <div
              className={`mt-10 rounded-2xl bg-gradient-to-r ${badgeColor} p-6 text-white shadow-lg`}
            >
              <div className="flex items-center gap-3">

                <FaTrophy size={28} />

                <h3 className="text-2xl font-bold">
                  {performanceText}
                </h3>

              </div>

              <p className="mt-4 text-white/90 leading-7">
                {shortTagline}
              </p>
            </div>

          </motion.div>

          {/* BAR CHARTS*/}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .8,
              delay: .2,
            }}
            whileHover={{
              y: -8,
            }}
            className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_60px_rgba(16,185,129,0.12)] p-10 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Skill Distribution
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={skillBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="skill"
                  tick={{ fill: "#cbd5e1", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-5 mt-8">

              {skills.map((skill) => (

                <motion.div
                  key={skill.label}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-md"
                >
                  <div className="text-3xl text-emerald-400 flex justify-center mb-3">
                    {skill.icon}
                  </div>

                  <h3 className="font-semibold text-slate-200">
                    {skill.label}
                  </h3>

                  <p className="text-3xl font-black text-emerald-400 mt-3">
                    {skill.value}
                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

        {/* ========================= */}

        {/* Skill Breakdown */}

        {/* ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_60px_rgba(16,185,129,0.12)] p-10 backdrop-blur-xl"
        >

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-3xl font-bold text-white">
                Skill Breakdown
              </h2>

              <p className="text-slate-400 mt-2">
                Individual performance across evaluated skills.
              </p>

            </div>

          </div>

          <div className="space-y-10">

            {skills.map((skill, index) => (

              <motion.div
                key={skill.label}
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * .15,
                }}
              >

                <div className="flex justify-between items-center mb-3">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">

                      {skill.icon}

                    </div>

                    <div>

                      <h3 className="font-bold text-lg text-white">
                        {skill.label}
                      </h3>

                      <p className="text-slate-400">
                        AI Evaluation Score
                      </p>

                    </div>

                  </div>

                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    transition={{
                      delay: .4,
                    }}
                    className="text-3xl font-black text-emerald-400"
                  >
                    {skill.value}/10
                  </motion.div>

                </div>

                <div className="h-5 bg-white/10 rounded-full overflow-hidden">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${skill.value * 10}%`,
                    }}
                    transition={{
                      duration: 1.3,
                    }}
                    className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
                  >

                    <motion.div
                      animate={{
                        x: [-100, 400],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 w-20 bg-white/30 blur-sm"
                    />

                  </motion.div>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

              
        {/* Question Wise Performance */}
  

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_60px_rgba(16,185,129,0.12)] p-10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <FaChartLine className="text-emerald-400 text-2xl" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                Question Wise Performance
              </h2>

              <p className="text-slate-400 mt-1">
                Performance across every interview question.
              </p>
            </div>
          </div>

          <ResponsiveContainer
            width="100%"
            height={420}
          >
            <BarChart data={questionScoreData}>
              <defs>

                <linearGradient
                  id="scoreGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10B981"
                  />

                  <stop
                    offset="100%"
                    stopColor="#34D399"
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#1f2937"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#e2e8f0",
                  fontWeight: 600,
                }}
              />

              <YAxis
                domain={[0, 10]}
                tick={{
                  fill: "#94a3b8",
                }}
              />

              
              <Tooltip
                  cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                />

              <Bar
                dataKey="score"
                radius={[12, 12, 0, 0]}
                fill="url(#scoreGradient)"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ========================= */}
        {/* Interview Summary */}
        {/* ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 p-10 text-white shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

              <FaCheckCircle className="text-3xl" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Interview Summary
              </h2>

              <p className="text-white/80 mt-1">
                AI Generated Overall Assessment
              </p>

            </div>

          </div>

          <p className="mt-8 leading-9 text-lg">

            You achieved an overall interview score of

            <span className="font-bold text-2xl">
              {" "} {finalScore}/10{" "}
            </span>

            demonstrating

            <span className="font-bold">
              {" "}{performanceText.toLowerCase()}.
            </span>

            Your strongest areas include confidence,
            communication and technical correctness.

            Continue practicing real interview scenarios,
            improve answer structuring and maintain
            confidence while explaining your approach.

          </p>

        </motion.div>

        {/* ========================= */}
        {/* Recommendation Cards */}
        {/* ========================= */}

        <div className="grid lg:grid-cols-3 gap-6">

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_35px_rgba(16,185,129,0.12)] p-8 backdrop-blur-xl"
          >

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">

              <FaMicrophone className="text-emerald-400 text-2xl"/>

            </div>

            <h3 className="text-2xl font-bold text-white mt-6">
              Communication
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Speak slowly, organize your thoughts,
              and explain your reasoning before giving
              the final answer.
            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_35px_rgba(16,185,129,0.12)] p-8 backdrop-blur-xl"
          >

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">

              <FaBrain className="text-emerald-400 text-2xl"/>

            </div>

            <h3 className="text-2xl font-bold text-white mt-6">
              Technical Skills
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Continue solving interview problems and
              explain algorithms with complexity analysis
              confidently.
            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-black/70 shadow-[0_0_35px_rgba(16,185,129,0.12)] p-8 backdrop-blur-xl"
          >

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">

              <FaTrophy className="text-emerald-400 text-2xl"/>

            </div>

            <h3 className="text-2xl font-bold text-white mt-6">
              Final Advice
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Practice mock interviews regularly and
              maintain confidence. Small improvements
              every week produce significant results.
            </p>

          </motion.div>

        </div>

      </div>

    </div>

  );

}

export default Step3Report;