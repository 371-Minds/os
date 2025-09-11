import type React from 'react';

interface LaunchAnnouncementProps {
  recipientName: string;
  companyName?: string;
}

export const LaunchAnnouncement: React.FC<LaunchAnnouncementProps> = ({
  recipientName,
  companyName,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          color: '#2c3e50',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px',
        }}
      >
        🏛️ Legacy Code Archaeologist - Now Live!
      </h1>

      <p>Dear {recipientName},</p>

      <p>
        We're excited to announce the official launch of{' '}
        <strong>Legacy Code Archaeologist</strong> - your specialized partner
        for modernizing and understanding legacy codebases.
      </p>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>What We Offer:</h3>
        <ul>
          <li>🔍 Deep legacy code analysis and documentation</li>
          <li>🛠️ Modernization roadmaps and migration strategies</li>
          <li>📊 Technical debt assessment and prioritization</li>
          <li>🚀 Gradual refactoring and system upgrades</li>
          <li>📚 Knowledge transfer and team training</li>
        </ul>
      </div>

      <p>
        Whether you're dealing with decades-old COBOL systems, tangled PHP
        applications, or monolithic Java architectures, we have the expertise to
        help you navigate the complexities of legacy modernization.
      </p>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a
          href="#"
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
          }}
        >
          Schedule Your Free Consultation
        </a>
      </div>

      <p>
        Ready to unearth the potential in your legacy systems? Let's start the
        archaeological dig!
      </p>

      <p>
        Best regards,
        <br />
        The Legacy Code Archaeologist Team
      </p>

      <hr
        style={{
          margin: '30px 0',
          border: 'none',
          borderTop: '1px solid #eee',
        }}
      />
      <p style={{ fontSize: '12px', color: '#666' }}>
        Legacy Code Archaeologist - Excavating Value from Legacy Systems
      </p>
    </div>
  );
};

export default LaunchAnnouncement;
