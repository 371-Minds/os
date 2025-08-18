import React from 'react';

interface CollaborationInviteProps {
  creatorName: string;
  inviterName: string;
  inviterPlatform: string;
  inviterFollowers: string;
  collaborationType: string;
  projectDescription: string;
  proposedTimeline: string;
  benefits: string[];
  requirements: string[];
  contactInfo: string;
  deadline?: string;
}

export const CollaborationInvite: React.FC<CollaborationInviteProps> = ({
  creatorName,
  inviterName,
  inviterPlatform,
  inviterFollowers,
  collaborationType,
  projectDescription,
  proposedTimeline,
  benefits,
  requirements,
  contactInfo,
  deadline
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', margin: '0', fontSize: '28px' }}>
          🤝 Collaboration Opportunity! 🤝
        </h1>
        <p style={{ color: '#f0f0f0', margin: '10px 0 0 0', fontSize: '16px' }}>
          Let's Create Something Amazing Together
        </p>
      </div>
      
      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '18px', color: '#e0e0e0' }}>Hey {creatorName}! 🌟</p>
        
        <p style={{ lineHeight: '1.6', color: '#cccccc' }}>
          I hope this message finds you creating amazing content! I'm {inviterName}, and I've been 
          following your work—it's absolutely incredible. I'd love to explore a collaboration 
          opportunity that I think could be mutually beneficial and a lot of fun!
        </p>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '25px', borderRadius: '10px', margin: '25px 0', border: '2px solid #667eea' }}>
          <h3 style={{ color: '#667eea', marginTop: '0', display: 'flex', alignItems: 'center' }}>
            👤 About Me
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <strong style={{ color: '#ffffff' }}>Creator:</strong><br/>
              <span style={{ color: '#cccccc', fontSize: '18px' }}>{inviterName}</span>
            </div>
            <div>
              <strong style={{ color: '#ffffff' }}>Platform:</strong><br/>
              <span style={{ color: '#667eea' }}>{inviterPlatform}</span>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <strong style={{ color: '#ffffff' }}>Audience:</strong><br/>
              <span style={{ color: '#cccccc' }}>{inviterFollowers} followers</span>
            </div>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '25px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#667eea', marginTop: '0' }}>🎯 Collaboration Proposal</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#ffffff' }}>Type:</strong><br/>
            <span style={{ color: '#764ba2', fontSize: '18px', fontWeight: 'bold' }}>{collaborationType}</span>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#ffffff' }}>Project Description:</strong><br/>
            <p style={{ color: '#cccccc', lineHeight: '1.6', marginTop: '10px' }}>
              {projectDescription}
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#ffffff' }}>Proposed Timeline:</strong><br/>
            <span style={{ color: '#cccccc' }}>{proposedTimeline}</span>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#e8f5e8', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#27ae60', marginTop: '0' }}>✨ What's In It For You</h3>
          <ul style={{ paddingLeft: '20px', color: '#2c3e50' }}>
            {benefits.map((benefit, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#667eea', marginTop: '0' }}>📋 What We'd Need From You</h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            {requirements.map((requirement, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{requirement}</li>
            ))}
          </ul>
        </div>
        
        {deadline && (
          <div style={{ backgroundColor: '#ff6b6b', padding: '20px', borderRadius: '10px', margin: '25px 0', textAlign: 'center' }}>
            <h3 style={{ color: '#ffffff', marginTop: '0' }}>⏰ Response Deadline</h3>
            <p style={{ color: '#f0f0f0', fontSize: '18px', margin: '0', fontWeight: 'bold' }}>
              {deadline}
            </p>
          </div>
        )}
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#667eea', marginTop: '0' }}>🚀 Why This Collaboration Makes Sense</h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Audience Synergy:</strong> Our audiences have similar interests and values
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Content Complementarity:</strong> Our styles would create something unique
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Mutual Growth:</strong> We can both reach new audiences authentically
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Creative Innovation:</strong> Two perspectives often lead to breakthrough content
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Long-term Potential:</strong> This could be the start of an ongoing partnership
            </li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#667eea', marginTop: '0' }}>💡 Collaboration Ideas</h3>
          <p style={{ color: '#cccccc', marginBottom: '15px' }}>
            Here are some additional ideas we could explore together:
          </p>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '8px' }}>Cross-platform content series</li>
            <li style={{ marginBottom: '8px' }}>Joint live streaming sessions</li>
            <li style={{ marginBottom: '8px' }}>Collaborative product launches</li>
            <li style={{ marginBottom: '8px' }}>Behind-the-scenes content exchanges</li>
            <li style={{ marginBottom: '8px' }}>Audience Q&A sessions</li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#764ba2', padding: '20px', borderRadius: '10px', margin: '25px 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ffffff', marginTop: '0' }}>📞 Let's Talk!</h3>
          <p style={{ color: '#f0f0f0', marginBottom: '15px' }}>
            I'd love to discuss this opportunity further and answer any questions you might have.
          </p>
          <div style={{ color: '#ffffff', fontWeight: 'bold' }}>
            📧 {contactInfo}
          </div>
        </div>
        
        <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
          I genuinely believe this collaboration could create something special that both our 
          audiences would love. Even if this particular project isn't the right fit, I'd be 
          open to exploring other ways we could work together in the future.
        </p>
        
        <p style={{ color: '#cccccc' }}>
          No pressure at all—I know you're busy creating amazing content. But if this sounds 
          interesting, I'd love to hear your thoughts!
        </p>
        
        <p style={{ color: '#e0e0e0' }}>
          Looking forward to potentially creating together,<br/>
          {inviterName}
        </p>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', margin: '25px 0' }}>
          <p style={{ color: '#cccccc', fontSize: '14px', margin: '0', fontStyle: 'italic' }}>
            P.S. I'm a huge fan of your recent content—keep up the incredible work! 
            Your creativity is truly inspiring. ✨
          </p>
        </div>
      </div>
      
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#ffffff' }}>
          <strong>Multimedia Junkie</strong> - Connecting Creators, Amplifying Impact
        </p>
      </div>
    </div>
  );
};

export default CollaborationInvite;