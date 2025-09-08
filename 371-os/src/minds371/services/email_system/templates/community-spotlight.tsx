import type React from 'react';

interface CommunitySpotlightProps {
  featuredGamerTag: string;
  spotlightTitle: string;
  achievements: string[];
  gamerBio: string;
  favoriteGames: string[];
  communityContributions: string[];
  stats: {
    totalQuests: number;
    winRate: string;
    communityRank: number;
    joinDate: string;
  };
  quote?: string;
  socialLinks?: {
    twitch?: string;
    youtube?: string;
    discord?: string;
  };
  nominatedBy?: string;
  nextSpotlightDate?: string;
}

export const CommunitySpotlight: React.FC<CommunitySpotlightProps> = ({
  featuredGamerTag,
  spotlightTitle,
  achievements,
  gamerBio,
  favoriteGames,
  communityContributions,
  stats,
  quote,
  socialLinks,
  nominatedBy,
  nextSpotlightDate,
}) => {
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
          background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
          padding: '30px',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
          color: '#000000',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌟</div>
        <h1
          style={{
            margin: '0',
            fontSize: '28px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          COMMUNITY SPOTLIGHT
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.8' }}>
          Celebrating Our Gaming Heroes
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#1a1a1a' }}>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            border: '3px solid #ffd700',
            padding: '25px',
            borderRadius: '15px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>👑</div>
          <h2 style={{ color: '#ffd700', margin: '0', fontSize: '32px' }}>
            {featuredGamerTag}
          </h2>
          <div
            style={{
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              padding: '10px',
              borderRadius: '8px',
              margin: '15px 0',
              fontSize: '16px',
              fontStyle: 'italic',
            }}
          >
            {spotlightTitle}
          </div>
          {nominatedBy && (
            <div style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
              Nominated by:{' '}
              <span style={{ color: '#00ff88' }}>{nominatedBy}</span>
            </div>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#00ff88', marginTop: '0' }}>📖 Gamer Bio</h3>
          <p style={{ margin: '0', lineHeight: '1.6', color: '#cccccc' }}>
            {gamerBio}
          </p>
          {quote && (
            <div
              style={{
                backgroundColor: '#3a3a3a',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0',
                borderLeft: '4px solid #ffd700',
              }}
            >
              <p style={{ margin: '0', fontStyle: 'italic', color: '#ffd700' }}>
                "{quote}"
              </p>
              <div
                style={{
                  textAlign: 'right',
                  marginTop: '10px',
                  fontSize: '14px',
                  color: '#999',
                }}
              >
                - {featuredGamerTag}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '15px',
            margin: '20px 0',
          }}
        >
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '15px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>🎯</div>
            <div
              style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}
            >
              QUESTS
            </div>
            <div style={{ fontWeight: 'bold', color: '#00ff88' }}>
              {stats.totalQuests}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '15px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>🏆</div>
            <div
              style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}
            >
              WIN RATE
            </div>
            <div style={{ fontWeight: 'bold', color: '#ffd700' }}>
              {stats.winRate}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '15px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>📊</div>
            <div
              style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}
            >
              RANK
            </div>
            <div style={{ fontWeight: 'bold', color: '#ff6b6b' }}>
              #{stats.communityRank}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '15px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>📅</div>
            <div
              style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}
            >
              MEMBER SINCE
            </div>
            <div style={{ fontWeight: 'bold', color: '#4a69bd' }}>
              {stats.joinDate}
            </div>
          </div>
        </div>

        <h3 style={{ color: '#00ff88' }}>🏅 Notable Achievements</h3>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <div style={{ display: 'grid', gap: '10px' }}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#3a3a3a',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ffd700',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginRight: '10px', fontSize: '20px' }}>
                  🏆
                </span>
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ color: '#00ff88' }}>🎮 Favorite Games</h3>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {favoriteGames.map((game, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#4a4a4a',
                  color: '#ffffff',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  border: '1px solid #666',
                }}
              >
                🎯 {game}
              </span>
            ))}
          </div>
        </div>

        <h3 style={{ color: '#00ff88' }}>🤝 Community Contributions</h3>
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            {communityContributions.map((contribution, index) => (
              <li key={index} style={{ marginBottom: '8px', color: '#cccccc' }}>
                ✨ {contribution}
              </li>
            ))}
          </ul>
        </div>

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <>
            <h3 style={{ color: '#00ff88' }}>
              🔗 Connect with {featuredGamerTag}
            </h3>
            <div
              style={{
                backgroundColor: '#2a2a2a',
                padding: '20px',
                borderRadius: '8px',
                margin: '15px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  flexWrap: 'wrap',
                }}
              >
                {socialLinks.twitch && (
                  <a
                    href={socialLinks.twitch}
                    style={{
                      backgroundColor: '#9146ff',
                      color: '#ffffff',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    📺 Twitch
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    style={{
                      backgroundColor: '#ff0000',
                      color: '#ffffff',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    📹 YouTube
                  </a>
                )}
                {socialLinks.discord && (
                  <a
                    href={socialLinks.discord}
                    style={{
                      backgroundColor: '#5865f2',
                      color: '#ffffff',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    💬 Discord
                  </a>
                )}
              </div>
            </div>
          </>
        )}

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
            🌟 Want to be Featured?
          </h3>
          <p style={{ margin: '10px 0', color: '#cccccc' }}>
            Our community spotlight celebrates gamers who make EpicQuestHub an
            amazing place to be. Whether through exceptional gameplay, helping
            others, or contributing to our community spirit, we want to
            recognize your achievements!
          </p>
          <ul
            style={{
              margin: '10px 0',
              paddingLeft: '20px',
              color: '#cccccc',
              lineHeight: '1.6',
            }}
          >
            <li>Nominate yourself or a fellow gamer</li>
            <li>Share your gaming story and achievements</li>
            <li>Show how you've contributed to our community</li>
          </ul>
        </div>

        {nextSpotlightDate && (
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            <h4 style={{ color: '#ffd700', marginTop: '0' }}>
              📅 Next Spotlight
            </h4>
            <p style={{ margin: '0', color: '#cccccc' }}>
              Our next community spotlight will be featured on{' '}
              <strong>{nextSpotlightDate}</strong>. Could it be you?
            </p>
          </div>
        )}

        <p>
          Congratulations to {featuredGamerTag} for being an outstanding member
          of our community! Your dedication, skills, and positive spirit inspire
          us all. Thank you for making EpicQuestHub a better place for everyone.
        </p>

        <p>
          Celebrating our community,
          <br />
          <strong style={{ color: '#ffd700' }}>The EpicQuestHub Team</strong>
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
            <strong style={{ color: '#ffd700' }}>EpicQuestHub Community</strong>{' '}
            - Powered by Amazing Gamers Like You
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Celebrate • Inspire • Game Together
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunitySpotlight;
