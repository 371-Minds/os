import React from 'react';

interface UpgradeButtonProps {
  text?: string;
  href: string;
  currentPlan?: string;
  targetPlan?: string;
  discount?: {
    percentage?: number;
    amount?: number;
    currency?: string;
  };
  urgency?: {
    timeLeft?: string;
    limitedOffer?: boolean;
  };
  benefits?: string[];
  variant?: 'primary' | 'secondary' | 'premium' | 'urgent';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  trackingId?: string;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  text = 'Upgrade Now',
  href,
  currentPlan,
  targetPlan,
  discount,
  urgency,
  benefits,
  variant = 'primary',
  size = 'medium',
  className = '',
  trackingId
}) => {
  const buttonClasses = [
    'upgrade-button',
    `upgrade-button--${variant}`,
    `upgrade-button--${size}`,
    urgency?.limitedOffer ? 'upgrade-button--urgent' : '',
    className
  ].filter(Boolean).join(' ');

  const getUpgradeIcon = () => {
    switch (variant) {
      case 'premium':
        return '👑';
      case 'urgent':
        return '⚡';
      default:
        return '⬆️';
    }
  };

  const formatDiscount = () => {
    if (!discount) return null;
    
    if (discount.percentage) {
      return `${discount.percentage}% OFF`;
    }
    
    if (discount.amount && discount.currency) {
      return `${discount.currency}${discount.amount} OFF`;
    }
    
    return null;
  };

  const handleClick = () => {
    // Track upgrade button click
    if (trackingId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'upgrade_click', {
        event_category: 'Upgrade Button',
        event_label: trackingId,
        current_plan: currentPlan,
        target_plan: targetPlan,
        has_discount: !!discount,
        value: text
      });
    }
  };

  return (
    <div className="upgrade-button-container">
      {urgency?.timeLeft && (
        <div className="upgrade-urgency">
          <span className="urgency-text">⏰ {urgency.timeLeft} left!</span>
        </div>
      )}
      
      <a
        href={href}
        className={buttonClasses}
        onClick={handleClick}
        role="button"
        data-tracking-id={trackingId}
        data-current-plan={currentPlan}
        data-target-plan={targetPlan}
      >
        <span className="upgrade-button__icon">{getUpgradeIcon()}</span>
        <div className="upgrade-button__content">
          <span className="upgrade-button__text">{text}</span>
          {currentPlan && targetPlan && (
            <span className="upgrade-button__plan-info">
              {currentPlan} → {targetPlan}
            </span>
          )}
          {discount && (
            <span className="upgrade-button__discount">
              {formatDiscount()}
            </span>
          )}
        </div>
      </a>
      
      {benefits && benefits.length > 0 && (
        <div className="upgrade-benefits">
          <p className="upgrade-benefits__title">Upgrade benefits:</p>
          <ul className="upgrade-benefits__list">
            {benefits.map((benefit, index) => (
              <li key={index} className="upgrade-benefits__item">
                ✨ {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {urgency?.limitedOffer && (
        <div className="limited-offer-notice">
          <span className="limited-offer-text">
            🔥 Limited time offer - Don't miss out!
          </span>
        </div>
      )}
    </div>
  );
};

export default UpgradeButton;