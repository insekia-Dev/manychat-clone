const mongoose = require('mongoose');

const supportSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Customer info
  customer: {
    phone: { type: String, required: true },
    name: String,
    email: String,
    whatsappId: String,
    customFields: mongoose.Schema.Types.Mixed
  },

  // Session details
  status: {
    type: String,
    enum: ['open', 'pending', 'in_progress', 'waiting', 'resolved', 'closed'],
    default: 'open'
  },
  
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },

  // Messages
  messages: [{
    id: String,
    from: String,
    to: String,
    text: String,
    mediaUrl: String,
    mediaType: { type: String, enum: ['text', 'image', 'document', 'audio', 'video'] },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed
  }],

  // Priority and tags
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  tags: [String],
  category: String,

  // Notes and resolution
  notes: String,
  internalNotes: String,
  resolution: String,

  // Timing
  responseTime: Number, // milliseconds
  resolutionTime: Number,

  // Statistics
  stats: {
    messageCount: { type: Number, default: 0 },
    lastMessageAt: Date,
    reopenCount: { type: Number, default: 0 }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  closedAt: Date
});

supportSessionSchema.index({ user: 1 });
supportSessionSchema.index({ status: 1 });
supportSessionSchema.index({ assignedTo: 1 });
supportSessionSchema.index({ 'customer.phone': 1 });
supportSessionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('SupportSession', supportSessionSchema);