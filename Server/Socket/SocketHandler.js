// server/socket/socketHandler.js

const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let io;
const onlineUsers = new Map(); // userId -> socketId

/**
 * Initialize Socket.IO server
 * @param {http.Server} server 
 */
const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // ------------------------------
  // AUTHENTICATION MIDDLEWARE
  // ------------------------------
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) return next(new Error('Authentication error'));

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      socket.userName = user.name;

      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  // ------------------------------
  // CONNECTION HANDLER
  // ------------------------------
  io.on('connection', (socket) => {
    console.log(`User ${socket.userName} connected`);

    // Track online users
    onlineUsers.set(socket.userId, socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));

    // Join rooms
    socket.join(socket.userRole);          // teacher, student, admin, stakeholder
    socket.join(`user_${socket.userId}`);  // private room
    socket.join(`public_global_room`);     // whole platform

    // ------------------------------
    // 1️⃣ USER ONLINE STATUS
    // ------------------------------
    socket.on("user-online", () => {
      onlineUsers.set(socket.userId, socket.id);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // ------------------------------
    // 2️⃣ REAL-TIME NOTIFICATIONS
    // ------------------------------
    socket.on("send-notification", ({ toUserId, message }) => {
      const userSocket = onlineUsers.get(toUserId);
      if (userSocket) {
        io.to(userSocket).emit("receive-notification", {
          message,
          sender: socket.userName,
          timestamp: new Date()
        });
      }
    });

    // ------------------------------
    // 3️⃣ REAL-TIME CHAT
    // ------------------------------
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("send-message", ({ roomId, message }) => {
      io.to(roomId).emit("new-message", {
        senderId: socket.userId,
        senderName: socket.userName,
        message,
        time: new Date()
      });
    });

    // ------------------------------
    // 4️⃣ ASSESSMENT SUBMISSION → TEACHERS
    // ------------------------------
    socket.on('assessment_submitted', (data) => {
      socket.to('teacher').emit('new_submission', {
        type: 'assessment_submission',
        message: `${socket.userName} submitted ${data.assessmentTitle}`,
        studentId: socket.userId,
        assessmentId: data.assessmentId,
        timestamp: new Date()
      });
    });

    // ------------------------------
    // 5️⃣ ASSESSMENT GRADED → STUDENT
    // ------------------------------
    socket.on('assessment_graded', (data) => {
      io.to(`user_${data.studentId}`).emit('assessment_graded', {
        type: 'grade_received',
        message: `Your ${data.assessmentTitle} has been graded`,
        grade: data.grade,
        feedback: data.feedback,
        assessmentId: data.assessmentId,
        timestamp: new Date()
      });
    });

    // ------------------------------
    // 6️⃣ CURRICULUM UPDATE NOTIFICATIONS
    // ------------------------------
    socket.on('curriculum_updated', (data) => {
      socket.to('stakeholder').emit('curriculum_update', {
        type: 'curriculum_change',
        message: `Curriculum updated: ${data.title}`,
        changes: data.changes,
        timestamp: new Date()
      });
    });

    // ------------------------------
    // DISCONNECT HANDLER
    // ------------------------------
    socket.on('disconnect', () => {
      onlineUsers.delete(socket.userId);
      io.emit("online-users", Array.from(onlineUsers.keys()));
      console.log(`User ${socket.userName} disconnected`);
    });
  });

  return io;
};

// ------------------------------
// EXPORTED HELPERS
// ------------------------------
const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

const notifyUser = (userId, notification) => {
  const userSocket = onlineUsers.get(userId);
  if (userSocket) io.to(userSocket).emit("notification", notification);
};

const notifyRole = (role, notification) => {
  io.to(role).emit("notification", notification);
};

const broadcastToAll = (notification) => {
  io.emit("notification", notification);
};

module.exports = {
  initializeSocket,
  getIO,
  notifyUser,
  notifyRole,
  broadcastToAll
};
