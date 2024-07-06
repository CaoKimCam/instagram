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

  acceptFollow: (followingId) => {
    const url = `/users/follower/${followingId}`;
    return axiosClient.post(url);
  },

  unfollowUser: (followingId) => {
    const url = `/users/follower/${followingId}`;
    return axiosClient.delete(url);
  },

  addBestfriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.post(url);
  },

  removeBestfriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.delete(url);
  },

  updateUser: (data, avatar) => {
    const url = '/users';
    const formData = new FormData();
    if (data.userName) {
      formData.append('userName', data.userName);
    }
    if (data.userBio) {
      formData.append('userBio', data.userBio);
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }
    console.log('FormData:', formData.get('userName'), formData.get('userBio'), formData.get('avatar'));
    return axiosClient.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteAccount: () => {
    const url = '/users/account';
    return axiosClient.delete(url);
  },

  // Kiểm tra xem người dùng có nằm trong danh sách bạn bè của tài khoản đang đăng nhập
  isFriend: (name) => {
    const url = `/users/friend/${name}`;
    return axiosClient.get(url);
  },

  // Kiểm tra xem người dùng có nằm trong danh sách bạn thân của tài khoản đang đăng nhập
  isBestfriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.get(url);
  },
};

export default userApi;
