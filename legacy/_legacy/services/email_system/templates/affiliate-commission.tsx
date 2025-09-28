import type React from 'react';

interface AffiliateCommissionProps {
  affiliateName: string;
  commissionPeriod: string;
  totalCommission: number;
  totalSales: number;
  topPerformingBooks: {
    title: string;
    author: string;
    sales: number;
    commission: number;
  }[];
  paymentDate: string;
  paymentMethod: string;
  bonusEarned?: number;
  nextTierRequirement?: string;
}

export const AffiliateCommission: React.FC<AffiliateCommissionProps> = ({
  affiliateName,
  commissionPeriod,
  totalCommission,
  totalSales,
  topPerformingBooks,
  paymentDate,
  paymentMethod,
  bonusEarned,
  nextTierRequirement,
}) => {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

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
          background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
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
          💰 Commission Report 💰
        </h1>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '18px',
            color: '#f0f0f0',
            opacity: '0.9',
          }}
        >
          Your Earnings Summary
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', marginTop: '0' }}>
          Hello {affiliateName},
        </p>

        <p>
          Congratulations on another successful period! We're excited to share
          your commission report for <strong>{commissionPeriod}</strong>. Your
          dedication to promoting quality literature continues to make a real
          impact.
        </p>

        <div
          style={{
            backgroundColor: '#d1f2eb',
            border: '3px solid #00b894',
            padding: '25px',
            borderRadius: '15px',
            margin: '25px 0',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#00b894', marginTop: '0', fontSize: '24px' }}>
            📊 Performance Summary
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              margin: '20px 0',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  color: '#00b894',
                  margin: '0 0 10px 0',
                  fontSize: '18px',
                }}
              >
                Total Commission
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2c2c2c',
                }}
              >
                {formatCurrency(totalCommission)}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h3
                style={{
                  color: '#00b894',
                  margin: '0 0 10px 0',
                  fontSize: '18px',
                }}
              >
                Books Sold
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2c2c2c',
                }}
              >
                {totalSales}
              </p>
            </div>
          </div>

          {bonusEarned && bonusEarned > 0 && (
            <div
              style={{
                backgroundColor: '#ffeaa7',
                border: '2px solid #fdcb6e',
                padding: '15px',
                borderRadius: '10px',
                margin: '15px 0',
              }}
            >
              <h3 style={{ color: '#e17055', margin: '0 0 10px 0' }}>
                🎉 Bonus Earned!
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2c2c2c',
                }}
              >
                {formatCurrency(bonusEarned)}
              </p>
            </div>
          )}
        </div>

        <h3 style={{ color: '#00b894', marginBottom: '15px' }}>
          📚 Top Performing Books
        </h3>

        {topPerformingBooks.map((book, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f8f6f0',
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px',
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  color: '#2c2c2c',
                  margin: '0 0 5px 0',
                  fontSize: '16px',
                }}
              >
                "{book.title}"
              </h4>
              <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>
                by {book.author}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}
              >
                {book.sales} sales
              </p>
              <p
                style={{
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#00b894',
                }}
              >
                {formatCurrency(book.commission)}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: '#74b9ff',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0' }}>💳 Payment Information</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <strong>Payment Date:</strong> {paymentDate}
            </div>
            <div>
              <strong>Payment Method:</strong> {paymentMethod}
            </div>
            <div>
              <strong>Total Amount:</strong>{' '}
              {formatCurrency(totalCommission + (bonusEarned || 0))}
            </div>
          </div>
        </div>

        {nextTierRequirement && (
          <div
            style={{
              backgroundColor: '#fd79a8',
              color: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>🚀 Level Up Your Earnings</h4>
            <p style={{ margin: '0', fontSize: '14px' }}>
              {nextTierRequirement}
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#f8f6f0',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <h3 style={{ color: '#8b4513', marginTop: '0' }}>📈 Keep Growing</h3>
          <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Share your favorite reads on social media</li>
            <li>Write authentic reviews for books you love</li>
            <li>Engage with your audience about reading</li>
            <li>Use our new promotional materials</li>
            <li>Focus on books in trending genres</li>
          </ul>
        </div>

        <p>
          Thank you for being such a valuable partner in spreading the love of
          reading. Your authentic recommendations help readers discover their
          next favorite books.
        </p>

        <p>
          Keep up the fantastic work!
          <br />
          <strong style={{ color: '#8b4513' }}>
            The LyricLines Affiliate Team
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
            <strong style={{ color: '#8b4513' }}>LyricLines</strong> - Partner
            Program
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            Earn • Share • Grow • Succeed
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateCommission;
