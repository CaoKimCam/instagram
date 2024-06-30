import axiosClient from './axiosClient';

const reactApi = {
  // Lấy danh sách Reacts
  getReacts: async () => {
    try {
      const response = await axiosClient.get('/likes');
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
      const response = await axiosClient.get(`/likes/${reactId}`);
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
