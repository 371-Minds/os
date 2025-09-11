import type React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'full' | 'icon' | 'text' | 'stacked';
  theme?: 'light' | 'dark' | 'color' | 'monochrome';
  className?: string;
}

// 371 Minds Logo
export const MindLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--371minds',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/371minds-${variant}-${theme}.svg`}
        alt="371 Minds"
        className="logo-image"
      />
    </div>
  );
};

// ReadySetBuild Logo
export const ReadySetBuildLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--readysetbuild',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/readysetbuild-${variant}-${theme}.svg`}
        alt="ReadySetBuild"
        className="logo-image"
      />
    </div>
  );
};

// StackSense Logo
export const StackSenseLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--stacksense',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/stacksense-${variant}-${theme}.svg`}
        alt="StackSense"
        className="logo-image"
      />
    </div>
  );
};

// Legacy Code Archaeologist Logo
export const LegacyArchaeologistLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--legacy-archaeologist',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/legacy-archaeologist-${variant}-${theme}.svg`}
        alt="Legacy Code Archaeologist"
        className="logo-image"
      />
    </div>
  );
};

// ModuMind Logo
export const ModuMindLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--modumind',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/modumind-${variant}-${theme}.svg`}
        alt="ModuMind"
        className="logo-image"
      />
    </div>
  );
};

// Rootlift Digital Logo
export const RootliftLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--rootlift',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/rootlift-${variant}-${theme}.svg`}
        alt="Rootlift Digital"
        className="logo-image"
      />
    </div>
  );
};

// Vision2Results Logo
export const Vision2ResultsLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--vision2results',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/vision2results-${variant}-${theme}.svg`}
        alt="Vision2Results"
        className="logo-image"
      />
    </div>
  );
};

// Multimedia Junkie Logo
export const MultimediaJunkieLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--multimedia-junkie',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/multimedia-junkie-${variant}-${theme}.svg`}
        alt="Multimedia Junkie"
        className="logo-image"
      />
    </div>
  );
};

// Ikid Edventures Logo
export const IkidLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--ikid',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/ikid-${variant}-${theme}.svg`}
        alt="Ikid Edventures"
        className="logo-image"
      />
    </div>
  );
};

// EpicQuest Hub Logo
export const EpicQuestLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--epicquest',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/epicquest-${variant}-${theme}.svg`}
        alt="EpicQuest Hub"
        className="logo-image"
      />
    </div>
  );
};

// LyricLines Logo
export const LyricLinesLogo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  theme = 'color',
  className = '',
}) => {
  const logoClasses = [
    'company-logo',
    'company-logo--lyriclines',
    `company-logo--${size}`,
    `company-logo--${variant}`,
    `company-logo--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={logoClasses}>
      <img
        src={`/assets/logos/lyriclines-${variant}-${theme}.svg`}
        alt="LyricLines"
        className="logo-image"
      />
    </div>
  );
};

// Logo Registry for dynamic loading
export const COMPANY_LOGOS = {
  '371minds': MindLogo,
  readysetbuild: ReadySetBuildLogo,
  stacksense: StackSenseLogo,
  'legacy-archaeologist': LegacyArchaeologistLogo,
  modumind: ModuMindLogo,
  rootlift: RootliftLogo,
  vision2results: Vision2ResultsLogo,
  'multimedia-junkie': MultimediaJunkieLogo,
  ikid: IkidLogo,
  epicquest: EpicQuestLogo,
  lyriclines: LyricLinesLogo,
} as const;

// Dynamic Logo Component
interface DynamicLogoProps extends LogoProps {
  company: keyof typeof COMPANY_LOGOS;
}

export const DynamicLogo: React.FC<DynamicLogoProps> = ({
  company,
  ...props
}) => {
  const LogoComponent = COMPANY_LOGOS[company];

  if (!LogoComponent) {
    console.warn(`Logo not found for company: ${company}`);
    return null;
  }

  return <LogoComponent {...props} />;
};

// Logo Showcase Component (for displaying multiple logos)
interface LogoShowcaseProps {
  companies: Array<keyof typeof COMPANY_LOGOS>;
  size?: LogoProps['size'];
  variant?: LogoProps['variant'];
  theme?: LogoProps['theme'];
  layout?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

export const LogoShowcase: React.FC<LogoShowcaseProps> = ({
  companies,
  size = 'medium',
  variant = 'full',
  theme = 'color',
  layout = 'horizontal',
  className = '',
}) => {
  const showcaseClasses = [
    'logo-showcase',
    `logo-showcase--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={showcaseClasses}>
      {companies.map((company) => (
        <DynamicLogo
          key={company}
          company={company}
          size={size}
          variant={variant}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default {
  MindLogo,
  ReadySetBuildLogo,
  StackSenseLogo,
  LegacyArchaeologistLogo,
  ModuMindLogo,
  RootliftLogo,
  Vision2ResultsLogo,
  MultimediaJunkieLogo,
  IkidLogo,
  EpicQuestLogo,
  LyricLinesLogo,
  DynamicLogo,
  LogoShowcase,
  COMPANY_LOGOS,
};
