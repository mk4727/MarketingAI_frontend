const API_URL = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  auth: {
    signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    me: () => request('/auth/me'),
    updateProfile: (data) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  },
  dashboard: {
    get: () => request('/dashboard'),
  },
  campaigns: {
    list: (platform) => request(`/campaigns${platform ? `?platform=${platform}` : ''}`),
    keywords: (platform) => request(`/campaigns/keywords${platform ? `?platform=${platform}` : ''}`),
  },
  alerts: {
    list: (severity) => request(`/alerts${severity && severity !== 'all' ? `?severity=${severity}` : ''}`),
    markRead: (id) => request(`/alerts/${id}/read`, { method: 'PATCH' }),
    markAllRead: () => request(`/alerts/read-all`, { method: 'PATCH' }),
  },
  reports: {
    list: (type) => request(`/reports${type && type !== 'all' ? `?type=${type}` : ''}`),
    get: (id) => request(`/reports/${id}`),
  },
  ai: {
    chat: (message) => request('/ai/chat', { method: 'POST', body: JSON.stringify({ message }) }),
    history: () => request('/ai/history'),
  },
  settings: {
    accounts: () => request('/settings/accounts'),
    toggleAccount: (id) => request(`/settings/accounts/${id}/toggle`, { method: 'PATCH' }),
  },
  integrations: {
    syncAll: () => request('/integrations/sync/all', { method: 'POST' }),
    syncGoogleAds: () => request('/integrations/sync/google-ads', { method: 'POST' }),
    syncMetaAds: () => request('/integrations/sync/meta-ads', { method: 'POST' }),
    syncShopify: () => request('/integrations/sync/shopify', { method: 'POST' }),
  },
  content: {
    get: async () => request('/content'),
    update: (data) => request('/content', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
