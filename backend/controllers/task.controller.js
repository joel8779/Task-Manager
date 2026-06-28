const Task = require('../models/task.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// @desc    Create a new task
// @route   POST /tasks
// @access  Public
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  // Manual check for title to provide a clean message if needed, though Mongoose validation will catch it.
  if (!title || title.trim() === '') {
    return next(new AppError('Task title is required', 400));
  }

  // Create task using schema defaults
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate: dueDate || undefined
  });

  res.status(201).json({
    status: 'success',
    data: {
      task
    }
  });
});

// @desc    Get all tasks with optional searching, filtering, and sorting
// @route   GET /tasks
// @access  Public
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const { search, status, priority, sortBy } = req.query;
  const filter = {};

  // 1. Search by title (case-insensitive regex)
  if (search && search.trim() !== '') {
    filter.title = { $regex: search.trim(), $options: 'i' };
  }

  // 2. Filter by status
  if (status && status !== 'All' && status.trim() !== '') {
    filter.status = status;
  }

  // 3. Filter by priority
  if (priority && priority !== 'All' && priority.trim() !== '') {
    filter.priority = priority;
  }

  // Build query
  let query = Task.find(filter);

  // 4. Sort tasks
  if (sortBy === 'dueDate') {
    // Sort by due date ascending (closest deadline first). 
    // MongoDB places documents without dueDate at the beginning.
    // To be more user friendly, we can do a secondary sort or handle sorting in JS if needed,
    // but MongoDB sorting is more performant. We'll sort by dueDate: 1, then createdAt: -1.
    query = query.sort({ dueDate: 1, createdAt: -1 });
  } else if (sortBy === 'oldest') {
    query = query.sort({ createdAt: 1 });
  } else {
    // Default or 'newest'
    query = query.sort({ createdAt: -1 });
  }

  const tasks = await query;

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});

// @desc    Get a single task by ID
// @route   GET /tasks/:id
// @access  Public
exports.getTaskById = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError(`No task found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

// @desc    Update a task by ID
// @route   PUT /tasks/:id
// @access  Public
exports.updateTask = catchAsync(async (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (title !== undefined && title.trim() === '') {
    return next(new AppError('Task title cannot be empty', 400));
  }

  const updatedData = {
    title,
    description,
    status,
    priority,
    // If dueDate is passed as null or empty string, we can unset it or set it to null
    dueDate: dueDate === '' || dueDate === null ? null : dueDate
  };

  const task = await Task.findByIdAndUpdate(req.params.id, updatedData, {
    new: true, // returns the updated document
    runValidators: true // runs schema validation again on updates
  });

  if (!task) {
    return next(new AppError(`No task found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

// @desc    Delete a task by ID
// @route   DELETE /tasks/:id
// @access  Public
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return next(new AppError(`No task found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Task deleted successfully',
    data: null
  });
});
