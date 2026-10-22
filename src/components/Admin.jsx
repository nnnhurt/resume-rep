import { useEffect, useState } from 'react';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({ totalVisits: 0, pageViews: 0, activeUsers: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    return false;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        await checkAuth();
      } else {
        setError(data.error || 'Неверные учётные данные');
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setStats({ totalVisits: 0, pageViews: 0, activeUsers: 0 });
  }

  async function refreshStats() {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(refreshStats, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h1 className="admin-title">Админ-панель</h1>
          <p className="admin-subtitle">Введите учётные данные</p>
          <form className="admin-form" onSubmit={handleLogin}>
            <div className="admin-field">
              <label htmlFor="admin-user">Имя пользователя</label>
              <input
                id="admin-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="admin-pass">Пароль</label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="admin-error">{error}</p>}
            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card admin-dashboard">
        <h1 className="admin-title">Статистика сайта</h1>
        <p className="admin-subtitle">Данные обновляются автоматически</p>
        <div className="admin-stats">
          <div className="admin-stat">
            <i className="nf nf-fa-users admin-stat-icon" />
            <div className="admin-stat-value">
              {stats.totalVisits.toLocaleString('ru-RU')}
            </div>
            <div className="admin-stat-label">Всего посетителей</div>
          </div>
          <div className="admin-stat">
            <i className="nf nf-fa-eye admin-stat-icon" />
            <div className="admin-stat-value">
              {stats.pageViews.toLocaleString('ru-RU')}
            </div>
            <div className="admin-stat-label">Просмотров страниц</div>
          </div>
          <div className="admin-stat">
            <i className="nf nf-fa-bolt admin-stat-icon" />
            <div className="admin-stat-value">
              {stats.activeUsers.toLocaleString('ru-RU')}
            </div>
            <div className="admin-stat-label">Сейчас на сайте</div>
          </div>
        </div>
        <div className="admin-actions">
          <button className="admin-btn admin-btn-secondary" onClick={refreshStats}>
            <i className="nf nf-fa-refresh" />
            Обновить
          </button>
          <button className="admin-btn admin-btn-outline" onClick={handleLogout}>
            <i className="nf nf-fa-sign_out" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
