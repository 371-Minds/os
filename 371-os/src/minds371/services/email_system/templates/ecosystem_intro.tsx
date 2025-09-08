import type React from 'react';

interface EcosystemIntroProps {
  recipientName: string;
  recipientTitle?: string;
  recipientCompany?: string;
  introductionContext: 'investor' | 'partner' | 'client' | 'talent';
  portfolioCompanies: {
    name: string;
    description: string;
    industry: string;
    stage: 'Startup' | 'Growth' | 'Scale' | 'Mature';
    keyMetrics: string;
    logo?: string;
  }[];
  ecosystemBenefits: string[];
  successStories: {
    title: string;
    description: string;
    impact: string;
  }[];
  nextSteps: {
    action: string;
    description: string;
    timeline: string;
  }[];
  contactPerson: {
    name: string;
    title: string;
    email: string;
    phone?: string;
  };
}

export const EcosystemIntro: React.FC<EcosystemIntroProps> = ({
  recipientName,
  recipientTitle,
  recipientCompany,
  introductionContext,
  portfolioCompanies,
  ecosystemBenefits,
  successStories,
  nextSteps,
  contactPerson,
}) => {
  const getContextTitle = (context: string) => {
    switch (context) {
      case 'investor':
        return 'Investment Opportunity';
      case 'partner':
        return 'Partnership Opportunity';
      case 'client':
        return 'Service Portfolio';
      case 'talent':
        return 'Career Opportunities';
      default:
        return 'Ecosystem Overview';
    }
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case 'investor':
        return '💰';
      case 'partner':
        return '🤝';
      case 'client':
        return '🎯';
      case 'talent':
        return '🚀';
      default:
        return '🌐';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Startup':
        return '#ff6b6b';
      case 'Growth':
        return '#4ecdc4';
      case 'Scale':
        return '#45b7d1';
      case 'Mature':
        return '#96ceb4';
      default:
        return '#6c757d';
    }
  };

  const getContextMessage = (context: string) => {
    switch (context) {
      case 'investor':
        return 'We believe our diversified portfolio of innovative companies presents exceptional investment opportunities with strong growth potential and proven market traction.';
      case 'partner':
        return 'Our ecosystem of companies offers unique collaboration opportunities that can drive mutual growth, innovation, and market expansion.';
      case 'client':
        return 'Our portfolio companies provide comprehensive solutions across multiple industries, offering you access to cutting-edge services and technologies.';
      case 'talent':
        return 'Join our ecosystem of innovative companies where talented individuals can make a significant impact while building their careers in dynamic, growth-oriented environments.';
      default:
        return 'Our ecosystem represents a carefully curated collection of companies working together to drive innovation and create value.';
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        color: '#212529',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px 30px',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: '0',
            fontSize: '36px',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {getContextIcon(introductionContext)} Welcome to 371 Minds
        </h1>
        <p
          style={{
            margin: '15px 0 0 0',
            fontSize: '20px',
            color: '#f8f9fa',
            opacity: '0.9',
          }}
        >
          {getContextTitle(introductionContext)}
        </p>
      </div>

      <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', marginTop: '0' }}>
          Dear {recipientName}
          {recipientTitle && `, ${recipientTitle}`}
          {recipientCompany && ` at ${recipientCompany}`},
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Thank you for your interest in 371 Minds. We're excited to introduce
          you to our innovative ecosystem of companies that are reshaping
          industries and driving technological advancement.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          {getContextMessage(introductionContext)}
        </p>

        <div
          style={{
            backgroundColor: '#e8f4fd',
            border: '3px solid #2196f3',
            padding: '30px',
            borderRadius: '15px',
            margin: '30px 0',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#1976d2', marginTop: '0', fontSize: '28px' }}>
            🏢 Our Ecosystem at a Glance
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              margin: '25px 0',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  color: '#1976d2',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Portfolio Companies
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                {portfolioCompanies.length}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  color: '#1976d2',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Industries Covered
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                {[...new Set(portfolioCompanies.map((c) => c.industry))].length}
              </p>
            </div>
          </div>
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '25px', fontSize: '26px' }}
        >
          🏢 Portfolio Companies
        </h3>

        {portfolioCompanies.map((company, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f8f9fa',
              border: '2px solid #dee2e6',
              padding: '25px',
              borderRadius: '15px',
              margin: '20px 0',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              {company.logo && (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '20px',
                    borderRadius: '10px',
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    color: '#212529',
                    margin: '0 0 5px 0',
                    fontSize: '24px',
                  }}
                >
                  {company.name}
                </h4>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                  <span
                    style={{
                      backgroundColor: getStageColor(company.stage),
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {company.stage}
                  </span>
                  <span
                    style={{
                      backgroundColor: '#6c757d',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                    }}
                  >
                    {company.industry}
                  </span>
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                margin: '15px 0',
                color: '#495057',
              }}
            >
              {company.description}
            </p>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
            >
              <h5
                style={{
                  color: '#495057',
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                }}
              >
                📊 Key Metrics:
              </h5>
              <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                {company.keyMetrics}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: '#d4edda',
            border: '2px solid #28a745',
            padding: '25px',
            borderRadius: '15px',
            margin: '30px 0',
          }}
        >
          <h3 style={{ color: '#155724', marginTop: '0', fontSize: '22px' }}>
            🌟 Ecosystem Benefits
          </h3>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            {ecosystemBenefits.map((benefit, index) => (
              <li
                key={index}
                style={{ margin: '8px 0', fontSize: '16px', color: '#155724' }}
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          🏆 Success Stories
        </h3>

        {successStories.map((story, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              padding: '25px',
              borderRadius: '15px',
              margin: '20px 0',
            }}
          >
            <h4
              style={{
                color: '#856404',
                margin: '0 0 15px 0',
                fontSize: '20px',
              }}
            >
              {story.title}
            </h4>

            <p
              style={{
                margin: '0 0 15px 0',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#856404',
              }}
            >
              {story.description}
            </p>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #ffc107',
              }}
            >
              <h5
                style={{
                  color: '#856404',
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                }}
              >
                💡 Impact:
              </h5>
              <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                {story.impact}
              </p>
            </div>
          </div>
        ))}

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          🎯 Next Steps
        </h3>

        <div
          style={{
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            padding: '20px',
            borderRadius: '12px',
            margin: '20px 0',
          }}
        >
          {nextSteps.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                margin: '15px 0',
                borderLeft: '4px solid #2196f3',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <h4 style={{ margin: '0', color: '#1976d2', fontSize: '18px' }}>
                  {step.action}
                </h4>
                <div
                  style={{
                    backgroundColor: '#2196f3',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  {step.timeline}
                </div>
              </div>
              <p
                style={{
                  margin: '0',
                  color: '#495057',
                  fontSize: '16px',
                  lineHeight: '1.6',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: '#17a2b8',
            color: '#ffffff',
            padding: '25px',
            borderRadius: '12px',
            margin: '30px 0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', fontSize: '22px' }}>
            📞 Let's Connect
          </h3>
          <p
            style={{
              margin: '0 0 15px 0',
              fontSize: '16px',
              lineHeight: '1.6',
            }}
          >
            Ready to explore how 371 Minds can add value to your{' '}
            {introductionContext === 'investor'
              ? 'investment portfolio'
              : introductionContext === 'partner'
                ? 'business partnerships'
                : introductionContext === 'client'
                  ? 'business operations'
                  : 'career journey'}
            ?
          </p>
          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#17a2b8',
              padding: '15px',
              borderRadius: '8px',
              margin: '15px 0',
            }}
          >
            <p
              style={{
                margin: '0 0 5px 0',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              {contactPerson.name}
            </p>
            <p style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
              {contactPerson.title}
            </p>
            <p style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
              📧 {contactPerson.email}
            </p>
            {contactPerson.phone && (
              <p style={{ margin: '0', fontSize: '16px' }}>
                📞 {contactPerson.phone}
              </p>
            )}
          </div>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're excited about the possibility of working together and look
          forward to discussing how our ecosystem can create value for your
          organization.
        </p>

        <p style={{ fontSize: '16px' }}>
          Best regards,
          <br />
          <strong style={{ color: '#212529' }}>The 371 Minds Team</strong>
        </p>

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0', fontSize: '16px', color: '#6c757d' }}>
            <strong style={{ color: '#212529' }}>371 Minds</strong> - Building
            the Future Together
          </p>
          <p
            style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#adb5bd' }}
          >
            Innovate • Connect • Scale • Succeed
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcosystemIntro;
