import React from 'react';
import './DMCA_Copyright.css'; // Ensure your CSS is linked here

const DMCA_Copyright = () => {
  return (
    <>
      <header className="dmca-header">
        <h1>DMCA / Copyright</h1>
      </header>
      <div className="dmca-container">
        <div className="dmca-content">
          <section className="dmca-intro">
            <h2>Introduction</h2>
            <p>
              At W A L L I, we respect the rights of copyright owners and are committed to protecting intellectual property. This DMCA Policy outlines the procedures for reporting unauthorized content on our platform.
            </p>
          </section>

          <section className="dmca-reporting">
            <h2>Reporting Copyright Infringement</h2>
            <p>Just Contact me.</p>          
          </section>

          <section className="dmca-infringement-handling">
            <h2>How We Handle Infringements</h2>
            <p>Upon receiving a valid DMCA notice, we will take appropriate action, which may include removing or disabling access to the infringing material.</p>
          </section>

          <section className="dmca-security">
            <h2>Security Measures</h2>
            <p>W A L L I takes the security of your information seriously and implements reasonable measures to protect it from unauthorized access or disclosure. However, no method of transmission over the internet is completely secure.</p>
          </section>

          <section className="dmca-children-privacy">
            <h2>Children's Privacy</h2>
            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware of such information, we will take steps to delete it.</p>
          </section>

          <section className="dmca-policy-changes">
            <h2>Changes to This Policy</h2>
            <p>We may update our DMCA Policy periodically. Any changes will be posted on this page, and you are encouraged to review this policy periodically.</p>
          </section>

          <section className="dmca-contact">
            <h2>Contact Us</h2>
            <p>If you have any questions about this DMCA Policy, please contact us at <strong>[Your Contact Information]</strong>.</p>
          </section>

          {/* DMCA Badge Integration */}
          <div className="dmca-badge-container">
            <a href="//www.dmca.com/Protection/Status.aspx?ID=57520afc-2a39-439b-a361-5a3e20098976" title="DMCA.com Protection Status" className="dmca-badge">
              <img
                src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=57520afc-2a39-439b-a361-5a3e20098976"
                alt="DMCA.com Protection Status"
              />
            </a>
            <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
          </div>
        </div>
      </div>
      <footer className="dmca-footer">
        <p>&copy; 2024 W A L L I. All rights reserved.</p>
      </footer>
    </>
  );
};

export default DMCA_Copyright;
