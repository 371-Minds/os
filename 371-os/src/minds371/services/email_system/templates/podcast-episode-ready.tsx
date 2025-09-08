import type React from 'react';

interface PodcastEpisodeReadyProps {
  creatorName: string;
  episodeTitle: string;
  episodeNumber: string;
  duration: string;
  description: string;
  guestName?: string;
  publishDate: string;
  downloadLink: string;
  showNotes?: string[];
}

export const PodcastEpisodeReady: React.FC<PodcastEpisodeReadyProps> = ({
  creatorName,
  episodeTitle,
  episodeNumber,
  duration,
  description,
  guestName,
  publishDate,
  downloadLink,
  showNotes,
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
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#ffffff', margin: '0', fontSize: '28px' }}>
          🎙️ Your Podcast Episode is Ready! 🎙️
        </h1>
        <p style={{ color: '#f0f0f0', margin: '10px 0 0 0', fontSize: '16px' }}>
          Episode #{episodeNumber} - Ready for Launch
        </p>
      </div>

      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '18px', color: '#e0e0e0' }}>
          Hey {creatorName}! 🎉
        </p>

        <p style={{ lineHeight: '1.6', color: '#cccccc' }}>
          Great news! Your latest podcast episode has been processed and is
          ready for publication. Here are all the details for your review before
          we go live.
        </p>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '25px',
            borderRadius: '10px',
            margin: '25px 0',
            border: '2px solid #ff6b6b',
          }}
        >
          <h2 style={{ color: '#ff6b6b', marginTop: '0', fontSize: '22px' }}>
            "{episodeTitle}"
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <strong style={{ color: '#ffffff' }}>Episode:</strong>
              <br />
              <span style={{ color: '#cccccc', fontSize: '18px' }}>
                #{episodeNumber}
              </span>
            </div>
            <div>
              <strong style={{ color: '#ffffff' }}>Duration:</strong>
              <br />
              <span style={{ color: '#cccccc', fontSize: '18px' }}>
                {duration}
              </span>
            </div>
            <div>
              <strong style={{ color: '#ffffff' }}>Publish Date:</strong>
              <br />
              <span style={{ color: '#cccccc' }}>{publishDate}</span>
            </div>
            {guestName && (
              <div>
                <strong style={{ color: '#ffffff' }}>Featured Guest:</strong>
                <br />
                <span style={{ color: '#ff6b6b' }}>{guestName}</span>
              </div>
            )}
          </div>

          <div>
            <strong style={{ color: '#ffffff' }}>Episode Description:</strong>
            <br />
            <p
              style={{ color: '#cccccc', lineHeight: '1.6', marginTop: '10px' }}
            >
              {description}
            </p>
          </div>
        </div>

        {showNotes && showNotes.length > 0 && (
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              margin: '25px 0',
            }}
          >
            <h3 style={{ color: '#ff6b6b', marginTop: '0' }}>📝 Show Notes</h3>
            <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
              {showNotes.map((note, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          style={{
            backgroundColor: '#ee5a24',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#ffffff', marginTop: '0' }}>
            🎧 Ready to Download
          </h3>
          <p style={{ color: '#f0f0f0', marginBottom: '15px' }}>
            Your high-quality audio file is ready for download and distribution.
          </p>
          <a
            href={downloadLink}
            style={{
              backgroundColor: '#ffffff',
              color: '#ee5a24',
              padding: '12px 25px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            Download Episode
          </a>
        </div>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#ff6b6b', marginTop: '0' }}>🚀 Next Steps</h3>
          <ol style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '10px' }}>
              Review the episode and show notes
            </li>
            <li style={{ marginBottom: '10px' }}>
              Upload to your podcast hosting platform
            </li>
            <li style={{ marginBottom: '10px' }}>
              Schedule social media promotion posts
            </li>
            <li style={{ marginBottom: '10px' }}>
              Send to your email subscribers
            </li>
            <li style={{ marginBottom: '10px' }}>
              Update your website with the new episode
            </li>
          </ol>
        </div>

        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            margin: '25px 0',
          }}
        >
          <h3 style={{ color: '#ff6b6b', marginTop: '0' }}>💡 Pro Tips</h3>
          <ul style={{ paddingLeft: '20px', color: '#cccccc' }}>
            <li style={{ marginBottom: '8px' }}>
              Share behind-the-scenes content on social media
            </li>
            <li style={{ marginBottom: '8px' }}>
              Create audiogram clips for Instagram and TikTok
            </li>
            <li style={{ marginBottom: '8px' }}>
              Engage with listeners in the comments
            </li>
            <li style={{ marginBottom: '8px' }}>
              Ask for reviews and ratings to boost visibility
            </li>
          </ul>
        </div>

        <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
          This episode is another step forward in building your podcast empire!
          Remember, consistency is key, and every episode brings you closer to
          your goals.
        </p>

        <p style={{ color: '#cccccc' }}>
          Need any adjustments or have questions? Just reply to this email and
          we'll take care of it right away.
        </p>

        <p style={{ color: '#e0e0e0' }}>
          Keep podcasting,
          <br />
          The Multimedia Junkie Team
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#ff6b6b',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0', fontSize: '14px', color: '#ffffff' }}>
          <strong>Multimedia Junkie</strong> - Your Podcast Production Partner
        </p>
      </div>
    </div>
  );
};

export default PodcastEpisodeReady;
