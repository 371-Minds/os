import type React from 'react';

interface CompanyFooterProps {
  companyName: string;
  companyLogo?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  className?: string;
}

export const CompanyFooter: React.FC<CompanyFooterProps> = ({
  companyName,
  companyLogo,
  address,
  phone,
  email,
  socialLinks,
  className = '',
}) => {
  return (
    <footer className={`company-footer ${className}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="company-info">
            {companyLogo && (
              <img
                src={companyLogo}
                alt={companyName}
                className="footer-logo"
              />
            )}
            <h3 className="company-name">{companyName}</h3>
            {address && <p className="address">{address}</p>}
          </div>

          <div className="contact-info">
            <h4>Contact Us</h4>
            {phone && <p className="phone">Phone: {phone}</p>}
            {email && <p className="email">Email: {email}</p>}
          </div>

          {socialLinks && (
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="social-link facebook"
                  >
                    Facebook
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} className="social-link twitter">
                    Twitter
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    className="social-link linkedin"
                  >
                    LinkedIn
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="social-link instagram"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CompanyFooter;
