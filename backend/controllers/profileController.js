const Profile = require('../models/Profile');

// @desc    Get main profile
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne(); // Assuming single user system
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Search projects by skill
// @route   GET /api/projects?skill=python
const getProjects = async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    let projects = profile.projects;
    
    if (skill) {
      // Filter projects that include the skill (case-insensitive)
      projects = projects.filter(p => 
        p.techStack.some(s => s.toLowerCase() === skill.toLowerCase())
      );
    }
    
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, getProjects };