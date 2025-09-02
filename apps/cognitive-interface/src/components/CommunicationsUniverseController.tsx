/**
 * CommunicationsUniverseController.tsx - Resend Integration Controller
 * 
 * Orchestrates the Communications Universe with real-time Resend API data,
 * agent coordination, and email workflow automation. Serves as the main
 * controller for the C3 Universal Template demonstration.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CommunicationsUniverse from './CommunicationsUniverse';
import { resendService, ResendEmail, ResendEmailStats, CommunicationCoordinationEvent } from '../services/ResendService';
import './CommunicationsUniverseController.css';

interface EmailEntity {
  id: string;
  subject: string;
  type: 'campaign' | 'transactional' | 'automation' | 'broadcast' | 'personal';
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  engagementScore: number;
  recipientCount: number;
  color: string;
  satellites: EmailSatellite[];
  isSelected: boolean;
  sentAt?: Date;
  scheduledFor?: Date;
}

interface EmailSatellite {
  id: string;
  name: string;
  type: 'recipient' | 'attachment' | 'link' | 'tag' | 'metric';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  value: number;
  color: string;
}

interface ContactConstellation {
  id: string;
  name: string;
  listType: 'subscribers' | 'customers' | 'leads' | 'vips' | 'segments';
  emails: string[];
  centerPosition: { x: number; y: number };
  connectionStrength: number;
  engagementLevel: number;
  size: number;
  memberCount: number;
}

interface CommunicationFlow {
  id: string;
  name: string;
  type: 'drip_campaign' | 'welcome_series' | 'nurture_sequence' | 're_engagement' | 'agent_coordination';
  stages: FlowStage[];
  emails: string[];
  status: 'active' | 'paused' | 'completed' | 'draft';
  progress: number;
  effectiveness: number;
}

interface FlowStage {
  id: string;
  name: string;
  delay?: number;
  conditions?: string[];
  status: 'pending' | 'active' | 'complete' | 'skipped';
}

interface UniverseStats {
  totalEmails: number;
  totalRecipients: number;
  avgDeliveryRate: number;
  avgOpenRate: number;
  avgClickRate: number;
  totalEngagement: number;
  activeFlows: number;
  scheduledEmails: number;
}

interface CommunicationsUniverseControllerProps {
  onUniverseAction?: (action: string, data: any) => void;
  enableRealTimeSync?: boolean;
  enableAgentCoordination?: boolean;
}

export const CommunicationsUniverseController: React.FC<CommunicationsUniverseControllerProps> = ({
  onUniverseAction,
  enableRealTimeSync = true,
  enableAgentCoordination = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [emails, setEmails] = useState<EmailEntity[]>([]);
  const [constellations, setConstellations] = useState<ContactConstellation[]>([]);
  const [flows, setFlows] = useState<CommunicationFlow[]>([]);
  const [stats, setStats] = useState<UniverseStats>({
    totalEmails: 0,
    totalRecipients: 0,
    avgDeliveryRate: 0,
    avgOpenRate: 0,
    avgClickRate: 0,
    totalEngagement: 0,
    activeFlows: 0,
    scheduledEmails: 0
  });
  const [selectedEmail, setSelectedEmail] = useState<EmailEntity | null>(null);
  const [coordinationEvents, setCoordinationEvents] = useState<CommunicationCoordinationEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('disconnected');
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize universe and sync with Resend
  useEffect(() => {
    initializeUniverse();
    
    if (enableRealTimeSync) {
      startRealTimeSync();
    }

    if (enableAgentCoordination) {
      setupAgentCoordination();
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [enableRealTimeSync, enableAgentCoordination]);

  const initializeUniverse = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');
    
    try {
      // Load initial email data from Resend
      const emailsResponse = await resendService.getEmails({ limit: 50 });
      const resendEmails = emailsResponse.data;

      // Transform Resend emails to universe entities
      const universeEmails = await Promise.all(
        resendEmails.map(async (resendEmail, index) => {
          const stats = await resendService.getEmailStats(resendEmail.id);
          return transformResendEmailToEntity(resendEmail, stats, index);
        })
      );

      setEmails(universeEmails);

      // Initialize sample constellations and flows
      initializeConstellations();
      initializeFlows();
      updateUniverseStats(universeEmails);

      setSyncStatus('connected');
    } catch (error) {
      console.error('Failed to initialize Communications Universe:', error);
      setSyncStatus('disconnected');
      
      // Fall back to demo data
      initializeDemoData();
    } finally {
      setIsLoading(false);
    }
  };

  const transformResendEmailToEntity = (
    resendEmail: ResendEmail, 
    stats: ResendEmailStats, 
    index: number
  ): EmailEntity => {
    const orbitRadius = index === 0 ? 0 : 120 + (index * 40);
    const size = 15 + Math.min((stats.sent / 1000) * 10, 25);
    const engagementScore = Math.min(stats.open_rate + stats.click_rate, 100);

    return {
      id: resendEmail.id,
      subject: resendEmail.subject,
      type: determineEmailType(resendEmail),
      status: mapResendStatusToUniverseStatus(resendEmail.status),
      position: { x: 400, y: 300 },
      orbitRadius,
      orbitSpeed: 0.003 + (index * 0.001),
      orbitAngle: (index / 6) * Math.PI * 2,
      size,
      deliveryRate: stats.delivery_rate,
      openRate: stats.open_rate,
      clickRate: stats.click_rate,
      engagementScore,
      recipientCount: stats.sent,
      color: getEmailTypeColor(determineEmailType(resendEmail)),
      satellites: generateEmailSatellites(resendEmail, stats),
      isSelected: false,
      sentAt: resendEmail.sent_at ? new Date(resendEmail.sent_at) : undefined,
      scheduledFor: undefined
    };
  };

  const determineEmailType = (resendEmail: ResendEmail): EmailEntity['type'] => {
    if (resendEmail.tags?.includes('campaign')) return 'campaign';
    if (resendEmail.tags?.includes('automation')) return 'automation';
    if (resendEmail.tags?.includes('broadcast')) return 'broadcast';
    if (resendEmail.tags?.includes('agent-coordination')) return 'automation';
    if (resendEmail.from.includes('noreply') || resendEmail.from.includes('system')) return 'transactional';
    return 'personal';
  };

  const mapResendStatusToUniverseStatus = (status: ResendEmail['status']): EmailEntity['status'] => {
    switch (status) {
      case 'queued': return 'scheduled';
      case 'sent': return 'sent';
      case 'delivered': return 'delivered';
      case 'opened': return 'opened';
      case 'clicked': return 'clicked';
      case 'bounced': return 'bounced';
      case 'failed': return 'failed';
      case 'delivery_delayed': return 'sent';
      default: return 'sent';
    }
  };

  const getEmailTypeColor = (type: EmailEntity['type']): string => {
    const colors = {
      'campaign': '#8b5cf6',
      'automation': '#10b981',
      'broadcast': '#3b82f6',
      'transactional': '#f59e0b',
      'personal': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  const generateEmailSatellites = (resendEmail: ResendEmail, stats: ResendEmailStats): EmailSatellite[] => {
    const satellites: EmailSatellite[] = [];
    let index = 0;

    // Recipients satellite
    satellites.push({
      id: `${resendEmail.id}-recipients`,
      name: 'Recipients',
      type: 'recipient',
      position: { x: 0, y: 0 },
      orbitRadius: 20 + (index * 8),
      orbitSpeed: 0.02,
      size: 2 + Math.min(stats.sent / 5000, 4),
      value: stats.sent,
      color: '#3b82f6'
    });
    index++;

    // Opens satellite
    if (stats.opened > 0) {
      satellites.push({
        id: `${resendEmail.id}-opens`,
        name: 'Opens',
        type: 'metric',
        position: { x: 0, y: 0 },
        orbitRadius: 20 + (index * 8),
        orbitSpeed: 0.015,
        size: 2 + Math.min(stats.open_rate / 20, 4),
        value: stats.opened,
        color: '#10b981'
      });
      index++;
    }

    // Clicks satellite
    if (stats.clicked > 0) {
      satellites.push({
        id: `${resendEmail.id}-clicks`,
        name: 'Clicks',
        type: 'metric',
        position: { x: 0, y: 0 },
        orbitRadius: 20 + (index * 8),
        orbitSpeed: 0.018,
        size: 2 + Math.min(stats.click_rate / 10, 4),
        value: stats.clicked,
        color: '#8b5cf6'
      });
      index++;
    }

    // Tags satellites
    resendEmail.tags?.forEach((tag, tagIndex) => {
      if (tagIndex < 3) { // Limit to 3 tag satellites
        satellites.push({
          id: `${resendEmail.id}-tag-${tagIndex}`,
          name: tag,
          type: 'tag',
          position: { x: 0, y: 0 },
          orbitRadius: 20 + (index * 8),
          orbitSpeed: 0.012 + (tagIndex * 0.003),
          size: 1.5,
          value: 1,
          color: '#f59e0b'
        });
        index++;
      }
    });

    return satellites;
  };

  const initializeConstellations = () => {
    const sampleConstellations: ContactConstellation[] = [
      {
        id: 'enterprise-customers',
        name: 'Enterprise Customers',
        listType: 'customers',
        emails: ['galaxy-launch-campaign', 'business-intelligence-digest'],
        centerPosition: { x: 200, y: 200 },
        connectionStrength: 85,
        engagementLevel: 92,
        size: 30,
        memberCount: 1250
      },
      {
        id: 'developer-community',
        name: 'Developer Community',
        listType: 'subscribers',
        emails: ['developer-galaxy-announcement', 'welcome-series-automation'],
        centerPosition: { x: 600, y: 180 },
        connectionStrength: 78,
        engagementLevel: 87,
        size: 25,
        memberCount: 8500
      },
      {
        id: 'creative-professionals',
        name: 'Creative Professionals',
        listType: 'leads',
        emails: ['creators-cosmos-preview'],
        centerPosition: { x: 500, y: 450 },
        connectionStrength: 72,
        engagementLevel: 81,
        size: 22,
        memberCount: 3200
      }
    ];

    setConstellations(sampleConstellations);
  };

  const initializeFlows = () => {
    const sampleFlows: CommunicationFlow[] = [
      {
        id: 'agent-coordination-flow',
        name: 'Agent Coordination Alerts',
        type: 'agent_coordination',
        stages: [
          { id: 'trigger', name: 'Alert Trigger', status: 'complete' },
          { id: 'notify', name: 'Notify Agents', status: 'active' },
          { id: 'followup', name: 'Follow-up Check', status: 'pending' }
        ],
        emails: ['agent-coordination-alerts'],
        status: 'active',
        progress: 65,
        effectiveness: 94
      },
      {
        id: 'welcome-series',
        name: 'New User Welcome Series',
        type: 'welcome_series',
        stages: [
          { id: 'welcome', name: 'Welcome Email', status: 'complete' },
          { id: 'features', name: 'Feature Overview', status: 'complete' },
          { id: 'tutorial', name: 'Tutorial Guide', status: 'active' },
          { id: 'feedback', name: 'Feedback Request', status: 'pending' }
        ],
        emails: ['welcome-series-automation'],
        status: 'active',
        progress: 75,
        effectiveness: 89
      },
      {
        id: 'product-launch-sequence',
        name: 'Galaxy Engine Launch Campaign',
        type: 'drip_campaign',
        stages: [
          { id: 'teaser', name: 'Teaser Announcement', status: 'complete' },
          { id: 'launch', name: 'Launch Email', status: 'complete' },
          { id: 'features', name: 'Feature Deep Dive', status: 'active' },
          { id: 'case-studies', name: 'Case Studies', status: 'pending' }
        ],
        emails: ['galaxy-launch-campaign', 'developer-galaxy-announcement', 'creators-cosmos-preview'],
        status: 'active',
        progress: 80,
        effectiveness: 91
      }
    ];

    setFlows(sampleFlows);
  };

  const initializeDemoData = () => {
    // Fall back to demo data if Resend API is not available
    const demoEmails: EmailEntity[] = [
      {
        id: 'demo-galaxy-launch',
        subject: 'Galaxy Engine: Revolutionary Spatial Interface Demo',
        type: 'campaign',
        status: 'delivered',
        position: { x: 400, y: 300 },
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitAngle: 0,
        size: 35,
        deliveryRate: 98.5,
        openRate: 47.3,
        clickRate: 12.8,
        engagementScore: 89,
        recipientCount: 25000,
        color: '#8b5cf6',
        satellites: [],
        isSelected: false,
        sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ];

    setEmails(demoEmails);
    updateUniverseStats(demoEmails);
  };

  const startRealTimeSync = () => {
    // Set up real-time synchronization with Resend
    syncIntervalRef.current = setInterval(async () => {
      try {
        setSyncStatus('syncing');
        
        // Fetch latest email data
        const emailsResponse = await resendService.getEmails({ limit: 20 });
        const latestEmails = emailsResponse.data;

        // Update universe with new emails
        const updates = await Promise.all(
          latestEmails.map(async (resendEmail, index) => {
            const stats = await resendService.getEmailStats(resendEmail.id);
            return transformResendEmailToEntity(resendEmail, stats, index);
          })
        );

        setEmails(prevEmails => {
          const existingIds = new Set(prevEmails.map(e => e.id));
          const newEmails = updates.filter(email => !existingIds.has(email.id));
          const updatedEmails = prevEmails.map(existingEmail => {
            const update = updates.find(u => u.id === existingEmail.id);
            return update || existingEmail;
          });
          
          return [...updatedEmails, ...newEmails];
        });

        setSyncStatus('connected');
      } catch (error) {
        console.error('Sync failed:', error);
        setSyncStatus('disconnected');
      }
    }, 30000); // Sync every 30 seconds
  };

  const setupAgentCoordination = () => {
    // Set up agent coordination event listeners
    resendService.onCoordinationEvent((event) => {
      setCoordinationEvents(prev => [event, ...prev.slice(0, 9)]); // Keep last 10 events
    });

    // Set up universe update listeners
    window.addEventListener('communications-universe-update', (event: any) => {
      const updateData = event.detail;
      handleUniverseUpdate(updateData);
    });
  };

  const handleUniverseUpdate = (updateData: any) => {
    setEmails(prevEmails => 
      prevEmails.map(email => 
        email.id === updateData.emailId 
          ? { ...email, status: updateData.status as EmailEntity['status'] }
          : email
      )
    );
  };

  const updateUniverseStats = (emailList: EmailEntity[]) => {
    const totalEmails = emailList.length;
    const totalRecipients = emailList.reduce((sum, email) => sum + email.recipientCount, 0);
    const avgDeliveryRate = emailList.reduce((sum, email) => sum + email.deliveryRate, 0) / totalEmails || 0;
    const avgOpenRate = emailList.reduce((sum, email) => sum + email.openRate, 0) / totalEmails || 0;
    const avgClickRate = emailList.reduce((sum, email) => sum + email.clickRate, 0) / totalEmails || 0;
    const totalEngagement = emailList.reduce((sum, email) => sum + email.engagementScore, 0);
    const scheduledEmails = emailList.filter(email => email.status === 'scheduled').length;

    setStats({
      totalEmails,
      totalRecipients,
      avgDeliveryRate,
      avgOpenRate,
      avgClickRate,
      totalEngagement,
      activeFlows: flows.filter(flow => flow.status === 'active').length,
      scheduledEmails
    });
  };

  const handleEmailSelect = useCallback((email: EmailEntity) => {
    setSelectedEmail(email);
    onUniverseAction?.('email_selected', { email });
  }, [onUniverseAction]);

  const handleConstellationSelect = useCallback((constellation: ContactConstellation) => {
    onUniverseAction?.('constellation_selected', { constellation });
  }, [onUniverseAction]);

  const handleFlowAction = useCallback((flow: CommunicationFlow, action: string) => {
    onUniverseAction?.('flow_action', { flow, action });
  }, [onUniverseAction]);

  const triggerAgentNotification = async (agentType: string, message: string) => {
    try {
      const notificationId = await resendService.sendAgentNotification(
        agentType as any,
        message,
        'medium'
      );
      
      console.log(`Agent notification sent: ${notificationId}`);
      onUniverseAction?.('agent_notification_sent', { agentType, message, notificationId });
    } catch (error) {
      console.error('Failed to send agent notification:', error);
    }
  };

  const triggerBusinessAlert = async (alertType: string, data: Record<string, any>) => {
    try {
      const alertId = await resendService.triggerBusinessAlert(alertType as any, data);
      
      console.log(`Business alert triggered: ${alertId}`);
      onUniverseAction?.('business_alert_triggered', { alertType, data, alertId });
    } catch (error) {
      console.error('Failed to trigger business alert:', error);
    }
  };

  // New Dashboard Functions
  const shareEmailLink = async (emailId: string) => {
    try {
      const shareResult = await resendService.shareEmailLink(emailId);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareResult.link);
      
      console.log(`Email link shared: ${shareResult.link}`);
      onUniverseAction?.('email_link_shared', { emailId, ...shareResult });
      
      return shareResult;
    } catch (error) {
      console.error('Failed to share email link:', error);
      throw error;
    }
  };

  const viewEmailLogs = async (emailId: string) => {
    try {
      const logs = await resendService.getEmailLogs(emailId);
      
      console.log(`Retrieved ${logs.length} logs for email ${emailId}`);
      onUniverseAction?.('email_logs_viewed', { emailId, logs });
      
      return logs;
    } catch (error) {
      console.error('Failed to get email logs:', error);
      throw error;
    }
  };

  const exportEmailData = async (filters?: any) => {
    try {
      const exportResult = await resendService.exportEmailData(filters);
      
      console.log(`Email export initiated: ${exportResult.id}`);
      onUniverseAction?.('email_export_initiated', { exportResult, filters });
      
      return exportResult;
    } catch (error) {
      console.error('Failed to export email data:', error);
      throw error;
    }
  };

  const scheduleEmail = async (emailData: any, scheduledAt: Date) => {
    try {
      const scheduledEmail = await resendService.scheduleEmail(emailData, scheduledAt);
      
      // Add to universe
      const newEmailEntity = transformResendEmailToEntity(
        scheduledEmail, 
        await resendService.getEmailStats(scheduledEmail.id),
        emails.length
      );
      
      setEmails(prev => [...prev, newEmailEntity]);
      
      console.log(`Email scheduled: ${scheduledEmail.id}`);
      onUniverseAction?.('email_scheduled', { email: scheduledEmail, scheduledAt });
      
      return scheduledEmail;
    } catch (error) {
      console.error('Failed to schedule email:', error);
      throw error;
    }
  };

  const cancelScheduledEmail = async (emailId: string) => {
    try {
      const result = await resendService.cancelScheduledEmail(emailId);
      
      // Update universe
      setEmails(prev => prev.map(email => 
        email.id === emailId 
          ? { ...email, status: 'draft' }
          : email
      ));
      
      console.log(`Scheduled email canceled: ${emailId}`);
      onUniverseAction?.('scheduled_email_canceled', { emailId, result });
      
      return result;
    } catch (error) {
      console.error('Failed to cancel scheduled email:', error);
      throw error;
    }
  };

  // Update stats when emails change
  useEffect(() => {
    updateUniverseStats(emails);
  }, [emails, flows]);

  return (
    <div className="communications-universe-controller">
      {/* Universe Status Bar */}
      <div className="universe-status-bar">
        <div className="status-section">
          <div className="sync-status">
            <span className={`status-indicator ${syncStatus}`}></span>
            <span className="status-text">
              {syncStatus === 'connected' ? 'Live Sync' : 
               syncStatus === 'syncing' ? 'Syncing...' : 'Offline Mode'}
            </span>
          </div>
          <div className="universe-stats">
            <span className="stat">📧 {stats.totalEmails}</span>
            <span className="stat">👥 {stats.totalRecipients.toLocaleString()}</span>
            <span className="stat">📈 {stats.avgEngagementScore?.toFixed(1)}%</span>
            <span className="stat">⚡ {stats.activeFlows}</span>
          </div>
        </div>
        
        {enableAgentCoordination && (
          <div className="agent-controls">
            <button 
              className="agent-action-btn"
              onClick={() => triggerAgentNotification('CEO', 'Communications universe status update')}
            >
              🤖 Notify CEO
            </button>
            <button 
              className="agent-action-btn"
              onClick={() => triggerBusinessAlert('performance', { metric: 'email_engagement', value: stats.avgEngagementScore })}
            >
              🚨 Trigger Alert
            </button>
            <button 
              className="agent-action-btn export-btn"
              onClick={() => exportEmailData({ 
                startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
                endDate: new Date().toISOString().split('T')[0] 
              })}
              title="Export email data (last 30 days)"
            >
              📄 Export Data
            </button>
          </div>
        )}
      </div>

      {/* Main Universe */}
      <div className="universe-container">
        {isLoading ? (
          <div className="universe-loading">
            <div className="loading-spinner"></div>
            <p>Initializing Communications Universe...</p>
          </div>
        ) : (
          <CommunicationsUniverse
            emails={emails}
            constellations={constellations}
            flows={flows}
            onEmailSelect={handleEmailSelect}
            onConstellationSelect={handleConstellationSelect}
            onFlowAction={handleFlowAction}
            onUniverseAction={onUniverseAction}
            canvasRef={canvasRef}
          />
        )}
      </div>

      {/* Selected Email Details */}
      {selectedEmail && (
        <div className="selected-email-panel">
          <div className="panel-header">
            <h3>{selectedEmail.subject}</h3>
            <button 
              className="close-btn"
              onClick={() => setSelectedEmail(null)}
            >
              ×
            </button>
          </div>
          <div className="panel-content">
            <div className="email-details">
              <div className="detail-row">
                <span className="label">Type:</span>
                <span className="value">{selectedEmail.type}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`value status-${selectedEmail.status}`}>
                  {selectedEmail.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Recipients:</span>
                <span className="value">{selectedEmail.recipientCount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="label">Engagement:</span>
                <span className="value">{selectedEmail.engagementScore.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="email-metrics">
              <div className="metric">
                <span className="metric-label">Delivery Rate</span>
                <span className="metric-value">{selectedEmail.deliveryRate.toFixed(1)}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Open Rate</span>
                <span className="metric-value">{selectedEmail.openRate.toFixed(1)}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Click Rate</span>
                <span className="metric-value">{selectedEmail.clickRate.toFixed(1)}%</span>
              </div>
            </div>

            {/* Dashboard Actions */}
            <div className="email-actions">
              <button 
                className="action-btn share-btn"
                onClick={() => shareEmailLink(selectedEmail.id)}
                title="Share email link (48h expiry)"
              >
                🔗 Share Link
              </button>
              
              <button 
                className="action-btn logs-btn"
                onClick={() => viewEmailLogs(selectedEmail.id)}
                title="View email logs and events"
              >
                📋 View Logs
              </button>
              
              {selectedEmail.status === 'scheduled' && (
                <button 
                  className="action-btn cancel-btn"
                  onClick={() => cancelScheduledEmail(selectedEmail.id)}
                  title="Cancel scheduled email"
                >
                  ⏹️ Cancel
                </button>
              )}
              
              <button 
                className="action-btn preview-btn"
                onClick={() => window.open(`/email-preview/${selectedEmail.id}`, '_blank')}
                title="Preview email content"
              >
                👁️ Preview
              </button>
            </div>

            {/* Advanced Email Stats */}
            <div className="advanced-stats">
              <h4>Advanced Analytics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Engagement Score</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill"
                      style={{ width: `${selectedEmail.engagementScore}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{selectedEmail.engagementScore.toFixed(1)}%</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Delivery Success</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill delivery"
                      style={{ width: `${selectedEmail.deliveryRate}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{selectedEmail.deliveryRate.toFixed(1)}%</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Interaction Rate</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill interaction"
                      style={{ width: `${selectedEmail.clickRate}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{selectedEmail.clickRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Email Timeline */}
            {selectedEmail.sentAt && (
              <div className="email-timeline">
                <h4>Email Timeline</h4>
                <div className="timeline-events">
                  <div className="timeline-event">
                    <span className="event-icon">📝</span>
                    <span className="event-label">Created</span>
                    <span className="event-time">Draft saved</span>
                  </div>
                  <div className="timeline-event">
                    <span className="event-icon">🚀</span>
                    <span className="event-label">Sent</span>
                    <span className="event-time">{selectedEmail.sentAt.toLocaleString()}</span>
                  </div>
                  {selectedEmail.status === 'delivered' && (
                    <div className="timeline-event">
                      <span className="event-icon">✅</span>
                      <span className="event-label">Delivered</span>
                      <span className="event-time">Successfully delivered</span>
                    </div>
                  )}
                  {selectedEmail.status === 'opened' && (
                    <div className="timeline-event">
                      <span className="event-icon">👁️</span>
                      <span className="event-label">Opened</span>
                      <span className="event-time">Recipient viewed</span>
                    </div>
                  )}
                  {selectedEmail.status === 'clicked' && (
                    <div className="timeline-event">
                      <span className="event-icon">🖱️</span>
                      <span className="event-label">Clicked</span>
                      <span className="event-time">Link engagement</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coordination Events */}
      {enableAgentCoordination && coordinationEvents.length > 0 && (
        <div className="coordination-events">
          <h4>Recent Agent Coordination</h4>
          <div className="events-list">
            {coordinationEvents.slice(0, 5).map(event => (
              <div key={event.id} className={`event-item priority-${event.priority}`}>
                <div className="event-header">
                  <span className="agent-type">{event.agentType}</span>
                  <span className="event-time">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="event-message">{event.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationsUniverseController;