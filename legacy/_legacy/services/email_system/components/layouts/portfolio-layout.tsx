import type React from 'react';

interface PortfolioLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  theme?: 'creative' | 'minimal' | 'professional' | 'dark';
  maxWidth?: string;
  backgroundColor?: string;
  accentColor?: string;
  className?: string;
}

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  theme = 'creative',
  maxWidth = '800px',
  backgroundColor = '#ffffff',
  accentColor = '#6366f1',
  className = '',
}) => {
  const layoutClasses = [
    'portfolio-layout',
    `portfolio-layout--${theme}`,
    sidebar ? 'portfolio-layout--with-sidebar' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={layoutClasses}
      style={
        {
          backgroundColor,
          '--max-width': maxWidth,
          '--accent-color': accentColor,
        } as React.CSSProperties
      }
    >
      {/* Email Container */}
      <div className="portfolio-layout__container">
        {/* Header Section */}
        {header && <div className="portfolio-layout__header">{header}</div>}

        {/* Main Content Area */}
        <div className="portfolio-layout__main">
          {/* Content Area */}
          <main className="portfolio-layout__content">{children}</main>

          {/* Sidebar (if provided) */}
          {sidebar && (
            <aside className="portfolio-layout__sidebar">{sidebar}</aside>
          )}
        </div>

        {/* Footer Section */}
        {footer && <div className="portfolio-layout__footer">{footer}</div>}
      </div>
    </div>
  );
};

// Portfolio-specific components
interface PortfolioHeroProps {
  name: string;
  title: string;
  tagline?: string;
  avatar?: string;
  backgroundImage?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  ctaButton?: {
    text: string;
    href: string;
  };
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({
  name,
  title,
  tagline,
  avatar,
  backgroundImage,
  socialLinks,
  ctaButton,
}) => {
  const heroStyle: React.CSSProperties = {
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
  };

  return (
    <div className="portfolio-hero" style={heroStyle}>
      {backgroundImage && <div className="portfolio-hero__overlay"></div>}

      <div className="portfolio-hero__content">
        {avatar && (
          <div className="portfolio-hero__avatar">
            <img src={avatar} alt={name} className="avatar-image" />
          </div>
        )}

        <div className="portfolio-hero__text">
          <h1 className="portfolio-hero__name">{name}</h1>
          <h2 className="portfolio-hero__title">{title}</h2>

          {tagline && <p className="portfolio-hero__tagline">{tagline}</p>}

          {socialLinks && socialLinks.length > 0 && (
            <div className="portfolio-hero__social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="social-link"
                  aria-label={`${name} on ${link.platform}`}
                >
                  {link.icon ? link.icon : link.platform}
                </a>
              ))}
            </div>
          )}

          {ctaButton && (
            <div className="portfolio-hero__cta">
              <a href={ctaButton.href} className="portfolio-hero__button">
                {ctaButton.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProjectShowcaseProps {
  projects: Array<{
    title: string;
    description: string;
    image?: string;
    technologies?: string[];
    liveUrl?: string;
    codeUrl?: string;
    featured?: boolean;
  }>;
  layout?: 'grid' | 'list' | 'masonry';
  showTechnologies?: boolean;
  className?: string;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  layout = 'grid',
  showTechnologies = true,
  className = '',
}) => {
  const showcaseClasses = [
    'project-showcase',
    `project-showcase--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={showcaseClasses}>
      <div className="project-showcase__grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
          >
            {project.image && (
              <div className="project-card__image">
                <img src={project.image} alt={project.title} />
                <div className="project-card__overlay">
                  <div className="project-card__actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="project-action project-action--live"
                      >
                        View Live
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        className="project-action project-action--code"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="project-card__content">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>

              {showTechnologies &&
                project.technologies &&
                project.technologies.length > 0 && (
                  <div className="project-card__technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="technology-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SkillsGridProps {
  skills: Array<{
    name: string;
    level?: number; // 1-5 or 1-10
    category?: string;
    icon?: string;
  }>;
  showLevels?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({
  skills,
  showLevels = true,
  groupByCategory = false,
  className = '',
}) => {
  const skillsClasses = [
    'skills-grid',
    groupByCategory ? 'skills-grid--grouped' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const groupedSkills = groupByCategory
    ? skills.reduce(
        (acc, skill) => {
          const category = skill.category || 'Other';
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        },
        {} as Record<string, typeof skills>,
      )
    : { 'All Skills': skills };

  const renderSkillLevel = (level?: number) => {
    if (!level || !showLevels) return null;

    const maxLevel = level <= 5 ? 5 : 10;
    const percentage = (level / maxLevel) * 100;

    return (
      <div className="skill-level">
        <div className="skill-level__bar" style={{ width: `${percentage}%` }} />
      </div>
    );
  };

  return (
    <div className={skillsClasses}>
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skills-category">
          {groupByCategory && (
            <h3 className="skills-category__title">{category}</h3>
          )}

          <div className="skills-category__grid">
            {categorySkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-item__header">
                  {skill.icon && (
                    <span className="skill-item__icon">{skill.icon}</span>
                  )}
                  <span className="skill-item__name">{skill.name}</span>
                </div>

                {renderSkillLevel(skill.level)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface TestimonialProps {
  testimonials: Array<{
    content: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
  }>;
  layout?: 'single' | 'carousel' | 'grid';
  showRatings?: boolean;
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialProps> = ({
  testimonials,
  layout = 'single',
  showRatings = true,
  className = '',
}) => {
  const testimonialClasses = [
    'testimonial-section',
    `testimonial-section--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderStars = (rating?: number) => {
    if (!rating || !showRatings) return null;

    return (
      <div className="testimonial-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'star--filled' : 'star--empty'}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={testimonialClasses}>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <div className="testimonial-content">
              <blockquote className="testimonial-quote">
                "{testimonial.content}"
              </blockquote>

              {renderStars(testimonial.rating)}
            </div>

            <div className="testimonial-author">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="author-avatar"
                />
              )}

              <div className="author-info">
                <cite className="author-name">{testimonial.author}</cite>
                {testimonial.role && (
                  <span className="author-role">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioLayout;
