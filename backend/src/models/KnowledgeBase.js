const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  icon: { type: String, default: 'book' },

  // Articles
  articles: [{
    id: String,
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: String,
    tags: [String],
    embedding: [Number], // Vector for semantic search
    views: { type: Number, default: 0 },
    helpful: { type: Number, default: 0 },
    notHelpful: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],

  // FAQs
  faqs: [{
    id: String,
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: String,
    embedding: [Number],
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }],

  // Categories
  categories: [{
    id: String,
    name: String,
    description: String,
    icon: String
  }],

  // Settings
  settings: {
    isPublic: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    allowRatings: { type: Boolean, default: true },
    searchable: { type: Boolean, default: true }
  },

  // AI retrieval settings
  aiSettings: {
    enabled: { type: Boolean, default: true },
    minSimilarity: { type: Number, default: 0.7 },
    maxResults: { type: Number, default: 5 },
    model: { type: String, default: 'text-embedding-ada-002' }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

knowledgeBaseSchema.index({ user: 1 });
knowledgeBaseSchema.index({ 'articles.tags': 1 });
knowledgeBaseSchema.index({ 'faqs.category': 1 });
knowledgeBaseSchema.index({ createdAt: -1 });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);