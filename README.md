# WhatsApp ManyChat Clone

A comprehensive WhatsApp automation platform with QR code login, AI-powered flows, customer support, and admin dashboard.

## 🎯 Features

### Core Features
- ✅ **Unofficial QR Code WhatsApp Login** - Easy authentication via Baileys
- ✅ **WhatsApp Flows** - Drag-and-drop flow builder with conditions
- ✅ **Automated Bots** - AI-powered chatbots with custom rules
- ✅ **Auto-replies** - Smart automatic response system
- ✅ **Customer Support Sessions** - Ticket management and team collaboration
- ✅ **Team Management** - Multi-user workspace with role-based access
- ✅ **Web Server Replies** - Webhook integration for dynamic responses
- ✅ **AI Replies** - GPT-4 powered intelligent responses
- ✅ **Knowledge Base** - AI-powered semantic search and retrieval

### Admin Panel
- ✅ **Admin Control Panel** - Full administrative control
- ✅ **User Management** - View, manage, and control users
- ✅ **AI Rules Configuration** - Set custom AI behavior rules
- ✅ **Legal Policies** - Manage terms, privacy policies
- ✅ **Plan Management** - Create and manage subscription tiers
- ✅ **Analytics Dashboard** - System-wide insights and metrics

### User Dashboards
- ✅ **User Dashboard** - Personal workspace with analytics
- ✅ **Admin Dashboard** - System administration and monitoring

### Payment Integration
- ✅ Fapshi
- ✅ Mesomb
- ✅ Flutterwave
- ✅ Swychr Connect

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18+
- **Database:** MongoDB 5.0+ / PostgreSQL
- **Cache:** Redis 7.0+
- **Real-time:** Socket.io 4.6+
- **WhatsApp:** Baileys 6.3+
- **AI:** OpenAI API (GPT-4)
- **Authentication:** JWT

### Frontend
- **Framework:** Next.js 13+
- **UI:** React 18+ with Tailwind CSS
- **State:** Redux & Redux Toolkit
- **HTTP:** Axios
- **Real-time:** Socket.io Client
- **Charts:** Recharts
- **Icons:** React Icons

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx
- **Logging:** Winston
- **Validation:** Joi
- **File Upload:** Multer

## 📁 Project Structure

```
manychat-clone/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── whatsapp/
│   │   ├── flows/
│   │   ├── bots/
│   │   ├── support/
│   │   ├── teams/
│   │   ├── ai/
│   │   ├── knowledge-base/
│   │   ├── payments/
│   │   ├── admin/
│   │   ├── webhooks/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── dashboards/
│   │   ├── admin/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── styles/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── API.md
│   ├── INSTALLATION.md
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- MongoDB 5.0+
- Redis 7.0+

### Installation

```bash
# Clone repository
git clone https://github.com/insekia-Dev/manychat-clone.git
cd manychat-clone

# Copy environment file
cp .env.example .env

# Start with Docker Compose
docker-compose up -d

# Access the application
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api
```

## 📖 Documentation

- [API Documentation](./docs/API.md)
- [Installation Guide](./docs/INSTALLATION.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment](./docs/DEPLOYMENT.md)

## 📝 License

MIT