import React from 'react';

interface CrossCompanyUpdateProps {
  recipientName: string;
  updatePeriod: string;
  companyUpdates: {
    companyName: string;
    logo?: string;
    keyUpdate: string;
    metrics: {
      label: string;
      value: string;
      trend: 'up' | 'down' | 'stable';
    }[];
    collaborations: string[];
    nextSteps: string;
  }[];
  crossCompanyInitiatives: {
    title: string;
    description: string;
    participatingCompanies: string[];
    status: 'Planning' | 'In Progress' | 'Completed';
    impact: string;
  }[];
  ecosystemMetrics: {
    totalRevenue: number;
    activeCollaborations: number;
    sharedResources: number;
    synergiesRealized: number;
  };
}

export const CrossCompanyUpdate: React.FC<CrossCompanyUpdateProps> = ({
  recipientName,
  updatePeriod,
  companyUpdates,
  crossCompanyInitiatives,
  ecosystemMetrics
}) => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return '#ffc107';
      case 'In Progress': return '#17a2b8';
      case 'Completed': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto', backgroundColor: '#f8f9fa', color: '#212529' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 30px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '36px', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          🌐 Cross-Company Ecosystem Update
        </h1>
        <p style={{ margin: '15px 0 0 0', fontSize: '20px', color: '#f8f9fa', opacity: '0.9' }}>
          {updatePeriod} Collaboration Report
        </p>
      </div>
      
      <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', marginTop: '0' }}>Dear {recipientName},</p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Welcome to our cross-company ecosystem update! This report highlights the incredible 
          synergies, collaborations, and shared successes across our portfolio companies. 
          Together, we're building something greater than the sum of our parts.
        </p>
        
        <div style={{ 
          backgroundColor: '#e7f3ff', 
          border: '3px solid #0066cc',
          padding: '30px', 
          borderRadius: '15px', 
          margin: '30px 0',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#0066cc', marginTop: '0', fontSize: '28px' }}>
            🏢 Ecosystem Overview
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '25px 0' }}>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0', fontSize: '16px' }}>
                Combined Revenue
              </h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>
                {formatCurrency(ecosystemMetrics.totalRevenue)}
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0', fontSize: '16px' }}>
                Active Collaborations
              </h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>
                {ecosystemMetrics.activeCollaborations}
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0', fontSize: '16px' }}>
                Shared Resources
              </h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>
                {ecosystemMetrics.sharedResources}
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0', fontSize: '16px' }}>
                Synergies Realized
              </h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {ecosystemMetrics.synergiesRealized}
              </p>
            </div>
          </div>
        </div>
        
        <h3 style={{ color: '#212529', marginBottom: '25px', fontSize: '26px' }}>🏢 Company Updates</h3>
        
        {companyUpdates.map((company, index) => (
          <div key={index} style={{ 
            backgroundColor: '#f8f9fa', 
            border: '2px solid #dee2e6',
            padding: '25px', 
            borderRadius: '15px', 
            margin: '20px 0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {company.logo && (
                <img 
                  src={company.logo} 
                  alt={`${company.companyName} logo`}
                  style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '8px' }}
                />
              )}
              <h4 style={{ color: '#212529', margin: '0', fontSize: '24px' }}>
                {company.companyName}
              </h4>
            </div>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0', color: '#495057' }}>
              {company.keyUpdate}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', margin: '20px 0' }}>
              {company.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} style={{ 
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e9ecef'
                }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#6c757d', textTransform: 'uppercase' }}>
                    {metric.label}
                  </p>
                  <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#212529' }}>
                    {getTrendIcon(metric.trend)} {metric.value}
                  </p>
                </div>
              ))}
            </div>
            
            {company.collaborations.length > 0 && (
              <div style={{ margin: '20px 0' }}>
                <h5 style={{ color: '#495057', margin: '0 0 10px 0', fontSize: '16px' }}>🤝 Active Collaborations:</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {company.collaborations.map((collab, collabIndex) => (
                    <span key={collabIndex} style={{ 
                      backgroundColor: '#667eea',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '14px'
                    }}>
                      {collab}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ 
              backgroundColor: '#e9ecef',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '15px'
            }}>
              <h5 style={{ color: '#495057', margin: '0 0 8px 0', fontSize: '16px' }}>🎯 Next Steps:</h5>
              <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                {company.nextSteps}
              </p>
            </div>
          </div>
        ))}
        
        <h3 style={{ color: '#212529', marginBottom: '25px', fontSize: '26px' }}>🚀 Cross-Company Initiatives</h3>
        
        {crossCompanyInitiatives.map((initiative, index) => (
          <div key={index} style={{ 
            backgroundColor: '#fff3cd', 
            border: '2px solid #ffc107',
            padding: '25px', 
            borderRadius: '15px', 
            margin: '20px 0' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ color: '#856404', margin: '0', fontSize: '22px' }}>
                {initiative.title}
              </h4>
              <div style={{ 
                backgroundColor: getStatusColor(initiative.status),
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {initiative.status}
              </div>
            </div>
            
            <p style={{ margin: '0 0 15px 0', fontSize: '16px', lineHeight: '1.6', color: '#856404' }}>
              {initiative.description}
            </p>
            
            <div style={{ margin: '15px 0' }}>
              <h5 style={{ color: '#856404', margin: '0 0 10px 0', fontSize: '16px' }}>🏢 Participating Companies:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {initiative.participatingCompanies.map((company, companyIndex) => (
                  <span key={companyIndex} style={{ 
                    backgroundColor: '#856404',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '14px'
                  }}>
                    {company}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ffc107'
            }}>
              <h5 style={{ color: '#856404', margin: '0 0 8px 0', fontSize: '16px' }}>💡 Expected Impact:</h5>
              <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                {initiative.impact}
              </p>
            </div>
          </div>
        ))}
        
        <div style={{ 
          backgroundColor: '#d4edda', 
          border: '2px solid #28a745',
          color: '#155724', 
          padding: '25px', 
          borderRadius: '12px', 
          margin: '30px 0',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '22px' }}>🌟 The Power of Collaboration</h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
            Our ecosystem approach continues to drive innovation, reduce costs, and accelerate growth 
            across all portfolio companies. By sharing resources, knowledge, and opportunities, 
            we're creating sustainable competitive advantages that benefit everyone.
          </p>
        </div>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The synergies across our portfolio continue to exceed expectations. We're excited about 
          the momentum building and look forward to sharing more collaborative successes in the coming months.
        </p>
        
        <p style={{ fontSize: '16px' }}>
          Best regards,<br/>
          <strong style={{ color: '#212529' }}>The 371 Minds Ecosystem Team</strong>
        </p>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '16px', color: '#6c757d' }}>
            <strong style={{ color: '#212529' }}>371 Minds</strong> - Building Connected Ecosystems
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#adb5bd' }}>
            Connect • Collaborate • Create • Conquer
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrossCompanyUpdate;