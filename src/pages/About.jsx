import React from 'react';


export function AboutUs() {
    return (
        <div className="about-section">
            <div className="profile-picture-container">
                <img src="/me.jpeg" alt="Noy Leibovich" />
            </div>
            <h2>About</h2>
            <p>Hello, my name is Noy Leibovich. I am 25 years old and currently studying at the Coding Academy's Bootcamp.</p>
            <p>This is my final project before the last sprint in our course. I'm looking forward to continuing to develop my programming skills and knowledge.</p>
            <a href="https://www.linkedin.com/in/noy-leibovich-66343a1b1/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i> Visit my LinkedIn
            </a>
        </div>
    );
}
