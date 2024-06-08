import React from "react";
import "./style.css";

function Post({ image, caption }) {
  return (
    <div className="post">
      <div className="post-header">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/074e65548a4a3086d9bf392b7f72cda993c6880767874d394d37e12ed2bcc99b?" alt="avatar" className="avatar" />
        <h4 className="username" style={{ fontWeight: 600 }}>username</h4>
        <div className="dot">‧</div>
        <span className="time">5 minutes</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/074e65548a4a3086d9bf392b7f72cda993c6880767874d394d37e12ed2bcc99b?"
          alt=""
          className="more"
        />
      </div>
      <img src={image} alt="" className="image" style={{ objectFit: "cover", objectPosition: "50% 50%" }}/>
      <div className="post-footer">
        <div className="react">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20b1aa752aac82cf2696a44bc6f6310431162eefd7c1dd70943e77371996f53?"
            alt=""
            className="heart"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39902428d2ced9abf70943cbb60eda5b8b45e004592c552b0bb4278608e4ffdc?"
            alt=""
            className="comment"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4738f086753c9eef15575e1ec80d909b8eeba168c98e0bd6d6fe0cd7b4c39c11?"
            alt=""
            className="share"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/539cd64323766987e541a1d54bd900af9f86b80385a6480427ab4d25919c095b?"
            alt=""
            className="save"
          />
        </div>
        <h4 className="number-like" style={{ fontWeight: 600 }}>
          5 likes
        </h4>
        <div className="caption">
          <div className="caption-user" style={{ display:"flex", flexDirection: "row" }}>
            <h4 className="user-name" style={{ fontWeight: 600, marginRight: 10 }}>
              username
            </h4>
            <div className="user-caption">{caption}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
