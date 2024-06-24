import React, { useState, useEffect } from "react";
import "./style.css";
import EditPost from "../EditPost/EditPost";
import { deletePost } from "../../api/posterApi";

function Post({ post, calculatePostTime, refreshHomepage }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  const { postId, username, postTime, postContent, postImg } = post;

  useEffect(() => {
    console.log("Post data:", post); // Thêm log này
  }, [post]);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      alert("Post deleted successfully");
      setShowOptions(false);
      refreshHomepage();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const handleEdit = () => {
    setShowEditPost(true);
    setShowOptions(false);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post-detail/${postId}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying link:", err);
        alert("Failed to copy link");
      });
    setShowOptions(false);
  };

  const handleCancel = () => {
    setShowOptions(false);
  };

  const handleCloseEditPost = () => {
    setShowEditPost(false);
  };

  const handleEditComplete = () => {
    setShowEditPost(false);
    refreshHomepage();
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src="https://res.cloudinary.com/dpqnzt8qq/image/upload/v1717835313/ufomkmr3jiqjek6acvob.png"
          alt="avatar"
          className="avatar"
          style={{ objectFit: "cover" }}
        />
        <h4 className="username">{username}</h4> {/* Hiển thị username */}
        <div className="dot">‧</div>
        <span className="time">{calculatePostTime(postTime)}</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/074e65548a4a3086d9bf392b7f72cda993c6880767874d394d37e12ed2bcc99b?"
          alt="more"
          className="more"
          onClick={handleMoreClick}
        />

        {showOptions && (
          <div className="options-menu">
            <div className="option" style={{ color: "red" }} onClick={handleDelete}>
              Delete
            </div>
            <div className="option" onClick={handleEdit}>
              Edit
            </div>
            <div className="option" onClick={handleCopyLink}>
              Copy link
            </div>
            <div className="option" onClick={handleCancel}>
              Cancel
            </div>
          </div>
        )}
      </div>

      <img
        src={postImg || "https://via.placeholder.com/500"}
        alt="post"
        className="image"
        style={{ objectFit: "cover" }}
      />

      <div className="post-footer">
        <div className="react">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20b1aa752aac82cf2696a44bc6f6310431162eefd7c1dd70943e77371996f53?"
            alt="heart"
            className="heart"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39902428d2ced9abf70943cbb60eda5b8b45e004592c552b0bb4278608e4ffdc?"
            alt="comment"
            className="comment"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4738f086753c9eef15575e1ec80d909b8eeba168c98e0bd6d6fe0cd7b4c39c11?"
            alt="share"
            className="share"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/539cd64323766987e541a1d54bd900af9f86b80385a6480427ab4d25919c095b?"
            alt="save"
            className="save"
          />
        </div>

        <h4 className="number-like" style={{ fontWeight: 600 }}>5 likes</h4>

        <div className="caption">
          <div className="caption-user">
            <p className="user-name" style={{ fontWeight: 600, marginRight: 10 }}>{username}</p> {/* Hiển thị username */}
            <div className="user-caption">{postContent}</div>
          </div>
        </div>
      </div>

      {showEditPost && (
        <EditPost
          postId={postId}
          onClose={handleCloseEditPost}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  );
}

export default Post;
