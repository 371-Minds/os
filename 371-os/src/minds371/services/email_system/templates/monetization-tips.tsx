import React from 'react';

interface MonetizationStrategy {
  strategy: string;
  description: string;
  potentialEarnings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToImplement: string;
}

interface MonetizationTipsProps {
  creatorName: string;
  currentFollowers: string;
  contentType: string;
  strategies: MonetizationStrategy[];
  personalizedTip: string;
  nextSteps: string[];
}

export const MonetizationTips: React.FC<MonetizationTipsProps> = ({
  creatorName,
  currentFollowers,
  contentType,
  strategies,
  personalizedTip,
  nextSteps
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '🟢';
      case 'Medium': return '🟡';
      case 'Hard': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', margin: '0', fontSize: '28px' }}>
          💰 Monetization Mastery Guide 💰
        </h1>
        <p style={{ color: '#f0f0f0', margin: '10px 0 0 0', fontSize: '16px' }}>
          Turn Your Passion Into Profit
        </p>
      </div>
      
      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '18px', color: '#e0e0e0' }}>Hey {creatorName}! 💸</p>
        
        <p style={{ lineHeight: '1.6', color: '#cccccc' }}>
          Ready to start earning from your amazing {contentType} content? With {currentFollowers} 
          followers, you're in a great position to begin monetizing your creative work. 
          Here are the best strategies tailored specifically for your content and audience size.
        </p>
        
        <div style={{ backgroundColor: '#f5576c', padding: '20px', borderRadius: '10px', margin: '25px 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ffffff', marginTop: '0' }}>🎯 Personalized Recommendation</h3>
          <p style={{ color: '#f0f0f0', fontSize: '16px', margin: '0', fontStyle: 'italic' }}>
            "{personalizedTip}"
          </p>
        </div>
        
        <h3 style={{ color: '#f093fb' }}>💡 Monetization Strategies for You</h3>
        
        {strategies.map((strategy, index) => (
          <div key={index} style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '25px', 
            borderRadius: '10px', 
            margin: '20px 0',
            border: '2px solid #f093fb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h4 style={{ color: '#f093fb', marginTop: '0', fontSize: '20px', flex: 1 }}>
                {strategy.strategy}
              </h4>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  color: getDifficultyColor(strategy.difficulty),
                  fontSize: '14px',
                  marginBottom: '5px'
                }}>
                  {getDifficultyIcon(strategy.difficulty)} {strategy.difficulty}
                </div>
                <div style={{ color: '#cccccc', fontSize: '12px' }}>
                  {strategy.timeToImplement}
                </div>
              </div>
            </div>
            
            <p style={{ color: '#cccccc', lineHeight: '1.6', marginBottom: '15px' }}>
              {strategy.description}
            </p>
            
            <div style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '12px', 
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                Potential Earnings:
              </span>
              <span style={{ color: '#f5576c', fontSize: '18px', fontWeight: 'bold' }}>
                {strategy.potentialEarnings}
              </span>
            </div>
          </div>
        ))}
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#f093fb', marginTop: '0' }}>📈 Revenue Optimization Tips</h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Diversify your income streams</strong> - Don't rely on just one monetization method
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Know your audience value</strong> - Track engagement rates and demographics
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Create premium content</strong> - Offer exclusive content for paying supporters
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Build authentic relationships</strong> - Genuine connections lead to better conversions
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Consistency is key</strong> - Regular content keeps revenue streams flowing
            </li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#f093fb', marginTop: '0' }}>🚀 Your Action Plan</h3>
          <ol style={{ paddingLeft: '20px', color: '#cccccc' }}>
            {nextSteps.map((step, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', margin: '25px 0' }}>
          <h3 style={{ color: '#f093fb', marginTop: '0' }}>⚠️ Important Reminders</h3>
          <div style={{ color: '#cccccc' }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Stay authentic:</strong> Only promote products/services you genuinely believe in
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Disclose partnerships:</strong> Always be transparent about sponsored content
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Track your metrics:</strong> Monitor what works and what doesn't
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Be patient:</strong> Monetization takes time to build momentum
            </p>
            <p style={{ margin: '0' }}>
              <strong>Keep creating:</strong> Great content is the foundation of all monetization
            </p>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#f093fb', padding: '20px', borderRadius: '10px', margin: '25px 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ffffff', marginTop: '0' }}>🎓 Want to Learn More?</h3>
          <p style={{ color: '#f0f0f0', marginBottom: '15px' }}>
            Join our exclusive monetization masterclass and get personalized coaching!
          </p>
          <div style={{ 
            backgroundColor: '#ffffff', 
            color: '#f093fb', 
            padding: '12px 25px', 
            borderRadius: '25px',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            Reserve Your Spot
          </div>
        </div>
        
        <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
          Remember, successful monetization isn't just about making money—it's about 
          creating value for your audience while building a sustainable creative business. 
          Start with one strategy, master it, then expand to others.
        </p>
        
        <p style={{ color: '#cccccc' }}>
          You've got this! Your creative journey is about to become even more rewarding. 💪✨
        </p>
        
        <p style={{ color: '#e0e0e0' }}>
          To your success,<br/>
          The Multimedia Junkie Team
        </p>
      </div>
      
      <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '20px', textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#ffffff' }}>
          <strong>Multimedia Junkie</strong> - Monetize Your Creative Passion
        </p>
      </div>
    </div>
  );
};

export default MonetizationTips;