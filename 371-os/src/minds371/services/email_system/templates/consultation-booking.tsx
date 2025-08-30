import React from 'react';

interface ConsultationBookingProps {
  recipientName: string;
  companyName: string;
  consultationType: 'initial' | 'technical' | 'strategic';
  availableSlots: Array<{
    date: string;
    time: string;
    duration: string;
    bookingLink: string;
  }>;
  consultantName: string;
  consultantTitle: string;
  consultantBio: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  recipientName,
  companyName,
  consultationType,
  availableSlots,
  consultantName,
  consultantTitle,
  consultantBio
}) => {
  const getConsultationTitle = (type: string) => {
    switch (type) {
      case 'initial': return 'Initial Legacy Assessment';
      case 'technical': return 'Technical Deep Dive';
      case 'strategic': return 'Strategic Modernization Planning';
      default: return 'Legacy Code Consultation';
    }
  };

  const getConsultationDescription = (type: string) => {
    switch (type) {
      case 'initial': 
        return 'A comprehensive overview of your legacy systems, identifying key challenges and opportunities for modernization.';
      case 'technical': 
        return 'In-depth technical analysis of your codebase, architecture patterns, and specific modernization strategies.';
      case 'strategic': 
        return 'High-level strategic planning for legacy modernization, including roadmaps, resource allocation, and ROI projections.';
      default: 
        return 'Personalized consultation to address your specific legacy code challenges.';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        📅 Book Your Legacy Code Consultation
      </h1>
      
      <p>Dear {recipientName},</p>
      
      <p>
        Thank you for your interest in Legacy Code Archaeologist's consulting services. 
        We're ready to help {companyName} navigate the complexities of legacy system modernization.
      </p>
      
      <div style={{ backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '1px solid #3498db' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>
          🎯 {getConsultationTitle(consultationType)}
        </h3>
        <p style={{ margin: '10px 0', color: '#555' }}>
          {getConsultationDescription(consultationType)}
        </p>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>👨‍💼 Your Consultant</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{consultantName}</h4>
            <p style={{ margin: '0 0 10px 0', color: '#3498db', fontWeight: 'bold' }}>{consultantTitle}</p>
            <p style={{ margin: '0', color: '#555', fontSize: '14px' }}>{consultantBio}</p>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#856404', marginTop: '0' }}>📋 Available Time Slots</h3>
        <p style={{ margin: '10px 0' }}>Choose a time that works best for your schedule:</p>
        
        {availableSlots.map((slot, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: 'white', 
              padding: '15px', 
              borderRadius: '5px', 
              margin: '10px 0',
              border: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                {slot.date} at {slot.time}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Duration: {slot.duration}
              </div>
            </div>
            <a 
              href={slot.bookingLink}
              style={{ 
                backgroundColor: '#27ae60', 
                color: 'white', 
                padding: '8px 16px', 
                textDecoration: 'none', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              Book This Slot
            </a>
          </div>
        ))}
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>🛠️ What to Prepare</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>High-level overview of your current technology stack</li>
          <li>Key business challenges related to your legacy systems</li>
          <li>Modernization goals and timeline expectations</li>
          <li>Budget considerations and resource constraints</li>
          <li>Any specific technical questions or concerns</li>
        </ul>
      </div>
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#3498db', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '10px'
          }}
        >
          View All Available Times
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#95a5a6', 
            color: 'white', 
            padding: '12px 24px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          Request Custom Time
        </a>
      </div>
      
      <p>
        Don't see a time that works? Reply to this email and we'll find a slot that fits your schedule.
      </p>
      
      <p>
        We're excited to learn about your legacy systems and discuss how we can help {companyName} 
        achieve your modernization goals.
      </p>
      
      <p>
        Best regards,<br/>
        The Legacy Code Archaeologist Team
      </p>
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <p style={{ fontSize: '12px', color: '#666' }}>
        All consultations are conducted via secure video conference. 
        You'll receive meeting details after booking.
      </p>
    </div>
  );
};

export default ConsultationBooking;