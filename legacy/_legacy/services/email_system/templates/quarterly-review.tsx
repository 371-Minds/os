import type React from 'react';

interface Metric {
  name: string;
  target: string;
  actual: string;
  status: 'exceeded' | 'met' | 'below';
}

interface QuarterlyReviewProps {
  clientName: string;
  quarter: string;
  year: string;
  metrics: Metric[];
  achievements: string[];
  challenges: string[];
  nextQuarterFocus: string[];
  consultantName: string;
}

export const QuarterlyReview: React.FC<QuarterlyReviewProps> = ({
  clientName,
  quarter,
  year,
  metrics,
  achievements,
  challenges,
  nextQuarterFocus,
  consultantName,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return '#27ae60';
      case 'met':
        return '#3498db';
      case 'below':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return '↗️';
      case 'met':
        return '✅';
      case 'below':
        return '⚠️';
      default:
        return '📊';
    }
  };

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
        {quarter} {year} Quarterly Review
      </h1>

      <p>Dear {clientName},</p>

      <p>
        We're pleased to share your quarterly performance review for {quarter}{' '}
        {year}. This comprehensive report highlights our progress, achievements,
        and strategic focus areas for the upcoming quarter.
      </p>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
          Performance Metrics
        </h3>
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom:
                index < metrics.length - 1 ? '1px solid #ecf0f1' : 'none',
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{metric.name}</strong>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              Target: {metric.target}
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              Actual: {metric.actual}
            </div>
            <div
              style={{
                flex: 0.5,
                textAlign: 'center',
                color: getStatusColor(metric.status),
                fontSize: '18px',
              }}
            >
              {getStatusIcon(metric.status)}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Key Achievements</h3>
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#fdf2e8',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
          Challenges & Learnings
        </h3>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {challenge}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#e8f4fd',
          padding: '20px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Next Quarter Focus</h3>
        <ol>
          {nextQuarterFocus.map((focus, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {focus}
            </li>
          ))}
        </ol>
      </div>

      <h3 style={{ color: '#2c3e50' }}>Looking Ahead</h3>
      <p>
        Based on this quarter's performance and market insights, we're
        well-positioned to accelerate growth in the coming months. We'll
        continue to monitor key metrics closely and adjust our strategies to
        ensure optimal results.
      </p>

      <p>
        I'll be scheduling our quarterly review meeting within the next week to
        discuss these results in detail and finalize our strategy for the next
        quarter.
      </p>

      <p>
        Best regards,
        <br />
        {consultantName}
        <br />
        Account Director
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

export default QuarterlyReview;
