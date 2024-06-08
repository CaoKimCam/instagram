import React from 'react';
import './style.css';

function GridPost() {
    return (
        <div className='grid-post'>

            <div class="tab">
                <div className="tabPosts" style={{ borderTop: "2px solid #000" }}>POSTS</div>
                <div className="tabSaved" style={{ borderTop: "2px solid #fff" }}>SAVED</div>
            </div>

            <div class="grid">
                <div className="post"></div>
                <div className="post"></div>
                <div className="post"></div>
                <div className="post"></div>
                <div className="post"></div>
                <div className="post"></div>
                <div className="post"></div>
            </div>

        </div>
    );
}

export default GridPost;