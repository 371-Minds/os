import React from 'react';

interface MonthlyReportProps {
  recipientName: string;
  reportMonth: string;
  reportYear: number;
  portfolioValue: number;
  monthlyGrowth: number;
  topPerformingCompanies: {
    name: string;
    growth: number;
    revenue: number;
    keyMetric: string;
  }[];
  keyHighlights: string[];
  upcomingMilestones: {
    company: string;
    milestone: string;
    expectedDate: string;
  }[];
  marketInsights: string;
}

export const MonthlyReport: React.FC<MonthlyReportProps> = ({
  recipientName,
  reportMonth,
  reportYear,
  portfolioValue,
  monthlyGrowth,
  topPerformingCompanies,
  keyHighlights,
  upcomingMilestones,
  marketInsights
}) => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto', backgroundColor: '#f5f7fa', color: '#2c3e50' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        padding: '40px 30px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '36px', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          📊 Portfolio Monthly Report
        </h1>
        <p style={{ margin: '15px 0 0 0', fontSize: '20px', color: '#ecf0f1', opacity: '0.9' }}>
          {reportMonth} {reportYear} Performance Summary
        </p>
      </div>
      
      <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', marginTop: '0', color: '#2c3e50' }}>Dear {recipientName},</p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're pleased to present your comprehensive portfolio performance report for {reportMonth} {reportYear}. 
          This month has shown remarkable progress across our ecosystem of companies, with several key 
          achievements and strategic developments.
        </p>
        
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          border: '3px solid #27ae60',
          padding: '30px', 
          borderRadius: '15px', 
          margin: '30px 0',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#27ae60', marginTop: '0', fontSize: '28px' }}>
            💼 Portfolio Overview
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', margin: '25px 0' }}>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#27ae60', margin: '0 0 10px 0', fontSize: '16px' }}>
                Total Portfolio Value
              </h3>
              <p style={{ margin: '0', fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>
                {formatCurrency(portfolioValue)}
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#27ae60', margin: '0 0 10px 0', fontSize: '16px' }}>
                Monthly Growth
              </h3>
              <p style={{ 
                margin: '0', 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: monthlyGrowth >= 0 ? '#27ae60' : '#e74c3c' 
              }}>
                {formatPercentage(monthlyGrowth)}
              </p>
            </div>
          </div>
        </div>
        
        <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px' }}>🏆 Top Performing Companies</h3>
        
        {topPerformingCompanies.map((company, index) => (
          <div key={index} style={{ 
            backgroundColor: '#f8f9fa', 
            border: '2px solid #e9ecef',
            padding: '20px', 
            borderRadius: '12px', 
            margin: '15px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ color: '#2c3e50', margin: '0', fontSize: '20px' }}>
                {company.name}
              </h4>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  backgroundColor: company.growth >= 0 ? '#27ae60' : '#e74c3c', 
                  color: '#ffffff',
                  padding: '6px 12px', 
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {formatPercentage(company.growth)}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <p style={{ margin: '0', fontSize: '14px', color: '#7f8c8d' }}>Revenue</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                  {formatCurrency(company.revenue)}
                </p>
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '14px', color: '#7f8c8d' }}>Key Metric</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '16px', color: '#2c3e50' }}>
                  {company.keyMetric}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '2px solid #ffc107',
          padding: '25px', 
          borderRadius: '12px', 
          margin: '30px 0' 
        }}>
          <h3 style={{ color: '#856404', marginTop: '0', fontSize: '22px' }}>✨ Key Highlights</h3>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            {keyHighlights.map((highlight, index) => (
              <li key={index} style={{ margin: '8px 0', fontSize: '16px' }}>{highlight}</li>
            ))}
          </ul>
        </div>
        
        <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px' }}>🎯 Upcoming Milestones</h3>
        
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          border: '2px solid '#2196f3',
          padding: '20px', 
          borderRadius: '12px', 
          margin: '20px 0' 
        }}>
          {upcomingMilestones.map((milestone, index) => (
            <div key={index} style={{ 
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              margin: '10px 0',
              borderLeft: '4px solid #2196f3'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '18px' }}>
                    {milestone.company}
                  </h4>
                  <p style={{ margin: '0', color: '#7f8c8d', fontSize: '16px' }}>
                    {milestone.milestone}
                  </p>
                </div>
                <div style={{ 
                  backgroundColor: '#2196f3',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  {milestone.expectedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          border: '2px solid #6c757d',
          padding: '25px', 
          borderRadius: '12px', 
          margin: '30px 0' 
        }}>
          <h3 style={{ color: '#495057', marginTop: '0', fontSize: '22px' }}>📈 Market Insights</h3>
          <p style={{ margin: '0', lineHeight: '1.7', fontSize: '16px', color: '#2c3e50' }}>
            {marketInsights}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#17a2b8', 
          color: '#ffffff', 
          padding: '25px', 
          borderRadius: '12px', 
          margin: '30px 0',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '22px' }}>📞 Let's Connect</h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
            We're always available to discuss your portfolio performance, answer questions, 
            or explore new opportunities. Schedule a call with our team to dive deeper into 
            these results and plan for the upcoming month.
          </p>
        </div>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Thank you for your continued trust in our portfolio management. We look forward to 
          another successful month ahead and are excited about the growth opportunities on the horizon.
        </p>
        
        <p style={{ fontSize: '16px' }}>
          Best regards,<br/>
          <strong style={{ color: '#2c3e50' }}>The 371 Minds Portfolio Management Team</strong>
        </p>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '16px', color: '#6c757d' }}>
            <strong style={{ color: '#2c3e50' }}>371 Minds</strong> - Strategic Portfolio Management
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#adb5bd' }}>
            Innovate • Invest • Impact • Inspire
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;