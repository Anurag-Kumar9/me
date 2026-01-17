# Database Schema & Indexes Documentation

## Overview

The portfolio app uses a **single-document MongoDB collection** called `profiles`. All profile data (personal info, education, projects, etc.) is stored as nested arrays within one document.

## Schema Structure

```javascript
{
  _id: ObjectId,
  name: String (required),
  title: String,
  description: String,
  email: String,
  skills: [String],
  education: [
    {
      college: String,
      degree: String,
      year: String
    }
  ],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String
  },
  projects: [
    {
      title: String,
      description: [String],
      techStack: [String],
      link: String,
      repo: String
    }
  ]
}
```

## Detailed Field Descriptions

### Root Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | MongoDB document ID |
| `name` | String |  Yes | Full name (e.g., "Anurag Kumar") |
| `title` | String |  No | Job title (e.g., "Software Developer") |
| `description` | String |  No | Bio/intro text |
| `email` | String |  No | Contact email |
| `skills` | [String] |  No | Array of skill names |

### Education Array

Nested array of education entries:

```javascript
education: [
  {
    college: "National Institute of Technology Delhi",
    degree: "B.Tech. Computer Science",
    year: "2023-27"
  }
]
```

| Field | Type | Description |
|-------|------|-------------|
| `college` | String | Institution name |
| `degree` | String | Degree/qualification |
| `year` | String | Duration (e.g., "2023-27") |

### Links Object

Social and professional links:

```javascript
links: {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  portfolio: "https://yoursite.com",
  resume: "https://drive.google.com/file/d/..."
}
```

### Projects Array

Array of project objects:

```javascript
projects: [
  {
    title: "Project Name",
    description: [
      "First achievement/feature",
      "Second achievement/feature"
    ],
    techStack: ["React", "Node.js", "MongoDB"],
    link: "https://project-demo.com",
    repo: "https://github.com/username/project"
  }
]
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Project name |
| `description` | [String] | Array of bullet points/achievements |
| `techStack` | [String] | Array of technologies used |
| `link` | String | Live demo/project link |
| `repo` | String | GitHub repository URL |

## Indexes

### Current Index

**Text Index (Full Text Search)**
```javascript
ProfileSchema.index({ '$**': 'text' });
```

This creates a **wildcard text index** on all fields, enabling full-text search across:
- `name`
- `title`
- `description`
- `email`
- `skills`
- `education[].college`, `education[].degree`
- `projects[].title`, `projects[].description`
- `projects[].techStack`
- `links` object values

**Use Case**: `GET /api/search?q=python` searches all text fields

### Additional Indexes You Could Add

For better performance on common queries:

```javascript
// Single field index for email lookups
ProfileSchema.index({ email: 1 });

// Compound index for filtering projects by skill
ProfileSchema.index({ 'projects.techStack': 1 });

// Unique index on email (if you want to enforce uniqueness)
ProfileSchema.index({ email: 1 }, { unique: true });
```

## Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Anurag Kumar",
  "title": "Software Developer",
  "description": "I build things that work.",
  "email": "kumar94anurag@gmail.com",
  "skills": ["Python", "C/C++", "JavaScript", "Node.js", "MongoDB"],
  "education": [
    {
      "college": "National Institute of Technology Delhi",
      "degree": "B.Tech. Computer Science",
      "year": "2023-27"
    }
  ],
  "links": {
    "github": "https://github.com/Anurag-Kumar9",
    "linkedin": "https://www.linkedin.com/in/anurag-kumar9/",
    "resume": "https://drive.google.com/file/d/..."
  },
  "projects": [
    {
      "title": "End-to-End Restaurant Insights Dashboard",
      "description": [
        "Engineered a full-stack data pipeline...",
        "Resolved a critical performance bottleneck..."
      ],
      "techStack": ["Python", "FastAPI", "Pandas", "MongoDB"],
      "repo": "https://github.com/Anurag-Kumar9/yelp-insights"
    },
    {
      "title": "Fin-Flex: Finance Manager",
      "description": [
        "Developed full-stack web application...",
        "Implemented expense tracking tools..."
      ],
      "techStack": ["JavaScript", "Node.js", "Express", "MongoDB"],
      "repo": "https://github.com/Anurag-Kumar9/fin-flex"
    }
  ]
}
```

## Query Examples

### Get Full Profile
```javascript
Profile.findOne() // Returns the single profile document
```

### Search by Skill
```javascript
Profile.findOne({ 'projects.techStack': 'Python' })
```

### Text Search
```javascript
Profile.find({ $text: { $search: 'machine learning' } })
```

### Filter Projects by Tech Stack
```javascript
const profile = await Profile.findOne();
const filtered = profile.projects.filter(p => 
  p.techStack.includes('React')
);
```

## Performance Notes

- **Single Document**: Since the entire profile is one document, queries are fast
- **Text Index**: The wildcard text index enables fast full-text search across all fields
- **Array Filtering**: Filtering projects/education on the application level is efficient with one document
- **Scalability**: This design is ideal for a single-user portfolio; for multi-user systems, you'd restructure the schema

## Updating Data

### Add a New Project
```javascript
await Profile.findOneAndUpdate(
  {},
  { 
    $push: { 
      projects: { 
        title: "New Project",
        description: ["Feature 1"],
        techStack: ["Tech"],
        repo: "https://github.com/..."
      } 
    } 
  },
  { new: true }
);
```

### Update Skills
```javascript
await Profile.findOneAndUpdate(
  {},
  { skills: ["Python", "JavaScript", "Go"] },
  { new: true }
);
```

### Add Education
```javascript
await Profile.findOneAndUpdate(
  {},
  { 
    $push: { 
      education: { 
        college: "University Name",
        degree: "Degree",
        year: "2023-2027"
      } 
    } 
  },
  { new: true }
);
```

## Connection & Seeding

### Initial Setup (seed.js)
```javascript
await Profile.deleteMany(); // Clear old data
await Profile.create(seedData); // Insert new data
```

### Updating Without Losing Data
```javascript
// Use findOneAndUpdate instead of recreating
await Profile.findOneAndUpdate({}, seedData, { upsert: true });
```

---

**Note**: The current index configuration supports the existing API. Add more indexes based on future query patterns for optimization.
