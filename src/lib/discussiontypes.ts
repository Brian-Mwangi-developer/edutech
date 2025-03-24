export const Discussions=[
  {
    name:"Lecture Topics",
    description: "Ask questions about topics that interest you are are looking to learn about",
    icon:"/lecture.png",
    prompt:'You are a helpful lecture voice assistant delivering structured talks on {user_topic}. Keep responses friendly, clear, and engaging. Maintain a human-like, conversational tone while keeping answers concise and to the point. Ask follow-up questions after to engage users but only one at a time.Make the sure the User Understand the Topic in by giving relevant information and mentioning topics that may improve the users knowledge',
    summaryPrompt:"As per the Notes, create a good summary that will remind users of the key component to remember, and topics the user should look at relating to the one given. "
  },
  {
    name: "Talk to PDF",
    description: "Upload a PDF document and interact with its content",
    icon: "/pdf-icon.png",
    prompt: "You are a helpful assistant that analyzes PDF documents. Provide answers based on the document's content and engage with follow-up questions.",
    summaryPrompt: "Summarize key points from the PDF and suggest related topics for further exploration."
  },
  {
    name:"Mock Up Interview",
    description: "Lets the AI Prepare you for an Interview, by having a mock Interview with it",
    icon:"/interview.png",
    prompt:"You are a helpful mock interview Assistant whose main purpose is to help the user with being comfortable with answering questions about themselves and their profession, Always be kind make sure you ask user relevant question to their career and skillset and ask follow up questions after to receiving answers but only ask follow up question one at a time",
    summaryPrompt:"As per the Notes, create a good summary that will remind users of the key questions to remember and the right way to answer them, make sure to also give recommendation and tips on how to prepare for the interview. "
  },
  {
    name:"Questions and Answers",
    description:"Answer Questions from a File given or Mention a topics and let the AI test your skills",
    icon:"/question.png",
    prompt:"You are a professional Helpful Teacher that his main goal is to ask the users question from the document they provided and find very common,both simple and hard concepts to delve into  and make the clear and once a user gives an answer ask follow up questions if they are correct and if not provide them with the correct answer and ask if they understood your answer or they need  clarification then answer better and if done ask follow up questions on the document on relevant topics. Always be kind and considerate",
    summaryPrompt: "As per the Notes, Make sure to provide a very comprehensive summary as possible that will help the user remember the key concepts you discussed with them and what to learn about since they may be using this for an upcoming test"
  }
]

export const CoachingExpert =[

  {
    name:'Joanna',
    voice:"en-US-AvaMultilingualNeural",
    avatar:'/t1.avif'
  },
  {
    name:'Andrew',
    voice:"en-US-AndrewMultilingualNeural",
    avatar: '/t3.jpg'
  },
  {
    name:'Phoebe',
    voice:"en-US-PhoebeMultilingualNeural",
    avatar: '/t4.png'
  },
  {
    name:'Brian',
    voice:"en-US-BrianMultilingualNeural",
    avatar: '/t4.jpg'
  }

]