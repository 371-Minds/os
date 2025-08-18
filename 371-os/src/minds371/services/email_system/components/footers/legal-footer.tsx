import React from 'react';

interface LegalFooterProps {
  companyName: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  cookiePolicyUrl?: string;
  gdprCompliant?: boolean;
  unsubscribeUrl?: string;
  contactEmail?: string;
  physicalAddress?: string;
  className?: string;
}

export const LegalFooter: React.FC<LegalFooterProps> = ({
  companyName,
  privacyPolicyUrl,
  termsOfServiceUrl,
  cookiePolicyUrl,
  gdprCompliant = false,
  unsubscribeUrl,
  contactEmail,
  physicalAddress,
  className = ''
}) => {
  return (
    <footer className={`legal-footer ${className}`}>
      <div className="footer-container">
        <div className="legal-content">
          <div className="legal-links">
            <h4>Legal Information</h4>
            <ul className="legal-list">
              {privacyPolicyUrl && (
                <li>
                  <a href={privacyPolicyUrl} className="legal-link">
                    Privacy Policy
                  </a>
                </li>
              )}
              {termsOfServiceUrl && (
                <li>
                  <a href={termsOfServiceUrl} className="legal-link">
                    Terms of Service
                  </a>
                </li>
              )}
              {cookiePolicyUrl && (
                <li>
                  <a href={cookiePolicyUrl} className="legal-link">
                    Cookie Policy
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          {(contactEmail || physicalAddress) && (
            <div className="contact-info">
              <h4>Contact Information</h4>
              {contactEmail && (
                <p className="contact-email">
                  Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </p>
              )}
              {physicalAddress && (
                <p className="physical-address">
                  Address: {physicalAddress}
                </p>
              )}
            </div>
          )}
          
          {unsubscribeUrl && (
            <div className="email-preferences">
              <h4>Email Preferences</h4>
              <p>
                <a href={unsubscribeUrl} className="unsubscribe-link">
                  Unsubscribe from our emails
                </a>
              </p>
            </div>
          )}
          
          {gdprCompliant && (
            <div className="gdpr-notice">
              <p className="gdpr-text">
                We are committed to protecting your privacy and complying with GDPR regulations.
                Your data is processed in accordance with our Privacy Policy.
              </p>
            </div>
          )}
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="disclaimer">
            This email was sent to you because you subscribed to our mailing list.
            If you no longer wish to receive these emails, you can unsubscribe at any time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;