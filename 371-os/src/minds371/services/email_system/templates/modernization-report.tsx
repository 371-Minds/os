import React from 'react';

interface ModernizationReportProps {
  recipientName: string;
  companyName: string;
  projectName: string;
  analysisDate: string;
  criticalIssues: number;
  technicalDebtScore: number;
  recommendedActions: string[];
}

export const ModernizationReport: React.FC<ModernizationReportProps> = ({
  recipientName,
  companyName,
  projectName,
  analysisDate,
  criticalIssues,
  technicalDebtScore,
  recommendedActions
}) => {
  const getDebtScoreColor = (score: number) => {
    if (score >= 80) return '#e74c3c';
    if (score >= 60) return '#f39c12';
    if (score >= 40) return '#f1c40f';
    return '#27ae60';
  };

  const getDebtScoreLabel = (score: number) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        📊 Legacy Code Analysis Report
      </h1>
      
      <p>Dear {recipientName},</p>
      
      <p>
        We've completed our comprehensive analysis of <strong>{projectName}</strong> at {companyName}. 
        Here's your detailed modernization report generated on {analysisDate}.
      </p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Executive Summary</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
              {criticalIssues}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Critical Issues</div>
          </div>
          
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div 
              style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: getDebtScoreColor(technicalDebtScore) 
              }}
            >
              {technicalDebtScore}/100
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Technical Debt ({getDebtScoreLabel(technicalDebtScore)})
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <h4 style={{ color: '#856404', marginTop: '0' }}>🎯 Priority Recommendations</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          {recommendedActions.map((action, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{action}</li>
          ))}
        </ul>
      </div>
      
      <p>
        Our detailed analysis includes:
      </p>
      
      <ul>
        <li>🔍 Code quality metrics and complexity analysis</li>
        <li>🛡️ Security vulnerability assessment</li>
        <li>📈 Performance bottleneck identification</li>
        <li>🏗️ Architecture modernization roadmap</li>
        <li>💰 Cost-benefit analysis for proposed changes</li>
      </ul>
      
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
            marginRight: '10px'
          }}
        >
          Download Full Report
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#27ae60', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          Schedule Review Meeting
        </a>
      </div>
      
      <p>
        We're ready to discuss these findings and help you create an actionable modernization plan. 
        Let's transform your legacy system into a modern, maintainable solution.
      </p>
      
      <p>
        Best regards,<br/>
        The Legacy Code Archaeologist Team
      </p>
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <p style={{ fontSize: '12px', color: '#666' }}>
        This report is confidential and intended solely for {companyName}
      </p>
    </div>
  );
};

export default ModernizationReport;