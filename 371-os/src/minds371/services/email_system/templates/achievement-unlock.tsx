import React from 'react';

interface AchievementUnlockProps {
  gamerTag: string;
  achievementTitle: string;
  achievementDescription: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  unlockedDate: string;
  experienceReward: number;
  specialRewards?: string[];
  achievementCategory: 'Combat' | 'Exploration' | 'Social' | 'Skill' | 'Collection' | 'Special Event';
  completionPercentage: number;
  nextAchievement?: string;
  shareableImageUrl?: string;
}

export const AchievementUnlock: React.FC<AchievementUnlockProps> = ({
  gamerTag,
  achievementTitle,
  achievementDescription,
  rarity,
  unlockedDate,
  experienceReward,
  specialRewards,
  achievementCategory,
  completionPercentage,
  nextAchievement,
  shareableImageUrl
}) => {
  const getRarityStyle = () => {
    switch (rarity) {
      case 'Common': return { 
        backgroundColor: '#95a5a6', 
        borderColor: '#7f8c8d', 
        textColor: '#2c3e50',
        glow: '0 0 10px rgba(149, 165, 166, 0.5)',
        icon: '🥉'
      };
      case 'Rare': return { 
        backgroundColor: '#3498db', 
        borderColor: '#2980b9', 
        textColor: '#ffffff',
        glow: '0 0 15px rgba(52, 152, 219, 0.6)',
        icon: '🥈'
      };
      case 'Epic': return { 
        backgroundColor: '#9b59b6', 
        borderColor: '#8e44ad', 
        textColor: '#ffffff',
        glow: '0 0 20px rgba(155, 89, 182, 0.7)',
        icon: '🥇'
      };
      case 'Legendary': return { 
        backgroundColor: '#f39c12', 
        borderColor: '#e67e22', 
        textColor: '#ffffff',
        glow: '0 0 25px rgba(243, 156, 18, 0.8)',
        icon: '👑'
      };
      case 'Mythic': return { 
        backgroundColor: '#e74c3c', 
        borderColor: '#c0392b', 
        textColor: '#ffffff',
        glow: '0 0 30px rgba(231, 76, 60, 0.9)',
        icon: '💎'
      };
      default: return { 
        backgroundColor: '#95a5a6', 
        borderColor: '#7f8c8d', 
        textColor: '#2c3e50',
        glow: '0 0 10px rgba(149, 165, 166, 0.5)',
        icon: '🏆'
      };
    }
  };

  const getCategoryIcon = () => {
    switch (achievementCategory) {
      case 'Combat': return '⚔️';
      case 'Exploration': return '🗺️';
      case 'Social': return '👥';
      case 'Skill': return '🎯';
      case 'Collection': return '📦';
      case 'Special Event': return '🎉';
      default: return '🏆';
    }
  };

  const style = getRarityStyle();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${style.backgroundColor} 0%, ${style.borderColor} 100%)`,
        padding: '30px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center',
        boxShadow: style.glow
      }}>
        <div style={{ fontSize: '64px', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}>
          {style.icon}
        </div>
        <h1 style={{ margin: '0', fontSize: '32px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', color: style.textColor }}>
          ACHIEVEMENT UNLOCKED!
        </h1>
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          display: 'inline-block',
          marginTop: '10px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {rarity.toUpperCase()} RARITY
        </div>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a' }}>
        <p style={{ fontSize: '16px', marginTop: '0', textAlign: 'center' }}>
          Incredible work, <strong style={{ color: style.backgroundColor }}>{gamerTag}</strong>!
        </p>
        
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          border: `3px solid ${style.backgroundColor}`,
          padding: '25px', 
          borderRadius: '15px', 
          margin: '20px 0',
          boxShadow: style.glow
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ fontSize: '32px', marginRight: '15px' }}>{getCategoryIcon()}</span>
            <div>
              <h2 style={{ color: style.backgroundColor, margin: '0', fontSize: '24px' }}>
                {achievementTitle}
              </h2>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                {achievementCategory} • Unlocked {unlockedDate}
              </div>
            </div>
          </div>
          <p style={{ margin: '15px 0', lineHeight: '1.6', color: '#cccccc', fontSize: '16px' }}>
            {achievementDescription}
          </p>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffd700' }}>
              +{experienceReward} XP Earned!
            </div>
          </div>
        </div>
        
        {specialRewards && specialRewards.length > 0 && (
          <>
            <h3 style={{ color: '#00ff88' }}>🎁 Special Rewards Unlocked</h3>
            <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '8px', margin: '15px 0' }}>
              <div style={{ display: 'grid', gap: '10px' }}>
                {specialRewards.map((reward, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: '#3a3a3a', 
                      padding: '12px', 
                      borderRadius: '6px',
                      border: `1px solid ${style.backgroundColor}`,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ marginRight: '10px', fontSize: '20px' }}>✨</span>
                    <span>{reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h4 style={{ color: '#4a69bd', marginTop: '0' }}>📊 Achievement Stats</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: style.backgroundColor }}>{style.icon}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>RARITY</div>
              <div style={{ fontWeight: 'bold' }}>{rarity}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#ffd700' }}>⭐</div>
              <div style={{ fontSize: '12px', color: '#999' }}>COMPLETION</div>
              <div style={{ fontWeight: 'bold' }}>{completionPercentage}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#00ff88' }}>{getCategoryIcon()}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>CATEGORY</div>
              <div style={{ fontWeight: 'bold' }}>{achievementCategory}</div>
            </div>
          </div>
        </div>
        
        {nextAchievement && (
          <div style={{ 
            backgroundColor: '#1a2a1a', 
            border: '2px solid #00ff88',
            padding: '20px', 
            borderRadius: '10px', 
            margin: '20px 0' 
          }}>
            <h3 style={{ color: '#00ff88', marginTop: '0' }}>🎯 Next Challenge</h3>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              <strong style={{ color: '#ffd700' }}>{nextAchievement}</strong>
            </p>
            <p style={{ margin: '0', color: '#cccccc' }}>
              Keep pushing your limits! Your next achievement awaits.
            </p>
          </div>
        )}
        
        {shareableImageUrl && (
          <div style={{ 
            backgroundColor: '#4a69bd', 
            color: '#ffffff', 
            padding: '20px', 
            borderRadius: '10px', 
            margin: '20px 0',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0' }}>📸 Share Your Achievement</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
              Show off your accomplishment to the gaming community!
            </p>
            <a 
              href={shareableImageUrl}
              style={{ 
                backgroundColor: '#ffffff',
                color: '#4a69bd',
                padding: '10px 20px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              📱 Get Shareable Image
            </a>
          </div>
        )}
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
          <h4 style={{ color: '#e74c3c', marginTop: '0' }}>🔥 Achievement Hunting Tips</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6', color: '#cccccc' }}>
            <li>Check your achievement progress regularly in your profile</li>
            <li>Join community events for exclusive achievement opportunities</li>
            <li>Team up with friends to unlock social achievements faster</li>
            <li>Rare achievements often require specific conditions - read the hints!</li>
          </ul>
        </div>
        
        <p>
          This achievement represents your dedication and skill, {gamerTag}. You've proven that you have what it takes 
          to reach new heights in gaming. We're excited to see what you'll accomplish next!
        </p>
        
        <p>
          Keep achieving greatness,<br/>
          <strong style={{ color: style.backgroundColor }}>The EpicQuestHub Team</strong>
        </p>
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#cccccc' }}>
            <strong style={{ color: style.backgroundColor }}>EpicQuestHub</strong> - Celebrating Every Victory
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Unlock • Achieve • Inspire
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementUnlock;