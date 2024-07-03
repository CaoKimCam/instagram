import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import userApi from "../../api/userApi";

const LogIn = () => {
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleLogIn = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await userApi.login({ email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful, token saved');
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>

      {/* Khối bên trên */}
      <div id="rec1">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e52829809ddb92b9149ab9035705c9a1e9cdb50596929b47d40295d30127ab0?"
          alt="instagram"
          className="logo"
        />
        <form className="form" onSubmit={handleLogIn}>
          <input type="text" name="email" className="email" placeholder="Email" autoComplete="email" />
          <br />
          <input type="password" name="password" className="password" placeholder="Password" />
          <br />
          <br />
          <input type="submit" className="submit" value="Log in" />
        </form>
        <div className="-or-">
          <div className="line1" />
          <div className="line2" />
          <p className="or">OR</p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9fc92c344badde3e4fbdccf80d8d58751a1bda82e852a18cac56314b58f794f?"
          alt="logo-facebook"
          className="logo-facebook"
        />
        <button className="forgot-pwd">
          <a
            href="./forget-password.html"
            style={{ textDecoration: "none", color: "#385185" }}
          >
            Forgot password?
          </a>
        </button>
      </div>

      {/* Khối bên dưới */}
      <div id="rec2">
        <p className="dont-have-acc">Don't have an account?</p>
        <a href="./signup" className="signup">
          Sign up
        </a>
      </div>
    </div>
  );
}

export default LogIn;
