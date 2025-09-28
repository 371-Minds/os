import type React from 'react';

interface NewReleaseAlertProps {
  readerName: string;
  bookTitle: string;
  authorName: string;
  releaseDate: string;
  genre: string;
  bookDescription: string;
  preOrderLink: string;
  coverImageUrl?: string;
  previousBookTitle?: string;
}

export const NewReleaseAlert: React.FC<NewReleaseAlertProps> = ({
  readerName,
  bookTitle,
  authorName,
  releaseDate,
  genre,
  bookDescription,
  preOrderLink,
  coverImageUrl,
  previousBookTitle,
}) => {
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
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
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
          🚨 NEW RELEASE ALERT! 🚨
        </h1>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '18px',
            color: '#f0f0f0',
            opacity: '0.9',
          }}
        >
          Your Next Favorite Book is Here
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>Hello {readerName},</p>

        <p>
          Exciting news! A brand new book that matches your reading preferences
          has just been released. Based on your love for{' '}
          <strong>{genre}</strong> books, we think you'll absolutely love this
          one!
        </p>

        <div
          style={{
            backgroundColor: '#fff5f5',
            border: '3px solid #ff6b6b',
            padding: '25px',
            borderRadius: '15px',
            margin: '25px 0',
            textAlign: 'center',
          }}
        >
          {coverImageUrl && (
            <div style={{ marginBottom: '20px' }}>
              <img
                src={coverImageUrl}
                alt={`${bookTitle} cover`}
                style={{
                  maxWidth: '150px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          )}

          <h2 style={{ color: '#ff6b6b', marginTop: '0', fontSize: '28px' }}>
            "{bookTitle}"
          </h2>
          <h3 style={{ color: '#2c2c2c', margin: '10px 0', fontSize: '20px' }}>
            by {authorName}
          </h3>

          <div
            style={{
              backgroundColor: '#ff6b6b',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '14px',
              margin: '10px 0',
            }}
          >
            📚 {genre}
          </div>

          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#ee5a24',
              margin: '15px 0 5px 0',
            }}
          >
            Release Date: {releaseDate}
          </p>
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
            📖 About This Book
          </h3>
          <p style={{ lineHeight: '1.6', margin: '0' }}>{bookDescription}</p>
        </div>

        {previousBookTitle && (
          <div
            style={{
              backgroundColor: '#e6f3ff',
              border: '2px solid #4682b4',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
            }}
          >
            <p style={{ margin: '0', fontSize: '14px' }}>
              <strong>📚 From the author of:</strong> "{previousBookTitle}"
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#2ecc71',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0' }}>🎯 Why You'll Love This Book</h3>
          <ul
            style={{
              margin: '0',
              paddingLeft: '20px',
              lineHeight: '1.8',
              textAlign: 'left',
            }}
          >
            <li>Perfect match for your {genre} preferences</li>
            <li>From an author you've enjoyed before</li>
            <li>Fresh release with early reader buzz</li>
            <li>Available in multiple formats</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={preOrderLink}
            style={{
              backgroundColor: '#ff6b6b',
              color: '#ffffff',
              padding: '15px 30px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'inline-block',
              boxShadow: '0 4px 8px rgba(255, 107, 107, 0.3)',
            }}
          >
            📚 Get Your Copy Now
          </a>
        </div>

        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            color: '#856404',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>⚡ Limited Time</h4>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Pre-order now and get exclusive bonus content including author notes
            and a reading guide!
          </p>
        </div>

        <p>
          Don't miss out on what could be your next favorite read. Happy
          reading!
        </p>

        <p>
          Best regards,
          <br />
          <strong style={{ color: '#8b4513' }}>The LyricLines Team</strong>
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
            <strong style={{ color: '#8b4513' }}>LyricLines</strong> - Your
            Personal Book Discovery Service
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Discover • Read • Connect • Grow
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewReleaseAlert;
