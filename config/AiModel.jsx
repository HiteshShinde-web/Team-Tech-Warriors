const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


   export const GenerateTopicAIModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Learn Python ::As your coaching teacher \n-User want to learn about the course\n-Generate 5-7 Course title for study(Short)\n-Make sure it is related to discription \n-Output will be ARRAY of string in JSON FORMAT only \n-Do not add any plain text in output \n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course_titles\": [\n    \"Python Basics Bootcamp\",\n    \"Data Science with Python\",\n    \"Web Development with Django\",\n    \"Python Automation Mastery\",\n    \"Machine Learning with Python\",\n    \"Python for Cybersecurity\",\n    \"Python Game Development\"\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  export const GenerateCourseAIModel = model.startChat({
    generationConfig,
    history: [
      
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());

