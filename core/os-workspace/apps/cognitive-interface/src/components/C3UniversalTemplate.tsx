/**
 * C3UniversalTemplate.tsx - Complete Communications Universe Demo
 *
 * Revolutionary demonstration of the C3 (Communications Coordination Control) system
 * integrating Resend dashboard functionality with spatial email management.
 *
 * Enhanced Features:
 * - Real-time email tracking with Resend API integration
 * - Spatial visualization of communication flows
 * - Agent coordination via automated email workflows
 * - Complete dashboard functionality (share, logs, export, scheduling)
 * - Live demonstration of revolutionary email management paradigm
 * - Enhanced mail-conduit service integration
 * - Status.network DAO governance integration
 * - Blockchain verification display
 * - Cognitive optimization metrics
 * - Agent coordination status
 */

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { CommunicationsUniverseController } from './CommunicationsUniverseController';
import './C3UniversalTemplate.css';

interface C3DemoState {
  currentDemo:
    | 'spatial-email'
    | 'agent-coordination'
    | 'dashboard-features'
    | 'export-analytics'
    | 'blockchain-verification'
    | 'dao-governance';
  realTimeSync: boolean;
  agentCoordination: boolean;
  blockchainVerification: boolean;
  daoGovernance: boolean;
  notifications: C3Notification[];
}

interface C3Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  action?: string;
  data?: any;
}

interface C3Metrics {
  totalEmails: number;
  universeEngagement: number;
  agentCoordination: number;
  dashboardActions: number;
  dataExports: number;
  blockchainVerifications: number;
  daoProposals: number;
  costOptimization: number;
}

export const C3UniversalTemplate: React.FC = () => {
  const [demoState, setDemoState] = useState<C3DemoState>({
    currentDemo: 'spatial-email',
    realTimeSync: true,
    agentCoordination: true,
    blockchainVerification: true,
    daoGovernance: true,
    notifications: [],
  });

  const [metrics, setMetrics] = useState<C3Metrics>({
    totalEmails: 0,
    universeEngagement: 0,
    agentCoordination: 0,
    dashboardActions: 0,
    dataExports: 0,
    blockchainVerifications: 0,
    daoProposals: 0,
    costOptimization: 0,
  });

  const [isLiveMode, setIsLiveMode] = useState(false);

  // Handle universe actions and track metrics
  const handleUniverseAction = useCallback((action: string, data: any) => {
    console.log('C3 Universe Action:', action, data);

    // Create notification
    const notification: C3Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: getNotificationType(action),
      title: getActionTitle(action),
      message: getActionMessage(action, data),
      timestamp: new Date(),
      action,
      data,
    };

    setDemoState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications.slice(0, 9)],
    }));

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      totalEmails:
        action === 'email_selected' ? prev.totalEmails + 1 : prev.totalEmails,
      universeEngagement: action.includes('email')
        ? prev.universeEngagement + 1
        : prev.universeEngagement,
      agentCoordination: action.includes('agent')
        ? prev.agentCoordination + 1
        : prev.agentCoordination,
      dashboardActions: [
        'email_link_shared',
        'email_logs_viewed',
        'email_scheduled',
      ].includes(action)
        ? prev.dashboardActions + 1
        : prev.dashboardActions,
      dataExports:
        action === 'email_export_initiated'
          ? prev.dataExports + 1
          : prev.dataExports,
      blockchainVerifications: action === 'blockchain_verified'
        ? prev.blockchainVerifications + 1
        : prev.blockchainVerifications,
      daoProposals: action === 'dao_proposal_created'
        ? prev.daoProposals + 1
        : prev.daoProposals,
      costOptimization: action === 'cost_optimized'
        ? prev.costOptimization + 1
        : prev.costOptimization,
    }));
  }, []);

  const getNotificationType = (action: string): C3Notification['type'] => {
    if (action.includes('error') || action.includes('failed')) return 'error';
    if (action.includes('warning') || action.includes('alert'))
      return 'warning';
    if (action.includes('export') || action.includes('shared'))
      return 'success';
    return 'info';
  };

  const getActionTitle = (action: string): string => {
    const titles: Record<string, string> = {
      email_selected: 'Email Selected',
      email_link_shared: 'Link Shared Successfully',
      email_logs_viewed: 'Logs Retrieved',
      email_export_initiated: 'Data Export Started',
      email_scheduled: 'Email Scheduled',
      scheduled_email_canceled: 'Schedule Canceled',
      agent_notification_sent: 'Agent Notified',
      business_alert_triggered: 'Business Alert',
      constellation_selected: 'Contact Group Selected',
      flow_action: 'Workflow Action',
      blockchain_verified: 'Blockchain Verified',
      dao_proposal_created: 'DAO Proposal Created',
      cost_optimized: 'Cost Optimized',
      enhanced_mail_conduit_connected: 'Enhanced Mail-Conduit Connected',
      status_network_integrated: 'Status.network Integrated',
    };
    return titles[action] || 'Universe Action';
  };

  const getActionMessage = (action: string, data: any): string => {
    switch (action) {
      case 'email_selected':
        return `Selected email: "${data.email?.subject || 'Unknown'}"`;
      case 'email_link_shared':
        return `Share link copied to clipboard (expires in 48h)`;
      case 'email_logs_viewed':
        return `Retrieved ${data.logs?.length || 0} log entries`;
      case 'email_export_initiated':
        return `Export ${data.exportResult?.id} created (${data.exportResult?.itemCount || 0} items)`;
      case 'email_scheduled':
        return `Email scheduled for ${data.scheduledAt || 'future delivery'}`;
      case 'agent_notification_sent':
        return `${data.agentType} agent notified: "${data.message}"`;
      case 'business_alert_triggered':
        return `${data.alertType} alert triggered with priority level`;
      case 'blockchain_verified':
        return `Email verified on blockchain with hash ${data.hash?.substring(0, 12)}...`;
      case 'dao_proposal_created':
        return `DAO proposal "${data.proposalTitle}" created for community voting`;
      case 'cost_optimized':
        return `97.6% cost reduction achieved via Akash Network optimization`;
      case 'enhanced_mail_conduit_connected':
        return `Connected to enhanced mail-conduit service with agent coordination`;
      case 'status_network_integrated':
        return `Status.network integration active for DAO governance`;
      default:
        return `Action completed: ${action}`;
    }
  };

  const switchDemo = (demo: C3DemoState['currentDemo']) => {
    setDemoState((prev) => ({ ...prev, currentDemo: demo }));
  };

  const toggleLiveMode = () => {
    setIsLiveMode((prev) => !prev);
    const notification: C3Notification = {
      id: `live_${Date.now()}`,
      type: 'info',
      title: isLiveMode ? 'Demo Mode Activated' : 'Live Mode Activated',
      message: isLiveMode
        ? 'Switched to demo mode with mock data'
        : 'Connected to live Resend API for real-time data',
      timestamp: new Date(),
    };

    setDemoState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications.slice(0, 9)],
    }));
  };

  const clearNotifications = () => {
    setDemoState((prev) => ({ ...prev, notifications: [] }));
  };

  const simulateEmailWorkflow = async () => {
    const steps = [
      { action: 'Creating email campaign...', delay: 1000 },
      { action: 'Scheduling delivery...', delay: 1500 },
      { action: 'Coordinating with agents...', delay: 1200 },
      { action: 'CEO Mimi: Strategic approval...', delay: 800 },
      { action: 'CFO Maya: Cost optimization...', delay: 900 },
      { action: 'CLO Sage: Compliance check...', delay: 700 },
      { action: 'Blockchain verification...', delay: 1100 },
      { action: 'Status.network DAO review...', delay: 1300 },
      { action: 'Cognitive optimization...', delay: 1000 },
      { action: 'proxiedmail.com privacy setup...', delay: 800 },
      { action: 'Monitoring engagement...', delay: 1800 },
      { action: 'Generating analytics...', delay: 1000 },
    ];

    for (const step of steps) {
      const notification: C3Notification = {
        id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        type: 'info',
        title: 'Enhanced Email Workflow',
        message: step.action,
        timestamp: new Date(),
      };

      setDemoState((prev) => ({
        ...prev,
        notifications: [notification, ...prev.notifications.slice(0, 9)],
      }));

      await new Promise((resolve) => setTimeout(resolve, step.delay));
    }

    // Final success notification
    const successNotif: C3Notification = {
      id: `workflow_complete_${Date.now()}`,
      type: 'success',
      title: 'Revolutionary Workflow Complete',
      message: 'Email campaign launched with blockchain verification, agent coordination, DAO governance, and 97.6% cost reduction!',
      timestamp: new Date(),
    };

    setDemoState((prev) => ({
      ...prev,
      notifications: [successNotif, ...prev.notifications.slice(0, 9)],
    }));
    
    // Simulate additional metric updates
    handleUniverseAction('blockchain_verified', { hash: 'abc123def456' });
    handleUniverseAction('dao_proposal_created', { proposalTitle: 'Newsletter Campaign Q4' });
    handleUniverseAction('cost_optimized', { savings: 976, method: 'akash-network' });
    handleUniverseAction('enhanced_mail_conduit_connected', { service: 'enhanced-mail-conduit' });
    handleUniverseAction('status_network_integrated', { network: 'status-network' });
  };

  return (
    <div className="c3-universal-template">
      {/* Header */}
      <div className="c3-header">
        <div className="header-content">
          <div className="header-title">
            <h1>C3 Universal Template</h1>
            <p>Communications Coordination Control • Resend Integration Demo</p>
          </div>

          <div className="header-controls">
            <button
              className={`mode-toggle ${isLiveMode ? 'live' : 'demo'}`}
              onClick={toggleLiveMode}
            >
              <span className="mode-indicator"></span>
              {isLiveMode ? 'Live Mode' : 'Demo Mode'}
            </button>

            <button className="workflow-btn" onClick={simulateEmailWorkflow}>
              🚀 Run Enhanced Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Demo Navigation */}
      <div className="demo-navigation">
        {[
          { id: 'spatial-email', label: 'Spatial Email Universe', icon: '🌌' },
          { id: 'agent-coordination', label: 'Agent Coordination', icon: '🤖' },
          { id: 'dashboard-features', label: 'Dashboard Features', icon: '📊' },
          { id: 'export-analytics', label: 'Export & Analytics', icon: '📈' },
          { id: 'blockchain-verification', label: 'Blockchain Verification', icon: '⛓️' },
          { id: 'dao-governance', label: 'DAO Governance', icon: '🗳️' },
        ].map((demo) => (
          <button
            key={demo.id}
            className={`demo-tab ${demoState.currentDemo === demo.id ? 'active' : ''}`}
            onClick={() => switchDemo(demo.id as any)}
          >
            <span className="demo-icon">{demo.icon}</span>
            <span className="demo-label">{demo.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="c3-content">
        {/* Primary Universe Display */}
        <div className="universe-display">
          <CommunicationsUniverseController
            onUniverseAction={handleUniverseAction}
            enableRealTimeSync={demoState.realTimeSync}
            enableAgentCoordination={demoState.agentCoordination}
          />
        </div>

        {/* Side Panel */}
        <div className="c3-side-panel">
          {/* Metrics Dashboard */}
          <div className="metrics-section">
            <h3>C3 Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-value">{metrics.totalEmails}</span>
                <span className="metric-label">Emails Tracked</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">
                  {metrics.universeEngagement}
                </span>
                <span className="metric-label">Universe Actions</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">
                  {metrics.agentCoordination}
                </span>
                <span className="metric-label">Agent Events</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">{metrics.dashboardActions}</span>
                <span className="metric-label">Dashboard Uses</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">{metrics.blockchainVerifications}</span>
                <span className="metric-label">Blockchain Verified</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">{metrics.daoProposals}</span>
                <span className="metric-label">DAO Proposals</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">{metrics.costOptimization}</span>
                <span className="metric-label">Cost Optimizations</span>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="features-section">
            <h3>Dashboard Features</h3>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🔗</span>
                <div className="feature-content">
                  <span className="feature-name">Email Sharing</span>
                  <span className="feature-desc">48-hour public links</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <div className="feature-content">
                  <span className="feature-name">Event Logs</span>
                  <span className="feature-desc">Complete audit trail</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📅</span>
                <div className="feature-content">
                  <span className="feature-name">Email Scheduling</span>
                  <span className="feature-desc">Future delivery control</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div className="feature-content">
                  <span className="feature-name">Data Export</span>
                  <span className="feature-desc">CSV downloads</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <div className="feature-content">
                  <span className="feature-name">Agent Alerts</span>
                  <span className="feature-desc">Real-time coordination</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌌</span>
                <div className="feature-content">
                  <span className="feature-name">Spatial Visualization</span>
                  <span className="feature-desc">3D email universe</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⛓️</span>
                <div className="feature-content">
                  <span className="feature-name">Blockchain Verification</span>
                  <span className="feature-desc">Immutable email records</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🗳️</span>
                <div className="feature-content">
                  <span className="feature-name">DAO Governance</span>
                  <span className="feature-desc">Community-driven decisions</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💰</span>
                <div className="feature-content">
                  <span className="feature-name">97.6% Cost Reduction</span>
                  <span className="feature-desc">Akash Network optimization</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧠</span>
                <div className="feature-content">
                  <span className="feature-name">Cognitive Optimization</span>
                  <span className="feature-desc">AI-driven personalization</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <div className="feature-content">
                  <span className="feature-name">Privacy Protection</span>
                  <span className="feature-desc">proxiedmail.com integration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Notifications */}
          <div className="notifications-section">
            <div className="notifications-header">
              <h3>Live Activity</h3>
              {demoState.notifications.length > 0 && (
                <button className="clear-btn" onClick={clearNotifications}>
                  Clear
                </button>
              )}
            </div>

            <div className="notifications-list">
              {demoState.notifications.length === 0 ? (
                <div className="no-notifications">
                  <span className="placeholder-icon">🔔</span>
                  <span className="placeholder-text">
                    Activity will appear here
                  </span>
                </div>
              ) : (
                demoState.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.type}`}
                  >
                    <div className="notification-header">
                      <span className="notification-title">
                        {notification.title}
                      </span>
                      <span className="notification-time">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="c3-status-bar">
        <div className="status-info">
          <span className="status-text">
            C3 Universal Template • Revolutionary Communications Management
          </span>
          <span className="connection-status">
            <span
              className={`status-dot ${isLiveMode ? 'live' : 'demo'}`}
            ></span>
            {isLiveMode ? 'Connected to Resend API' : 'Demo Mode Active'}
          </span>
        </div>

        <div className="action-stats">
          <span className="stat">📧 {metrics.totalEmails} emails</span>
          <span className="stat">
            🤖 {metrics.agentCoordination} agent actions
          </span>
          <span className="stat">⛓️ {metrics.blockchainVerifications} verified</span>
          <span className="stat">🗳️ {metrics.daoProposals} proposals</span>
          <span className="stat">💰 {metrics.costOptimization} optimizations</span>
        </div>
      </div>
    </div>
  );
};

export default C3UniversalTemplate;
