import type React from 'react';

interface StreamingSetupCompleteProps {
  creatorName: string;
  platform: string;
  streamKey: string;
  setupType: string;
  features: string[];
  streamingUrl: string;
  supportContact: string;
  nextStreamDate?: string;
}

export const StreamingSetupComplete: React.FC<StreamingSetupCompleteProps> = ({
  creatorName,
  platform,
  streamKey,
  setupType,
  features,
  streamingUrl,
  supportContact,
  nextStreamDate,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#2c3e50', margin: '0', fontSize: '28px' }}>
          🔴 Your Streaming Setup is Complete! 🔴
        </h1>
        <p style={{ color: '#34495e', margin: '10px 0 0 0', fontSize: '16px' }}>
          Ready to Go Live!
        </p>
      </div>

      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '18px', color: '#e0e0e0' }}>
          Hey {creatorName}! 🎉
        </p>

        <p style={{ lineHeight: '1.6', color: '#cccccc' }}>
          Fantastic news! Your streaming setup has been completed and tested.
          You're now ready to broadcast high-quality content to your audience.
          Here are all the details you need to start streaming like a pro.
        </p>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '25px',
            borderRadius: '10px',
            margin: '25px 0',
            border: '2px solid #a8edea',
          }}
        >
          <h3
            style={{
              color: '#a8edea',
              marginTop: '0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ⚙️ Setup Configuration
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <strong style={{ color: '#ffffff' }}>Platform:</strong>
              <br />
              <span style={{ color: '#a8edea', fontSize: '18px' }}>
                {platform}
              </span>
            </div>
            <div>
              <strong style={{ color: '#ffffff' }}>Setup Type:</strong>
              <br />
              <span style={{ color: '#cccccc' }}>{setupType}</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#1a1a1a',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '15px',
            }}
          >
            <strong style={{ color: '#ffffff' }}>Stream Key:</strong>
            <br />
            <code
              style={{
                color: '#a8edea',
                backgroundColor: '#333333',
                padding: '8px 12px',
                borderRadius: '4px',
                display: 'inline-block',
                marginTop: '5px',
                fontSize: '14px',
                wordBreak: 'break-all',
              }}
            >
              {streamKey}
            </code>
            <p
              style={{
                color: '#ff6b6b',
                fontSize: '12px',
                margin: '8px 0 0 0',
              }}
            >
              ⚠️ Keep this private! Never share your stream key publicly.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#a8edea', marginTop: '0' }}>
            ✨ Enabled Features
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #a8edea',
                }}
              >
                <span style={{ color: '#cccccc' }}>✅ {feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#fed6e3',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
            🔗 Your Streaming URL
          </h3>
          <p style={{ color: '#34495e', marginBottom: '15px' }}>
            Share this link with your audience to watch your streams:
          </p>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '6px',
            }}
          >
            <a
              href={streamingUrl}
              style={{
                color: '#2c3e50',
                textDecoration: 'none',
                fontWeight: 'bold',
                wordBreak: 'break-all',
              }}
            >
              {streamingUrl}
            </a>
          </div>
        </div>

        {nextStreamDate && (
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              margin: '25px 0',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#a8edea', marginTop: '0' }}>
              📅 Next Stream Scheduled
            </h3>
            <p style={{ color: '#ffffff', fontSize: '18px', margin: '0' }}>
              {nextStreamDate}
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#a8edea', marginTop: '0' }}>
            🚀 Pre-Stream Checklist
          </h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '8px' }}>
              Test your audio and video quality
            </li>
            <li style={{ marginBottom: '8px' }}>
              Check your internet connection stability
            </li>
            <li style={{ marginBottom: '8px' }}>
              Prepare your content and talking points
            </li>
            <li style={{ marginBottom: '8px' }}>
              Set up your streaming environment and lighting
            </li>
            <li style={{ marginBottom: '8px' }}>
              Announce your stream on social media
            </li>
            <li style={{ marginBottom: '8px' }}>
              Have backup plans ready for technical issues
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#a8edea', marginTop: '0' }}>
            💡 Pro Streaming Tips
          </h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '8px' }}>
              Engage with your chat regularly
            </li>
            <li style={{ marginBottom: '8px' }}>
              Maintain consistent streaming schedule
            </li>
            <li style={{ marginBottom: '8px' }}>
              Use eye-catching thumbnails and titles
            </li>
            <li style={{ marginBottom: '8px' }}>
              Collaborate with other streamers
            </li>
            <li style={{ marginBottom: '8px' }}>
              Save and repurpose your best stream moments
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#ff6b6b',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#ffffff', marginTop: '0' }}>🆘 Need Help?</h3>
          <p style={{ color: '#f0f0f0', margin: '0' }}>
            If you encounter any issues or need technical support, contact us
            immediately:
          </p>
          <p
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              margin: '10px 0 0 0',
            }}
          >
            📧 {supportContact}
          </p>
        </div>

        <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
          You're all set to create amazing live content! Remember, great
          streaming comes with practice, so don't worry if your first few
          streams aren't perfect. Focus on connecting with your audience and
          having fun.
        </p>

        <p style={{ color: '#cccccc' }}>
          We can't wait to see you go live! Break a leg! 🎬✨
        </p>

        <p style={{ color: '#e0e0e0' }}>
          Happy streaming,
          <br />
          The Multimedia Junkie Team
        </p>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0', fontSize: '14px', color: '#2c3e50' }}>
          <strong>Multimedia Junkie</strong> - Your Live Streaming Technology
          Partner
        </p>
      </div>
    </div>
  );
};

export default StreamingSetupComplete;
