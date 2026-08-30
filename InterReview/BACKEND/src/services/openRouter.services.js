import axios from "axios";



export const askAi =  async (messages) => {
    
    try {
        if( !messages || !Array.isArray(messages) || messages.length === 0 ) {
            throw new Error("Message array is empty ! ") ;
        }

        const reponse = await axios.post('https://openrouter.ai/api/v1/chat/completions' ,
        {
            model:'openai/gpt-4o-mini',
            messages: messages

        },
         {
            headers:{
                Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}` , 
                'Content-Type' : 'application/json',
            },

        }) ; 

        const content = reponse?.data?.choices?.[0]?.message?.content ;

        if( !content || !content.trim() ) {
            throw new Error( " AI has returned empty Response !")
        }

        return content ;

    } catch (error) {
        console.log("OpenRouter error: ", error.response?.data || error.message ) ; 
        //throw new Error( " OpenRouter API error !")
        throw new Error(
            error.response?.data?.error?.message || error.message
        ); 


    }
}