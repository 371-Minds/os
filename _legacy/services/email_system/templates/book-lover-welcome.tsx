import type React from 'react';

interface BookLoverWelcomeProps {
  readerName: string;
  favoriteGenres: string[];
  joinDate: string;
  welcomeBookTitle: string;
  welcomeBookAuthor: string;
  readingGoal: number;
}

export const BookLoverWelcome: React.FC<BookLoverWelcomeProps> = ({
  readerName,
  favoriteGenres,
  joinDate,
  welcomeBookTitle,
  welcomeBookAuthor,
  readingGoal,
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
          background: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
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
          📚 Welcome to LyricLines! 📚
        </h1>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '18px',
            color: '#f0f0f0',
            opacity: '0.9',
          }}
        >
          Where Every Page Tells a Story
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>Dear {readerName},</p>

        <p>
          Welcome to our literary sanctuary! We're absolutely delighted to have
          you join our community of passionate readers. At LyricLines, we
          believe that every book is a doorway to new worlds, and we can't wait
          to help you discover your next favorite story.
        </p>

        <div
          style={{
            backgroundColor: '#f8f6f0',
            border: '2px solid #8b4513',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3
            style={{
              color: '#8b4513',
              marginTop: '0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '24px' }}>📖</span>
            Your Reader Profile
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div>
              <strong>Reader Name:</strong>{' '}
              <span style={{ color: '#8b4513' }}>{readerName}</span>
            </div>
            <div>
              <strong>Join Date:</strong> {joinDate}
            </div>
            <div>
              <strong>Reading Goal:</strong>{' '}
              <span style={{ color: '#d2691e' }}>
                {readingGoal} books this year
              </span>
            </div>
          </div>
        </div>

        <h3 style={{ color: '#8b4513' }}>Your Literary Preferences</h3>
        <div
          style={{
            backgroundColor: '#f8f6f0',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {favoriteGenres.map((genre, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#8b4513',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '14px',
                }}
              >
                📚 {genre}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#e6f3ff',
            border: '2px solid #4682b4',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#4682b4', marginTop: '0' }}>
            📖 Your Welcome Book
          </h3>
          <p style={{ margin: '10px 0', fontSize: '16px' }}>
            <strong style={{ color: '#2c2c2c' }}>"{welcomeBookTitle}"</strong>
            <br />
            <em>by {welcomeBookAuthor}</em>
          </p>
          <p style={{ margin: '0', color: '#666666' }}>
            We've handpicked this book based on your preferences. Happy reading!
          </p>
        </div>

        <h3 style={{ color: '#8b4513' }}>What Awaits You</h3>
        <div
          style={{
            backgroundColor: '#f8f6f0',
            padding: '20px',
            borderRadius: '8px',
            margin: '15px 0',
          }}
        >
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>📚 Personalized book recommendations</li>
            <li>✍️ Author interviews and insights</li>
            <li>📖 Monthly reading challenges</li>
            <li>💬 Book club discussions</li>
            <li>🏆 Reading achievement badges</li>
            <li>📝 Reading journal and progress tracking</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#8b4513',
            color: '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>💡 Reader's Tip</h4>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Set aside 20 minutes daily for reading. Small, consistent sessions
            will help you reach your reading goals faster than you think!
          </p>
        </div>

        <p>
          Your literary journey starts now. Whether you're seeking adventure,
          romance, mystery, or wisdom, we're here to guide you to your next
          great read.
        </p>

        <p>
          Happy reading,
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
            <strong style={{ color: '#8b4513' }}>LyricLines</strong> - Where
            Stories Come Alive
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Discover • Read • Connect • Grow
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookLoverWelcome;
