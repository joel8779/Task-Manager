const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'In Progress', 'Completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: '{VALUE} is not a valid priority'
    },
    default: 'Medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(v) {
        // If no due date is provided, it's valid
        if (!v) return true;
        // Verify due date is a valid date
        return v instanceof Date && !isNaN(v.valueOf());
      },
      message: 'Invalid due date format'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds updatedAt automatically
});

module.exports = mongoose.model('Task', TaskSchema);
