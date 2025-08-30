import React from 'react';

interface ConsultingWelcomeProps {
  clientName: string;
  consultantName: string;
  kickoffDate: string;
  projectScope: string;
}

export const ConsultingWelcome: React.FC<ConsultingWelcomeProps> = ({
  clientName,
  consultantName,
  kickoffDate,
  projectScope
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Welcome to Vision2Results Consulting
      </h1>
      
      <p>Dear {clientName},</p>
      
      <p>
        Welcome to Vision2Results! We're excited to partner with you on your transformation journey. 
        This email confirms the start of our consulting engagement and outlines what you can expect 
        in the coming weeks.
      </p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Engagement Details</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li><strong>Lead Consultant:</strong> {consultantName}</li>
          <li><strong>Project Kickoff:</strong> {kickoffDate}</li>
          <li><strong>Scope:</strong> {projectScope}</li>
        </ul>
      </div>
      
      <h3 style={{ color: '#2c3e50' }}>What's Next?</h3>
      <ol>
        <li>Initial discovery session to understand your current state</li>
        <li>Stakeholder interviews and assessment</li>
        <li>Custom strategy development</li>
        <li>Implementation roadmap creation</li>
      </ol>
      
      <p>
        We're committed to delivering measurable results and transforming your vision into reality. 
        If you have any questions before our kickoff, please don't hesitate to reach out.
      </p>
      
      <p>
        Best regards,<br/>
        The Vision2Results Team
      </p>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>Vision2Results</strong> - Transforming Visions into Measurable Results
        </p>
      </div>
    </div>
  );
};

export default ConsultingWelcome;