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
