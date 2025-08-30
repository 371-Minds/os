import React from 'react';

interface TransformationArea {
  area: string;
  currentState: string;
  targetState: string;
  impact: string;
}

interface EnterpriseTransformationProps {
  clientName: string;
  companyName: string;
  transformationAreas: TransformationArea[];
  timeline: string;
  investmentLevel: string;
  expectedROI: string;
  consultantName: string;
  executiveTeam: string[];
}

export const EnterpriseTransformation: React.FC<EnterpriseTransformationProps> = ({
  clientName,
  companyName,
  transformationAreas,
  timeline,
  investmentLevel,
  expectedROI,
  consultantName,
  executiveTeam
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Enterprise Transformation Proposal
      </h1>
      
      <p>Dear {clientName},</p>
      
      <p>
        Following our comprehensive assessment of {companyName}, we're excited to present 
        our enterprise transformation proposal. This strategic initiative will position 
        your organization for sustainable growth and competitive advantage in the evolving market.
      </p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Transformation Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <strong>Timeline:</strong> {timeline}
          </div>
          <div>
            <strong>Investment Level:</strong> {investmentLevel}
          </div>
          <div>
            <strong>Expected ROI:</strong> {expectedROI}
          </div>
          <div>
            <strong>Transformation Areas:</strong> {transformationAreas.length}
          </div>
        </div>
      </div>
      
      <h3 style={{ color: '#2c3e50' }}>Key Transformation Areas</h3>
      {transformationAreas.map((area, index) => (
        <div key={index} style={{ 
          backgroundColor: '#e8f4fd', 
          padding: '20px', 
          borderRadius: '5px', 
          margin: '15px 0',
          borderLeft: '4px solid #3498db'
        }}>
          <h4 style={{ color: '#2c3e50', marginTop: '0' }}>{area.area}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '10px' }}>
            <div>
              <strong>Current State:</strong><br/>
              <span style={{ color: '#7f8c8d' }}>{area.currentState}</span>
            </div>
            <div>
              <strong>Target State:</strong><br/>
              <span style={{ color: '#27ae60' }}>{area.targetState}</span>
            </div>
          </div>
          
          <div>
            <strong>Expected Impact:</strong><br/>
            <span style={{ color: '#2c3e50' }}>{area.impact}</span>
          </div>
        </div>
      ))}
      
      <div style={{ backgroundColor: '#e8f5e8', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Executive Engagement</h3>
        <p>
          This transformation requires strong leadership commitment. We'll be working 
          closely with your executive team throughout the process:
        </p>
        <ul>
          {executiveTeam.map((executive, index) => (
            <li key={index}>{executive}</li>
          ))}
        </ul>
      </div>
      
      <h3 style={{ color: '#2c3e50' }}>Why Transform Now?</h3>
      <ul>
        <li>Market disruption is accelerating across all industries</li>
        <li>Digital-first competitors are gaining market share</li>
        <li>Customer expectations are evolving rapidly</li>
        <li>Operational efficiency gaps are widening</li>
        <li>Talent acquisition and retention challenges are intensifying</li>
      </ul>
      
      <div style={{ backgroundColor: '#fdf2e8', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Next Steps</h3>
        <ol>
          <li>Executive alignment session (Week 1)</li>
          <li>Detailed transformation planning (Weeks 2-3)</li>
          <li>Stakeholder communication strategy (Week 4)</li>
          <li>Phase 1 implementation kickoff (Week 5)</li>
        </ol>
      </div>
      
      <p>
        This transformation represents a significant opportunity to future-proof {companyName} 
        and establish market leadership. We're committed to ensuring successful execution 
        and measurable results throughout the journey.
      </p>
      
      <p>
        I'll be reaching out to schedule a presentation with your executive team to 
        discuss this proposal in detail and address any questions.
      </p>
      
      <p>
        Best regards,<br/>
        {consultantName}<br/>
        Managing Director<br/>
        Vision2Results
      </p>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>Vision2Results</strong> - Transforming Visions into Measurable Results<br/>
          Enterprise Transformation | Strategic Consulting | Digital Innovation
        </p>
      </div>
    </div>
  );
};

export default EnterpriseTransformation;