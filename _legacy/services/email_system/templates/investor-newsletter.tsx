import type React from 'react';

interface InvestorNewsletterProps {
  investorName: string;
  quarterPeriod: string;
  year: number;
  portfolioPerformance: {
    totalValue: number;
    quarterlyGrowth: number;
    yearOverYearGrowth: number;
    roi: number;
  };
  marketHighlights: {
    title: string;
    description: string;
    impact: 'positive' | 'neutral' | 'negative';
  }[];
  companySpotlights: {
    companyName: string;
    achievement: string;
    metrics: string;
    futureOutlook: string;
  }[];
  investmentOpportunities: {
    title: string;
    description: string;
    investmentRange: string;
    expectedReturns: string;
    timeline: string;
  }[];
  riskAssessment: {
    level: 'Low' | 'Medium' | 'High';
    factors: string[];
    mitigation: string;
  };
  upcomingEvents: {
    event: string;
    date: string;
    description: string;
  }[];
}

export const InvestorNewsletter: React.FC<InvestorNewsletterProps> = ({
  investorName,
  quarterPeriod,
  year,
  portfolioPerformance,
  marketHighlights,
  companySpotlights,
  investmentOpportunities,
  riskAssessment,
  upcomingEvents,
}) => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value: number) =>
    `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  const getImpactColor = (impact: 'positive' | 'neutral' | 'negative') => {
    switch (impact) {
      case 'positive':
        return '#28a745';
      case 'neutral':
        return '#ffc107';
      case 'negative':
        return '#dc3545';
    }
  };

  const getRiskColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'High':
        return '#dc3545';
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
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
          📈 Investor Newsletter
        </h1>
        <p
          style={{
            margin: '15px 0 0 0',
            fontSize: '20px',
            color: '#e3f2fd',
            opacity: '0.9',
          }}
        >
          {quarterPeriod} {year} Investment Report
        </p>
      </div>

      <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', marginTop: '0' }}>Dear {investorName},</p>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're pleased to present your quarterly investment newsletter,
          providing comprehensive insights into portfolio performance, market
          trends, and upcoming opportunities. This quarter has demonstrated the
          strength and resilience of our strategic investments.
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
          <h2 style={{ color: '#28a745', marginTop: '0', fontSize: '28px' }}>
            💼 Portfolio Performance
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
                Total Portfolio Value
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                {formatCurrency(portfolioPerformance.totalValue)}
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
                Quarterly Growth
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color:
                    portfolioPerformance.quarterlyGrowth >= 0
                      ? '#28a745'
                      : '#dc3545',
                }}
              >
                {formatPercentage(portfolioPerformance.quarterlyGrowth)}
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
                Year-over-Year Growth
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color:
                    portfolioPerformance.yearOverYearGrowth >= 0
                      ? '#28a745'
                      : '#dc3545',
                }}
              >
                {formatPercentage(portfolioPerformance.yearOverYearGrowth)}
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
                Return on Investment
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: portfolioPerformance.roi >= 0 ? '#28a745' : '#dc3545',
                }}
              >
                {formatPercentage(portfolioPerformance.roi)}
              </p>
            </div>
          </div>
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          📊 Market Highlights
        </h3>

        {marketHighlights.map((highlight, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f8f9fa',
              border: `2px solid ${getImpactColor(highlight.impact)}`,
              padding: '20px',
              borderRadius: '12px',
              margin: '15px 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getImpactColor(highlight.impact),
                  marginRight: '10px',
                }}
              ></div>
              <h4 style={{ color: '#212529', margin: '0', fontSize: '18px' }}>
                {highlight.title}
              </h4>
            </div>
            <p
              style={{
                margin: '0',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#495057',
              }}
            >
              {highlight.description}
            </p>
          </div>
        ))}

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          🌟 Company Spotlights
        </h3>

        {companySpotlights.map((company, index) => (
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
                fontSize: '22px',
              }}
            >
              {company.companyName}
            </h4>

            <div
              style={{
                backgroundColor: '#ffffff',
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
                🏆 Key Achievement:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {company.achievement}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
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
                📈 Performance Metrics:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {company.metrics}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
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
                🔮 Future Outlook:
              </h5>
              <p style={{ margin: '0', fontSize: '16px', color: '#212529' }}>
                {company.futureOutlook}
              </p>
            </div>
          </div>
        ))}

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          💰 New Investment Opportunities
        </h3>

        {investmentOpportunities.map((opportunity, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#e3f2fd',
              border: '2px solid #2196f3',
              padding: '25px',
              borderRadius: '15px',
              margin: '20px 0',
            }}
          >
            <h4
              style={{
                color: '#1565c0',
                margin: '0 0 15px 0',
                fontSize: '20px',
              }}
            >
              {opportunity.title}
            </h4>

            <p
              style={{
                margin: '0 0 15px 0',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#1976d2',
              }}
            >
              {opportunity.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              >
                <h5
                  style={{
                    color: '#1565c0',
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                  }}
                >
                  Investment Range:
                </h5>
                <p
                  style={{
                    margin: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#212529',
                  }}
                >
                  {opportunity.investmentRange}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              >
                <h5
                  style={{
                    color: '#1565c0',
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                  }}
                >
                  Expected Returns:
                </h5>
                <p
                  style={{
                    margin: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#28a745',
                  }}
                >
                  {opportunity.expectedReturns}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              >
                <h5
                  style={{
                    color: '#1565c0',
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                  }}
                >
                  Timeline:
                </h5>
                <p
                  style={{
                    margin: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#212529',
                  }}
                >
                  {opportunity.timeline}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: '#f8d7da',
            border: `2px solid ${getRiskColor(riskAssessment.level)}`,
            padding: '25px',
            borderRadius: '15px',
            margin: '30px 0',
          }}
        >
          <h3 style={{ color: '#721c24', marginTop: '0', fontSize: '22px' }}>
            ⚠️ Risk Assessment - {riskAssessment.level} Risk
          </h3>

          <div style={{ margin: '15px 0' }}>
            <h5
              style={{
                color: '#721c24',
                margin: '0 0 10px 0',
                fontSize: '16px',
              }}
            >
              Key Risk Factors:
            </h5>
            <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
              {riskAssessment.factors.map((factor, index) => (
                <li key={index} style={{ margin: '5px 0', color: '#721c24' }}>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '15px',
            }}
          >
            <h5
              style={{
                color: '#721c24',
                margin: '0 0 8px 0',
                fontSize: '16px',
              }}
            >
              Mitigation Strategy:
            </h5>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              {riskAssessment.mitigation}
            </p>
          </div>
        </div>

        <h3
          style={{ color: '#212529', marginBottom: '20px', fontSize: '24px' }}
        >
          📅 Upcoming Events
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
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                margin: '10px 0',
                borderLeft: '4px solid #007bff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <h4 style={{ margin: '0', color: '#212529', fontSize: '18px' }}>
                  {event.event}
                </h4>
                <div
                  style={{
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  {event.date}
                </div>
              </div>
              <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
                {event.description}
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
            📞 Investor Relations
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
            Our investor relations team is always available to discuss your
            portfolio, answer questions, or explore new investment
            opportunities. Schedule a personalized consultation to review your
            investment strategy.
          </p>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Thank you for your continued confidence in our investment management.
          We remain committed to delivering exceptional returns while managing
          risk effectively.
        </p>

        <p style={{ fontSize: '16px' }}>
          Best regards,
          <br />
          <strong style={{ color: '#212529' }}>
            The 371 Minds Investment Team
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
            <strong style={{ color: '#212529' }}>371 Minds</strong> - Strategic
            Investment Management
          </p>
          <p
            style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#adb5bd' }}
          >
            Invest • Innovate • Impact • Inspire
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorNewsletter;
