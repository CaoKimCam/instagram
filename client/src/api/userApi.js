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
  // getUserInfo: () => {
  //   const url = '/users/me';
  //   return axiosClient.get(url); // Token sẽ tự động được gắn vào header
  // },
  // Các phương thức khác như updateUser, deleteUser, v.v. có thể thêm vào đây
};

export default userApi;