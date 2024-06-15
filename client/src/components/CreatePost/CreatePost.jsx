import React, { useState, useEffect } from "react";
import "./style.css";
import { useDropzone } from "react-dropzone";
import { createPost } from '../../api/posterApi';
import userApi from "../../api/userApi";

function CreatePost({ onClose, refreshHomepage }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const authorId = '';
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      console.log("UserName from API:", response.data.userName);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
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

  const handlePost = async () => {
    if (postContent && uploadedFile) {
      try {
        const postTime = new Date().toISOString();
        await createPost(postContent, uploadedFile, authorId, postTime);
        console.log(postTime);
        console.log('Create post successfully!');
        refreshHomepage();
        onClose();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    } else {
      alert('Please add an image and write a caption.');
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div id="create">
          <div className="header">
            <div style={{ margin: "auto", transform: "translateX(100%)" }}>
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
          <div className="content">
            <div style={{ maxWidth: 476, borderRight: "1px solid #ccc", position: "relative" }}>
              <div {...getRootProps({ className: "dropzone", style: { width: 476 } })}>
                <input {...getInputProps()} />
                <button className="select" onClick={openFileDialog}>Select from computer</button>
              </div>
              {uploadedFile && (
                <img
                  id="createImage"
                  src={uploadedFile.preview}
                  alt=""
                  className="createImage"
                />
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <div className="createAvatar"></div>
                <div className="createUsername">{userName}</div>
              </div>
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
