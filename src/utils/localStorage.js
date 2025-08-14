const USER_KEY = "dashboardUser";

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const saved = localStorage.getItem(USER_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};

// Generate unique user ID
export const generateUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
