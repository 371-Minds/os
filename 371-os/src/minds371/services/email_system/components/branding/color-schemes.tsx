import type React from 'react';

// Color scheme definitions
export const COLOR_SCHEMES = {
  '371minds': {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },

  readysetbuild: {
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#84cc16',
    background: '#ffffff',
    surface: '#fef7ed',
    text: '#1c1917',
    textSecondary: '#78716c',
    success: '#22c55e',
    warning: '#eab308',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  },

  stacksense: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#06b6d4',
    background: '#ffffff',
    surface: '#f0f9ff',
    text: '#0c4a6e',
    textSecondary: '#0369a1',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  },

  'legacy-archaeologist': {
    primary: '#92400e',
    secondary: '#a16207',
    accent: '#ca8a04',
    background: '#fefdf8',
    surface: '#fef3c7',
    text: '#451a03',
    textSecondary: '#78716c',
    success: '#16a34a',
    warning: '#ea580c',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #92400e 0%, #a16207 100%)',
  },

  modumind: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a855f7',
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#3c1361',
    textSecondary: '#6b21a8',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
  },

  rootlift: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    background: '#ffffff',
    surface: '#f0fdf4',
    text: '#064e3b',
    textSecondary: '#065f46',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  },

  vision2results: {
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#f87171',
    background: '#ffffff',
    surface: '#fef2f2',
    text: '#7f1d1d',
    textSecondary: '#991b1b',
    success: '#16a34a',
    warning: '#ea580c',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  },

  'multimedia-junkie': {
    primary: '#ec4899',
    secondary: '#db2777',
    accent: '#f472b6',
    background: '#ffffff',
    surface: '#fdf2f8',
    text: '#831843',
    textSecondary: '#9d174d',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },

  ikid: {
    primary: '#facc15',
    secondary: '#eab308',
    accent: '#fde047',
    background: '#ffffff',
    surface: '#fefce8',
    text: '#713f12',
    textSecondary: '#a16207',
    success: '#22c55e',
    warning: '#f97316',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
  },

  epicquest: {
    primary: '#7c2d12',
    secondary: '#9a3412',
    accent: '#ea580c',
    background: '#ffffff',
    surface: '#fef7ed',
    text: '#431407',
    textSecondary: '#7c2d12',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)',
  },

  lyriclines: {
    primary: '#1d4ed8',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#ffffff',
    surface: '#eff6ff',
    text: '#1e3a8a',
    textSecondary: '#1e40af',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
  },
} as const;

// Theme variants
export const THEME_VARIANTS = {
  light: 'light',
  dark: 'dark',
  corporate: 'corporate',
  creative: 'creative',
} as const;

// Color scheme component props
interface ColorSchemeProps {
  company: keyof typeof COLOR_SCHEMES;
  variant?: keyof typeof THEME_VARIANTS;
  children: React.ReactNode;
  className?: string;
}

// Color scheme provider component
export const ColorSchemeProvider: React.FC<ColorSchemeProps> = ({
  company,
  variant = 'light',
  children,
  className = '',
}) => {
  const scheme = COLOR_SCHEMES[company];

  if (!scheme) {
    console.warn(`Color scheme not found for company: ${company}`);
    return <div className={className}>{children}</div>;
  }

  // Adjust colors based on variant
  const adjustedScheme =
    variant === 'dark'
      ? {
          ...scheme,
          background: '#1a1a1a',
          surface: '#2d2d2d',
          text: '#ffffff',
          textSecondary: '#a1a1aa',
        }
      : scheme;

  const cssVariables = {
    '--color-primary': adjustedScheme.primary,
    '--color-secondary': adjustedScheme.secondary,
    '--color-accent': adjustedScheme.accent,
    '--color-background': adjustedScheme.background,
    '--color-surface': adjustedScheme.surface,
    '--color-text': adjustedScheme.text,
    '--color-text-secondary': adjustedScheme.textSecondary,
    '--color-success': adjustedScheme.success,
    '--color-warning': adjustedScheme.warning,
    '--color-error': adjustedScheme.error,
    '--gradient-primary': adjustedScheme.gradient,
  } as React.CSSProperties;

  const providerClasses = [
    'color-scheme-provider',
    `color-scheme--${company}`,
    `color-scheme--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={providerClasses} style={cssVariables}>
      {children}
    </div>
  );
};

// Color palette display component
interface ColorPaletteProps {
  company: keyof typeof COLOR_SCHEMES;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
  layout?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  company,
  showLabels = true,
  size = 'medium',
  layout = 'horizontal',
  className = '',
}) => {
  const scheme = COLOR_SCHEMES[company];

  if (!scheme) {
    return null;
  }

  const paletteClasses = [
    'color-palette',
    `color-palette--${size}`,
    `color-palette--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const colors = [
    { name: 'Primary', value: scheme.primary },
    { name: 'Secondary', value: scheme.secondary },
    { name: 'Accent', value: scheme.accent },
    { name: 'Success', value: scheme.success },
    { name: 'Warning', value: scheme.warning },
    { name: 'Error', value: scheme.error },
  ];

  return (
    <div className={paletteClasses}>
      {colors.map((color) => (
        <div key={color.name} className="color-swatch">
          <div
            className="color-swatch__color"
            style={{ backgroundColor: color.value }}
          />
          {showLabels && (
            <div className="color-swatch__info">
              <span className="color-swatch__name">{color.name}</span>
              <span className="color-swatch__value">{color.value}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Gradient background component
interface GradientBackgroundProps {
  company: keyof typeof COLOR_SCHEMES;
  opacity?: number;
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  company,
  opacity = 1,
  overlay = false,
  children,
  className = '',
}) => {
  const scheme = COLOR_SCHEMES[company];

  if (!scheme) {
    return <div className={className}>{children}</div>;
  }

  const backgroundClasses = [
    'gradient-background',
    `gradient-background--${company}`,
    overlay ? 'gradient-background--with-overlay' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const backgroundStyle: React.CSSProperties = {
    background: scheme.gradient,
    opacity,
  };

  return (
    <div className={backgroundClasses} style={backgroundStyle}>
      {overlay && <div className="gradient-background__overlay" />}
      {children && (
        <div className="gradient-background__content">{children}</div>
      )}
    </div>
  );
};

// Color utility functions
export const getColorScheme = (company: keyof typeof COLOR_SCHEMES) => {
  return COLOR_SCHEMES[company];
};

export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation - in a real app, you'd use a more sophisticated algorithm
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#ffffff';
};

export const lightenColor = (color: string, amount: number): string => {
  // Simple color lightening - in a real app, you'd use a color manipulation library
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const darkenColor = (color: string, amount: number): string => {
  return lightenColor(color, -amount);
};

// Export all color schemes for external use
export default {
  COLOR_SCHEMES,
  THEME_VARIANTS,
  ColorSchemeProvider,
  ColorPalette,
  GradientBackground,
  getColorScheme,
  getContrastColor,
  lightenColor,
  darkenColor,
};
