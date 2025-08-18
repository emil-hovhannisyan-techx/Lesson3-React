import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PenTool, BookOpen, FileText, Calendar } from "lucide-react";
import UserContext from "../../context/UserContext";
import "./Article.css";
import {
  getArticlesForUser,
  deleteArticleForUser,
} from "../../utils/localStorage";
import ArticleCard from "./ArticleCard";
import WriteArticleForm from "./ArticleForm";

// Main Article Writer Component
const Article = () => {
  const { currentUser, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [showWriteForm, setShowWriteForm] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setShowWriteForm(searchParams.get("write") === "true");
  }, [location]);

  useEffect(() => {
    if (currentUser?.id) {
      const userArticles = getArticlesForUser(currentUser.id);
      setArticles(userArticles);
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not logged in
  if (!isLoggedIn || !currentUser) {
    navigate("/login", { replace: true });
    return null;
  }

  const handleDeleteArticle = (articleId) => {
    const success = deleteArticleForUser(currentUser.id, articleId);
    if (success) {
      const updatedArticles = getArticlesForUser(currentUser.id);
      setArticles(updatedArticles);
    } else {
      alert("Failed to delete article. Please try again.");
    }
  };

  const handleShowWriteForm = () => {
    setShowWriteForm(true);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("write", "true");
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleHideWriteForm = () => {
    setShowWriteForm(false);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("write");
    const newSearch = searchParams.toString();
    navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ""}`, {
      replace: true,
    });
  };

  const handleArticleSaved = () => {
    const updatedArticles = getArticlesForUser(currentUser.id);
    setArticles(updatedArticles);
    handleHideWriteForm();
  };

  if (showWriteForm) {
    return (
      <WriteArticleForm
        onSave={handleArticleSaved}
        onCancel={handleHideWriteForm}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="article-writer-page">
      <div className="article-writer-container">
        <div className="articles-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="articles-title">
                <BookOpen className="title-icon" />
                My Articles
              </h1>
              <p className="articles-subtitle">
                Create, manage, and organize your personal articles
              </p>
            </div>
            <div className="header-nav">
              <Link
                to={`/user/${currentUser?.id}`}
                className={`nav-btn ${
                  location.pathname.startsWith("/article")
                    ? ""
                    : "highlight disabled"
                }`}
                aria-disabled={!location.pathname.startsWith("/article")}
              >
                Dashboard
              </Link>
              <Link
                to="/article"
                className={`nav-btn ${
                  location.pathname.startsWith("/article")
                    ? "highlight disabled"
                    : ""
                }`}
                aria-disabled={location.pathname.startsWith("/article")}
              >
                Article
              </Link>
              <button
                onClick={handleShowWriteForm}
                className="write-article-btn"
              >
                <PenTool className="btn-icon" />
                Write New Article
              </button>
            </div>
          </div>
          <div className="header-divider"></div>
        </div>

        <div className="articles-content">
          {articles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FileText className="large-icon" />
              </div>
              <h3 className="empty-title">No articles yet</h3>
              <p className="empty-description">
                Start writing your first article to see it here!
              </p>
              <button
                onClick={handleShowWriteForm}
                className="empty-action-btn"
              >
                <PenTool className="btn-icon" />
                Write Your First Article
              </button>
            </div>
          ) : (
            <>
              <div className="articles-stats">
                <div className="stat-card">
                  <FileText className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-number">{articles.length}</span>
                    <span className="stat-label">
                      {articles.length === 1 ? "Article" : "Articles"}
                    </span>
                  </div>
                </div>
                <div className="stat-card">
                  <Calendar className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-number">
                      {articles.length > 0
                        ? new Date(articles[0].createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span className="stat-label">Last Written</span>
                  </div>
                </div>
              </div>

              <div className="articles-grid">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onDelete={handleDeleteArticle}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
