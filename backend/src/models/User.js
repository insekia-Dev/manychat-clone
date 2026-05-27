const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  phone: { type: String },
  avatar: { type: String },
  
  // User role
  role: {
    type: String,
    enum: ['user', 'admin', 'support_agent'],
    default: 'user'
  },

  // Team and subscription
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },

  // WhatsApp integration
  whatsappConnected: { type: Boolean, default: false },
  whatsappPhone: { type: String },
  whatsappSession: { type: String },
  whatsappStatus: { type: String, enum: ['connected', 'disconnected', 'scanning'], default: 'disconnected' },

  // Account status
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,

  // Security
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  lastLogin: { type: Date },

  // Preferences
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' }
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date }
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ team: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if account is locked
userSchema.methods.isLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.verificationToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);