// Aboutus.js
import React from 'react';
import './AboutUs.css'; // Ensure your CSS is linked here

const Aboutus = () => {
  return (
    <>
      <header className="about-us-header">
        <h1>About W A L L I</h1>
      </header>
      <div className="about-us-container">
        <div className="about-us-content">
          <section className="about-us-intro">
            <h2>Welcome to W A L L I!</h2>
            <p>
              Hey! I am Ashok who loves WEB, and <b>W A L L I</b> is a personal project that combines those passions. My goal with this platform is to offer cool, high-quality wallpapers that help you personalize your devices with ease. It's all about making your screens look awesome, whether you're into minimalism, nature, or something totally abstract.
            </p>
          </section>

          <section className="about-us-vision">
            <h2>Why I Built W A L L I</h2>
            <p>
              I wanted a space where people like you can find wallpapers that really stand out. W A L L I is more than just a collection of images—it's a little corner of the web where creativity and digital design come together. The idea is to make it easy to find something that inspires you every time you unlock your device.
            </p>
          </section>

          <section className="about-us-offer">
            <h2>What You Can Find Here</h2>
            <ul>
              <li><strong>Lots of Variety:</strong> Whether you’re into landscapes, simple patterns, or cool abstract art, I’ve got a mix of categories to explore.</li>
              <li><strong>Free for Everyone:</strong> Right now, W A L L I is a free-to-use platform. It’s my way of sharing my love for design with the world.</li>
              <li><strong>Simple and Easy:</strong> No complicated steps—just browse, pick a wallpaper you like, and download it.</li>
            </ul>
          </section>

          <section className="about-us-commitment">
            <h2>What I’m Aiming For</h2>
            <p>
              I’m committed to offering high-quality wallpapers that are both creative and attractive.
            </p>
          </section>

          <section className="about-us-contact">
            <h2>Contact Me</h2>
            <p>
              Have any questions, feedback, or ideas? Feel free to reach out at <strong>wallpaperswalli85@gmail.com</strong>. I’d love to hear from you and improve W A L L I based on what you want to see!
            </p>
          </section>
        </div>
      </div>
      <footer className="about-us-footer">
        <p>&copy; 2024 W A L L I. Built with love by Ashok. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Aboutus;
