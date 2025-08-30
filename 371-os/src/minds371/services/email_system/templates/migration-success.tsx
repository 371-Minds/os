import React from 'react';

interface MigrationSuccessProps {
  recipientName: string;
  companyName: string;
  projectName: string;
  completionDate: string;
  migrationStats: {
    linesOfCodeMigrated: number;
    technologiesUpgraded: string[];
    performanceImprovement: string;
    securityIssuesResolved: number;
    maintenanceCostReduction: string;
  };
  teamMembers: string[];
  nextSteps?: string[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
}

export const MigrationSuccess: React.FC<MigrationSuccessProps> = ({
  recipientName,
  companyName,
  projectName,
  completionDate,
  migrationStats,
  teamMembers,
  nextSteps,
  testimonialQuote,
  testimonialAuthor
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#27ae60', fontSize: '28px', marginBottom: '10px' }}>
          🎉 Migration Complete!
        </h1>
        <div style={{ fontSize: '18px', color: '#2c3e50' }}>
          {projectName} Successfully Modernized
        </div>
      </div>
      
      <p>Dear {recipientName},</p>
      
      <p>
        Congratulations! We're thrilled to announce the successful completion of the 
        <strong> {projectName}</strong> modernization project at {companyName}. 
        Your legacy system has been transformed into a modern, maintainable solution.
      </p>
      
      <div style={{ backgroundColor: '#d5f4e6', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '1px solid #27ae60' }}>
        <h3 style={{ color: '#1e8449', marginTop: '0' }}>📊 Migration Achievements</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
              {migrationStats.linesOfCodeMigrated.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Lines of Code Migrated</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
              {migrationStats.securityIssuesResolved}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Security Issues Resolved</div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
              {migrationStats.performanceImprovement}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Performance Improvement</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
              {migrationStats.maintenanceCostReduction}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Maintenance Cost Reduction</div>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>🚀 Technologies Upgraded</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {migrationStats.technologiesUpgraded.map((tech, index) => (
            <span 
              key={index}
              style={{ 
                backgroundColor: '#3498db', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '15px', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {testimonialQuote && testimonialAuthor && (
        <div style={{ backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', margin: '20px 0', borderLeft: '4px solid #3498db' }}>
          <blockquote style={{ margin: '0', fontStyle: 'italic', color: '#2c3e50', fontSize: '16px' }}>
            "{testimonialQuote}"
          </blockquote>
          <div style={{ textAlign: 'right', marginTop: '10px', color: '#666', fontSize: '14px' }}>
            — {testimonialAuthor}
          </div>
        </div>
      )}
      
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#856404', marginTop: '0' }}>🎯 Project Highlights</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>✅ Zero downtime migration completed on {completionDate}</li>
          <li>✅ All critical business functions preserved and enhanced</li>
          <li>✅ Comprehensive documentation and knowledge transfer completed</li>
          <li>✅ Team training sessions conducted for ongoing maintenance</li>
          <li>✅ Modern CI/CD pipeline implemented for future deployments</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>👥 Project Team</h3>
        <p style={{ margin: '10px 0' }}>
          Special thanks to our dedicated team members who made this success possible:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {teamMembers.map((member, index) => (
            <span 
              key={index}
              style={{ 
                backgroundColor: '#95a5a6', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '15px', 
                fontSize: '12px'
              }}
            >
              {member}
            </span>
          ))}
        </div>
      </div>
      
      {nextSteps && nextSteps.length > 0 && (
        <div style={{ backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3 style={{ color: '#2c3e50', marginTop: '0' }}>🔮 Recommended Next Steps</h3>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            {nextSteps.map((step, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#27ae60', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '10px'
          }}
        >
          Download Final Report
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#3498db', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          Schedule Follow-up
        </a>
      </div>
      
      <p>
        Your modernized system is now ready for the future. We're proud to have been part of 
        {companyName}'s digital transformation journey and look forward to supporting your 
        continued success.
      </p>
      
      <p>
        Thank you for trusting Legacy Code Archaeologist with your critical modernization project. 
        We're here whenever you need us for future enhancements or new challenges.
      </p>
      
      <p>
        Congratulations once again on this major achievement!
      </p>
      
      <p>
        Best regards,<br/>
        The Legacy Code Archaeologist Team
      </p>
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <p style={{ fontSize: '12px', color: '#666' }}>
        Project completed on {completionDate} | Legacy Code Archaeologist
      </p>
    </div>
  );
};

export default MigrationSuccess;