const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());



const OpenAI = require("openai")
app.use(express.json())

let userprompt = '';


const openai = new OpenAI({
    apiKey:""
})


app.post('/submit', async (req, res) => {
    const userData = req.body.userPrompt;
    userprompt = ''
    userprompt = userData
  
    console.log('Received user data:', userData);
  
    // res.json({ message: 'User data received successfully..!' });
  });

app.get('/message',async(req,res)=>{


    //console.log("userprompt from get:----", userprompt)
    
    const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{"role":"user","content":userprompt}],
        max_tokens: 100

    })
    console.log(response.choices[0])
    res.json({message: response.choices[0].message.content});
    // res.json({ message: userprompt});

})

  

app.listen(8000,()=>{
    console.log("server started")
})
