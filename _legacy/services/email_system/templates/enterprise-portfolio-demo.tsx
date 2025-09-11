import type React from 'react';

interface EnterprisePortfolioDemoProps {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  demoDate: string;
  demoTime: string;
  demoType: 'Virtual' | 'In-Person' | 'Hybrid';
  meetingLink?: string;
  address?: string;
  portfolioSolutions: {
    companyName: string;
    solution: string;
    relevance: string;
    keyFeatures: string[];
    businessValue: string;
  }[];
  demoAgenda: {
    time: string;
    topic: string;
    presenter: string;
    duration: string;
  }[];
  preparationMaterials: {
    title: string;
    description: string;
    link?: string;
  }[];
  attendees: {
    name: string;
    title: string;
    company: string;
    expertise: string;
  }[];
  followUpActions: string[];
  contactPerson: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
}

export const EnterprisePortfolioDemo: React.FC<
  EnterprisePortfolioDemoProps
> = ({
  recipientName,
  recipientTitle,
  companyName,
  demoDate,
  demoTime,
  demoType,
  meetingLink,
  address,
  portfolioSolutions,
  demoAgenda,
  preparationMaterials,
  attendees,
  followUpActions,
  contactPerson,
}) => {
  const getDemoIcon = (type: string) => {
    switch (type) {
      case 'Virtual':
        return '💻';
      case 'In-Person':
        return '🏢';
      case 'Hybrid':
        return '🌐';
      default:
        return '📋';
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
          background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
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
          {getDemoIcon(demoType)} Enterprise Portfolio Demo
        </h1>
        <p
          style={{
            margin: '15px 0 0 0',
            fontSize: '20px',
            color: '#ecf0f1',
            opacity: '0.9',
          }}
        >
          Comprehensive Solutions Showcase
        </p>
      </div>

      <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', marginTop: '0' }}>
          Dear {recipientName}, {recipientTitle} at {companyName},
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're excited to present our comprehensive portfolio demo tailored
          specifically for
          {companyName}'s enterprise needs. This demonstration will showcase how
          our ecosystem of companies can provide integrated solutions to drive
          your business forward.
        </p>

        <div
          style={{
            backgroundColor: '#e8f5e8',
            border: '3px solid #28a745',
            padding: '30px',
            borderRadius: '15px',
            margin: '30px 0',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#155724', marginTop: '0', fontSize: '28px' }}>
            📅 Demo Details
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
                  color: '#28a745',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Date & Time
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                {demoDate}
              </p>
              <p
                style={{
                  margin: '5px 0 0 0',
                  fontSize: '16px',
                  color: '#6c757d',
                }}
              >
                {demoTime}
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
                  color: '#28a745',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Format
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                {demoType} Demo
              </p>
            </div>
          </div>

          {meetingLink && (
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                margin: '20px 0',
              }}
            >
              <h3
                style={{
                  color: '#28a745',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Meeting Link
              </h3>
              <a
                href={meetingLink}
                style={{
                  color: '#007bff',
                  fontSize: '16px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Join Demo Session
              </a>
            </div>
          )}

          {address && (
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                margin: '20px 0',
              }}
            >
              <h3
                style={{
                  color: '#28a745',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                Location
              </h3>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {address}
              </p>
            </div>
          )}
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '25px', fontSize: '26px' }}
        >
          🎯 Portfolio Solutions Overview
        </h3>

        {portfolioSolutions.map((solution, index) => (
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
            <h4
              style={{
                color: '#2c3e50',
                margin: '0 0 10px 0',
                fontSize: '22px',
              }}
            >
              {solution.companyName}
            </h4>

            <div
              style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0',
              }}
            >
              <h5
                style={{
                  color: '#1976d2',
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                }}
              >
                💡 Solution:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {solution.solution}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#fff3cd',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0',
              }}
            >
              <h5
                style={{
                  color: '#856404',
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                }}
              >
                🎯 Relevance to {companyName}:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {solution.relevance}
              </p>
            </div>

            <div style={{ margin: '15px 0' }}>
              <h5
                style={{
                  color: '#495057',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                ✨ Key Features:
              </h5>
              <ul
                style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}
              >
                {solution.keyFeatures.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    style={{ margin: '5px 0', color: '#495057' }}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                backgroundColor: '#d4edda',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0',
              }}
            >
              <h5
                style={{
                  color: '#155724',
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                }}
              >
                💼 Business Value:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {solution.businessValue}
              </p>
            </div>
          </div>
        ))}

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          📋 Demo Agenda
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
          {demoAgenda.map((item, index) => (
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
                <div>
                  <h4
                    style={{ margin: '0', color: '#1976d2', fontSize: '18px' }}
                  >
                    {item.topic}
                  </h4>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      color: '#6c757d',
                      fontSize: '14px',
                    }}
                  >
                    Presenter: {item.presenter}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      backgroundColor: '#2196f3',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      marginBottom: '5px',
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    style={{
                      backgroundColor: '#6c757d',
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    {item.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          📚 Preparation Materials
        </h3>

        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            padding: '20px',
            borderRadius: '12px',
            margin: '20px 0',
          }}
        >
          {preparationMaterials.map((material, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                margin: '10px 0',
                border: '1px solid #ffc107',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#856404',
                  fontSize: '18px',
                }}
              >
                {material.title}
              </h4>
              <p
                style={{
                  margin: '0 0 10px 0',
                  color: '#495057',
                  fontSize: '14px',
                }}
              >
                {material.description}
              </p>
              {material.link && (
                <a
                  href={material.link}
                  style={{
                    color: '#007bff',
                    fontSize: '14px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  📎 Access Material
                </a>
              )}
            </div>
          ))}
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          👥 Demo Team
        </h3>

        <div
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid #6c757d',
            padding: '20px',
            borderRadius: '12px',
            margin: '20px 0',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
            }}
          >
            {attendees.map((attendee, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 5px 0',
                    color: '#212529',
                    fontSize: '16px',
                  }}
                >
                  {attendee.name}
                </h4>
                <p
                  style={{
                    margin: '0 0 5px 0',
                    color: '#6c757d',
                    fontSize: '14px',
                  }}
                >
                  {attendee.title}
                </p>
                <p
                  style={{
                    margin: '0 0 8px 0',
                    color: '#6c757d',
                    fontSize: '14px',
                  }}
                >
                  {attendee.company}
                </p>
                <p
                  style={{
                    margin: '0',
                    color: '#495057',
                    fontSize: '13px',
                    fontStyle: 'italic',
                  }}
                >
                  {attendee.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#d1ecf1',
            border: '2px solid #17a2b8',
            padding: '25px',
            borderRadius: '15px',
            margin: '30px 0',
          }}
        >
          <h3 style={{ color: '#0c5460', marginTop: '0', fontSize: '22px' }}>
            🎯 Post-Demo Follow-up
          </h3>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            {followUpActions.map((action, index) => (
              <li
                key={index}
                style={{ margin: '8px 0', fontSize: '16px', color: '#0c5460' }}
              >
                {action}
              </li>
            ))}
          </ul>
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
            📞 Demo Coordinator
          </h3>
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
            <p style={{ margin: '0', fontSize: '16px' }}>
              📞 {contactPerson.phone}
            </p>
          </div>
          <p style={{ margin: '15px 0 0 0', fontSize: '14px' }}>
            Please reach out with any questions or special requirements before
            the demo.
          </p>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're looking forward to demonstrating how our portfolio of solutions
          can transform
          {companyName}'s operations and drive significant business value. This
          demo is customized specifically for your needs and challenges.
        </p>

        <p style={{ fontSize: '16px' }}>
          See you at the demo!
          <br />
          <strong style={{ color: '#212529' }}>
            The 371 Minds Enterprise Solutions Team
          </strong>
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
            <strong style={{ color: '#212529' }}>371 Minds</strong> - Enterprise
            Portfolio Solutions
          </p>
          <p
            style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#adb5bd' }}
          >
            Integrate • Innovate • Implement • Impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePortfolioDemo;
