import type React from 'react';

interface QuestCompletionProps {
  gamerTag: string;
  questTitle: string;
  questDescription: string;
  completionTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  experienceGained: number;
  rewardsEarned: string[];
  nextQuestTitle?: string;
  leaderboardPosition?: number;
  perfectCompletion: boolean;
}

export const QuestCompletion: React.FC<QuestCompletionProps> = ({
  gamerTag,
  questTitle,
  questDescription,
  completionTime,
  difficulty,
  experienceGained,
  rewardsEarned,
  nextQuestTitle,
  leaderboardPosition,
  perfectCompletion,
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return '#00ff88';
      case 'Medium':
        return '#ffd700';
      case 'Hard':
        return '#ff6b6b';
      case 'Legendary':
        return '#9b59b6';
      default:
        return '#00ff88';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'Easy':
        return '⭐';
      case 'Medium':
        return '🔥';
      case 'Hard':
        return '💀';
      case 'Legendary':
        return '👑';
      default:
        return '⭐';
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          background: perfectCompletion
            ? 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
            : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
          padding: '30px',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
          {perfectCompletion ? '🏆' : '✅'}
        </div>
        <h1
          style={{
            margin: '0',
            fontSize: '28px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {perfectCompletion ? 'PERFECT COMPLETION!' : 'QUEST COMPLETED!'}
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
          Outstanding work, {gamerTag}!
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#1a1a1a' }}>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            border: `3px solid ${getDifficultyColor()}`,
            padding: '25px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h2
            style={{
              color: getDifficultyColor(),
              marginTop: '0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '15px', fontSize: '32px' }}>
              {getDifficultyIcon()}
            </span>
            {questTitle}
          </h2>
          <p style={{ margin: '15px 0', lineHeight: '1.6', color: '#cccccc' }}>
            {questDescription}
          </p>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '15px',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '10px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>Difficulty:</strong>{' '}
              <span style={{ color: getDifficultyColor() }}>{difficulty}</span>
            </div>
            <div>
              <strong>Completion Time:</strong> {completionTime}
            </div>
            <div>
              <strong>XP Gained:</strong>{' '}
              <span style={{ color: '#ffd700' }}>+{experienceGained}</span>
            </div>
            {leaderboardPosition && (
              <div>
                <strong>Leaderboard:</strong>{' '}
                <span style={{ color: '#00ff88' }}>#{leaderboardPosition}</span>
              </div>
            )}
          </div>
        </div>

        <h3 style={{ color: '#00ff88' }}>🎁 Rewards Earned</h3>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <div style={{ display: 'grid', gap: '10px' }}>
            {rewardsEarned.map((reward, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#3a3a3a',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #555',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginRight: '10px', fontSize: '20px' }}>
                  🎁
                </span>
                <span>{reward}</span>
              </div>
            ))}
          </div>
        </div>

        {perfectCompletion && (
          <div
            style={{
              backgroundColor: '#1a1a2e',
              border: '2px solid #ffd700',
              padding: '20px',
              borderRadius: '10px',
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#ffd700', marginTop: '0' }}>
              🌟 PERFECT COMPLETION BONUS! 🌟
            </h3>
            <p style={{ margin: '0', color: '#cccccc' }}>
              You've achieved flawless execution! This perfect run has earned
              you bonus XP and exclusive bragging rights. Your dedication to
              excellence is truly legendary!
            </p>
          </div>
        )}

        {nextQuestTitle && (
          <div
            style={{
              backgroundColor: '#1a2a1a',
              border: '2px solid #00ff88',
              padding: '20px',
              borderRadius: '10px',
              margin: '20px 0',
            }}
          >
            <h3 style={{ color: '#00ff88', marginTop: '0' }}>
              🚀 Next Adventure Awaits
            </h3>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              <strong style={{ color: '#ffd700' }}>{nextQuestTitle}</strong>
            </p>
            <p style={{ margin: '0', color: '#cccccc' }}>
              Ready for your next challenge? The adventure continues!
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0',
          }}
        >
          <h4 style={{ color: '#4a69bd', marginTop: '0' }}>📊 Quest Stats</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '15px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#00ff88' }}>⚡</div>
              <div style={{ fontSize: '12px', color: '#999' }}>SPEED</div>
              <div style={{ fontWeight: 'bold' }}>{completionTime}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#ffd700' }}>🎯</div>
              <div style={{ fontSize: '12px', color: '#999' }}>ACCURACY</div>
              <div style={{ fontWeight: 'bold' }}>
                {perfectCompletion ? '100%' : 'Great'}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#ff6b6b' }}>🔥</div>
              <div style={{ fontSize: '12px', color: '#999' }}>DIFFICULTY</div>
              <div style={{ fontWeight: 'bold' }}>{difficulty}</div>
            </div>
          </div>
        </div>

        <p>
          Incredible work on completing this quest! Your skills are truly
          impressive, and we can't wait to see what you'll conquer next. Keep
          pushing those boundaries and showing the gaming world what {gamerTag}{' '}
          is made of!
        </p>

        <p>
          Keep gaming,
          <br />
          <strong style={{ color: '#00ff88' }}>The EpicQuestHub Team</strong>
        </p>

        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#2a2a2a',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0', fontSize: '14px', color: '#cccccc' }}>
            <strong style={{ color: '#00ff88' }}>EpicQuestHub</strong> - Every
            Quest Tells a Story
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Share your victory • Challenge friends • Climb the leaderboards
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestCompletion;
