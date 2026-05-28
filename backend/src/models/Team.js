const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a team name'],
    trim: true
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Team members with roles
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: {
      type: String,
      enum: ['owner', 'admin', 'manager', 'member'],
      default: 'member'
    },
    joinedAt: { type: Date, default: Date.now },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],

  // Permissions by role
  permissions: {
    owner: {
      canManageUsers: { type: Boolean, default: true },
      canCreateFlows: { type: Boolean, default: true },
      canManageBots: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: true },
      canManagePayments: { type: Boolean, default: true },
      canManageSettings: { type: Boolean, default: true }
    },
    admin: {
      canManageUsers: { type: Boolean, default: true },
      canCreateFlows: { type: Boolean, default: true },
      canManageBots: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: true },
      canManagePayments: { type: Boolean, default: false },
      canManageSettings: { type: Boolean, default: true }
    },
    manager: {
      canManageUsers: { type: Boolean, default: false },
      canCreateFlows: { type: Boolean, default: true },
      canManageBots: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: true },
      canManagePayments: { type: Boolean, default: false },
      canManageSettings: { type: Boolean, default: false }
    },
    member: {
      canManageUsers: { type: Boolean, default: false },
      canCreateFlows: { type: Boolean, default: true },
      canManageBots: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: false },
      canManagePayments: { type: Boolean, default: false },
      canManageSettings: { type: Boolean, default: false }
    }
  },

  // Workspace settings
  settings: {
    logo: String,
    color: String,
    language: { type: String, default: 'en' }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

teamSchema.index({ owner: 1 });
teamSchema.index({ 'members.user': 1 });
teamSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Team', teamSchema);