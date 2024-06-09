import React from 'react';
import './style.css';

function GridPost({ images }) {
    return (
        <div className='grid-post'>

            <div className="tab">
                <div className="tabPosts" style={{ borderTop: "2px solid #000" }}>POSTS</div>
                <div className="tabSaved" style={{ borderTop: "2px solid #fff" }}>SAVED</div>
            </div>

            <div className="grid">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Post ${index}`} className='gridImage' />
                ))}
            </div>

        </div>
    );
}

export default GridPost;