import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./style.css";
import userApi from "../../api/userApi";
import { getPostDetail, updatePost } from "../../api/posterApi";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function EditPost({ postId, initialContent, onClose, onEditComplete }) {
  const [postContent, setPostContent] = useState(initialContent);
  const [originalPostContent, setOriginalPostContent] = useState(initialContent); // Lưu giá trị ban đầu
  const [userName, setUserName] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
  const [postImage, setPostImage] = useState("");
  const [status, setStatus] = useState("Public");
  const [originalStatus, setOriginalStatus] = useState("Public"); // Lưu giá trị ban đầu
  const [currentState, setCurrentState] = useState(null); // Lưu giá trị ban đầu của state
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const statusMapping = useMemo(() => ({
    "Public": 0,
    "Follower": 1,
    "Friend": 2,
    "Best Friend": 3,
    "Only Me": 4
  }), []);

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
    setShowStatusOptions(false);
  };

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      setCurrentUserAvatar(response.data.userAvatar);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const fetchPostDetail = useCallback(async (postId) => {
    try {
      const response = await getPostDetail(postId);
      setPostContent(response.post.postContent);
      setOriginalPostContent(response.post.postContent); // Lưu giá trị ban đầu
      setPostImage(response.post.postImg);
      const initialStatus = Object.keys(statusMapping).find(key => statusMapping[key] === response.post.state);
      setStatus(initialStatus);
      setOriginalStatus(initialStatus); // Lưu giá trị ban đầu
      setCurrentState(response.post.state); // Lưu giá trị ban đầu của state
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
    }
  }, [statusMapping]);

  useEffect(() => {
    fetchAccount();
    fetchPostDetail(postId);
  }, [postId, fetchPostDetail]);

  const handleUpdatePost = async () => {
    try {
      const updatedPost = {
        postContent
      };
      if (status !== originalStatus) {
        updatedPost.state = statusMapping[status];
      } else {
        updatedPost.state = currentState; // Giữ nguyên state nếu không thay đổi
      }
      await updatePost(postId, updatedPost);
      alert('Post updated successfully');
      onClose();
      onEditComplete();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="edit-overlay">
      <div id="editPost">

        {/* Header */}
        <div className="editPostHeader">
          <div
            className="editPost"
            style={{ marginLeft: "30px", color: "#0095F6", cursor: "pointer" }}
            onClick={onClose}
          >
            Exit
          </div>
          <div style={{ margin: "auto" }}>Edit post</div>
          <div
            className="editPost"
            style={{ marginRight: "30px", color: "#0095F6", cursor: "pointer" }}
            onClick={handleUpdatePost}
          >
            Done
          </div>
        </div>

        {/* Content */}
        <div className="editPostContent">
          {/* Ảnh */}
          <div style={{ width: "476px", height: "476px", borderRight: "1px solid #ccc", position: "relative" }}>
            <img
              src={postImage || "https://via.placeholder.com/476"}
              alt=""
              className="editImage"
            />
          </div>

          {/* Phần caption */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", position: "relative" }}>
              <img
                src={currentUserAvatar}
                alt=""
                className="editAvatar"
                style={{}} />
              <div className="editUsername">{userName}</div>
              <button
                className="setStatus"
                onClick={() => setShowStatusOptions(!showStatusOptions)}
              >
                {status} <ArrowDropDownIcon style={{ width: 20, height: 20, transform: "translateY(20%)" }} />
              </button>
            </div>
            {showStatusOptions && (
                <div className="edit-status-options">
                  <div className="edit-status-option public" onClick={() => handleStatusSelect("Public")}>Public</div>
                  <div className="edit-status-option follower" onClick={() => handleStatusSelect("Follower")}>Follower</div>
                  <div className="edit-status-option friend" onClick={() => handleStatusSelect("Friend")}>Friend</div>
                  <div className="edit-status-option best-friend" onClick={() => handleStatusSelect("Best Friend")}>Best Friend</div>
                  <div className="edit-status-option only-me" onClick={() => handleStatusSelect("Only Me")}>Only Me</div>
                </div>
              )}
            <textarea
              id="postContent"
              placeholder="Write a caption..."
              className="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
