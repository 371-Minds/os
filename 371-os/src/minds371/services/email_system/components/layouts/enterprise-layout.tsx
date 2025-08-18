import React from 'react';

interface EnterpriseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  companyName?: string;
  theme?: 'light' | 'dark' | 'corporate';
  maxWidth?: string;
  backgroundColor?: string;
  className?: string;
}

export const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  companyName,
  theme = 'corporate',
  maxWidth = '1200px',
  backgroundColor = '#ffffff',
  className = ''
}) => {
  const layoutClasses = [
    'enterprise-layout',
    `enterprise-layout--${theme}`,
    sidebar ? 'enterprise-layout--with-sidebar' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={layoutClasses}
      style={{ 
        backgroundColor,
        '--max-width': maxWidth 
      } as React.CSSProperties}
    >
      {/* Email Container */}
      <div className="enterprise-layout__container">
        
        {/* Header Section */}
        {header && (
          <div className="enterprise-layout__header">
            {header}
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="enterprise-layout__main">
          
          {/* Sidebar (if provided) */}
          {sidebar && (
            <aside className="enterprise-layout__sidebar">
              {sidebar}
            </aside>
          )}
          
          {/* Content Area */}
          <main className="enterprise-layout__content">
            
            {/* Company Branding Bar */}
            {companyName && (
              <div className="enterprise-layout__branding">
                <div className="branding-bar">
                  <span className="company-name">{companyName}</span>
                  <span className="enterprise-badge">Enterprise</span>
                </div>
              </div>
            )}
            
            {/* Main Content */}
            <div className="enterprise-layout__body">
              {children}
            </div>
            
          </main>
        </div>
        
        {/* Footer Section */}
        {footer && (
          <div className="enterprise-layout__footer">
            {footer}
          </div>
        )}
        
        {/* Enterprise Footer Bar */}
        <div className="enterprise-layout__enterprise-footer">
          <div className="enterprise-footer-content">
            <div className="security-badges">
              <span className="security-badge">🔒 Enterprise Security</span>
              <span className="compliance-badge">✓ SOC 2 Compliant</span>
              <span className="support-badge">24/7 Enterprise Support</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// Enterprise-specific components
interface EnterpriseHeaderProps {
  companyLogo?: string;
  companyName: string;
  accountManager?: {
    name: string;
    email: string;
    phone?: string;
  };
  supportLevel?: 'standard' | 'premium' | 'enterprise';
}

export const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({
  companyLogo,
  companyName,
  accountManager,
  supportLevel = 'enterprise'
}) => {
  return (
    <header className="enterprise-header">
      <div className="enterprise-header__content">
        <div className="enterprise-header__branding">
          {companyLogo && (
            <img src={companyLogo} alt={companyName} className="company-logo" />
          )}
          <div className="company-info">
            <h1 className="company-name">{companyName}</h1>
            <span className={`support-level support-level--${supportLevel}`}>
              {supportLevel.charAt(0).toUpperCase() + supportLevel.slice(1)} Account
            </span>
          </div>
        </div>
        
        {accountManager && (
          <div className="enterprise-header__account-manager">
            <div className="account-manager-info">
              <span className="account-manager-label">Your Account Manager</span>
              <div className="account-manager-details">
                <span className="manager-name">{accountManager.name}</span>
                <a href={`mailto:${accountManager.email}`} className="manager-email">
                  {accountManager.email}
                </a>
                {accountManager.phone && (
                  <a href={`tel:${accountManager.phone}`} className="manager-phone">
                    {accountManager.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface EnterpriseSidebarProps {
  quickLinks?: Array<{
    title: string;
    url: string;
    icon?: string;
  }>;
  announcements?: Array<{
    title: string;
    date: string;
    priority?: 'low' | 'medium' | 'high';
  }>;
  metrics?: Array<{
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }>;
}

export const EnterpriseSidebar: React.FC<EnterpriseSidebarProps> = ({
  quickLinks,
  announcements,
  metrics
}) => {
  return (
    <div className="enterprise-sidebar">
      
      {quickLinks && quickLinks.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="quick-links">
            {quickLinks.map((link, index) => (
              <li key={index} className="quick-link-item">
                <a href={link.url} className="quick-link">
                  {link.icon && <span className="link-icon">{link.icon}</span>}
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {metrics && metrics.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">Key Metrics</h3>
          <div className="metrics-list">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <span className="metric-label">{metric.label}</span>
                <div className="metric-value-container">
                  <span className="metric-value">{metric.value}</span>
                  {metric.trend && (
                    <span className={`metric-trend metric-trend--${metric.trend}`}>
                      {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {announcements && announcements.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">Announcements</h3>
          <div className="announcements-list">
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement-item">
                <div className={`announcement-priority priority--${announcement.priority || 'medium'}`}>
                  <span className="announcement-title">{announcement.title}</span>
                  <span className="announcement-date">{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EnterpriseLayout;