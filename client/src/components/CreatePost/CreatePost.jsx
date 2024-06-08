import React, { useState } from "react";
import "./style.css";
import { useDropzone } from "react-dropzone";
import { createPost } from '../../api/posterApi';

function CreatePost({ onClose }) {
  const [uploadedFile, setUploadedFile] = useState(null); // Lưu trữ tệp thay vì URL
  const [postContent, setPostContent] = useState(""); // Lưu trữ nội dung bài đăng
  const authorId = '665206d770e753cc35236afb';

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
        setUploadedFile(filesWithPreview[0]); // Lưu trữ tệp thay vì URL
      }
    },
  });

  const handlePost = async () => {
    if (postContent && uploadedFile) {
      try {
        await createPost(postContent, uploadedFile, authorId); // Truyền tệp gốc thay vì URL
        console.log('Create post successfully!');
        console.log(postContent);
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
          {/* Header */}
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

          {/* Content */}
          <div className="content">
            <div style={{ maxWidth: 476, borderRight: "1px solid #ccc", position: "relative" }}>
              <div {...getRootProps({ className: "dropzone", style: { width: 476 } })}>
                <input {...getInputProps()} />
                <button className="select" onClick={openFileDialog}>Select from computer</button>
              </div>
              {uploadedFile && (
                <img
                  id="createImage"
                  src={uploadedFile.preview} // Sử dụng preview để hiển thị ảnh
                  alt=""
                  className="createImage"
                />
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <div className="createAvatar"></div>
                <div className="createUsername">username</div>
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
