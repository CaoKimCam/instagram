import React from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import userApi from '../../api/userApi';

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Lấy các phần tử input từ form
    const { email, name, password } = event.target.elements;

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
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error.response?.data || error.message);
      // Hiển thị thông báo lỗi cho người dùng (có thể cập nhật UI để hiển thị lỗi)
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div id="signup-rec1">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/85442272ee093e59390fcb9c544117f2506c8f252f29f968b14ef639ab983573?"
            alt="instagram"
            className="logo"
          />
          <div className="description">
            Sign up to see photos and videos from your friends.
          </div>
          <button className="facebook">Log in with facebook</button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/49d0004c1111fda61056013ced59a2a8d13863bbe3b0da7ed123ccad2db455b4?"
            alt="logo-facebook"
            className="logo-facebook"
          />
          <div className="-or-">
            <div className="line1" />
            <div className="line2" />
            <p className="or">OR</p>
          </div>
          <div
            className="type-signup"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input type="text" name="email" className="email" placeholder="Email" autoComplete="email"/>
            <input type="text" name="name" className="name" placeholder="Username" autoComplete="name"/>
            <input type="password" name="password" className="password" placeholder="Password" />
          </div>
          <div className="before-signup">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </div>
          <input type="submit" className="signup" value="Sign up" />
        </div>
      </form>

      <div id="signup-rec2">
        <p className="have-an-acc">Have an account?</p>
        <a href="./login" className="login">
          Log in
        </a>
      </div>
    </div>
  );
}

export default SignUp;
