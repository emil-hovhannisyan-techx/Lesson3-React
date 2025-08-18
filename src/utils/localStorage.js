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

// //Article utilities
const ARTICLES_KEY = "userArticles";

export const getArticlesForUser = (userId) => {
  try {
    const allArticles = localStorage.getItem(ARTICLES_KEY);
    if (!allArticles) return [];

    const articlesData = JSON.parse(allArticles);
    return articlesData[userId] || [];
  } catch (error) {
    console.error("Error reading articles from localStorage:", error);
    return [];
  }
};

export const saveArticleForUser = (userId, article) => {
  try {
    const allArticles = localStorage.getItem(ARTICLES_KEY);
    const articlesData = allArticles ? JSON.parse(allArticles) : {};

    if (!articlesData[userId]) {
      articlesData[userId] = [];
    }

    articlesData[userId] = [article, ...articlesData[userId]];
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articlesData));
    return true;
  } catch (error) {
    console.error("Error saving article to localStorage:", error);
    return false;
  }
};

export const deleteArticleForUser = (userId, articleId) => {
  try {
    const allArticles = localStorage.getItem(ARTICLES_KEY);
    if (!allArticles) return false;

    const articlesData = JSON.parse(allArticles);
    if (!articlesData[userId]) return false;

    articlesData[userId] = articlesData[userId].filter(
      (article) => article.id !== articleId
    );
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articlesData));
    return true;
  } catch (error) {
    console.error("Error deleting article from localStorage:", error);
    return false;
  }
};
