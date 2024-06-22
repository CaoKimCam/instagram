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
  // Các phương thức khác như updateUser, deleteUser...
};

export default userApi;
