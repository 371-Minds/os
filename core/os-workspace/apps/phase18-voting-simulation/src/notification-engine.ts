/**
 * Notification Engine
 * 
 * Handles omnichannel notifications via Novu for C-Suite agent coordination
 * and governance event dissemination.
 */

import type { GovernanceProposal, VotingResults } from '../../dao-governance-service/src/types.js';

export interface NotificationChannel {
  type: 'email' | 'slack' | 'webhook' | 'in_app';
  address: string;
  preferences: {
    governance_updates: boolean;
    voting_reminders: boolean;
    execution_updates: boolean;
    emergency_alerts: boolean;
  };
}

export interface NotificationTemplate {
  id: string;
  name: string;
  channels: NotificationChannel['type'][];
  template: {
    subject: string;
    body: string;
    variables: string[];
  };
}

export interface NotificationDelivery {
  id: string;
  recipient: string;
  channel: NotificationChannel['type'];
  template_id: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sent_at?: Date;
  delivered_at?: Date;
  metadata: Record<string, any>;
}

export class NotificationEngine {
  private novuApiKey: string;
  private agentChannels: Map<string, NotificationChannel[]>;
  private templates: Map<string, NotificationTemplate>;
  private deliveryHistory: NotificationDelivery[];

  constructor() {
    this.novuApiKey = process.env.NOVU_API_KEY || 'mock_novu_key';
    this.agentChannels = new Map();
    this.templates = new Map();
    this.deliveryHistory = [];
    
    this.initializeAgentChannels();
    this.initializeNotificationTemplates();
    
    console.log('📢 Notification Engine initialized with Novu integration');
    console.log(`🔗 API Key: ${this.novuApiKey.substring(0, 8)}...`);
  }

  /**
   * Initialize notification channels for each C-Suite agent
   */
  private initializeAgentChannels(): void {
    // CEO Mimi - Prefers email and Slack for strategic updates
    this.agentChannels.set('mimi_ceo', [
      {
        type: 'email',
        address: 'mimi@371minds.com',
        preferences: {
          governance_updates: true,
          voting_reminders: true,
          execution_updates: true,
          emergency_alerts: true
        }
      },
      {
        type: 'slack',
        address: '#ceo-channel',
        preferences: {
          governance_updates: true,
          voting_reminders: false,
          execution_updates: true,
          emergency_alerts: true
        }
      }
    ]);

    // CTO Zara - Technical updates via email and webhook
    this.agentChannels.set('zara_cto', [
      {
        type: 'email',
        address: 'zara@371minds.com',
        preferences: {
          governance_updates: true,
          voting_reminders: true,
          execution_updates: true,
          emergency_alerts: true
        }
      },
      {
        type: 'webhook',
        address: 'https://cto-agent.371minds.com/notifications',
        preferences: {
          governance_updates: true,
          voting_reminders: false,
          execution_updates: true,
          emergency_alerts: true
        }
      }
    ]);

    // CFO Maya - Financial focus with email notifications
    this.agentChannels.set('maya_cfo', [
      {
        type: 'email',
        address: 'maya@371minds.com',
        preferences: {
          governance_updates: true,
          voting_reminders: true,
          execution_updates: false,
          emergency_alerts: true
        }
      },
      {
        type: 'in_app',
        address: 'cfo-dashboard',
        preferences: {
          governance_updates: true,
          voting_reminders: true,
          execution_updates: false,
          emergency_alerts: false
        }
      }
    ]);

    // CLO Alex - Legal compliance notifications
    this.agentChannels.set('alex_clo', [
      {
        type: 'email',
        address: 'alex@371minds.com',
        preferences: {
          governance_updates: true,
          voting_reminders: true,
          execution_updates: false,
          emergency_alerts: true
        }
      }
    ]);
  }

  /**
   * Initialize notification templates
   */
  private initializeNotificationTemplates(): void {
    // New proposal notification
    this.templates.set('new_proposal', {
      id: 'new_proposal',
      name: 'New Governance Proposal',
      channels: ['email', 'slack', 'webhook'],
      template: {
        subject: 'New Governance Proposal: {{proposal_title}}',
        body: 'A new governance proposal has been submitted for review:\n\n**Title:** {{proposal_title}}\n**Type:** {{proposal_type}}\n**Proposer:** {{proposer_name}}\n**Budget:** ${{budget_amount}}\n\n**Description:**\n{{proposal_description}}\n\n**Next Steps:**\n- Review period: {{review_period}} days\n- Voting starts: {{voting_start_date}}\n- Discussion thread: {{nextcloud_thread_url}}\n\nPlease review the proposal and participate in the discussion.',
        variables: ['proposal_title', 'proposal_type', 'proposer_name', 'budget_amount', 'proposal_description', 'review_period', 'voting_start_date', 'nextcloud_thread_url']
      }
    });

    // Voting started notification
    this.templates.set('voting_started', {
      id: 'voting_started',
      name: 'Voting Period Started',
      channels: ['email', 'in_app'],
      template: {
        subject: 'Voting Now Open: {{proposal_title}}',
        body: 'The voting period has started for proposal: {{proposal_title}}\n\n**Voting Details:**\n- Voting ends: {{voting_end_date}}\n- Quorum required: {{quorum_percentage}}%\n- Approval threshold: {{approval_threshold}}%\n\n**Your Vote:**\nPlease cast your vote: {{voting_url}}\n\n**Deliberation Summary:**\n{{deliberation_summary}}',
        variables: ['proposal_title', 'voting_end_date', 'quorum_percentage', 'approval_threshold', 'voting_url', 'deliberation_summary']
      }
    });

    // Voting results notification
    this.templates.set('voting_results', {
      id: 'voting_results',
      name: 'Voting Results Available',
      channels: ['email', 'slack'],
      template: {
        subject: 'Voting Results: {{proposal_title}} - {{outcome}}',
        body: 'Voting has concluded for proposal: {{proposal_title}}\n\n**Results:**\n- Outcome: {{outcome}}\n- For: {{votes_for}} ({{power_for}} voting power)\n- Against: {{votes_against}} ({{power_against}} voting power)\n- Abstain: {{votes_abstain}} ({{power_abstain}} voting power)\n- Participation: {{participation_rate}}%\n\n{{#if execution_authorized}}\n**Next Steps:**\nExecution has been authorized and will begin shortly.\n{{/if}}',
        variables: ['proposal_title', 'outcome', 'votes_for', 'power_for', 'votes_against', 'power_against', 'votes_abstain', 'power_abstain', 'participation_rate', 'execution_authorized']
      }
    });

    // Execution update notification
    this.templates.set('execution_update', {
      id: 'execution_update',
      name: 'Execution Status Update',
      channels: ['email', 'webhook'],
      template: {
        subject: 'Execution Update: {{proposal_title}} - {{current_phase}}',
        body: 'Execution update for approved proposal: {{proposal_title}}\n\n**Current Status:**\n- Phase: {{current_phase}}\n- Progress: {{progress_percentage}}%\n- Budget utilized: ${{budget_spent}} of ${{budget_total}}\n\n**Recent Milestones:**\n{{recent_milestones}}\n\n**Next Steps:**\n{{next_steps}}',
        variables: ['proposal_title', 'current_phase', 'progress_percentage', 'budget_spent', 'budget_total', 'recent_milestones', 'next_steps']
      }
    });
  }

  /**
   * Notify all C-Suite agents about a new proposal
   */
  public async notifyCSuiteAgents(proposal: GovernanceProposal): Promise<void> {
    console.log(`📢 Sending proposal notifications to C-Suite agents: ${proposal.title}`);
    
    const templateData = {
      proposal_title: proposal.title,
      proposal_type: proposal.type,
      proposer_name: proposal.proposer,
      budget_amount: proposal.budgetRequest?.total_amount || 0,
      proposal_description: proposal.description.substring(0, 200) + '...',
      review_period: proposal.timeline.review_period_days,
      voting_start_date: new Date(Date.now() + proposal.timeline.review_period_days * 24 * 60 * 60 * 1000).toLocaleDateString(),
      nextcloud_thread_url: `https://nextcloud.371minds.com/governance/thread_${proposal.id}`
    };

    const notifications: Promise<NotificationDelivery>[] = [];

    for (const [agentId, channels] of this.agentChannels) {
      for (const channel of channels) {
        if (channel.preferences.governance_updates) {
          notifications.push(
            this.sendNotification(agentId, 'new_proposal', channel, templateData)
          );
        }
      }
    }

    const results = await Promise.allSettled(notifications);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`✅ Notifications sent: ${successful} successful, ${failed} failed`);
  }

  /**
   * Notify about voting period start
   */
  public async notifyVotingStarted(proposal: GovernanceProposal): Promise<void> {
    console.log(`🗳️ Sending voting started notifications: ${proposal.title}`);
    
    const templateData = {
      proposal_title: proposal.title,
      voting_end_date: new Date(Date.now() + proposal.votingConfig.voting_period_hours * 60 * 60 * 1000).toLocaleDateString(),
      quorum_percentage: proposal.votingConfig.quorum_percentage,
      approval_threshold: proposal.votingConfig.approval_threshold_percentage,
      voting_url: `https://governance.371minds.com/vote/${proposal.id}`,
      deliberation_summary: 'All C-Suite agents participated in productive discussion regarding technical and financial aspects.'
    };

    await this.sendToAllAgents('voting_started', templateData, 'voting_reminders');
  }

  /**
   * Notify about voting results
   */
  public async notifyVotingResults(proposal: GovernanceProposal, results: VotingResults): Promise<void> {
    console.log(`📊 Sending voting results notifications: ${proposal.title}`);
    
    const templateData = {
      proposal_title: proposal.title,
      outcome: results.outcome.toUpperCase(),
      votes_for: results.votes_for,
      power_for: results.power_for,
      votes_against: results.votes_against,
      power_against: results.power_against,
      votes_abstain: results.votes_abstain,
      power_abstain: results.power_abstain,
      participation_rate: results.participation_rate,
      execution_authorized: results.execution_authorized
    };

    await this.sendToAllAgents('voting_results', templateData, 'governance_updates');
  }

  /**
   * Send notification to specific agent via specific channel
   */
  private async sendNotification(
    agentId: string,
    templateId: string,
    channel: NotificationChannel,
    data: Record<string, any>
  ): Promise<NotificationDelivery> {
    const delivery: NotificationDelivery = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recipient: agentId,
      channel: channel.type,
      template_id: templateId,
      status: 'pending',
      metadata: {
        template_data: data,
        channel_address: channel.address
      }
    };

    try {
      // Mock Novu API call
      await this.mockNovuApiCall({
        subscriberId: agentId,
        name: templateId,
        to: {
          [channel.type]: channel.address
        },
        payload: data
      });

      delivery.status = 'sent';
      delivery.sent_at = new Date();
      
      // Simulate delivery confirmation
      setTimeout(() => {
        delivery.status = 'delivered';
        delivery.delivered_at = new Date();
      }, 1000);

      console.log(`📤 Notification sent to ${agentId} via ${channel.type}`);

    } catch (error) {
      delivery.status = 'failed';
      delivery.metadata.error = error;
      console.error(`❌ Failed to send notification to ${agentId}:`, error);
    }

    this.deliveryHistory.push(delivery);
    return delivery;
  }

  /**
   * Send notification to all agents based on preference
   */
  private async sendToAllAgents(templateId: string, data: Record<string, any>, preferenceKey: keyof NotificationChannel['preferences']): Promise<void> {
    const notifications: Promise<NotificationDelivery>[] = [];

    for (const [agentId, channels] of this.agentChannels) {
      for (const channel of channels) {
        if (channel.preferences[preferenceKey]) {
          notifications.push(
            this.sendNotification(agentId, templateId, channel, data)
          );
        }
      }
    }

    await Promise.allSettled(notifications);
  }

  /**
   * Mock Novu API call for simulation
   */
  private async mockNovuApiCall(payload: any): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    // Simulate 95% success rate
    if (Math.random() < 0.05) {
      throw new Error('Novu API temporarily unavailable');
    }
  }

  /**
   * Get notification delivery statistics
   */
  public getDeliveryStats(): {
    total_sent: number;
    successful_deliveries: number;
    failed_deliveries: number;
    delivery_rate: number;
    by_channel: Record<string, number>;
  } {
    const totalSent = this.deliveryHistory.length;
    const successful = this.deliveryHistory.filter(d => d.status === 'delivered').length;
    const failed = this.deliveryHistory.filter(d => d.status === 'failed').length;

    const byChannel: Record<string, number> = {};
    for (const delivery of this.deliveryHistory) {
      byChannel[delivery.channel] = (byChannel[delivery.channel] || 0) + 1;
    }

    return {
      total_sent: totalSent,
      successful_deliveries: successful,
      failed_deliveries: failed,
      delivery_rate: totalSent > 0 ? successful / totalSent : 0,
      by_channel: byChannel
    };
  }
}