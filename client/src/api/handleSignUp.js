import userApi from './userApi'; // Import userApi từ file userApi.js

const handleSignUp = async (event) => {
  event.preventDefault();

  // Lấy các phần tử input từ form
  const { email, name, password } = event.target.elements;

  // Kiểm tra xem các phần tử input có tồn tại không
  if (!email || !name || !password) {
    console.error("Some input elements are missing in the form");
    return;
  }

  const emailValue = email.value;
  const nameValue = name.value;
  const passwordValue = password.value;

  try {
    const response = await userApi.signup({
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    });
    console.log(response.data); // In ra dữ liệu phản hồi từ backend
    // Xử lý dữ liệu phản hồi ở đây (ví dụ: chuyển hướng đến trang đăng nhập)
  } catch (error) {
    console.error(error.response?.data || error.message); // In ra thông báo lỗi từ backend
    // Hiển thị thông báo lỗi cho người dùng
  }
};

export default handleSignUp;
