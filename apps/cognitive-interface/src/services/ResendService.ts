/**
 * ResendService.ts - Resend API Integration for Communications Universe
 * 
 * Provides real-time email data synchronization with Resend API for the
 * Communications Universe spatial email management system.
 * 
 * Features:
 * - Real-time email tracking and analytics
 * - Campaign performance monitoring  
 * - Contact list management
 * - Email flow automation
 * - Agent coordination via email workflows
 */

export interface ResendEmail {
  id: string;
  to: string[];
  from: string;
  subject: string;
  html?: string;
  text?: string;
  created_at: string;
  sent_at?: string;
  delivered_at?: string;
  opened_at?: string;
  clicked_at?: string;
  status: 'queued' | 'sent' | 'delivered' | 'delivery_delayed' | 'bounced' | 'failed' | 'opened' | 'clicked' | 'complained' | 'scheduled';
  tags?: string[];
  reply_to?: string;
  cc?: string[];
  bcc?: string[];
}

export interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  unsubscribed: boolean;
  audience_id: string;
}

export interface ResendAudience {
  id: string;
  name: string;
  created_at: string;
  object: 'audience';
}

export interface ResendEmailStats {
  id: string;
  sent: number;
  delivered: number;
  delivery_delayed: number;
  bounced: number;
  failed: number;
  opened: number;
  clicked: number;
  complained: number;
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
}

export interface ResendWebhookEvent {
  type: 'email.sent' | 'email.delivered' | 'email.delivery_delayed' | 'email.bounced' | 'email.failed' | 'email.opened' | 'email.clicked' | 'email.complained';
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string;
    subject: string;
    tags?: string[];
  };
}

export interface ResendEmailLog {
  id: string;
  event: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, any>;
}

export interface EmailExportFilters {
  startDate?: string;
  endDate?: string;
  status?: string[];
  tags?: string[];
  from?: string;
  to?: string;
}

export interface ExportResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired';
  downloadUrl?: string;
  createdAt: string;
  expiresAt: string;
  itemCount?: number;
}

export interface CommunicationCoordinationEvent {
  id: string;
  type: 'agent_notification' | 'status_update' | 'alert_trigger' | 'coordination_request';
  agentType: 'CEO' | 'CFO' | 'CTO' | 'CMO' | 'CLO' | 'CCO';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

class ResendService {
  private apiKey: string;
  private baseUrl = 'https://api.resend.com';
  private webhookListeners: Map<string, (event: ResendWebhookEvent) => void> = new Map();
  private coordinationListeners: Map<string, (event: CommunicationCoordinationEvent) => void> = new Map();

  constructor(apiKey: string = process.env.RESEND_API_KEY || 'demo_key') {
    this.apiKey = apiKey;
  }

  // Email Management
  async sendEmail(email: Partial<ResendEmail>): Promise<ResendEmail> {
    if (this.apiKey === 'demo_key') {
      return this.mockSendEmail(email);
    }

    const response = await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard Email Management Functions
  async shareEmailLink(emailId: string): Promise<{ link: string; expiresAt: Date }> {
    if (this.apiKey === 'demo_key') {
      return {
        link: `https://resend.com/share/${emailId}`,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours from now
      };
    }

    const response = await fetch(`${this.baseUrl}/emails/${emailId}/share`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to share email: ${response.statusText}`);
    }

    return response.json();
  }

  async getEmailLogs(emailId: string): Promise<ResendEmailLog[]> {
    if (this.apiKey === 'demo_key') {
      return this.mockGetEmailLogs(emailId);
    }

    const response = await fetch(`${this.baseUrl}/emails/${emailId}/logs`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get email logs: ${response.statusText}`);
    }

    return response.json();
  }

  async exportEmailData(filters?: EmailExportFilters): Promise<ExportResponse> {
    if (this.apiKey === 'demo_key') {
      return this.mockExportEmailData(filters);
    }

    const response = await fetch(`${this.baseUrl}/exports/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters || {}),
    });

    if (!response.ok) {
      throw new Error(`Failed to export email data: ${response.statusText}`);
    }

    return response.json();
  }

  async scheduleEmail(email: Partial<ResendEmail>, scheduledAt: Date): Promise<ResendEmail> {
    if (this.apiKey === 'demo_key') {
      return this.mockScheduleEmail(email, scheduledAt);
    }

    const emailWithSchedule = {
      ...email,
      scheduled_at: scheduledAt.toISOString()
    };

    const response = await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailWithSchedule),
    });

    if (!response.ok) {
      throw new Error(`Failed to schedule email: ${response.statusText}`);
    }

    return response.json();
  }

  async cancelScheduledEmail(emailId: string): Promise<{ success: boolean }> {
    if (this.apiKey === 'demo_key') {
      return { success: true };
    }

    const response = await fetch(`${this.baseUrl}/emails/${emailId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to cancel scheduled email: ${response.statusText}`);
    }

    return response.json();
  }

  async getEmail(emailId: string): Promise<ResendEmail> {
    if (this.apiKey === 'demo_key') {
      return this.mockGetEmail(emailId);
    }

    const response = await fetch(`${this.baseUrl}/emails/${emailId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get email: ${response.statusText}`);
    }

    return response.json();
  }

  async getEmails(params?: { limit?: number; offset?: number }): Promise<{ data: ResendEmail[] }> {
    if (this.apiKey === 'demo_key') {
      return this.mockGetEmails(params);
    }

    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const response = await fetch(`${this.baseUrl}/emails?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get emails: ${response.statusText}`);
    }

    return response.json();
  }

  // Contact & Audience Management
  async createAudience(name: string): Promise<ResendAudience> {
    if (this.apiKey === 'demo_key') {
      return this.mockCreateAudience(name);
    }

    const response = await fetch(`${this.baseUrl}/audiences`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create audience: ${response.statusText}`);
    }

    return response.json();
  }

  async addContact(audienceId: string, contact: Partial<ResendContact>): Promise<ResendContact> {
    if (this.apiKey === 'demo_key') {
      return this.mockAddContact(audienceId, contact);
    }

    const response = await fetch(`${this.baseUrl}/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(`Failed to add contact: ${response.statusText}`);
    }

    return response.json();
  }

  // Analytics & Monitoring
  async getEmailStats(emailId: string): Promise<ResendEmailStats> {
    if (this.apiKey === 'demo_key') {
      return this.mockGetEmailStats(emailId);
    }

    // Note: Resend doesn't have a direct stats endpoint, so we'd aggregate from events
    const email = await this.getEmail(emailId);
    return this.calculateStats([email]);
  }

  async getBulkEmailStats(emailIds: string[]): Promise<ResendEmailStats[]> {
    if (this.apiKey === 'demo_key') {
      return emailIds.map(id => this.mockGetEmailStats(id));
    }

    const emails = await Promise.all(emailIds.map(id => this.getEmail(id)));
    return emails.map(email => this.calculateStats([email]));
  }

  // Agent Communication Coordination
  async sendAgentNotification(
    agentType: CommunicationCoordinationEvent['agentType'],
    message: string,
    priority: CommunicationCoordinationEvent['priority'] = 'medium',
    metadata?: Record<string, any>
  ): Promise<string> {
    const event: CommunicationCoordinationEvent = {
      id: `coord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'agent_notification',
      agentType,
      priority,
      message,
      metadata,
      timestamp: new Date()
    };

    // Send email to agent coordination system
    const emailSubject = `${priority.toUpperCase()}: ${agentType} Agent Notification`;
    const emailHtml = this.generateAgentNotificationEmail(event);

    await this.sendEmail({
      to: [`${agentType.toLowerCase()}@371minds.com`],
      from: 'system@371minds.com',
      subject: emailSubject,
      html: emailHtml,
      tags: ['agent-coordination', agentType.toLowerCase(), priority]
    });

    // Notify coordination listeners
    this.coordinationListeners.forEach(listener => listener(event));

    return event.id;
  }

  async triggerBusinessAlert(
    alertType: 'performance' | 'threshold' | 'anomaly' | 'opportunity',
    data: Record<string, any>
  ): Promise<string> {
    const message = this.generateBusinessAlertMessage(alertType, data);
    
    // Determine which agents should be notified
    const relevantAgents: CommunicationCoordinationEvent['agentType'][] = [];
    
    if (alertType === 'performance' || alertType === 'threshold') {
      relevantAgents.push('CEO', 'CFO');
    }
    if (alertType === 'anomaly') {
      relevantAgents.push('CEO', 'CTO');
    }
    if (alertType === 'opportunity') {
      relevantAgents.push('CEO', 'CMO');
    }

    const notificationIds = await Promise.all(
      relevantAgents.map(agent => 
        this.sendAgentNotification(agent, message, 'high', { alertType, ...data })
      )
    );

    return notificationIds[0];
  }

  // Webhook Management
  onEmailEvent(eventType: ResendWebhookEvent['type'], callback: (event: ResendWebhookEvent) => void): void {
    this.webhookListeners.set(eventType, callback);
  }

  onCoordinationEvent(callback: (event: CommunicationCoordinationEvent) => void): void {
    const listenerId = `coord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.coordinationListeners.set(listenerId, callback);
  }

  handleWebhookEvent(event: ResendWebhookEvent): void {
    const listener = this.webhookListeners.get(event.type);
    if (listener) {
      listener(event);
    }

    // Trigger universe updates for spatial visualization
    this.updateCommunicationsUniverse(event);
  }

  // Universe Integration
  private updateCommunicationsUniverse(event: ResendWebhookEvent): void {
    // Transform Resend events into universe updates
    const universeEvent = {
      type: 'email_status_update',
      emailId: event.data.email_id,
      status: event.type.replace('email.', ''),
      timestamp: event.created_at,
      metadata: event.data
    };

    // Emit universe update event
    window.dispatchEvent(new CustomEvent('communications-universe-update', { 
      detail: universeEvent 
    }));
  }

  // Demo/Mock Methods for Development
  private mockSendEmail(email: Partial<ResendEmail>): ResendEmail {
    return {
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      to: email.to || ['demo@example.com'],
      from: email.from || 'system@371minds.com',
      subject: email.subject || 'Demo Email',
      html: email.html,
      text: email.text,
      created_at: new Date().toISOString(),
      status: 'queued',
      tags: email.tags || [],
      reply_to: email.reply_to,
      cc: email.cc,
      bcc: email.bcc
    };
  }

  private mockGetEmail(emailId: string): ResendEmail {
    return {
      id: emailId,
      to: ['demo@example.com'],
      from: 'system@371minds.com',
      subject: 'Demo Email',
      html: '<p>This is a demo email</p>',
      created_at: new Date(Date.now() - 60000).toISOString(),
      sent_at: new Date(Date.now() - 30000).toISOString(),
      delivered_at: new Date(Date.now() - 15000).toISOString(),
      status: 'delivered',
      tags: ['demo']
    };
  }

  private mockGetEmails(params?: { limit?: number; offset?: number }): { data: ResendEmail[] } {
    const limit = params?.limit || 10;
    const mockEmails: ResendEmail[] = [];

    for (let i = 0; i < limit; i++) {
      mockEmails.push({
        id: `email_${i}_${Date.now()}`,
        to: [`user${i}@example.com`],
        from: 'system@371minds.com',
        subject: `Demo Email ${i + 1}`,
        created_at: new Date(Date.now() - (i * 60000)).toISOString(),
        status: ['sent', 'delivered', 'opened', 'clicked'][i % 4] as any,
        tags: ['demo', 'batch']
      });
    }

    return { data: mockEmails };
  }

  private mockCreateAudience(name: string): ResendAudience {
    return {
      id: `audience_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      created_at: new Date().toISOString(),
      object: 'audience'
    };
  }

  private mockAddContact(audienceId: string, contact: Partial<ResendContact>): ResendContact {
    return {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: contact.email || 'demo@example.com',
      first_name: contact.first_name,
      last_name: contact.last_name,
      created_at: new Date().toISOString(),
      unsubscribed: false,
      audience_id: audienceId
    };
  }

  private mockGetEmailStats(emailId: string): ResendEmailStats {
    const sent = 1000 + Math.floor(Math.random() * 5000);
    const delivered = Math.floor(sent * (0.85 + Math.random() * 0.1));
    const opened = Math.floor(delivered * (0.15 + Math.random() * 0.3));
    const clicked = Math.floor(opened * (0.1 + Math.random() * 0.2));
    const bounced = sent - delivered;

    return {
      id: emailId,
      sent,
      delivered,
      delivery_delayed: Math.floor(sent * 0.02),
      bounced,
      failed: Math.floor(sent * 0.01),
      opened,
      clicked,
      complained: Math.floor(delivered * 0.001),
      delivery_rate: (delivered / sent) * 100,
      open_rate: (opened / delivered) * 100,
      click_rate: (clicked / opened) * 100,
      bounce_rate: (bounced / sent) * 100
    };
  }

  // New Dashboard Mock Methods
  private mockGetEmailLogs(emailId: string): ResendEmailLog[] {
    return [
      {
        id: `log_${emailId}_1`,
        event: 'email.sent',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'info',
        message: 'Email successfully sent to recipient',
        metadata: { recipientCount: 1, from: 'system@371minds.com' }
      },
      {
        id: `log_${emailId}_2`,
        event: 'email.delivered',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        level: 'info',
        message: 'Email delivered to recipient mail server',
        metadata: { deliveryTime: '4.2s' }
      },
      {
        id: `log_${emailId}_3`,
        event: 'email.opened',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        level: 'info',
        message: 'Email opened by recipient',
        metadata: { userAgent: 'Mozilla/5.0...', openTime: '2 minutes after delivery' }
      }
    ];
  }

  private mockExportEmailData(filters?: EmailExportFilters): ExportResponse {
    return {
      id: `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed',
      downloadUrl: 'https://resend.com/exports/emails/demo-export.csv',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      itemCount: 2547
    };
  }

  private mockScheduleEmail(email: Partial<ResendEmail>, scheduledAt: Date): ResendEmail {
    return {
      id: `scheduled_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      to: email.to || ['demo@example.com'],
      from: email.from || 'system@371minds.com',
      subject: email.subject || 'Scheduled Demo Email',
      html: email.html,
      text: email.text,
      created_at: new Date().toISOString(),
      status: 'scheduled',
      tags: [...(email.tags || []), 'scheduled'],
      reply_to: email.reply_to,
      cc: email.cc,
      bcc: email.bcc
    };
  }

  private calculateStats(emails: ResendEmail[]): ResendEmailStats {
    const totalSent = emails.length;
    const delivered = emails.filter(e => ['delivered', 'opened', 'clicked'].includes(e.status)).length;
    const opened = emails.filter(e => ['opened', 'clicked'].includes(e.status)).length;
    const clicked = emails.filter(e => e.status === 'clicked').length;
    const bounced = emails.filter(e => e.status === 'bounced').length;

    return {
      id: 'aggregate',
      sent: totalSent,
      delivered,
      delivery_delayed: emails.filter(e => e.status === 'delivery_delayed').length,
      bounced,
      failed: emails.filter(e => e.status === 'failed').length,
      opened,
      clicked,
      complained: emails.filter(e => e.status === 'complained').length,
      delivery_rate: totalSent > 0 ? (delivered / totalSent) * 100 : 0,
      open_rate: delivered > 0 ? (opened / delivered) * 100 : 0,
      click_rate: opened > 0 ? (clicked / opened) * 100 : 0,
      bounce_rate: totalSent > 0 ? (bounced / totalSent) * 100 : 0
    };
  }

  private generateAgentNotificationEmail(event: CommunicationCoordinationEvent): string {
    return `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">371 OS Agent Coordination</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9;">${event.agentType} Agent Notification</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #8b5cf6;">
            <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 18px;">Priority: ${event.priority.toUpperCase()}</h2>
            <p style="margin: 0; color: #475569; line-height: 1.5;">${event.message}</p>
          </div>
          ${event.metadata ? `
            <div style="margin-top: 16px; background: white; padding: 16px; border-radius: 6px;">
              <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 14px;">Additional Data:</h3>
              <pre style="margin: 0; font-size: 12px; color: #64748b; background: #f1f5f9; padding: 8px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(event.metadata, null, 2)}</pre>
            </div>
          ` : ''}
          <div style="margin-top: 16px; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Event ID: ${event.id}</p>
            <p style="margin: 4px 0 0 0;">Timestamp: ${event.timestamp.toISOString()}</p>
          </div>
        </div>
      </div>
    `;
  }

  private generateBusinessAlertMessage(alertType: string, data: Record<string, any>): string {
    switch (alertType) {
      case 'performance':
        return `Performance alert: ${data.metric} has ${data.trend === 'up' ? 'increased' : 'decreased'} by ${data.change}% to ${data.value}`;
      case 'threshold':
        return `Threshold alert: ${data.metric} has ${data.comparison} the ${data.threshold_type} threshold of ${data.threshold_value}`;
      case 'anomaly':
        return `Anomaly detected: Unusual pattern in ${data.metric} - ${data.description}`;
      case 'opportunity':
        return `Opportunity identified: ${data.description} - Potential impact: ${data.impact}`;
      default:
        return `Business alert: ${JSON.stringify(data)}`;
    }
  }
}

// Export singleton instance
export const resendService = new ResendService();
export default ResendService;