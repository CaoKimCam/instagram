import axiosClient from './axiosClient';

const commentApi = {
  getAllComments: () => {
    const url = '/comments';
    return axiosClient.get(url);
  },

  createComment: (commentDto) => {
    const url = '/comments';
    return axiosClient.post(url, commentDto);
  },

  getCommentById: (commentId) => {
    const url = `/comments/${commentId}`;
    return axiosClient.get(url);
  },

  updateComment: (commentId, commentDto) => {
    const url = `/comments/${commentId}`;
    return axiosClient.put(url, commentDto);
  },

  deleteComment: (commentId) => {
    const url = `/comments/${commentId}`;
    return axiosClient.delete(url);
  },
};

export default commentApi;
