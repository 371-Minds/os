import React from 'react';

interface EnterpriseDemoProps {
  recipientName: string;
  companyName: string;
  demoDate: string;
  demoTime: string;
  meetingLink: string;
  contactPerson: string;
  contactEmail: string;
}

export const EnterpriseDemo: React.FC<EnterpriseDemoProps> = ({
  recipientName,
  companyName,
  demoDate,
  demoTime,
  meetingLink,
  contactPerson,
  contactEmail
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        🎯 Enterprise Demo Invitation
      </h1>
      
      <p>Dear {recipientName},</p>
      
      <p>
        Thank you for your interest in Legacy Code Archaeologist's enterprise solutions. 
        We're excited to show you how we can help {companyName} modernize your legacy systems 
        and unlock hidden value in your existing codebase.
      </p>
      
      <div style={{ backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '1px solid #3498db' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>📅 Demo Details</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', width: '30%' }}>Date:</td>
            <td style={{ padding: '8px 0' }}>{demoDate}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Time:</td>
            <td style={{ padding: '8px 0' }}>{demoTime}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Duration:</td>
            <td style={{ padding: '8px 0' }}>45 minutes</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Meeting Link:</td>
            <td style={{ padding: '8px 0' }}>
              <a href={meetingLink} style={{ color: '#3498db' }}>Join Demo Session</a>
            </td>
          </tr>
        </table>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>🚀 What We'll Cover</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>Live Code Analysis:</strong> Real-time demonstration of our legacy code scanning tools</li>
          <li><strong>Modernization Roadmaps:</strong> How we create actionable migration strategies</li>
          <li><strong>ROI Calculator:</strong> Quantifying the business value of modernization</li>
          <li><strong>Case Studies:</strong> Success stories from similar enterprise clients</li>
          <li><strong>Integration Options:</strong> How we fit into your existing development workflow</li>
          <li><strong>Custom Solutions:</strong> Tailored approaches for your specific technology stack</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <h4 style={{ color: '#856404', marginTop: '0' }}>📋 Pre-Demo Preparation</h4>
        <p style={{ margin: '10px 0' }}>
          To make the most of our time together, please consider preparing:
        </p>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Overview of your current legacy systems</li>
          <li>Key pain points and modernization goals</li>
          <li>Questions about specific technologies or challenges</li>
          <li>Stakeholders who should attend the session</li>
        </ul>
      </div>
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a 
          href={meetingLink}
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
          Join Demo Session
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#95a5a6', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          Add to Calendar
        </a>
      </div>
      
      <p>
        Need to reschedule or have questions before the demo? 
        Feel free to reach out to {contactPerson} at {contactEmail}.
      </p>
      
      <p>
        We look forward to showing you how Legacy Code Archaeologist can help {companyName} 
        transform your legacy systems into modern, maintainable solutions.
      </p>
      
      <p>
        Best regards,<br/>
        {contactPerson}<br/>
        Legacy Code Archaeologist Team
      </p>
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <p style={{ fontSize: '12px', color: '#666' }}>
        Can't make it? Reply to this email to reschedule your personalized demo.
      </p>
    </div>
  );
};

export default EnterpriseDemo;