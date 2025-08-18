import React from 'react';

interface EducationalProgramWelcomeProps {
  studentName: string;
  parentName: string;
  programName: string;
  startDate: string;
  instructorName: string;
  programDuration: string;
}

export const EducationalProgramWelcome: React.FC<EducationalProgramWelcomeProps> = ({
  studentName,
  parentName,
  programName,
  startDate,
  instructorName,
  programDuration
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a90e2', borderBottom: '2px solid #7bb3f0', paddingBottom: '10px' }}>
        Welcome to IkidEdventures!
      </h1>
      
      <p>Dear {parentName},</p>
      
      <p>
        We're thrilled to welcome {studentName} to the <strong>{programName}</strong> program! 
        This marks the beginning of an exciting educational adventure that will inspire creativity, 
        critical thinking, and a lifelong love of learning.
      </p>
      
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#4a90e2', marginTop: '0' }}>Program Details</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li><strong>Student:</strong> {studentName}</li>
          <li><strong>Program:</strong> {programName}</li>
          <li><strong>Start Date:</strong> {startDate}</li>
          <li><strong>Duration:</strong> {programDuration}</li>
          <li><strong>Lead Instructor:</strong> {instructorName}</li>
        </ul>
      </div>
      
      <h3 style={{ color: '#4a90e2' }}>What to Expect</h3>
      <ul>
        <li>🎯 Personalized learning experiences tailored to your child's interests</li>
        <li>🎨 Creative projects that make learning fun and engaging</li>
        <li>🤝 Collaborative activities that build social skills</li>
        <li>📊 Regular progress updates and milestone celebrations</li>
        <li>🏆 Achievement recognition and skill development tracking</li>
      </ul>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
        <h4 style={{ color: '#856404', marginTop: '0' }}>Getting Started</h4>
        <p style={{ margin: '0', color: '#856404' }}>
          Please ensure {studentName} has access to their learning materials and check your email 
          regularly for program updates and progress reports.
        </p>
      </div>
      
      <p>
        We're excited to be part of {studentName}'s educational journey and look forward to 
        watching them grow, learn, and achieve amazing things!
      </p>
      
      <p>
        Warm regards,<br/>
        The IkidEdventures Team
      </p>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>IkidEdventures</strong> - Where Learning Becomes an Adventure
        </p>
      </div>
    </div>
  );
};

export default EducationalProgramWelcome;