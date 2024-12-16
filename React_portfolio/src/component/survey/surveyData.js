// src/components/Survey/SurveyData.js

const surveyData = {
    title: "Jolocorp Survey",
    description: "Assessing the ambition of the Individual",
    videoSrc: "/videos/indexvideo.mov", // Updated path from public/videos
    questions: {
      questionChoice: [
        "(please select)",
        "Are you a good person?",
        "Are you ambitious?",
      ],
      incomeLevels: [
        { value: 1, label: "10k" },
        { value: 2, label: "20k" },
        { value: 3, label: "30k" },
        { value: 4, label: "40k" },
        { value: 5, label: "50k" },
      ],
      occupations: [
        { value: 26, label: "Businessperson" },
        { value: 25, label: "Politician" },
      ],
    },
    placeholders: {
      name: "Annalena Baerbock",
      email: "ab@gmail.com",
      age: "40",
      textarea: "I want to be successful",
    },
  };
  
  export default surveyData;
  