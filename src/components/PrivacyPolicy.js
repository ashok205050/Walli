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
              At W A L L I, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="privacy-policy-information">
            <h2>Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul>
              <li><strong>Personal Data:</strong> Information such as your name, email address, and contact details when you sign up for our services.</li>
              <li><strong>Usage Data:</strong> Information on how you use our website, which may include your IP address, browser type, pages visited, and the time and date of your visits.</li>
              <li><strong>Cookies:</strong> Our website may use cookies to enhance your experience. You can choose to accept or decline cookies in your browser settings.</li>
            </ul>
          </section>

          <section className="privacy-policy-use">
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect from you for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our services.</li>
              <li>To improve, personalize, and expand our website.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To communicate with you, including sending you updates and promotional materials.</li>
              <li>To process your transactions and manage your orders.</li>
            </ul>
          </section>

          <section className="privacy-policy-disclosure">
            <h2>Disclosure of Your Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul>
              <li>With service providers to facilitate our services.</li>
              <li>To comply with legal obligations or protect our rights.</li>
              <li>In connection with a merger, sale, or acquisition.</li>
            </ul>
          </section>

          <section className="privacy-policy-security">
            <h2>Security of Your Information</h2>
            <p>We take the security of your personal information seriously and implement reasonable measures to protect it from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure.</p>
          </section>

          <section className="privacy-policy-children">
            <h2>Children's Privacy</h2>
            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child, we will take steps to delete such information.</p>
          </section>

          <section className="privacy-policy-changes">
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section className="privacy-policy-contact">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <strong>[Your Contact Information]</strong>.</p>
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
