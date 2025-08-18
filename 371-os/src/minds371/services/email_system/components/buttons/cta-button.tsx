import React from 'react';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  trackingId?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  href,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  trackingId
}) => {
  const buttonClasses = [
    'cta-button',
    `cta-button--${variant}`,
    `cta-button--${size}`,
    fullWidth ? 'cta-button--full-width' : '',
    disabled ? 'cta-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    // Track button click if tracking ID is provided
    if (trackingId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'CTA Button',
        event_label: trackingId,
        value: text
      });
    }
  };

  return (
    <a
      href={disabled ? undefined : href}
      className={buttonClasses}
      onClick={handleClick}
      role="button"
      aria-disabled={disabled}
      data-tracking-id={trackingId}
    >
      <span className="cta-button__text">{text}</span>
    </a>
  );
};

export default CTAButton;