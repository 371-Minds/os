import React from 'react';

// Typography scale definitions
export const TYPOGRAPHY_SCALES = {
  '371minds': {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"JetBrains Mono", "Fira Code", Consolas, monospace',
      heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem'  // 60px
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'readysetbuild': {
    fontFamily: {
      primary: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Source Code Pro", "Courier New", monospace',
      heading: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'stacksense': {
    fontFamily: {
      primary: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Inconsolata", "Monaco", monospace',
      heading: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.3',
      normal: '1.6',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'legacy-archaeologist': {
    fontFamily: {
      primary: '"Crimson Text", Georgia, "Times New Roman", serif',
      secondary: '"Ubuntu Mono", "Courier New", monospace',
      heading: '"Playfair Display", Georgia, "Times New Roman", serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.4',
      normal: '1.7',
      relaxed: '1.9'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'modumind': {
    fontFamily: {
      primary: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Fira Code", "Consolas", monospace',
      heading: '"Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'rootlift': {
    fontFamily: {
      primary: '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Source Code Pro", "Monaco", monospace',
      heading: '"Merriweather", Georgia, "Times New Roman", serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.3',
      normal: '1.6',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'vision2results': {
    fontFamily: {
      primary: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Roboto Mono", "Courier New", monospace',
      heading: '"Oswald", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'multimedia-junkie': {
    fontFamily: {
      primary: '"Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Space Mono", "Courier New", monospace',
      heading: '"Fredoka One", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.3',
      normal: '1.6',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'ikid': {
    fontFamily: {
      primary: '"Comic Neue", "Comic Sans MS", cursive',
      secondary: '"Courier New", monospace',
      heading: '"Bubblegum Sans", "Comic Sans MS", cursive'
    },
    fontSize: {
      xs: '0.875rem',  // Slightly larger for kids
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.375rem',
      '2xl': '1.625rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3.25rem',
      '6xl': '4rem'
    },
    lineHeight: {
      tight: '1.4',
      normal: '1.7',
      relaxed: '2'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'epicquest': {
    fontFamily: {
      primary: '"Cinzel", Georgia, "Times New Roman", serif',
      secondary: '"Courier New", monospace',
      heading: '"Cinzel Decorative", Georgia, "Times New Roman", serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    lineHeight: {
      tight: '1.3',
      normal: '1.6',
      relaxed: '1.8'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  'lyriclines': {
    fontFamily: {
      primary: '"Dancing Script", cursive',
      secondary: '"Courier New", monospace',
      heading: '"Pacifico", cursive'
    },
    fontSize: {
      xs: '0.875rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.375rem',
      '2xl': '1.625rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3.25rem',
      '6xl': '4rem'
    },
    lineHeight: {
      tight: '1.4',
      normal: '1.7',
      relaxed: '2'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  }
} as const;

// Typography component props
interface TypographyProps {
  company: keyof typeof TYPOGRAPHY_SCALES;
  children: React.ReactNode;
  className?: string;
}

// Typography provider component
export const TypographyProvider: React.FC<TypographyProps> = ({
  company,
  children,
  className = ''
}) => {
  const typography = TYPOGRAPHY_SCALES[company];
  
  if (!typography) {
    console.warn(`Typography scale not found for company: ${company}`);
    return <div className={className}>{children}</div>;
  }

  const cssVariables = {
    '--font-family-primary': typography.fontFamily.primary,
    '--font-family-secondary': typography.fontFamily.secondary,
    '--font-family-heading': typography.fontFamily.heading,
    '--font-size-xs': typography.fontSize.xs,
    '--font-size-sm': typography.fontSize.sm,
    '--font-size-base': typography.fontSize.base,
    '--font-size-lg': typography.fontSize.lg,
    '--font-size-xl': typography.fontSize.xl,
    '--font-size-2xl': typography.fontSize['2xl'],
    '--font-size-3xl': typography.fontSize['3xl'],
    '--font-size-4xl': typography.fontSize['4xl'],
    '--font-size-5xl': typography.fontSize['5xl'],
    '--font-size-6xl': typography.fontSize['6xl'],
    '--line-height-tight': typography.lineHeight.tight,
    '--line-height-normal': typography.lineHeight.normal,
    '--line-height-relaxed': typography.lineHeight.relaxed,
    '--font-weight-light': typography.fontWeight.light,
    '--font-weight-normal': typography.fontWeight.normal,
    '--font-weight-medium': typography.fontWeight.medium,
    '--font-weight-semibold': typography.fontWeight.semibold,
    '--font-weight-bold': typography.fontWeight.bold,
    '--font-weight-extrabold': typography.fontWeight.extrabold
  } as React.CSSProperties;

  const providerClasses = [
    'typography-provider',
    `typography--${company}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={providerClasses}
      style={cssVariables}
    >
      {children}
    </div>
  );
};

// Text component with typography styles
interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: keyof typeof TYPOGRAPHY_SCALES['371minds']['fontSize'];
  weight?: keyof typeof TYPOGRAPHY_SCALES['371minds']['fontWeight'];
  lineHeight?: keyof typeof TYPOGRAPHY_SCALES['371minds']['lineHeight'];
  family?: 'primary' | 'secondary' | 'heading';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  lineHeight = 'normal',
  family = 'primary',
  color,
  align = 'left',
  children,
  className = ''
}) => {
  const textClasses = [
    'typography-text',
    `typography-text--${size}`,
    `typography-text--${weight}`,
    `typography-text--${lineHeight}`,
    `typography-text--${family}`,
    `typography-text--${align}`,
    className
  ].filter(Boolean).join(' ');

  const textStyle: React.CSSProperties = {
    fontSize: `var(--font-size-${size})`,
    fontWeight: `var(--font-weight-${weight})`,
    lineHeight: `var(--line-height-${lineHeight})`,
    fontFamily: `var(--font-family-${family})`,
    textAlign: align,
    ...(color && { color })
  };

  return (
    <Component className={textClasses} style={textStyle}>
      {children}
    </Component>
  );
};

// Heading component
interface HeadingProps extends Omit<TextProps, 'as'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  size,
  weight = 'bold',
  family = 'heading',
  ...props
}) => {
  const defaultSizes = {
    1: '4xl' as const,
    2: '3xl' as const,
    3: '2xl' as const,
    4: 'xl' as const,
    5: 'lg' as const,
    6: 'base' as const
  };

  return (
    <Text
      as={`h${level}` as any}
      size={size || defaultSizes[level]}
      weight={weight}
      family={family}
      {...props}
    />
  );
};

// Typography showcase component
interface TypographyShowcaseProps {
  company: keyof typeof TYPOGRAPHY_SCALES;
  showFonts?: boolean;
  showSizes?: boolean;
  showWeights?: boolean;
  className?: string;
}

export const TypographyShowcase: React.FC<TypographyShowcaseProps> = ({
  company,
  showFonts = true,
  showSizes = true,
  showWeights = true,
  className = ''
}) => {
  const typography = TYPOGRAPHY_SCALES[company];
  
  if (!typography) {
    return null;
  }

  const showcaseClasses = [
    'typography-showcase',
    `typography-showcase--${company}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <TypographyProvider company={company}>
      <div className={showcaseClasses}>
        
        {showFonts && (
          <div className="typography-section">
            <h3>Font Families</h3>
            <div className="font-samples">
              <Text family="primary" size="lg">
                Primary: {typography.fontFamily.primary}
              </Text>
              <Text family="secondary" size="lg">
                Secondary: {typography.fontFamily.secondary}
              </Text>
              <Text family="heading" size="lg">
                Heading: {typography.fontFamily.heading}
              </Text>
            </div>
          </div>
        )}
        
        {showSizes && (
          <div className="typography-section">
            <h3>Font Sizes</h3>
            <div className="size-samples">
              {Object.entries(typography.fontSize).map(([size, value]) => (
                <Text key={size} size={size as any} className="size-sample">
                  {size}: {value} - The quick brown fox jumps over the lazy dog
                </Text>
              ))}
            </div>
          </div>
        )}
        
        {showWeights && (
          <div className="typography-section">
            <h3>Font Weights</h3>
            <div className="weight-samples">
              {Object.entries(typography.fontWeight).map(([weight, value]) => (
                <Text key={weight} weight={weight as any} size="lg" className="weight-sample">
                  {weight} ({value}): The quick brown fox jumps over the lazy dog
                </Text>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </TypographyProvider>
  );
};

// Utility functions
export const getTypographyScale = (company: keyof typeof TYPOGRAPHY_SCALES) => {
  return TYPOGRAPHY_SCALES[company];
};

export const getFontFamily = (company: keyof typeof TYPOGRAPHY_SCALES, type: 'primary' | 'secondary' | 'heading') => {
  const typography = TYPOGRAPHY_SCALES[company];
  return typography?.fontFamily[type];
};

export const getFontSize = (company: keyof typeof TYPOGRAPHY_SCALES, size: keyof typeof TYPOGRAPHY_SCALES['371minds']['fontSize']) => {
  const typography = TYPOGRAPHY_SCALES[company];
  return typography?.fontSize[size];
};

// Export all typography scales for external use
export default {
  TYPOGRAPHY_SCALES,
  TypographyProvider,
  Text,
  Heading,
  TypographyShowcase,
  getTypographyScale,
  getFontFamily,
  getFontSize
};