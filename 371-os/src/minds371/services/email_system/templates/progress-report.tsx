import React from 'react';

interface ProgressReportProps {
  studentName: string;
  parentName: string;
  programName: string;
  reportPeriod: string;
  completedActivities: number;
  totalActivities: number;
  skillsImproved: string[];
  nextMilestone: string;
  instructorNotes: string;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  studentName,
  parentName,
  programName,
  reportPeriod,
  completedActivities,
  totalActivities,
  skillsImproved,
  nextMilestone,
  instructorNotes
}) => {
  const progressPercentage = Math.round((completedActivities / totalActivities) * 100);
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a90e2', borderBottom: '2px solid #7bb3f0', paddingBottom: '10px' }}>
        Progress Report - {studentName}
      </h1>
      
      <p>Dear {parentName},</p>
      
      <p>
        We're excited to share {studentName}'s progress in the <strong>{programName}</strong> program 
        for the period of {reportPeriod}. Your child has been making wonderful strides in their learning journey!
      </p>
      
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#4a90e2', marginTop: '0' }}>Overall Progress</h3>
        <div style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', padding: '3px', marginBottom: '10px' }}>
          <div 
            style={{ 
              backgroundColor: '#4a90e2', 
              height: '20px', 
              borderRadius: '8px', 
              width: `${progressPercentage}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {progressPercentage}%
          </div>
        </div>
        <p style={{ margin: '0', fontSize: '14px' }}>
          <strong>{completedActivities}</strong> of <strong>{totalActivities}</strong> activities completed
        </p>
      </div>
      
      <h3 style={{ color: '#4a90e2' }}>Skills Development</h3>
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
        <h4 style={{ color: '#28a745', marginTop: '0' }}>Areas of Improvement:</h4>
        <ul>
          {skillsImproved.map((skill, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              ✅ {skill}
            </li>
          ))}
        </ul>
      </div>
      
      <h3 style={{ color: '#4a90e2' }}>Instructor Notes</h3>
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
        <p style={{ margin: '0', fontStyle: 'italic' }}>
          "{instructorNotes}"
        </p>
      </div>
      
      <h3 style={{ color: '#4a90e2' }}>Next Milestone</h3>
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
        <p style={{ margin: '0', color: '#155724' }}>
          🎯 <strong>Coming Up:</strong> {nextMilestone}
        </p>
      </div>
      
      <p>
        Keep up the fantastic work! We're proud of {studentName}'s dedication and progress. 
        If you have any questions about this report or would like to discuss your child's 
        learning journey, please don't hesitate to reach out.
      </p>
      
      <p>
        Best regards,<br/>
        The IkidEdventures Teaching Team
      </p>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>IkidEdventures</strong> - Nurturing Growth Through Personalized Learning
        </p>
      </div>
    </div>
  );
};

export default ProgressReport;