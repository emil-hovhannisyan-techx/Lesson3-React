import React from "react";
import { Trash2, Calendar, User } from "lucide-react";
const ArticleCard = ({ article, onDelete, currentUser }) => {
  return (
    <div className="article-card">
      <div className="article-card-header">
        <h3 className="article-title">{article.title}</h3>
        <button
          onClick={() => onDelete(article.id)}
          className="delete-btn"
          title="Delete article"
        >
          <Trash2 className="delete-icon" />
        </button>
      </div>
      <p className="article-preview">
        {article.content.length > 150
          ? article.content.substring(0, 150) + "..."
          : article.content}
      </p>
      <div className="article-meta">
        <div className="article-info">
          <Calendar className="meta-icon" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="article-info">
          <User className="meta-icon" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
