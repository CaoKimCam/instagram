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

  // Hàm cập nhật thông tin tài khoản
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

  // Hàm xóa tài khoản
  deleteAccount: () => {
    const url = '/users/account';
    return axiosClient.delete(url);
  },
};

export default userApi;
