import React from 'react';

interface ConsumerLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hero?: React.ReactNode;
  theme?: 'light' | 'dark' | 'colorful' | 'minimal';
  maxWidth?: string;
  backgroundColor?: string;
  accentColor?: string;
  className?: string;
}

export const ConsumerLayout: React.FC<ConsumerLayoutProps> = ({
  children,
  header,
  footer,
  hero,
  theme = 'colorful',
  maxWidth = '600px',
  backgroundColor = '#ffffff',
  accentColor = '#007bff',
  className = ''
}) => {
  const layoutClasses = [
    'consumer-layout',
    `consumer-layout--${theme}`,
    hero ? 'consumer-layout--with-hero' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={layoutClasses}
      style={{ 
        backgroundColor,
        '--max-width': maxWidth,
        '--accent-color': accentColor
      } as React.CSSProperties}
    >
      {/* Email Container */}
      <div className="consumer-layout__container">
        
        {/* Header Section */}
        {header && (
          <div className="consumer-layout__header">
            {header}
          </div>
        )}
        
        {/* Hero Section */}
        {hero && (
          <div className="consumer-layout__hero">
            {hero}
          </div>
        )}
        
        {/* Main Content */}
        <main className="consumer-layout__main">
          <div className="consumer-layout__content">
            {children}
          </div>
        </main>
        
        {/* Footer Section */}
        {footer && (
          <div className="consumer-layout__footer">
            {footer}
          </div>
        )}
        
      </div>
    </div>
  );
};

// Consumer-specific components
interface ConsumerHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  ctaButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  overlay?: boolean;
}

export const ConsumerHero: React.FC<ConsumerHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = '#f8f9fa',
  textColor = '#333333',
  ctaButton,
  overlay = false
}) => {
  const heroStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    })
  };

  return (
    <div className="consumer-hero" style={heroStyle}>
      {overlay && backgroundImage && (
        <div className="consumer-hero__overlay"></div>
      )}
      
      <div className="consumer-hero__content">
        <h1 className="consumer-hero__title">{title}</h1>
        
        {subtitle && (
          <p className="consumer-hero__subtitle">{subtitle}</p>
        )}
        
        {ctaButton && (
          <div className="consumer-hero__cta">
            <a 
              href={ctaButton.href}
              className={`consumer-hero__button consumer-hero__button--${ctaButton.variant || 'primary'}`}
            >
              {ctaButton.text}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

interface ConsumerCardProps {
  title?: string;
  content: React.ReactNode;
  image?: string;
  imagePosition?: 'top' | 'left' | 'right' | 'background';
  variant?: 'default' | 'featured' | 'minimal' | 'bordered';
  ctaButton?: {
    text: string;
    href: string;
  };
  className?: string;
}

export const ConsumerCard: React.FC<ConsumerCardProps> = ({
  title,
  content,
  image,
  imagePosition = 'top',
  variant = 'default',
  ctaButton,
  className = ''
}) => {
  const cardClasses = [
    'consumer-card',
    `consumer-card--${variant}`,
    image ? `consumer-card--image-${imagePosition}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      
      {image && imagePosition === 'background' && (
        <div 
          className="consumer-card__background"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      
      <div className="consumer-card__content">
        
        {image && imagePosition === 'top' && (
          <div className="consumer-card__image consumer-card__image--top">
            <img src={image} alt={title || ''} />
          </div>
        )}
        
        <div className="consumer-card__body">
          
          {image && imagePosition === 'left' && (
            <div className="consumer-card__image consumer-card__image--left">
              <img src={image} alt={title || ''} />
            </div>
          )}
          
          <div className="consumer-card__text">
            {title && (
              <h3 className="consumer-card__title">{title}</h3>
            )}
            
            <div className="consumer-card__content-body">
              {content}
            </div>
            
            {ctaButton && (
              <div className="consumer-card__cta">
                <a href={ctaButton.href} className="consumer-card__button">
                  {ctaButton.text}
                </a>
              </div>
            )}
          </div>
          
          {image && imagePosition === 'right' && (
            <div className="consumer-card__image consumer-card__image--right">
              <img src={image} alt={title || ''} />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

interface ConsumerGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ConsumerGrid: React.FC<ConsumerGridProps> = ({
  children,
  columns = 2,
  gap = 'medium',
  className = ''
}) => {
  const gridClasses = [
    'consumer-grid',
    `consumer-grid--${columns}-columns`,
    `consumer-grid--gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

interface ConsumerSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ConsumerSection: React.FC<ConsumerSectionProps> = ({
  title,
  subtitle,
  children,
  backgroundColor,
  textAlign = 'left',
  padding = 'medium',
  className = ''
}) => {
  const sectionClasses = [
    'consumer-section',
    `consumer-section--text-${textAlign}`,
    `consumer-section--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <section 
      className={sectionClasses}
      style={{ backgroundColor }}
    >
      <div className="consumer-section__content">
        
        {(title || subtitle) && (
          <div className="consumer-section__header">
            {title && (
              <h2 className="consumer-section__title">{title}</h2>
            )}
            {subtitle && (
              <p className="consumer-section__subtitle">{subtitle}</p>
            )}
          </div>
        )}
        
        <div className="consumer-section__body">
          {children}
        </div>
        
      </div>
    </section>
  );
};

export default ConsumerLayout;