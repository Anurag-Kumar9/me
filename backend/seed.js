require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const connectDB = require('./config/db');

const seedData = {
  name: "Anurag Kumar",
  title: "Software Developer",
  description: "I build things that work.",
  email: "kumar94anurag@gmail.com",
  skills: ["Python", "C/C++", "HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "AI/ML/DL"],
  education: [
    { college: "National Institute of Technology Delhi", degree: "B.Tech. Computer Science", year: "2023-27" }
  ],
  links: {
    github: "https://github.com/Anurag-Kumar9",
    linkedin: "https://www.linkedin.com/in/anurag-kumar9/",
    resume: "https://drive.google.com/file/d/1AV3qVm5JtvTk0nh50jQzaFJqn6emZgDN/view?usp=drive_link"
  },
  projects: [
    {
      title: "End-to-End Restaurant Insights Dashboard",
      description: ["Engineered a full-stack data pipeline to ingest, process, and analyze a 10GB, 7-million-review Yelp dataset, serving complex business insights through a real-time API with millisecond latency.", 
        "Resolved a critical performance bottleneck in the offline pre-computation script by diagnosing an N+1 query issue on an unindexed 7M-row table; implemented a database index that cut the total processing time from a projected 43 days to 2 hours—a 500x speed improvement.",
        "Designed an offline pre-computation strategy to decouple heavy batch processing from the real-time API, generating NLP insights (VADER sentiment, TF-IDF keywords) and user archetypes (K-Means clustering).",
        "Trained and serialized a LogisticRegression text classifier with 98% accuracy to predict 1-star vs. 5-star reviews, exposing it via a dedicated FastAPI endpoint for \"what-if\" analysis."
      ],
      techStack: ["Python", "FastAPI", "Pandas", "Scikit-learn", "Sqlite", "Git"],
      repo: "https://github.com/Anurag-Kumar9/yelp-insights-dashboard"
    },
    {
      title: "Fin-Flex: Personal & Enterprise Finance Manager",
      description: ["Developed a full-stack web application featuring a Cash Flow Optimizer, Loan Scheduler, and Budget Analysis tools to provide users with actionable financial insights.", 
        "Implemented a suite of tools for expense tracking, budget creation, and tax calculation, wrapped in a user-friendly interface to enhance financial decision-making."
      ],
      techStack: ["JavaScript", "Node.js", "Express.js", "MongoDB", "Git"],
      repo: "https://github.com/Anurag-Kumar9/yelp-insights-dashboard"
    }
  ]
};

const importData = async () => {
  await connectDB();
  await Profile.deleteMany(); // Clear old data
  await Profile.create(seedData);
  console.log('Data Imported!');
  process.exit();
};

importData();