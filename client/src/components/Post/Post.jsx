import React, { useState, useEffect } from "react";
import "./style.css";
import EditPost from "../EditPost/EditPost";
import reactApi from "../../api/reactApi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Post({ post, calculatePostTime, refreshHomepage, currentUserId }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [liked, setLiked] = useState(false);
  const [reactIds, setReactIds] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  const { postId, username, postTime, postContent, postImg } = post;

  useEffect(() => {
    const fetchReactStatus = async () => {
      try {
        const reacts = await reactApi.getAllReacts();
        if (reacts && Array.isArray(reacts)) {
          const filteredReacts = reacts.filter(react => react.objectId === postId);
          const userReact = filteredReacts.find(react => react.author === currentUserId);
          setReactIds(filteredReacts.map(react => react._id)); // Set an array of reactIds
          setLikesCount(filteredReacts.length); // Count of reacts
          if (userReact) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        } else {
          console.error("Invalid reacts data:", reacts);
        }
      } catch (error) {
        console.error("Error fetching react status:", error);
      }
    };
  
    fetchReactStatus();
  }, [postId, currentUserId]);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      // Xử lý xóa post
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
    // Xử lý sao chép link
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

  const handleLike = async () => {
    try {
      if (!liked) {
        if (currentUserId) {
          const payload = { type: true, objectId: postId, author: currentUserId, time: new Date().toISOString() };
          const newReact = await reactApi.createReact(payload);
          setLiked(true);
          setReactIds([...reactIds, newReact._id]); // Add new reactId to array
          setLikesCount(likesCount + 1);
        } else {
          alert("User information not available");
        }
      } else {
        const userReact = await reactApi.getAllReacts(); // Lấy tất cả reacts để tìm react của người dùng
        const reactToDelete = userReact.find(react => react.objectId === postId && react.author === currentUserId);
        if (reactToDelete) {
          await reactApi.deleteReact(reactToDelete.id); // Xóa react dựa trên reactId
          setLiked(false);
          setReactIds(reactIds.filter(reactId => reactId !== reactToDelete._id)); // Remove reactId from array
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {
      console.error("Error liking or unliking post:", error);
      alert("Failed to like or unlike post");
    }
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
        <h4 className="username">{username}</h4>
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
          {liked ? (
            <FavoriteIcon className="heart" style={{ width: 35, height: 35, cursor: "pointer" }} onClick={handleLike} />
          ) : (
            <FavoriteBorderIcon className="heart" style={{ width: 35, height: 35, cursor: "pointer" }} onClick={handleLike} />
          )}
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

        <h4 className="number-like" style={{ fontWeight: 600 }}>{likesCount} likes</h4>

        <div className="caption">
          <div className="caption-user">
            <p className="user-name" style={{ fontWeight: 600, marginRight: 10 }}>{username}</p>
            <div className="user-caption">{postContent}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            className="typeComment"
            name="comment"
            placeholder="Add a comment..."
            style={{ border: "none", marginTop: 5, width: 500, padding: "5px 0", outline: "none", marginBottom: 20 }}
          />

          <p style={{ color: "#4192EF" }}>Post</p>
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
