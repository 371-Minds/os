import type React from 'react';

interface PortfolioFooterProps {
  portfolioName: string;
  tagline?: string;
  projects?: Array<{
    name: string;
    url: string;
  }>;
  skills?: string[];
  contactEmail?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  className?: string;
}

export const PortfolioFooter: React.FC<PortfolioFooterProps> = ({
  portfolioName,
  tagline,
  projects,
  skills,
  contactEmail,
  socialLinks,
  className = '',
}) => {
  return (
    <footer className={`portfolio-footer ${className}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="portfolio-info">
            <h3 className="portfolio-name">{portfolioName}</h3>
            {tagline && <p className="tagline">{tagline}</p>}
            {contactEmail && (
              <p className="contact-email">
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
            )}
          </div>

          {projects && projects.length > 0 && (
            <div className="featured-projects">
              <h4>Featured Projects</h4>
              <ul className="project-list">
                {projects.map((project, index) => (
                  <li key={index}>
                    <a href={project.url} className="project-link">
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {socialLinks && (
            <div className="social-links">
              <h4>Connect</h4>
              <div className="social-icons">
                {socialLinks.github && (
                  <a href={socialLinks.github} className="social-link github">
                    GitHub
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
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} className="social-link twitter">
                    Twitter
                  </a>
                )}
                {socialLinks.portfolio && (
                  <a
                    href={socialLinks.portfolio}
                    className="social-link portfolio"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {portfolioName}. Built with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
