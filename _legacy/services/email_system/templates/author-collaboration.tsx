import type React from 'react';

interface AuthorCollaborationProps {
  authorName: string;
  bookTitle: string;
  genre: string;
  collaborationType:
    | 'Interview'
    | 'Book Feature'
    | 'Reading Event'
    | 'Book Club Discussion'
    | 'Author Spotlight';
  proposedDate: string;
  audienceSize: number;
  platformDetails: string[];
  compensationOffered?: string;
  bookDescription: string;
  authorBio: string;
  contactPerson: string;
  responseDeadline: string;
}

export const AuthorCollaboration: React.FC<AuthorCollaborationProps> = ({
  authorName,
  bookTitle,
  genre,
  collaborationType,
  proposedDate,
  audienceSize,
  platformDetails,
  compensationOffered,
  bookDescription,
  authorBio,
  contactPerson,
  responseDeadline,
}) => {
  const getCollaborationIcon = (type: string) => {
    switch (type) {
      case 'Interview':
        return '🎤';
      case 'Book Feature':
        return '📚';
      case 'Reading Event':
        return '📖';
      case 'Book Club Discussion':
        return '💬';
      case 'Author Spotlight':
        return '⭐';
      default:
        return '📝';
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Georgia, serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f8f6f0',
        color: '#2c2c2c',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #e17055 0%, #fd79a8 100%)',
          padding: '30px',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: '0',
            fontSize: '32px',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {getCollaborationIcon(collaborationType)} Collaboration Opportunity
        </h1>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '18px',
            color: '#f0f0f0',
            opacity: '0.9',
          }}
        >
          Partner with LyricLines
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>Dear {authorName},</p>

        <p>
          We hope this message finds you well! We're reaching out from
          LyricLines because we're incredibly impressed with your work,
          particularly <strong>"{bookTitle}"</strong>. We'd love to explore a
          collaboration opportunity that could benefit both our reading
          community and your author platform.
        </p>

        <div
          style={{
            backgroundColor: '#fff5f5',
            border: '3px solid #e17055',
            padding: '25px',
            borderRadius: '15px',
            margin: '25px 0',
          }}
        >
          <h2
            style={{
              color: '#e17055',
              marginTop: '0',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            {getCollaborationIcon(collaborationType)} {collaborationType}{' '}
            Proposal
          </h2>

          <div style={{ display: 'grid', gap: '15px', margin: '20px 0' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e17055',
              }}
            >
              <h3
                style={{
                  color: '#e17055',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                📚 Featured Book
              </h3>
              <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
                "{bookTitle}"
              </p>
              <p
                style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}
              >
                Genre: {genre}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e17055',
              }}
            >
              <h3
                style={{
                  color: '#e17055',
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                }}
              >
                📅 Proposed Timeline
              </h3>
              <p style={{ margin: '0', fontSize: '16px' }}>{proposedDate}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#f8f6f0',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#8b4513', marginTop: '0' }}>
            📖 About Your Book
          </h3>
          <p style={{ lineHeight: '1.6', margin: '0' }}>{bookDescription}</p>
        </div>

        <div
          style={{
            backgroundColor: '#e6f3ff',
            border: '2px solid #74b9ff',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#74b9ff', marginTop: '0' }}>
            🎯 Our Audience & Reach
          </h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <strong>Community Size:</strong> {audienceSize.toLocaleString()}{' '}
              engaged readers
            </div>
            <div>
              <strong>Platforms:</strong>
            </div>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
              {platformDetails.map((platform, index) => (
                <li key={index} style={{ margin: '5px 0' }}>
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#d1f2eb',
            border: '2px solid #00b894',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#00b894', marginTop: '0' }}>
            🤝 What We're Offering
          </h3>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Professional promotion across all our platforms</li>
            <li>Dedicated feature in our newsletter</li>
            <li>Social media campaign highlighting your work</li>
            <li>Direct access to our engaged reading community</li>
            <li>Long-term partnership opportunities</li>
            {compensationOffered && (
              <li>
                <strong>Compensation:</strong> {compensationOffered}
              </li>
            )}
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#fdcb6e',
            color: '#2d3436',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0' }}>✨ Why We Chose You</h3>
          <p style={{ margin: '0', lineHeight: '1.6' }}>{authorBio}</p>
          <p style={{ margin: '15px 0 0 0', fontStyle: 'italic' }}>
            Your authentic voice and compelling storytelling align perfectly
            with what our community values most in literature.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ff7675',
            color: '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>⏰ Response Needed</h4>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Please let us know by <strong>{responseDeadline}</strong> if you're
            interested in this collaboration opportunity.
          </p>
        </div>

        <p>
          We're genuinely excited about the possibility of working together and
          introducing your work to our passionate reading community. This
          collaboration would be a wonderful way to connect your stories with
          readers who will truly appreciate them.
        </p>

        <p>Looking forward to hearing from you!</p>

        <p>
          Best regards,
          <br />
          <strong style={{ color: '#8b4513' }}>{contactPerson}</strong>
          <br />
          <em>Partnership Manager, LyricLines</em>
        </p>

        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#f8f6f0',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0', fontSize: '14px', color: '#666666' }}>
            <strong style={{ color: '#8b4513' }}>LyricLines</strong> - Author
            Partnership Program
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Connect • Collaborate • Create • Celebrate
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorCollaboration;
