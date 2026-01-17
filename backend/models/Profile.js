const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  description: String,
  email: String,
  skills: [String],
  education: [{
    college: String,
    degree: String,
    year: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String
  },
  projects: [{
    title: String,
    description: [String],
    techStack: [String],
    link: String,
    repo: String
  }]
});

ProfileSchema.index({ '$**': 'text' }); 

module.exports = mongoose.model('Profile', ProfileSchema);