// Aboutus.js
import React from 'react';
import './AboutUs.css'; // Ensure your CSS is linked here

const Aboutus = () => {
  return (<>
        <header className="about-us-header">
        <h1>About W A L L I</h1>
      </header>
    <div className="about-us-container">

      <div className="about-us-content">
        <section className="about-us-intro">
          <h2>Welcome to W A L L I!</h2>
          <p>
            At W A L L I, we believe that your digital space deserves to be as beautiful and inspiring as the world around you. Founded in <strong>[Year]</strong> by <strong>[Your Name/Team Name]</strong>, our mission is to provide high-quality wallpapers that elevate your device's aesthetic while showcasing the creativity of talented artists worldwide.
          </p>
        </section>

        <section className="about-us-vision">
          <h2>Our Vision</h2>
          <p>
            We envision a platform where art meets technology, giving users easy access to a vast collection of stunning wallpapers. Our goal is to enhance the user experience by curating an extensive library that inspires and motivates creativity in every individual.
          </p>
        </section>

        <section className="about-us-offer">
          <h2>What We Offer</h2>
          <ul>
            <li><strong>Diverse Collection:</strong> Explore thousands of wallpapers across various categories, including nature, abstract, minimalist, and more.</li>
            <li><strong>User-Centric Design:</strong> Our platform is designed with you in mind, ensuring an intuitive interface and robust search functionality.</li>
            <li><strong>Community of Artists:</strong> We collaborate with artists globally, providing them with a platform to showcase their work.</li>
            <li><strong>Seamless Experience:</strong> Optimized for performance, ensuring quick downloads and easy settings for your wallpapers.</li>
          </ul>
        </section>

        <section className="about-us-commitment">
          <h2>Our Commitment</h2>
          <p>
            We are committed to maintaining the highest quality standards in everything we do, ensuring our wallpapers are visually stunning and comply with copyright regulations.
          </p>
        </section>

        <section className="about-us-join">
          <h2>Join Us on Our Journey</h2>
          <p>
            Follow us on <a href="[Social Media Links]">Social Media</a> and subscribe to our newsletter for updates, new releases, and special offers.
          </p>
        </section>

        <section className="about-us-contact">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or partnership inquiries, please reach out to us at <strong>[Your Contact Information]</strong>.
          </p>
        </section>
      </div>

    </div>
    <footer className="about-us-footer">
        <p>&copy; 2024 W A L L I. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Aboutus;
