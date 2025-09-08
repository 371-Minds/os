import type React from 'react';

interface StrategySessionRecapProps {
  clientName: string;
  sessionDate: string;
  keyFindings: string[];
  nextSteps: string[];
  consultantName: string;
}

export const StrategySessionRecap: React.FC<StrategySessionRecapProps> = ({
  clientName,
  sessionDate,
  keyFindings,
  nextSteps,
  consultantName,
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
        Strategy Session Recap
      </h1>

      <p>Dear {clientName},</p>

      <p>
        Thank you for the productive strategy session on {sessionDate}. This
        recap summarizes our key discussions, findings, and the strategic
        direction we've outlined for your organization.
      </p>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Key Findings</h3>
        <ul>
          {keyFindings.map((finding, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {finding}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
          Strategic Next Steps
        </h3>
        <ol>
          {nextSteps.map((step, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <h3 style={{ color: '#2c3e50' }}>Moving Forward</h3>
      <p>
        Based on our session, we'll be developing a comprehensive implementation
        roadmap that aligns with your strategic objectives. This will include
        detailed timelines, resource requirements, and success metrics.
      </p>

      <p>
        I'll be following up within 48 hours with additional documentation and
        our preliminary roadmap draft for your review.
      </p>

      <p>
        Best regards,
        <br />
        {consultantName}
        <br />
        Senior Strategy Consultant
        <br />
        Vision2Results
      </p>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '5px',
        }}
      >
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>Vision2Results</strong> - Transforming Visions into Measurable
          Results
        </p>
      </div>
    </div>
  );
};

export default StrategySessionRecap;
