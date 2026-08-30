import fs from 'fs' ;
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { askAi } from '../services/openRouter.services.js';
import User from "../models/user.model.js" ; 
import Interview from '../models/interview.model.js';
import { create } from 'domain';
import { errorMonitor } from 'events';

 export const analyseResume = async (req, res) => {
    
    try {

        if( !req.file ){
            return res.status(400).json({message: "Resume Required !"}) ; 

        }

        console.log(req.file);
        console.log("Exists:", fs.existsSync(req.file.path));

        const filepath = req.file.path

        const filebuffer = await fs.promises.readFile(filepath)
        const uint8array = new Uint8Array(filebuffer) ;
        
        const pdf = await pdfjsLib.getDocument({data:uint8array}).promise ;




        let resumeText = "" ; 

            //Extract text from all pages 
            for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
                const page = await pdf.getPage(pageNo);

                const content = await page.getTextContent();

                const pageText = content.items
                    .map(item => item.str)
                    .join(" ");

                resumeText += pageText + "\n";
            }

        resumeText = resumeText.replace(/\s+/g , " ").trim()  ;

        const messages = [
            {
                role: 'system',
                content: `Extract structured data from the resume.

                Return ONLY a valid JSON object.

                Do NOT wrap the response in markdown.
                Do NOT use \`\`\`json.
                Do NOT include any explanation or extra text.

                The JSON must have exactly this format:

                {
                "role": "string",
                "experience": "string",
                "projects": ["project1", "project2"],
                "skills": ["skill1", "skill2"]
                }`

                // content:
                // `Extract structured data from resume.
                
                // Return strictly JSON : 
                
                // {
                //     "role": "string"
                //     "experience" : "string"
                //     "projects": ["project1" , "project2"]
                //     "skills": ["skill1" , "skill2"]
                // }
                // `


            },
            {
                role : "user" , 
                content: resumeText
            }
        ] ; 


        const airesponse = await askAi(messages) ; 
        

        const parsed = JSON.parse(airesponse) ; 

        fs.unlinkSync(filepath) ; 

        res.json({

            role: parsed.role,
            experience: parsed.experience,
            projects : parsed.projects,
            skills: parsed.skills,
            resumeText

        }) ; 

    } catch (error) {
        console.log( error );

        if( req.file && fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path) ; 
        }

        res.status(500).json({message: error.message }) ;
    }

};


export const generateQuestion = async (req, res) => {
    try {
        let {
            role,
            experience,
            mode,
            resumeText,
            projects,
            skills
        } = req.body;

        role = role?.trim();
        experience = experience?.trim();
        mode = mode?.trim();

        // ==========================
        // Validation
        // ==========================

        if (!role || !experience || !mode) {
            return res.status(400).json({
                message: "Role, Experience and Mode are required."
            });
        }

        // if (mode !== "technical" && mode !== "HR") {
        //     return res.status(400).json({
        //         message: "Invalid interview mode."
        //     });
        // }



        // ==========================
        // User
        // ==========================

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // ==========================
        // Credits (10 credits per use )
        // ==========================

        
        if (user.credits < 10) {
            return res.status(400).json({
                message: "Not enough credits."
            });
        }

        
        // ==========================
        // Candidate Information
        // ==========================

        const projectText =
            Array.isArray(projects) && projects.length
                ? projects.join(", ")
                : "None";

        const skillsText =
            Array.isArray(skills) && skills.length
                ? skills.join(", ")
                : "None";

        const safeResume = resumeText?.trim() || "None";

        // ==========================
        // System Prompt
        // ==========================

        const systemPrompt = `
            You are real human Interviewer conducting a professinal interview.

            Generate EXACTLY 5 interview questions.

            Rules:

            1. Return ONLY valid JSON.
            2. No markdown.
            3. No explanations.
            4. No greetings.
            5. No extra text.
            6. Questions must progressively increase in difficulty.

            If Interview Mode is "Technical":
            - Ask technical questions.
            - Use candidate projects, skills and resume for making question.
            - Focus on practical software engineering and project based question.

            If Interview Mode is "HR":
            - Ask behavioural and HR questions.
            - Do NOT ask coding questions.

            Return ONLY:

            {
            "questions": [
                {
                "question": "...",
                "difficulty": "easy"
                },
                {
                "question": "...",
                "difficulty": "easy"
                },
                {
                "question": "...",
                "difficulty": "medium"
                },
                {
                "question": "...",
                "difficulty": "medium"
                },
                {
                "question": "...",
                "difficulty": "hard"
                }
            ]
            }
            `;

        // ==========================
        // User Prompt
        // ==========================

        const userPrompt = `
                Candidate Details:

                Role:
                ${role}

                Experience:
                ${experience}

                InterviewMode:
                ${mode}

                Projects:
                ${projectText}

                Skills:
                ${skillsText}

                Resume:
                ${safeResume}
                `;

        // ==========================
        // Messages
        // ==========================

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ];

        console.log(JSON.stringify(messages, null, 2));

        // ==========================
        // AI Call
        // ==========================

        const aiResponse = await askAi(messages);

        console.log("AI Response:");
        console.log(aiResponse);

        if (!aiResponse?.trim()) {
            return res.status(500).json({
                message: "AI returned an empty response."
            });
        }

        // ==========================
        // Parse JSON
        // ==========================

        let parsed;

        try {
            const cleaned = aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            parsed = JSON.parse(cleaned);
        } catch (err) {
            console.error("Invalid JSON returned by AI");
            console.error(aiResponse);

            return res.status(500).json({
                message: "AI returned invalid JSON."
            });
        }

        // ==========================
        // Validate Questions
        // ==========================

        if (
            !parsed.questions ||
            !Array.isArray(parsed.questions)
        ) {
            return res.status(500).json({
                message: "AI response format is invalid."
            });
        }

        if (parsed.questions.length !== 5) {
            return res.status(500).json({
                message: "AI must return exactly 5 questions."
            });
        }

        // ==========================
        // Build Questions
        // ==========================

        const questions = parsed.questions.map((q, index) => ({
            question:
                q.question?.trim() ||
                `Question ${index + 1}`,

            difficulty:
                q.difficulty?.toLowerCase() ||
                ["easy", "easy", "medium", "medium", "hard"][index],

            timeLimit:
                [60, 60, 90, 90, 120][index],

            score: 0,
            confidence: 0,
            communication: 0
        }));

        // ==========================
        // Update Credits
        // ==========================

        user.credits -= 10; // 10 credits gets deducted 

        await user.save();

        // ==========================
        // Save Interview
        // ==========================

        const interview = await Interview.create({
            userId: user._id,
            role,
            experience,
            mode,
            resumeText: safeResume,
            questions: questions
        });

        // ==========================
        // Success Response
        // ==========================

        return res.status(200).json({
            interviewId: interview._id,
            creditsLeft: user.credits,
            userName: user.name,
            questions: interview.questions
        });

    } catch (error) {

        console.error("Generate Question Error:");
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};





export const submitAnswer = async (req,res) => {
    
    try {
        const { interviewId , questionIndex , answer , timeTaken } = req.body ; 


        const interview = await Interview.findById( interviewId ) 
        const question = interview.questions[questionIndex] ; 

        // No answer
        if( !answer ){

            question.score =  0 ; 
            question.feedback = "You did not submit the answer." ; 
            question.answer = "" ; 

            await interview.save() ; 

            return res.json({
                feedback: question.feedback 
            })
        }

        // time limit Exceeded 
        if( timeTaken > question.timeLimit ){

            question.score =  0 ; 
            question.feedback = "Time limit exceeded. The answer is not evaluated." ; 
            question.answer = answer ; 

            await interview.save() ; 

            return res.json({
                feedback: question.feedback 
            })
        }

        const messages = [
            {
                role: 'system' , 
                content: `
                
                Your are a professional human interviewer evaluating a condidate's answer in a real interview

                Please evaluate naturally and fairly, wtihout any biases.

                Score the answer in these areas from ( 0 to 10 ):
                1. Confidence : Does tyhe answer sound clear , confident and well presented?
                2. Communication : Is the language simple, clear , and easy to understand ? 
                3. Correctness : Is the answer accurate , relevant and complete?

                Rules : 
                1. Be unbiased and realistic.
                2. if the answer  is weak , score low
                3. if the answer is string and detailed  , score high.
                4. consider clarity m structure and relevence.


                Calculate: 
                finalScore = average of confidence , communication and correctness ( rounded to the nearest whole number ) .

                Feedback Rules: 
                1. Write a natural human feedback
                2. 10 - 20 words only.
                3. sound like a real interview feedback
                4. can suggest improvement if needed.
                5. Do not repeat the question.
                6. Do not explain the scoring
                7. Keep the tone professional and honet.


                Retun only valid JSON in this format : 

                {
                
                "confidence" : number ,
                "communication" : number ,
                "correctness" : number ,
                "finalScore" : number ,
                "feedback" : "Short human feedback"
                
                }


                `
            

            } ,
            {
                role: "user" , 
                content: `
                Question: ${question.question}
                Answer: ${ answer}
                `
            }
        ]

        const aiResponse = await askAi( messages )

        const parsed = JSON.parse(aiResponse);

        question.answer = answer ; 
        question.confidence = parsed.confidence ;
        question.communication = parsed.communication ; 
        question.correctness = parsed.correctness;
        question.score = parsed.finalScore ?? parsed.score ?? 0;  
        question.feedback = parsed.feedback ; 

        await interview.save() ; 

        return res.status(200).json({
            feedback: parsed.feedback 
        })




    } catch (error) {
        
        return res.status(500).json({
                message:  `Failed to submit answer ! ${error}`
        })
    }

}
    


export const finishInterview = async (req,res) => {
    

    try {
        const { interviewId} = req.body
        const interview = await Interview.findById( interviewId )


        if( !interview ){
              return res.status(400).json({
                message:  `Failed to find interview !`
            })
        }

        const totalQuestions = interview.questions.length ; 

        let totalScore = 0 ; 
        let totalConfidence = 0 ; 
        let totalCommunication = 0 ; 
        let totalCorrectness = 0 ; 

        interview.questions.forEach((q) => {
            totalScore += q.score || 0 ; 
            totalConfidence += q.confidence || 0 ; 
            totalCommunication += q.communication || 0 ; 
            totalCorrectness += q.correctness || 0 ; 


        })

        const finalScore = totalQuestions
        ? totalScore / totalQuestions 
        : 0 ;

        const avgConfidence = totalQuestions
        ? totalConfidence / totalQuestions 
        : 0 ;

        const avgCommunication = totalQuestions
        ? totalCommunication / totalQuestions 
        : 0 ;

        const avgCorrectness= totalQuestions
        ? totalCorrectness/ totalQuestions 
        : 0 ;

        interview.finalScore = finalScore ;
        
        interview.status = "completed";

        await interview.save();

        return res.status(200).json({
               
            finalScore: Number(finalScore.toFixed(1)) ,
            confidence: Number(avgConfidence.toFixed(1)) ,
            communication: Number(avgCommunication.toFixed(1)) ,
            correctness : Number(avgCorrectness.toFixed(1)) ,
            questionWiseScore: interview.questions.map((q) => ({

                question : q.question,
                score : q.score || 0 ,
                feedback: q.feedback || "" , 
                confidence: q.confidence || 0 ,
                communication: q.communication || 0 ,
                correctness: q.correctness || 0 

            }))

        })




    } catch (error) {
         return res.status(500).json({
                message:  `Failed to finish interview !`
            })
    }
}

export const getMyInterviews = async (req,res) => {
    

    try {
        const interview = await Interview.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .select("role experience mode finalScore status createdAt");
        
        return res.status(200).json(interview) ;

    } catch (error) {
        return res.status(500).json({
                message:  `Failed to find currentUser interview ${error} !`
        })
    }


}


export const getInterviewReport = async (req, res) => {
   
    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found!"
            });
        }

        const totalQuestions = interview.questions.length;

        let totalConfidence = 0;
        let totalCommunication = 0;
        let totalCorrectness = 0;

        interview.questions.forEach((q) => {
            totalConfidence += q.confidence || 0;
            totalCommunication += q.communication || 0;
            totalCorrectness += q.correctness || 0;
        });

        const avgConfidence = totalQuestions
            ? totalConfidence / totalQuestions
            : 0;

        const avgCommunication = totalQuestions
            ? totalCommunication / totalQuestions
            : 0;

        const avgCorrectness = totalQuestions
            ? totalCorrectness / totalQuestions
            : 0;

        return res.status(200).json({
            status: interview.status,
            finalScore: interview.finalScore,
            confidence: Number(avgConfidence.toFixed(1)),
            communication: Number(avgCommunication.toFixed(1)),
            correctness: Number(avgCorrectness.toFixed(1)),
            questionWiseScore: interview.questions
        });

    } catch (error) {
        return res.status(500).json({
            message: `Failed to fetch interview report! ${error.message}`
        });
    }
};



// export const getInterviewReport = async (req,res) => {
    

//     try {
        
//         const interview = await Interview.findById(req.params.id) ; 

//         if( !interview ){
//              return res.status(404).json({
//                 message:  `interview Not found !`
//             })
//         }

//         const totalQuestions = interview.questions.length ; 

      
//         let totalConfidence = 0 ; 
//         let totalCommunication = 0 ; 
//         let totalCorrectness = 0 ; 

//         interview.questions.forEach((q) => {


//             totalScore += q.score || 0 ; 
//             totalConfidence += q.confidence || 0 ; 
//             totalCommunication += q.communication || 0 ; 
//             totalCorrectness += q.correctness || 0 ; 


//         })

       

//         const avgConfidence = totalQuestions
//         ? totalConfidence / totalQuestions 
//         : 0 ;

//         const avgCommunication = totalQuestions
//         ? totalCommunication / totalQuestions 
//         : 0 ;

//         const avgCorrectness= totalQuestions
//         ? totalCorrectness/ totalQuestions 
//         : 0 ;

        
//         return res.json({
               
//             finalScore: interview.finalScore,
//             confidence: Number(avgConfidence.toFixed(1)) ,
//             communication: Number(avgCommunication.toFixed(1)) ,
//             correctness : Number(avgCorrectness.toFixed(1)) ,
//             questionWiseScore: interview.questions

//          }) ; 






//     } catch (error) {
//          return res.status(500).json({
//                 message:  `Failed to find currentUser interview Report ${error} !`
//             })
        
//     }

// }




