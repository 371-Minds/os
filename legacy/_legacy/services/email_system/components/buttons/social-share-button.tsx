import type React from 'react';

interface SocialShareButtonProps {
  platform:
    | 'facebook'
    | 'twitter'
    | 'linkedin'
    | 'email'
    | 'whatsapp'
    | 'telegram'
    | 'reddit';
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  via?: string; // For Twitter
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'text' | 'both';
  className?: string;
  trackingId?: string;
}

export const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  platform,
  url,
  title = '',
  description = '',
  hashtags = [],
  via,
  size = 'medium',
  variant = 'both',
  className = '',
  trackingId,
}) => {
  const buttonClasses = [
    'social-share-button',
    `social-share-button--${platform}`,
    `social-share-button--${size}`,
    `social-share-button--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getPlatformConfig = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedHashtags = hashtags.join(',');

    switch (platform) {
      case 'facebook':
        return {
          shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          icon: '📘',
          label: 'Facebook',
          color: '#1877F2',
        };

      case 'twitter': {
        const twitterParams = new URLSearchParams({
          url: url,
          text: title,
          ...(via && { via }),
          ...(hashtags.length > 0 && { hashtags: encodedHashtags }),
        });
        return {
          shareUrl: `https://twitter.com/intent/tweet?${twitterParams.toString()}`,
          icon: '🐦',
          label: 'Twitter',
          color: '#1DA1F2',
        };
      }

      case 'linkedin':
        return {
          shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          icon: '💼',
          label: 'LinkedIn',
          color: '#0A66C2',
        };

      case 'email': {
        const emailParams = new URLSearchParams({
          subject: title,
          body: `${description}\n\n${url}`,
        });
        return {
          shareUrl: `mailto:?${emailParams.toString()}`,
          icon: '📧',
          label: 'Email',
          color: '#EA4335',
        };
      }

      case 'whatsapp':
        return {
          shareUrl: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
          icon: '💬',
          label: 'WhatsApp',
          color: '#25D366',
        };

      case 'telegram': {
        const telegramParams = new URLSearchParams({
          url: url,
          text: title,
        });
        return {
          shareUrl: `https://t.me/share/url?${telegramParams.toString()}`,
          icon: '✈️',
          label: 'Telegram',
          color: '#0088CC',
        };
      }

      case 'reddit': {
        const redditParams = new URLSearchParams({
          url: url,
          title: title,
        });
        return {
          shareUrl: `https://reddit.com/submit?${redditParams.toString()}`,
          icon: '🤖',
          label: 'Reddit',
          color: '#FF4500',
        };
      }

      default:
        return {
          shareUrl: url,
          icon: '🔗',
          label: 'Share',
          color: '#666666',
        };
    }
  };

  const config = getPlatformConfig();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Track social share click
    if (trackingId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'url',
        item_id: trackingId,
        content_id: url,
      });
    }

    // Open share window
    if (platform === 'email') {
      window.location.href = config.shareUrl;
    } else {
      const width = 600;
      const height = 400;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      window.open(
        config.shareUrl,
        `share-${platform}`,
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
      );
    }
  };

  return (
    <a
      href={config.shareUrl}
      className={buttonClasses}
      onClick={handleClick}
      role="button"
      aria-label={`Share on ${config.label}`}
      data-platform={platform}
      data-tracking-id={trackingId}
      style={{ '--platform-color': config.color } as React.CSSProperties}
    >
      {(variant === 'icon' || variant === 'both') && (
        <span className="social-share-button__icon">{config.icon}</span>
      )}
      {(variant === 'text' || variant === 'both') && (
        <span className="social-share-button__text">{config.label}</span>
      )}
    </a>
  );
};

// Component for rendering multiple social share buttons
interface SocialShareGroupProps {
  platforms: SocialShareButtonProps['platform'][];
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  via?: string;
  size?: SocialShareButtonProps['size'];
  variant?: SocialShareButtonProps['variant'];
  className?: string;
  trackingId?: string;
}

export const SocialShareGroup: React.FC<SocialShareGroupProps> = ({
  platforms,
  url,
  title,
  description,
  hashtags,
  via,
  size,
  variant,
  className = '',
  trackingId,
}) => {
  return (
    <div className={`social-share-group ${className}`}>
      {platforms.map((platform) => (
        <SocialShareButton
          key={platform}
          platform={platform}
          url={url}
          title={title}
          description={description}
          hashtags={hashtags}
          via={via}
          size={size}
          variant={variant}
          trackingId={trackingId}
        />
      ))}
    </div>
  );
};

export default SocialShareButton;
