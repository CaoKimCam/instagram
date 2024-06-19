import axiosClient from './axiosClient';

export const getAllPosts = async () => {
  try {
    const response = await axiosClient.get('/posters/allposts');
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

// Hàm lấy danh sách bài viết của người dùng hiện tại
export const getMyPosts = async () => {
  try {
    const response = await axiosClient.get('/posters/myposts');
    return response.data;
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error;
  }
};

// Hàm lấy chi tiết một bài viết
export const getPostDetail = async (postId) => {
  try {
    const response = await axiosClient.get(`/posters/myposts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
};

// Hàm tạo một bài viết mới
export const createPost = async (postContent, imageUrl, authorId, postTime) => {
  try {
    const formData = new FormData();
    formData.append('postContent', postContent);
    formData.append('authorId', authorId);
    formData.append('postTime', postTime);
    formData.append('file', imageUrl);

    const response = await axiosClient.post('/posters', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Hàm cập nhật một bài viết
export const updatePost = async (postId, postDto) => {
  try {
    const response = await axiosClient.put(`/posters/${postId}`, postDto);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};

// Hàm xóa một bài viết
export const deletePost = async (postId) => {
  try {
    const response = await axiosClient.delete(`/posters/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error);
    throw error;
  }
};