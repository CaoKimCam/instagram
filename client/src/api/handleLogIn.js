import userApi from './userApi';

const handleLogIn = async (event) => {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;

  try {
    const response = await userApi.login({ email, password });
    const token = response.data.token;
    localStorage.setItem('token', token); // Lưu token vào localStorage
    console.log('Login successful, token saved');
    // Chuyển hướng người dùng đến trang khác hoặc thực hiện hành động khác
  } catch (error) {
    console.error(error.response?.data || error.message); // In ra thông báo lỗi từ backend
    // Hiển thị thông báo lỗi cho người dùng
  }
};

export default handleLogIn;
