import { useState } from "react";
import { saveArticleForUser } from "../../utils/localStorage";
import { ArrowLeft, FileText, PenTool, Save } from "lucide-react";
const WriteArticleForm = ({ onSave, onCancel, currentUser }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setIsSaving(true);

    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      authorId: currentUser.id,
      authorName: currentUser.username,
    };

    // Simulate async operation
    setTimeout(() => {
      const success = saveArticleForUser(currentUser.id, newArticle);
      setIsSaving(false);

      if (success) {
        alert("Article saved successfully!");
        setTitle("");
        setContent("");
        onSave();
      } else {
        alert("Failed to save article. Please try again.");
      }
    }, 1000);
  };

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="write-article-container">
      <div className="write-article-header">
        <button onClick={onCancel} className="back-btn">
          <ArrowLeft className="back-icon" />
          Back to Articles
        </button>
        <h2 className="write-title">Write New Article</h2>
      </div>

      <div className="write-form">
        <div className="form-group">
          <label className="form-label">
            <FileText className="label-icon" />
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your article title..."
            className="title-input"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <PenTool className="label-icon" />
            Article Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article content here..."
            className="content-textarea"
            rows={15}
          />
        </div>

        <div className="write-footer">
          <div className="write-stats">
            <div className="stat">
              <span className="stat-label">Words:</span>
              <span className="stat-value">{wordCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Characters:</span>
              <span className="stat-value">{content.length}</span>
            </div>
          </div>

          <div className="write-actions">
            <button onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="save-btn"
            >
              {isSaving ? (
                <>
                  <div className="spinner"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="save-icon" />
                  <span>Save Article</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticleForm;
