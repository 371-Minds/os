import type React from 'react';

interface ParentNotificationProps {
  parentName: string;
  studentName: string;
  notificationType: 'reminder' | 'update' | 'alert' | 'celebration';
  subject: string;
  message: string;
  actionRequired?: string;
  dueDate?: string;
  additionalInfo?: string;
}

export const ParentNotification: React.FC<ParentNotificationProps> = ({
  parentName,
  studentName,
  notificationType,
  subject,
  message,
  actionRequired,
  dueDate,
  additionalInfo,
}) => {
  const getNotificationStyle = () => {
    switch (notificationType) {
      case 'reminder':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          iconColor: '#f39c12',
          icon: '⏰',
        };
      case 'update':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          iconColor: '#28a745',
          icon: '📢',
        };
      case 'alert':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          iconColor: '#dc3545',
          icon: '⚠️',
        };
      case 'celebration':
        return {
          backgroundColor: '#e2e3ff',
          borderColor: '#c8c9ff',
          iconColor: '#6f42c1',
          icon: '🎉',
        };
      default:
        return {
          backgroundColor: '#f0f8ff',
          borderColor: '#7bb3f0',
          iconColor: '#4a90e2',
          icon: '📝',
        };
    }
  };

  const style = getNotificationStyle();

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          color: '#4a90e2',
          borderBottom: '2px solid #7bb3f0',
          paddingBottom: '10px',
        }}
      >
        IkidEdventures Notification
      </h1>

      <p>Dear {parentName},</p>

      <div
        style={{
          backgroundColor: style.backgroundColor,
          border: `2px solid ${style.borderColor}`,
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h3
          style={{
            color: style.iconColor,
            marginTop: '0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px', fontSize: '24px' }}>
            {style.icon}
          </span>
          {subject}
        </h3>
        <p style={{ margin: '10px 0', lineHeight: '1.6' }}>{message}</p>
      </div>

      {actionRequired && (
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            margin: '15px 0',
          }}
        >
          <h4 style={{ color: '#495057', marginTop: '0' }}>Action Required</h4>
          <p style={{ margin: '0', color: '#495057' }}>📋 {actionRequired}</p>
          {dueDate && (
            <p
              style={{
                margin: '10px 0 0 0',
                color: '#dc3545',
                fontWeight: 'bold',
              }}
            >
              ⏳ Due Date: {dueDate}
            </p>
          )}
        </div>
      )}

      {additionalInfo && (
        <div
          style={{
            backgroundColor: '#e9ecef',
            padding: '15px',
            borderRadius: '5px',
            margin: '15px 0',
          }}
        >
          <h4 style={{ color: '#495057', marginTop: '0' }}>
            Additional Information
          </h4>
          <p style={{ margin: '0', color: '#495057' }}>{additionalInfo}</p>
        </div>
      )}

      <p>
        We appreciate your continued support in {studentName}'s educational
        journey. If you have any questions or concerns, please don't hesitate to
        contact us.
      </p>

      <p>
        Best regards,
        <br />
        The IkidEdventures Team
      </p>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
        }}
      >
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          <strong>IkidEdventures</strong> - Keeping Parents Connected to Their
          Child's Learning
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
          For urgent matters, please contact us directly at
          support@ikidedventures.com
        </p>
      </div>
    </div>
  );
};

export default ParentNotification;
