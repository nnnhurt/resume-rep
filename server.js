import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const ACTIVE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const STATS_FILE = path.join(__dirname, 'data', 'stats.json');

// Ensure data directory exists
const dataDir = path.dirname(STATS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load or initialize stats
function loadStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        totalVisits: Number(parsed.totalVisits) || 0,
        pageViews: Number(parsed.pageViews) || 0,
        sessions: new Map(Object.entries(parsed.sessions || {})),
      };
    }
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
  return {
    totalVisits: 0,
    pageViews: 0,
    sessions: new Map(),
  };
}

function saveStats() {
  try {
    const sessionsObj = Object.fromEntries(stats.sessions);
    fs.writeFileSync(
      STATS_FILE,
      JSON.stringify(
        {
          totalVisits: stats.totalVisits,
          pageViews: stats.pageViews,
          sessions: sessionsObj,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.error('Failed to save stats:', err);
  }
}

const stats = loadStats();

app.use(express.json());
app.use(cookieParser());

// Track visits and active users
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  // Skip admin path and API
  if (req.path.startsWith('/dhdglol666') || req.path.startsWith('/api/admin')) {
    return next();
  }

  // Count page view for the main SPA entry
  if (req.path === '/' || req.path === '/index.html') {
    stats.pageViews += 1;
  }

  let sessionId = req.cookies.sessionId;
  const now = Date.now();

  if (!sessionId) {
    sessionId = `${now}-${Math.random().toString(36).slice(2)}`;
    res.cookie('sessionId', sessionId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });
    stats.totalVisits += 1;
  }

  stats.sessions.set(sessionId, now);
  next();
});

// Cleanup inactive sessions every 60 seconds
setInterval(() => {
  const now = Date.now();
  let changed = false;
  for (const [sessionId, lastActive] of stats.sessions.entries()) {
    if (now - lastActive > ACTIVE_TIMEOUT_MS) {
      stats.sessions.delete(sessionId);
      changed = true;
    }
  }
  if (changed) {
    saveStats();
  }
}, 60000);

// Save stats every 30 seconds
setInterval(saveStats, 30000);

// Admin auth middleware
function requireAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.clearCookie('adminToken');
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// API: login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('adminToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// API: logout
app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true });
});

// API: stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  res.json({
    totalVisits: stats.totalVisits,
    pageViews: stats.pageViews,
    activeUsers: stats.sessions.size,
  });
});

// Serve static site
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/dhdglol666`);
});
