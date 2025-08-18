import React from 'react';

interface Phase {
  name: string;
  duration: string;
  deliverables: string[];
  milestones: string[];
}

interface ImplementationRoadmapProps {
  clientName: string;
  projectName: string;
  phases: Phase[];
  totalDuration: string;
  consultantName: string;
}

export const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({
  clientName,
  projectName,
  phases,
  totalDuration,
  consultantName
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Implementation Roadmap
      </h1>
      
      <p>Dear {clientName},</p>
      
      <p>
        We're pleased to present your comprehensive implementation roadmap for <strong>{projectName}</strong>. 
        This strategic plan outlines the phases, deliverables, and milestones that will guide us 
        toward achieving your transformation goals.
      </p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Project Overview</h3>
        <p><strong>Total Duration:</strong> {totalDuration}</p>
        <p><strong>Number of Phases:</strong> {phases.length}</p>
      </div>
      
      {phases.map((phase, index) => (
        <div key={index} style={{ 
          backgroundColor: index % 2 === 0 ? '#e8f4fd' : '#f0f8e8', 
          padding: '20px', 
          borderRadius: '5px', 
          margin: '15px 0',
          borderLeft: '4px solid #3498db'
        }}>
          <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
            Phase {index + 1}: {phase.name}
          </h3>
          <p><strong>Duration:</strong> {phase.duration}</p>
          
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '8px' }}>Key Deliverables:</h4>
            <ul style={{ margin: '0' }}>
              {phase.deliverables.map((deliverable, idx) => (
                <li key={idx}>{deliverable}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#34495e', marginBottom: '8px' }}>Milestones:</h4>
            <ul style={{ margin: '0' }}>
              {phase.milestones.map((milestone, idx) => (
                <li key={idx}>{milestone}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      
      <h3 style={{ color: '#2c3e50' }}>Success Metrics</h3>
      <p>
        Throughout the implementation, we'll track progress against defined KPIs and 
        provide regular updates on milestone achievements. Each phase includes built-in 
        checkpoints to ensure we're on track to deliver the expected outcomes.
      </p>
      
      <p>
        This roadmap is designed to be flexible and can be adjusted based on your 
        evolving needs and market conditions. We'll schedule regular review sessions 
        to ensure alignment and optimal results.
      </p>
      
      <p>
        Best regards,<br/>
        {consultantName}<br/>
        Implementation Lead<br/>
        Vision2Results
      </p>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>Vision2Results</strong> - Transforming Visions into Measurable Results
        </p>
      </div>
    </div>
  );
};

export default ImplementationRoadmap;