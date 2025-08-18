import React from 'react';

interface DemoButtonProps {
  text?: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  demoType?: 'live' | 'video' | 'interactive' | 'trial';
  duration?: string;
  features?: string[];
  className?: string;
  trackingId?: string;
}

export const DemoButton: React.FC<DemoButtonProps> = ({
  text = 'Request Demo',
  href,
  variant = 'primary',
  size = 'medium',
  demoType = 'live',
  duration,
  features,
  className = '',
  trackingId
}) => {
  const buttonClasses = [
    'demo-button',
    `demo-button--${variant}`,
    `demo-button--${size}`,
    `demo-button--${demoType}`,
    className
  ].filter(Boolean).join(' ');

  const getDemoIcon = () => {
    switch (demoType) {
      case 'video':
        return '▶️';
      case 'interactive':
        return '🖱️';
      case 'trial':
        return '🚀';
      default:
        return '👁️';
    }
  };

  const getDemoDescription = () => {
    switch (demoType) {
      case 'video':
        return 'Watch Demo Video';
      case 'interactive':
        return 'Try Interactive Demo';
      case 'trial':
        return 'Start Free Trial';
      default:
        return 'Schedule Live Demo';
    }
  };

  const handleClick = () => {
    // Track demo button click
    if (trackingId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'demo_request', {
        event_category: 'Demo Button',
        event_label: trackingId,
        demo_type: demoType,
        value: text
      });
    }
  };

  return (
    <div className="demo-button-container">
      <a
        href={href}
        className={buttonClasses}
        onClick={handleClick}
        role="button"
        data-tracking-id={trackingId}
        data-demo-type={demoType}
      >
        <span className="demo-button__icon">{getDemoIcon()}</span>
        <div className="demo-button__content">
          <span className="demo-button__text">{text}</span>
          <span className="demo-button__description">{getDemoDescription()}</span>
          {duration && (
            <span className="demo-button__duration">Duration: {duration}</span>
          )}
        </div>
      </a>
      
      {features && features.length > 0 && (
        <div className="demo-features">
          <p className="demo-features__title">What you'll see:</p>
          <ul className="demo-features__list">
            {features.map((feature, index) => (
              <li key={index} className="demo-features__item">
                ✓ {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DemoButton;