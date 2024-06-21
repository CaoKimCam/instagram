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
  acceptFollow: (followerId) => {
    const url = `/users/followed/${followerId}`;
    return axiosClient.post(url);
  },
  unfollowByFollower: (followingId) => {
    const url = `/users/followeing/${followingId}`;
    return axiosClient.delete(url);
  },
  unfollowByFollowing: (followedId) => {
    const url = `/users/follower/${followedId}`;
    return axiosClient.delete(url);
  },
  addBestFriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.post(url);
  },
  removeBestFriend: (name) => {
    const url = `/users/bff/${name}`;
    return axiosClient.delete(url);
  },
  isFriend: (name) => {
    const url = `/users/friend/${name}`;
    return axiosClient.post(url);
  },
};

export default userApi;
