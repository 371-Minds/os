import React from 'react';

interface TournamentInvitationProps {
  gamerTag: string;
  tournamentName: string;
  gameTitle: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  prizePool: string;
  maxParticipants: number;
  currentRegistrations: number;
  tournamentType: 'Solo' | 'Team' | 'Battle Royale' | 'Elimination';
  skillRequirement: 'Open' | 'Intermediate+' | 'Advanced+' | 'Pro Only';
  specialRules?: string[];
  registrationUrl: string;
}

export const TournamentInvitation: React.FC<TournamentInvitationProps> = ({
  gamerTag,
  tournamentName,
  gameTitle,
  startDate,
  endDate,
  registrationDeadline,
  prizePool,
  maxParticipants,
  currentRegistrations,
  tournamentType,
  skillRequirement,
  specialRules,
  registrationUrl
}) => {
  const spotsRemaining = maxParticipants - currentRegistrations;
  const urgencyLevel = spotsRemaining <= 10 ? 'high' : spotsRemaining <= 50 ? 'medium' : 'low';
  
  const getUrgencyStyle = () => {
    switch (urgencyLevel) {
      case 'high': return { backgroundColor: '#ff6b6b', color: '#ffffff' };
      case 'medium': return { backgroundColor: '#ffd700', color: '#000000' };
      default: return { backgroundColor: '#00ff88', color: '#000000' };
    }
  };

  const getTournamentTypeIcon = () => {
    switch (tournamentType) {
      case 'Solo': return '👤';
      case 'Team': return '👥';
      case 'Battle Royale': return '⚔️';
      case 'Elimination': return '🏆';
      default: return '🎮';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        padding: '30px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏆</div>
        <h1 style={{ margin: '0', fontSize: '28px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          TOURNAMENT INVITATION
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
          You're invited to compete, {gamerTag}!
        </p>
        {urgencyLevel === 'high' && (
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            backgroundColor: '#ff6b6b', 
            padding: '5px 10px', 
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            🔥 FILLING FAST!
          </div>
        )}
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a' }}>
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          border: '3px solid #e74c3c',
          padding: '25px', 
          borderRadius: '10px', 
          margin: '20px 0' 
        }}>
          <h2 style={{ color: '#e74c3c', marginTop: '0', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '32px' }}>{getTournamentTypeIcon()}</span>
            {tournamentName}
          </h2>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '15px', 
            borderRadius: '8px',
            margin: '15px 0'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', fontSize: '14px' }}>
              <div><strong>Game:</strong> <span style={{ color: '#00ff88' }}>{gameTitle}</span></div>
              <div><strong>Type:</strong> <span style={{ color: '#ffd700' }}>{tournamentType}</span></div>
              <div><strong>Skill Level:</strong> <span style={{ color: '#ff6b6b' }}>{skillRequirement}</span></div>
              <div><strong>Prize Pool:</strong> <span style={{ color: '#ffd700' }}>{prizePool}</span></div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', margin: '20px 0' }}>
          <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>📅</div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>START DATE</div>
            <div style={{ fontWeight: 'bold', color: '#00ff88' }}>{startDate}</div>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>🏁</div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>END DATE</div>
            <div style={{ fontWeight: 'bold', color: '#ff6b6b' }}>{endDate}</div>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>⏰</div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>REGISTRATION ENDS</div>
            <div style={{ fontWeight: 'bold', color: '#ffd700' }}>{registrationDeadline}</div>
          </div>
        </div>
        
        <div style={{ 
          ...getUrgencyStyle(),
          padding: '20px', 
          borderRadius: '10px', 
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>
            {urgencyLevel === 'high' ? '🚨 LIMITED SPOTS REMAINING!' : 
             urgencyLevel === 'medium' ? '⚡ REGISTER SOON!' : '✅ SPOTS AVAILABLE'}
          </h3>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {spotsRemaining} of {maxParticipants} spots remaining
          </div>
          <div style={{ fontSize: '14px', marginTop: '5px', opacity: '0.8' }}>
            {currentRegistrations} gamers already registered
          </div>
        </div>
        
        {specialRules && specialRules.length > 0 && (
          <>
            <h3 style={{ color: '#4a69bd' }}>📋 Special Tournament Rules</h3>
            <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', margin: '15px 0' }}>
              <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
                {specialRules.map((rule, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#cccccc' }}>
                    ⚖️ {rule}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        <div style={{ backgroundColor: '#1a2a1a', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h4 style={{ color: '#00ff88', marginTop: '0' }}>🎯 Why You Should Compete</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8', color: '#cccccc' }}>
            <li>💰 Compete for amazing prizes and recognition</li>
            <li>🏅 Earn exclusive tournament achievements</li>
            <li>📈 Boost your EpicQuestHub ranking</li>
            <li>🤝 Network with top-tier gamers</li>
            <li>🎥 Potential for featured gameplay highlights</li>
          </ul>
        </div>
        
        <div style={{ 
          backgroundColor: '#e74c3c', 
          color: '#ffffff', 
          padding: '20px', 
          borderRadius: '10px', 
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Ready to Prove Your Skills?</h3>
          <a 
            href={registrationUrl}
            style={{ 
              backgroundColor: '#ffffff',
              color: '#e74c3c',
              padding: '12px 30px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
          >
            🚀 REGISTER NOW
          </a>
          <p style={{ margin: '15px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
            Registration closes on {registrationDeadline} - Don't miss out!
          </p>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
          <h4 style={{ color: '#ffd700', marginTop: '0' }}>💡 Pro Tips for Tournament Success</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6', color: '#cccccc' }}>
            <li>Practice in similar game modes before the tournament</li>
            <li>Check your equipment and internet connection</li>
            <li>Join our Discord for real-time tournament updates</li>
            <li>Review the rules carefully before competing</li>
          </ul>
        </div>
        
        <p>
          This is your chance to showcase your skills on the big stage, {gamerTag}! We've seen your gameplay, 
          and we know you have what it takes to compete with the best. Don't let this opportunity slip away!
        </p>
        
        <p>
          See you in the arena,<br/>
          <strong style={{ color: '#e74c3c' }}>The EpicQuestHub Tournament Team</strong>
        </p>
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#cccccc' }}>
            <strong style={{ color: '#e74c3c' }}>EpicQuestHub Tournaments</strong> - Where Champions Rise
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Compete • Conquer • Claim Glory
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentInvitation;