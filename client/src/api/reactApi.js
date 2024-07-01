import axiosClient from './axiosClient';

const reactApi = {
  // Lấy danh sách Reacts (cho admin)
  getAllReacts: async () => {
    try {
      const response = await axiosClient.get('/likes/allreacts/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy Reacts theo objectId (bài viết hoặc bình luận)
  getReactsByObjectId: async (objectId) => {
    try {
      const response = await axiosClient.get(`/likes/reacts/${objectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo một React mới
  createReact: async (reactDto) => {
    try {
      const response = await axiosClient.post('/likes', reactDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy chi tiết một React
  getReactDetail: async (reactId) => {
    try {
      const response = await axiosClient.get(`/likes/react/${reactId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa một React
  deleteReact: async (reactId) => {
    try {
      const response = await axiosClient.delete(`/likes/${reactId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default reactApi;
