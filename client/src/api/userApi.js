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
  followUser: (followingId) => {
    const url = `/users/follow/${followingId}`;
    return axiosClient.post(url);
  },
  unfollowByFollower: (followingId) => {
    const url = `/users/unfollower/${followingId}`;
    return axiosClient.delete(url);
  },
  unfollowByFollowing: (followingId) => {
    const url = `/users/unfollowing/${followingId}`;
    return axiosClient.delete(url);
  },
  acceptFollow: (followerId) => {
    const url = `/users/followed/${followerId}`;
    return axiosClient.post(url);
  },
  deleteFollowByFollowing: (followingId) => {
    const url = `/users/deletefollow/${followingId}`;
    return axiosClient.delete(url);
  },
  deleteFollowByFollower: (followerId) => {
    const url = `/users/deletefollow/${followerId}`;
    return axiosClient.delete(url);
  },
  // Các phương thức khác như updateUser, deleteUser...
};

export default userApi;
