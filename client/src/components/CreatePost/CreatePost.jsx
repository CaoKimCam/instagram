import React, { useState, useEffect } from "react";
import "./style.css";
import { useDropzone } from "react-dropzone";
import { createPost } from '../../api/posterApi';
import userApi from "../../api/userApi";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function CreatePost({ onClose, refreshHomepage }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [userName, setUserName] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
  const authorId = '';
  const [status, setStatus] = useState("Public");
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const statusMapping = {
    "Public": 0,
    "Follower": 1,
    "Friend": 2,
    "Best Friend": 3,
    "Only Me": 4
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      setCurrentUserAvatar(response.data.userAvatar);
    } catch (error) {
      console.error("Lỗi khi lấy tên người dùng:", error);
    }
  };

  const handlePost = async () => {
    if (postContent && uploadedFile) {
      try {
        const postTime = new Date().toISOString();
        const postDto = {
          postContent,
          postTime,
          authorId,
          state: statusMapping[status],
        };
        await createPost(postDto, uploadedFile);
        refreshHomepage();
        onClose();
      } catch (error) {
        console.error('Lỗi khi đăng bài:', error);
      }
    } else {
      alert('Vui lòng thêm một hình ảnh và viết một chú thích.');
    }
  };

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
    setShowStatusOptions(false);
  };

  const { getRootProps, getInputProps, open: openFileDialog } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov']
    },
    noClick: true,
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      if (filesWithPreview.length > 0) {
        setUploadedFile(filesWithPreview[0]);
      }
    },
  });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div id="create">

          {/* Header */}
          <div className="header">
            <div className="createTitle">
              Create new post
            </div>

            <div
              id="createPost"
              className="createPost"
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: 30,
                color: "#0095F6",
                cursor: "pointer"
              }}
              onClick={handlePost}
            >
              Post
            </div>
          </div>

          {/* Content */}
          <div className="content">

            {/* Chọn file từ máy tính */}
            <div className="createImageContainer">
              {!uploadedFile && (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <button className="select" onClick={openFileDialog}>Select from computer</button>
                </div>
              )}
              {uploadedFile && (
                <img
                  id="createImage"
                  src={uploadedFile.preview}
                  alt=""
                  className="createImage"
                />
              )}
            </div>

            {/* Phần viết chú thích */}
            <div className="typeCaption" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 20, width: "100%" }}>
                <img 
                  src={currentUserAvatar} 
                  alt="" 
                  className="createAvatar" />
                <div className="createUsername">{userName}</div>
                <button
                  className="setStatus"
                  onClick={() => setShowStatusOptions(!showStatusOptions)}
                >
                  {status} <ArrowDropDownIcon style={{ width: 20, height: 20, transform: "translateY(20%)" }} />
                </button>
              </div>
              {showStatusOptions && (
                <div className="status-options">
                  <div className="status-option public" onClick={() => handleStatusSelect("Public")}>Public</div>
                  <div className="status-option follower" onClick={() => handleStatusSelect("Follower")}>Follower</div>
                  <div className="status-option friend" onClick={() => handleStatusSelect("Friend")}>Friend</div>
                  <div className="status-option best-friend" onClick={() => handleStatusSelect("Best Friend")}>Best Friend</div>
                  <div className="status-option only-me" onClick={() => handleStatusSelect("Only Me")}>Only Me</div>
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
    </div>
  );
}

export default CreatePost;
