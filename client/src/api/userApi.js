import axiosClient from './axiosClient';

const userApi = {
  signup: (data) => {
    const url = '/users/signup';
    return axiosClient.post(url, data);
  },
  login: (data) => {
    const url = '/users/login';
    return axiosClient.post(url, data);
  },
  account: () => {
    const url = '/users/account';
    return axiosClient.get(url);
  },
  getAllUsers: () => {
    const url = '/users/all';
    return axiosClient.get(url);
  },
  searchUserByName: (name) => {
    const url = `/users/search/${name}`;
    return axiosClient.get(url);
  },
  getUserDetail: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  // Hàm gửi yêu cầu chấp nhận theo dõi
  acceptFollow: (followingId) => {
    const url = `/users/follower/${followingId}`;
    return axiosClient.post(url);
  },

  // Hàm gửi yêu cầu hủy theo dõi
  unfollowUser: (followingId) => {
    const url = `/users/follower/${followingId}`;
    return axiosClient.delete(url);
  },

  // Hàm gửi yêu cầu thêm bạn thân
  addBestfriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.post(url);
  },

  // Hàm gửi yêu cầu xóa bạn thân
  removeBestfriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.delete(url);
  },

  // Hàm kiểm tra trạng thái bạn bè
  isFriend: (name) => {
    const url = `/users/friend/${name}`;
    return axiosClient.get(url);
  },
  // Các phương thức khác như updateUser, deleteUser...
};

export default userApi;
