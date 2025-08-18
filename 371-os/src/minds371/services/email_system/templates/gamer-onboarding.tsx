import React from 'react';

interface GamerOnboardingProps {
  gamerTag: string;
  realName: string;
  joinDate: string;
  preferredGames: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  welcomeBonus: string;
  firstQuestTitle: string;
}

export const GamerOnboarding: React.FC<GamerOnboardingProps> = ({
  gamerTag,
  realName,
  joinDate,
  preferredGames,
  skillLevel,
  welcomeBonus,
  firstQuestTitle
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '32px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          🎮 WELCOME TO EPICQUESTHUB! 🎮
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
          Your Gaming Adventure Begins Now!
        </p>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>Hey {realName},</p>
        
        <p>
          Welcome to the ultimate gaming community! We're stoked to have <strong style={{ color: '#00ff88' }}>{gamerTag}</strong> join 
          our ranks. Get ready to embark on epic quests, dominate tournaments, and connect with fellow gamers 
          who share your passion for gaming excellence.
        </p>
        
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          border: '2px solid #00ff88',
          padding: '20px', 
          borderRadius: '10px', 
          margin: '20px 0' 
        }}>
          <h3 style={{ color: '#00ff88', marginTop: '0', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '24px' }}>⚡</span>
            Player Profile
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div><strong>Gamer Tag:</strong> <span style={{ color: '#00ff88' }}>{gamerTag}</span></div>
            <div><strong>Join Date:</strong> {joinDate}</div>
            <div><strong>Skill Level:</strong> <span style={{ color: '#ffd700' }}>{skillLevel}</span></div>
            <div><strong>Welcome Bonus:</strong> <span style={{ color: '#ff6b6b' }}>{welcomeBonus}</span></div>
          </div>
        </div>
        
        <h3 style={{ color: '#00ff88' }}>Your Gaming Arsenal</h3>
        <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', margin: '15px 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {preferredGames.map((game, index) => (
              <span 
                key={index} 
                style={{ 
                  backgroundColor: '#4a4a4a', 
                  color: '#ffffff',
                  padding: '5px 12px', 
                  borderRadius: '15px',
                  fontSize: '14px',
                  border: '1px solid #666'
                }}
              >
                🎯 {game}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#1a1a2e', 
          border: '2px solid #4a69bd',
          padding: '20px', 
          borderRadius: '10px', 
          margin: '20px 0' 
        }}>
          <h3 style={{ color: '#4a69bd', marginTop: '0' }}>🚀 Your First Quest Awaits!</h3>
          <p style={{ margin: '10px 0', fontSize: '16px' }}>
            <strong style={{ color: '#ffd700' }}>{firstQuestTitle}</strong>
          </p>
          <p style={{ margin: '0', color: '#cccccc' }}>
            Complete this quest to earn your first achievement and unlock exclusive rewards!
          </p>
        </div>
        
        <h3 style={{ color: '#00ff88' }}>What's Next?</h3>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '8px', margin: '15px 0' }}>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>🏆 Complete daily challenges to level up</li>
            <li>⚔️ Join tournaments and compete for glory</li>
            <li>👥 Connect with your gaming squad</li>
            <li>🎁 Unlock exclusive rewards and achievements</li>
            <li>📊 Track your progress on the leaderboards</li>
          </ul>
        </div>
        
        <div style={{ 
          backgroundColor: '#ff6b6b', 
          color: '#ffffff', 
          padding: '15px', 
          borderRadius: '8px', 
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>🔥 Pro Tip</h4>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Join our Discord community to get real-time updates, find teammates, 
            and participate in exclusive events!
          </p>
        </div>
        
        <p>
          Ready to dominate? Your gaming destiny awaits at EpicQuestHub. Let's make some epic memories together!
        </p>
        
        <p>
          Game on,<br/>
          <strong style={{ color: '#00ff88' }}>The EpicQuestHub Team</strong>
        </p>
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#cccccc' }}>
            <strong style={{ color: '#00ff88' }}>EpicQuestHub</strong> - Where Legends Are Born
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Level up your gaming experience • Connect • Compete • Conquer
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamerOnboarding;