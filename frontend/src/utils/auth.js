import { jwtDecode } from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function getTokenExpiration() {
  const exp = localStorage.getItem('token_expiration');
  return exp ? parseInt(exp, 10) : null;
}

export function isTokenValid() {
  const token = getToken();
  const expiration = getTokenExpiration();
  if (!token || !expiration) return false;
  return Date.now() < expiration;
}

export function getUserFromToken() {
  const token = getToken();
  if (!token || !isTokenValid()) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getUserId() {
  const user = getUserFromToken();
  return user?.user_id ?? null;
}

export function saveToken(token) {
  const decoded = jwtDecode(token);
  const expireTime = decoded.exp * 1000;
  localStorage.setItem('token', token);
  localStorage.setItem('token_expiration', expireTime);
  if (decoded.user_id) {
    sessionStorage.setItem('user_id', decoded.user_id);
  }
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('token_expiration');
  sessionStorage.removeItem('user_id');
}
