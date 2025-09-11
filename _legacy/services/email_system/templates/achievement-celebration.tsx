import type React from 'react';

interface AchievementCelebrationProps {
  studentName: string;
  parentName: string;
  achievementTitle: string;
  achievementDescription: string;
  programName: string;
  dateAchieved: string;
  skillsUnlocked: string[];
  nextGoal?: string;
  certificateUrl?: string;
  shareMessage?: string;
}

export const AchievementCelebration: React.FC<AchievementCelebrationProps> = ({
  studentName,
  parentName,
  achievementTitle,
  achievementDescription,
  programName,
  dateAchieved,
  skillsUnlocked,
  nextGoal,
  certificateUrl,
  shareMessage,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: '0', fontSize: '28px' }}>
          🎉 CONGRATULATIONS! 🎉
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
          {studentName} has achieved something amazing!
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          Dear {parentName},
        </p>

        <div
          style={{
            backgroundColor: '#fff9c4',
            border: '3px solid #f1c40f',
            padding: '25px',
            borderRadius: '10px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏆</div>
          <h2 style={{ color: '#f39c12', margin: '0 0 10px 0' }}>
            {achievementTitle}
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#7d6608' }}>
            {achievementDescription}
          </p>
          <div
            style={{
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
              margin: '15px 0 0 0',
              fontSize: '14px',
              color: '#666',
            }}
          >
            <strong>Program:</strong> {programName} | <strong>Date:</strong>{' '}
            {dateAchieved}
          </div>
        </div>

        <h3 style={{ color: '#4a90e2' }}>New Skills Unlocked!</h3>
        <div
          style={{
            backgroundColor: '#f0f8ff',
            padding: '20px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            {skillsUnlocked.map((skill, index) => (
              <li key={index} style={{ marginBottom: '8px', fontSize: '15px' }}>
                ⭐ {skill}
              </li>
            ))}
          </ul>
        </div>

        {nextGoal && (
          <div
            style={{
              backgroundColor: '#e8f5e8',
              padding: '15px',
              borderRadius: '5px',
              margin: '20px 0',
            }}
          >
            <h4 style={{ color: '#28a745', marginTop: '0' }}>
              🎯 Next Adventure
            </h4>
            <p style={{ margin: '0', color: '#155724' }}>{nextGoal}</p>
          </div>
        )}

        {certificateUrl && (
          <div
            style={{
              backgroundColor: '#4a90e2',
              color: 'white',
              padding: '15px',
              borderRadius: '5px',
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>
              📜 Digital Certificate Available
            </h4>
            <a
              href={certificateUrl}
              style={{
                color: 'white',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'inline-block',
              }}
            >
              Download Certificate
            </a>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0',
          }}
        >
          <h4 style={{ color: '#495057', marginTop: '0' }}>
            💡 Celebrate This Moment
          </h4>
          <p style={{ margin: '0 0 15px 0', color: '#495057' }}>
            This achievement represents hours of dedication, creativity, and
            growth.
            {studentName} should be incredibly proud of this accomplishment!
          </p>
          {shareMessage && (
            <div
              style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '5px',
                border: '1px dashed #dee2e6',
              }}
            >
              <p
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '14px',
                  color: '#666',
                }}
              >
                <strong>Share the joy:</strong>
              </p>
              <p style={{ margin: '0', fontStyle: 'italic', color: '#495057' }}>
                "{shareMessage}"
              </p>
            </div>
          )}
        </div>

        <p>
          We're so proud of {studentName} and excited to continue supporting
          their learning journey. Thank you for being such wonderful partners in
          their education!
        </p>

        <p>
          Celebrating together,
          <br />
          The IkidEdventures Team
        </p>

        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '5px',
          }}
        >
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            <strong>IkidEdventures</strong> - Celebrating Every Step of the
            Learning Journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCelebration;
