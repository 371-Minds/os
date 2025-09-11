import type React from 'react';

interface ReadingRecommendationProps {
  readerName: string;
  recommendedBooks: {
    title: string;
    author: string;
    genre: string;
    rating: number;
    description: string;
    reason: string;
  }[];
  basedOnBook?: string;
  personalizedMessage: string;
}

export const ReadingRecommendation: React.FC<ReadingRecommendationProps> = ({
  readerName,
  recommendedBooks,
  basedOnBook,
  personalizedMessage,
}) => {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '✨' : '');
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
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
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
          📚 Curated Just for You 📚
        </h1>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '18px',
            color: '#f0f0f0',
            opacity: '0.9',
          }}
        >
          Your Personal Reading Recommendations
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>Dear {readerName},</p>

        <p>{personalizedMessage}</p>

        {basedOnBook && (
          <div
            style={{
              backgroundColor: '#e8f4fd',
              border: '2px solid #74b9ff',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
            }}
          >
            <p style={{ margin: '0', fontSize: '14px' }}>
              <strong>📖 Based on your enjoyment of:</strong> "{basedOnBook}"
            </p>
          </div>
        )}

        <h3 style={{ color: '#6c5ce7', marginBottom: '20px' }}>
          Your Recommended Reads
        </h3>

        {recommendedBooks.map((book, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f8f6f0',
              border: '2px solid #ddd',
              padding: '20px',
              borderRadius: '12px',
              margin: '20px 0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    color: '#2c2c2c',
                    margin: '0 0 5px 0',
                    fontSize: '20px',
                  }}
                >
                  "{book.title}"
                </h4>
                <p
                  style={{
                    color: '#666',
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                  }}
                >
                  by <strong>{book.author}</strong>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    backgroundColor: '#6c5ce7',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    marginBottom: '5px',
                  }}
                >
                  {book.genre}
                </div>
                <div style={{ fontSize: '16px' }}>
                  {renderStars(book.rating)}
                </div>
              </div>
            </div>

            <p
              style={{
                color: '#2c2c2c',
                lineHeight: '1.6',
                margin: '15px 0',
                fontSize: '14px',
              }}
            >
              {book.description}
            </p>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #6c5ce7',
                padding: '12px',
                borderRadius: '8px',
                margin: '15px 0 0 0',
              }}
            >
              <p style={{ margin: '0', fontSize: '13px', color: '#6c5ce7' }}>
                <strong>💡 Why we recommend this:</strong> {book.reason}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: '#00b894',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0' }}>📚 Reading Tips</h3>
          <ul
            style={{
              margin: '0',
              paddingLeft: '20px',
              lineHeight: '1.8',
              textAlign: 'left',
            }}
          >
            <li>Start with the book that excites you most</li>
            <li>Keep a reading journal to track your thoughts</li>
            <li>Don't feel pressured to finish every book</li>
            <li>Join our book discussions for deeper insights</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#fdcb6e',
            color: '#2d3436',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>🎯 Challenge Yourself</h4>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Try reading one book from a genre you don't usually explore. You
            might discover a new favorite!
          </p>
        </div>

        <p>
          We hope these recommendations spark your next reading adventure. Each
          book has been carefully selected based on your reading history and
          preferences.
        </p>

        <p>
          Happy reading,
          <br />
          <strong style={{ color: '#8b4513' }}>
            Your Personal Librarian at LyricLines
          </strong>
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
            <strong style={{ color: '#8b4513' }}>LyricLines</strong> -
            Personalized Reading Recommendations
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Discover • Read • Connect • Grow
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingRecommendation;
