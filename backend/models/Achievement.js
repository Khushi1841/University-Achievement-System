const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  university_name: { 
    type: String, 
    required: true, 
    default: "Shobhit University" 
  },
  college_name: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true,
    // enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'BCA', 'MCA', 'BBA', 'MBA', 'Other'] 
  },
  year: { 
    type: Number, 
    required: true 
  },
  semester: { 
    type: String, 
    enum: ['Odd', 'Even'], 
    required: true 
  },
  batch: { 
    type: String, 
    default: "" 
  },
  achievement_category: { 
    type: String, 
    required: true,
    enum: ['Academics', 'Technical', 'Sports', 'Cultural', 'Social & Leadership', 'Professional']
  },
  achievement_subtype: { 
    type: String, 
    required: true 
  },
  event_name: { 
    type: String, 
    required: true 
  },
  level: { 
    type: String, 
    required: true,
    enum: ['Inter-College', 'State', 'National', 'International', 'University Level']
  },
  position: { 
    type: String, 
    required: true 
  },
  participant_type: { 
    type: String, 
    required: true,
    enum: ['Student', 'Faculty']
  },
  participant_name: { 
    type: String, 
    required: true 
  },
  team_or_individual: { 
    type: String, 
    enum: ['Individual', 'Team'], 
    required: true 
  },
  faculty_mentor: { 
    type: String 
  },
  date: { 
    type: Date, 
    required: true 
  },
 
  photo: { 
    type: String, 
    default: "" 
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);