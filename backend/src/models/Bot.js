const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  avatar: { type: String },

  // Bot personality
  personality: {
    tone: { type: String, enum: ['friendly', 'professional', 'casual', 'formal'], default: 'friendly' },
    language: { type: String, default: 'en' },
    instructions: String
  },

  // Response rules
  rules: [{
    id: String,
    trigger: String,
    triggerType: { type: String, enum: ['keyword', 'regex', 'intent'], default: 'keyword' },
    response: String,
    responseType: { type: String, enum: ['text', 'image', 'button', 'carousel'], default: 'text' },
    priority: { type: Number, default: 0 },
    conditions: [{ field: String, operator: String, value: String }]
  }],

  // Auto-reply settings
  autoReply: {
    enabled: { type: Boolean, default: false },
    message: String,
    trigger: String,
    conditions: [{ field: String, operator: String, value: String }]
  },

  // AI settings
  aiEnabled: { type: Boolean, default: false },
  aiModel: { type: String, default: 'gpt-4' },
  aiTemperature: { type: Number, default: 0.7, min: 0, max: 1 },
  knowledgeBase: { type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeBase' },
  aiRules: [String],

  // Webhook integration
  webhookEnabled: { type: Boolean, default: false },
  webhookUrl: String,
  webhookSecret: String,

  // Status
  isActive: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: false },

  // Statistics
  stats: {
    messagesHandled: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

botSchema.index({ user: 1 });
botSchema.index({ isActive: 1 });
botSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Bot', botSchema);