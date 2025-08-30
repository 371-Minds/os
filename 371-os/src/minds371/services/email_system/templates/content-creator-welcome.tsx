import React from 'react';

interface ContentCreatorWelcomeProps {
  creatorName: string;
  platform: string;
  contentType: string;
  subscriberCount?: string;
  specialOffer?: string;
}

export const ContentCreatorWelcome: React.FC<ContentCreatorWelcomeProps> = ({
  creatorName,
  platform,
  contentType,
  subscriberCount,
  specialOffer
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', margin: '0', fontSize: '28px' }}>
          🎬 Welcome to Multimedia Junkie! 🎬
        </h1>
        <p style={{ color: '#f0f0f0', margin: '10px 0 0 0', fontSize: '16px' }}>
          Your Creative Journey Starts Here
        </p>
      </div>
      
      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '18px', color: '#e0e0e0' }}>Hey {creatorName}! 👋</p>
        
        <p style={{ lineHeight: '1.6', color: '#cccccc' }}>
          Welcome to the Multimedia Junkie community! We're absolutely thrilled to have 
          another talented creator join our family. Whether you're just starting out or 
          looking to take your content to the next level, we've got your back.
        </p>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0', border: '2px solid #667eea' }}>
          <h3 style={{ color: '#667eea', marginTop: '0', display: 'flex', alignItems: 'center' }}>
            📊 Your Creator Profile
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <strong style={{ color: '#ffffff' }}>Platform:</strong><br/>
              <span style={{ color: '#cccccc' }}>{platform}</span>
            </div>
            <div>
              <strong style={{ color: '#ffffff' }}>Content Type:</strong><br/>
              <span style={{ color: '#cccccc' }}>{contentType}</span>
            </div>
            {subscriberCount && (
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: '#ffffff' }}>Current Reach:</strong><br/>
                <span style={{ color: '#667eea', fontSize: '18px' }}>{subscriberCount}</span>
              </div>
            )}
          </div>
        </div>
        
        <h3 style={{ color: '#667eea' }}>🚀 What's Next?</h3>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '10px' }}>Access our exclusive creator toolkit and templates</li>
            <li style={{ marginBottom: '10px' }}>Join our Discord community for real-time collaboration</li>
            <li style={{ marginBottom: '10px' }}>Get personalized content strategy recommendations</li>
            <li style={{ marginBottom: '10px' }}>Explore monetization opportunities and partnerships</li>
            <li style={{ marginBottom: '10px' }}>Attend our weekly creator workshops and Q&A sessions</li>
          </ul>
        </div>
        
        {specialOffer && (
          <div style={{ backgroundColor: '#764ba2', padding: '20px', borderRadius: '10px', margin: '25px 0', textAlign: 'center' }}>
            <h3 style={{ color: '#ffffff', marginTop: '0' }}>🎁 Special Welcome Offer!</h3>
            <p style={{ color: '#f0f0f0', fontSize: '16px', margin: '0' }}>{specialOffer}</p>
          </div>
        )}
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#667eea', marginTop: '0' }}>📱 Connect With Us</h3>
          <p style={{ color: '#cccccc', margin: '0' }}>
            Follow us on social media for daily tips, behind-the-scenes content, and 
            creator spotlights. Tag us in your content with #MultimediaJunkie for a 
            chance to be featured!
          </p>
        </div>
        
        <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
          Remember, every successful creator started exactly where you are now. We're here 
          to provide the tools, community, and support you need to turn your creative 
          passion into a thriving business.
        </p>
        
        <p style={{ color: '#cccccc' }}>
          Ready to create something amazing? Let's do this! 🎥✨
        </p>
        
        <p style={{ color: '#e0e0e0' }}>
          Keep creating,<br/>
          The Multimedia Junkie Team
        </p>
      </div>
      
      <div style={{ backgroundColor: '#667eea', padding: '20px', textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#ffffff' }}>
          <strong>Multimedia Junkie</strong> - Empowering Creators, Amplifying Stories
        </p>
      </div>
    </div>
  );
};

export default ContentCreatorWelcome;