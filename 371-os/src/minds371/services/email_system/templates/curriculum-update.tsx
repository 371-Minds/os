import React from 'react';

interface CurriculumUpdateProps {
  parentName: string;
  studentName: string;
  updateType: 'new-content' | 'schedule-change' | 'enhancement' | 'seasonal-program';
  updateTitle: string;
  updateDescription: string;
  effectiveDate: string;
  newFeatures?: string[];
  impactedPrograms: string[];
  actionItems?: string[];
  contactInfo?: string;
}

export const CurriculumUpdate: React.FC<CurriculumUpdateProps> = ({
  parentName,
  studentName,
  updateType,
  updateTitle,
  updateDescription,
  effectiveDate,
  newFeatures,
  impactedPrograms,
  actionItems,
  contactInfo
}) => {
  const getUpdateStyle = () => {
    switch (updateType) {
      case 'new-content':
        return { backgroundColor: '#d4edda', borderColor: '#c3e6cb', iconColor: '#28a745', icon: '🆕' };
      case 'schedule-change':
        return { backgroundColor: '#fff3cd', borderColor: '#ffeaa7', iconColor: '#f39c12', icon: '📅' };
      case 'enhancement':
        return { backgroundColor: '#e2e3ff', borderColor: '#c8c9ff', iconColor: '#6f42c1', icon: '⚡' };
      case 'seasonal-program':
        return { backgroundColor: '#ffeaa7', borderColor: '#fdcb6e', iconColor: '#e17055', icon: '🌟' };
      default:
        return { backgroundColor: '#f0f8ff', borderColor: '#7bb3f0', iconColor: '#4a90e2', icon: '📢' };
    }
  };

  const style = getUpdateStyle();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a90e2', borderBottom: '2px solid #7bb3f0', paddingBottom: '10px' }}>
        Curriculum Update - IkidEdventures
      </h1>
      
      <p>Dear {parentName},</p>
      
      <p>
        We're excited to share an important update about {studentName}'s learning experience 
        at IkidEdventures. We're constantly evolving our curriculum to provide the best 
        educational adventures for our students.
      </p>
      
      <div style={{ 
        backgroundColor: style.backgroundColor, 
        border: `2px solid ${style.borderColor}`,
        padding: '25px', 
        borderRadius: '10px', 
        margin: '20px 0' 
      }}>
        <h2 style={{ color: style.iconColor, marginTop: '0', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '15px', fontSize: '32px' }}>{style.icon}</span>
          {updateTitle}
        </h2>
        <p style={{ margin: '15px 0', lineHeight: '1.6', fontSize: '16px' }}>
          {updateDescription}
        </p>
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.7)', 
          padding: '10px', 
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          📅 Effective Date: {effectiveDate}
        </div>
      </div>
      
      <h3 style={{ color: '#4a90e2' }}>Programs Affected</h3>
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          {impactedPrograms.map((program, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              📚 {program}
            </li>
          ))}
        </ul>
      </div>
      
      {newFeatures && newFeatures.length > 0 && (
        <>
          <h3 style={{ color: '#4a90e2' }}>What's New & Exciting</h3>
          <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              {newFeatures.map((feature, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#155724' }}>
                  ✨ {feature}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      {actionItems && actionItems.length > 0 && (
        <>
          <h3 style={{ color: '#4a90e2' }}>Action Items for Parents</h3>
          <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              {actionItems.map((item, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#856404' }}>
                  ☑️ {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h4 style={{ color: '#1565c0', marginTop: '0' }}>Why This Update Matters</h4>
        <p style={{ margin: '0', color: '#1565c0' }}>
          Our curriculum updates are designed to enhance {studentName}'s learning experience, 
          incorporate the latest educational research, and ensure our programs remain engaging 
          and relevant. We believe these changes will contribute significantly to your child's 
          educational growth and development.
        </p>
      </div>
      
      <p>
        We're committed to maintaining transparent communication about all changes that affect 
        your child's education. If you have any questions about this update or would like to 
        discuss how it impacts {studentName}'s learning journey, please don't hesitate to reach out.
      </p>
      
      <p>
        Thank you for your continued trust in IkidEdventures!
      </p>
      
      <p>
        Best regards,<br/>
        The IkidEdventures Curriculum Team
      </p>
      
      {contactInfo && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
          <h4 style={{ color: '#495057', marginTop: '0' }}>Questions or Concerns?</h4>
          <p style={{ margin: '0', color: '#495057' }}>
            📞 {contactInfo}
          </p>
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>IkidEdventures</strong> - Evolving Education for Tomorrow's Leaders
        </p>
      </div>
    </div>
  );
};

export default CurriculumUpdate;