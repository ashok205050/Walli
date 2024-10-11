// PrivacyPolicy.js
import React from 'react';
import './PrivacyPolicy.css'; // Ensure your CSS is linked here

const PrivacyPolicy = () => {
  return (
    <>
      <header className="privacy-policy-header">
        <h1>Privacy Policy for W A L L I</h1>
      </header>
      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          <section className="privacy-policy-intro">
            <h2>Introduction</h2>
            <p>
              Welcome to W A L L I! Your privacy is super important to me, and I’m committed to protecting your personal information. This Privacy Policy explains what information I collect, how I use it, and how I keep it safe when you visit my site.
            </p>
          </section>

          <section className="privacy-policy-information">
            <h2>Information I Collect</h2>
            <p>I may collect a few types of information, including:</p>
            <ul>
              <li><strong>Personal Data:</strong> This includes things like your name and email when you sign up.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with the site, like your IP address, the pages you visit, and how long you stay.</li>
              <li><strong>Cookies:</strong> I use cookies to make your experience better. You can decide whether to accept them in your browser settings.</li>
            </ul>
          </section>

          <section className="privacy-policy-use">
            <h2>How I Use Your Information</h2>
            <p>Your information helps me:</p>
            <ul>
              <li>Provide and maintain the site.</li>
              <li>Make improvements and personalize your experience.</li>
              <li>Understand how people are using the site.</li>
              <li>Keep you updated with news and features.</li>
              <li>Handle your transactions smoothly.</li>
            </ul>
          </section>

          <section className="privacy-policy-disclosure">
            <h2>Sharing Your Information</h2>
            <p>Your info is safe with me! I don’t sell or rent it to anyone.</p>
          </section>

          <section className="privacy-policy-security">
            <h2>Keeping Your Information Safe</h2>
            <p>I take the security of your personal information seriously and use reasonable measures to keep it safe from unauthorized access. However, no online method is completely secure.</p>
          </section>

          <section className="privacy-policy-children">
            <h2>Children's Privacy</h2>
            <p>W A L L I isn’t intended for kids under 13. I don’t knowingly collect info from children. If I find out I have, I’ll delete it as soon as possible.</p>
          </section>

          <section className="privacy-policy-changes">
            <h2>Changes to This Privacy Policy</h2>
            <p>I might update this Privacy Policy occasionally. If I do, I’ll post the new version here. Please check back from time to time to stay informed.</p>
          </section>

          <section className="privacy-policy-contact">
            <h2>Contact Me</h2>
            <p>If you have any questions about this Privacy Policy, feel free to reach out at <strong>[Your Contact Information]</strong>. I’m here to help!</p>
          </section>
        </div>
      </div>
      <footer className="privacy-policy-footer">
        <p>&copy; 2024 W A L L I. All rights reserved.</p>
      </footer>
    </>
  );
};

export default PrivacyPolicy;
