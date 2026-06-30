import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import userAPI from '../APIs/userAPI';
import wishlistAPI from '../APIs/wishlistAPI';
import {
  isTokenValid,
  getToken,
  saveToken,
  clearAuth,
  getUserFromToken,
} from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
  const [user, setUser] = useState(getUserFromToken());
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const refreshCartCount = useCallback(async () => {
    if (!isTokenValid()) {
      setCartCount(0);
      return;
    }
    try {
      const result = await wishlistAPI.get();
      if (result?.success && Array.isArray(result.result)) {
        setCartCount(result.result.length);
      }
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refreshCartCount();
    }
  }, [isLoggedIn, refreshCartCount]);

  useEffect(() => {
    const checkExpiration = () => {
      if (getToken() && !isTokenValid()) {
        clearAuth();
        setIsLoggedIn(false);
        setUser(null);
        setCartCount(0);
      }
    };
    const interval = setInterval(checkExpiration, 30000);
    return () => clearInterval(interval);
  }, []);

  async function register(data) {
    try {
      const result = await userAPI.register(data);
      saveToken(result.token);
      setUser(result.user);
      setIsLoggedIn(true);
      showToast('Account created successfully!');
      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async function login(data) {
    try {
      const result = await userAPI.login(data);
      saveToken(result.token);
      setUser(result.user);
      setIsLoggedIn(true);
      showToast('Welcome back!');
      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  function logout() {
    clearAuth();
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
    showToast('Logged out successfully');
    return { success: true };
  }

  async function addToCart({ item_id, price, quantity, image, category, title }) {
    try {
      const result = await wishlistAPI.add({
        item_id,
        price,
        quantity,
        image,
        category,
        title,
      });
      if (result?.error) {
        if (result.error === 'Session expired, please login to continue.' ||
            result.error === 'Please login to continue') {
          clearAuth();
          setIsLoggedIn(false);
          setUser(null);
        }
        return { success: false, error: result.error };
      }
      await refreshCartCount();
      showToast('Added to cart!');
      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async function deleteFromCart({ wishlist_itemid }) {
    try {
      const result = await wishlistAPI.delete({ wishlist_itemid });
      if (result?.error) {
        return { success: false, error: result.error };
      }
      setCartCount((prev) => Math.max(0, prev - 1));
      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        cartCount,
        toast,
        register,
        login,
        logout,
        addToCart,
        deleteFromCart,
        refreshCartCount,
        showToast,
      }}
    >
      {children}
      {toast && <div className="toast">{toast}</div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
