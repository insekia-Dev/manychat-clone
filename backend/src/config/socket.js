const logger = require('../utils/logger');

module.exports = (io) => {
  io.on('connection', (socket) => {
    logger.info(`👤 User connected: ${socket.id}`);

    // ===== WHATSAPP EVENTS =====
    socket.on('whatsapp:qr', (qrCode) => {
      socket.broadcast.emit('auth:qr', { qrCode, userId: socket.handshake.auth.userId });
    });

    socket.on('whatsapp:ready', (data) => {
      socket.broadcast.emit('auth:ready', { userId: data.userId });
      logger.info(`✅ WhatsApp ready for user: ${data.userId}`);
    });

    socket.on('whatsapp:message', (data) => {
      io.emit('message:received', {
        from: data.from,
        to: data.to,
        message: data.message,
        timestamp: new Date()
      });
    });

    socket.on('whatsapp:status', (data) => {
      socket.broadcast.emit('status:update', data);
    });

    // ===== SUPPORT EVENTS =====
    socket.on('support:join', (sessionId) => {
      socket.join(`support:${sessionId}`);
      logger.info(`📞 Joined support session: ${sessionId}`);
    });

    socket.on('support:message', (data) => {
      io.to(`support:${data.sessionId}`).emit('support:message', {
        from: data.from,
        message: data.message,
        timestamp: new Date(),
        sessionId: data.sessionId
      });
    });

    socket.on('support:status', (data) => {
      io.to(`support:${data.sessionId}`).emit('support:status', data);
    });

    socket.on('support:leave', (sessionId) => {
      socket.leave(`support:${sessionId}`);
      io.to(`support:${sessionId}`).emit('user:left', { userId: socket.id });
    });

    // ===== FLOW EVENTS =====
    socket.on('flow:execute', (data) => {
      io.emit('flow:executed', {
        flowId: data.flowId,
        result: data.result,
        userId: data.userId
      });
    });

    // ===== BOT EVENTS =====
    socket.on('bot:response', (data) => {
      io.emit('bot:response', {
        botId: data.botId,
        message: data.message,
        userId: data.userId
      });
    });

    // ===== NOTIFICATION EVENTS =====
    socket.on('notification:send', (data) => {
      io.to(`user:${data.userId}`).emit('notification', data);
    });

    // ===== ANALYTICS EVENTS =====
    socket.on('analytics:update', (data) => {
      io.emit('analytics:updated', data);
    });

    // ===== DISCONNECT =====
    socket.on('disconnect', () => {
      logger.info(`👤 User disconnected: ${socket.id}`);
    });

    // ===== ERROR HANDLING =====
    socket.on('error', (error) => {
      logger.error(`Socket error: ${error.message}`);
    });
  });

  // Periodic heartbeat
  setInterval(() => {
    io.emit('heartbeat', { timestamp: new Date() });
  }, 30000);
};