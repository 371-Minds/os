/**
 * ExecutiveMode.tsx - Strategic Dashboard Interface
 *
 * This component implements the Executive cognitive mode for high-level decision making,
 * strategic planning, and organizational overview. It's optimized for speed, clarity,
 * and actionable insights.
 *
 * Part of the revolutionary Galaxy Engine cognitive-aware interface system.
 */

import type React from 'react';
import { useEffect, useState } from 'react';
import './ExecutiveMode.css';

interface KPIMetric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: string;
}

interface AgentStatus {
  name: string;
  role: string;
  status: 'active' | 'idle' | 'working' | 'offline';
  lastAction: string;
  efficiency: number;
}

interface StrategicAlert {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionRequired: boolean;
  timestamp: Date;
}

interface ExecutiveModeProps {
  userId?: string;
  onModeSwitch?: (mode: string) => void;
  onActionTrigger?: (action: string, data: any) => void;
}

export const ExecutiveMode: React.FC<ExecutiveModeProps> = ({
  userId = 'executive-user',
  onModeSwitch,
  onActionTrigger,
}) => {
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([
    {
      name: 'Revenue',
      value: '$2.4M',
      change: 12.5,
      trend: 'up',
      target: '$3.0M',
    },
    {
      name: 'Cost Reduction',
      value: '97.6%',
      change: 2.1,
      trend: 'up',
      target: '98.0%',
    },
    {
      name: 'Agent Efficiency',
      value: '94.2%',
      change: 4.8,
      trend: 'up',
      target: '95.0%',
    },
    {
      name: 'System Uptime',
      value: '99.97%',
      change: 0.1,
      trend: 'up',
      target: '99.99%',
    },
  ]);

  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([
    {
      name: 'Mimi',
      role: 'CEO Agent',
      status: 'active',
      lastAction: 'Strategic analysis',
      efficiency: 96,
    },
    {
      name: 'Zara',
      role: 'CTO Agent',
      status: 'working',
      lastAction: 'System optimization',
      efficiency: 94,
    },
    {
      name: 'Maya',
      role: 'CFO Agent',
      status: 'active',
      lastAction: 'Cost analysis',
      efficiency: 98,
    },
    {
      name: 'Alex',
      role: 'CLO Agent',
      status: 'idle',
      lastAction: 'Compliance review',
      efficiency: 92,
    },
  ]);

  const [strategicAlerts, setStrategicAlerts] = useState<StrategicAlert[]>([
    {
      id: '1',
      priority: 'high',
      title: 'New Market Opportunity Identified',
      description:
        'AI analysis suggests expansion into European cognitive software market',
      actionRequired: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      priority: 'medium',
      title: 'Agent Performance Optimization',
      description:
        'Zara suggests implementing new ML algorithms for 3% efficiency gain',
      actionRequired: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
  ]);

  const handleQuickAction = (actionType: string, data?: any) => {
    console.log('ExecutiveMode: Quick action triggered:', actionType, data);

    if (onActionTrigger) {
      onActionTrigger(actionType, data);
    }

    // Simulate responsive feedback
    switch (actionType) {
      case 'schedule_meeting':
        alert('Meeting scheduled with C-Suite agents');
        break;
      case 'request_analysis':
        alert('Analysis request sent to appropriate agents');
        break;
      case 'approve_initiative':
        alert('Initiative approved and delegated to agents');
        break;
      case 'view_detailed_report':
        alert('Opening detailed analytics dashboard...');
        break;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  };

  useEffect(() => {
    // Simulate real-time KPI updates
    const interval = setInterval(() => {
      setKpiMetrics((prev) =>
        prev.map((kpi) => ({
          ...kpi,
          value:
            kpi.name === 'Agent Efficiency'
              ? `${(94.2 + Math.random() * 2).toFixed(1)}%`
              : kpi.value,
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="executive-mode">
      <div className="executive-header">
        <div className="mode-indicator">
          <span className="mode-badge executive">Executive Mode</span>
          <p className="mode-description">
            Strategic Dashboard - High-Level Decision Making
          </p>
        </div>
        <div className="quick-actions">
          <button
            className="action-btn primary"
            onClick={() => handleQuickAction('schedule_meeting')}
          >
            Schedule C-Suite Meeting
          </button>
          <button
            className="action-btn secondary"
            onClick={() => handleQuickAction('request_analysis')}
          >
            Request Analysis
          </button>
        </div>
      </div>

      <div className="executive-grid">
        {/* KPI Dashboard */}
        <section className="kpi-section">
          <h2>Key Performance Indicators</h2>
          <div className="kpi-grid">
            {kpiMetrics.map((kpi, index) => (
              <div key={index} className={`kpi-card ${kpi.trend}`}>
                <div className="kpi-header">
                  <h3>{kpi.name}</h3>
                  <span className={`trend-indicator ${kpi.trend}`}>
                    {kpi.trend === 'up'
                      ? '↗'
                      : kpi.trend === 'down'
                        ? '↘'
                        : '→'}
                  </span>
                </div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-change">
                  <span className={kpi.change >= 0 ? 'positive' : 'negative'}>
                    {kpi.change >= 0 ? '+' : ''}
                    {kpi.change}%
                  </span>
                  {kpi.target && (
                    <span className="target">Target: {kpi.target}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agent Status */}
        <section className="agent-section">
          <h2>C-Suite Agent Status</h2>
          <div className="agent-grid">
            {agentStatuses.map((agent, index) => (
              <div key={index} className={`agent-card ${agent.status}`}>
                <div className="agent-header">
                  <div className="agent-info">
                    <h3>{agent.name}</h3>
                    <span className="agent-role">{agent.role}</span>
                  </div>
                  <span className={`status-indicator ${agent.status}`}></span>
                </div>
                <div className="agent-details">
                  <p className="last-action">{agent.lastAction}</p>
                  <div className="efficiency-bar">
                    <div className="efficiency-label">
                      Efficiency: {agent.efficiency}%
                    </div>
                    <div className="efficiency-progress">
                      <div
                        className="efficiency-fill"
                        style={{ width: `${agent.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Alerts */}
        <section className="alerts-section">
          <h2>Strategic Alerts</h2>
          <div className="alerts-list">
            {strategicAlerts.map((alert) => (
              <div key={alert.id} className={`alert-card ${alert.priority}`}>
                <div className="alert-header">
                  <h3>{alert.title}</h3>
                  <div className="alert-meta">
                    <span className={`priority-badge ${alert.priority}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    <span className="timestamp">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                </div>
                <p className="alert-description">{alert.description}</p>
                {alert.actionRequired && (
                  <div className="alert-actions">
                    <button
                      className="action-btn small primary"
                      onClick={() =>
                        handleQuickAction('approve_initiative', alert)
                      }
                    >
                      Take Action
                    </button>
                    <button
                      className="action-btn small secondary"
                      onClick={() =>
                        handleQuickAction('view_detailed_report', alert)
                      }
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Insights */}
        <section className="insights-section">
          <h2>AI-Generated Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>🎯 Opportunity</h4>
              <p>
                Cognitive software market projected 340% growth. Recommend
                accelerating Galaxy Engine development.
              </p>
              <button
                className="insight-action"
                onClick={() => handleQuickAction('explore_opportunity')}
              >
                Explore →
              </button>
            </div>
            <div className="insight-card">
              <h4>⚡ Optimization</h4>
              <p>
                Bun integration achieved 50x performance improvement. Apply to
                all development workflows.
              </p>
              <button
                className="insight-action"
                onClick={() => handleQuickAction('implement_optimization')}
              >
                Implement →
              </button>
            </div>
            <div className="insight-card">
              <h4>🚨 Risk Alert</h4>
              <p>
                Competitor analysis shows similar cognitive UI concepts.
                Maintain first-mover advantage.
              </p>
              <button
                className="insight-action"
                onClick={() => handleQuickAction('mitigate_risk')}
              >
                Mitigate →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveMode;
