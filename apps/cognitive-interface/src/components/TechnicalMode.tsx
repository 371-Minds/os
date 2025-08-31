/**
 * TechnicalMode.tsx - Development-Focused Interface
 * 
 * This component implements the Technical cognitive mode for development operations,
 * system diagnostics, code analysis, and technical decision-making. It emphasizes
 * detailed information, tools access, and development workflows.
 * 
 * Part of the revolutionary Galaxy Engine cognitive-aware interface system.
 */

import React, { useState, useEffect } from 'react';
import './TechnicalMode.css';

interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  details: string;
  trend?: 'up' | 'down' | 'stable';
}

interface BuildInfo {
  project: string;
  status: 'success' | 'failed' | 'building' | 'pending';
  duration: string;
  timestamp: Date;
  details: string;
  coverage?: number;
}

interface CodeMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'poor';
}

interface DevTool {
  name: string;
  description: string;
  status: 'available' | 'running' | 'disabled';
  action: string;
  icon: string;
}

interface TechnicalModeProps {
  userId?: string;
  onModeSwitch?: (mode: string) => void;
  onToolLaunch?: (tool: string, params: any) => void;
}

export const TechnicalMode: React.FC<TechnicalModeProps> = ({
  userId = 'developer-user',
  onModeSwitch,
  onToolLaunch
}) => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: '23%', status: 'healthy', details: '8-core utilization', trend: 'stable' },
    { name: 'Memory', value: '4.2GB', status: 'healthy', details: '16GB available', trend: 'up' },
    { name: 'Build Cache', value: '89%', status: 'healthy', details: 'Nx cache efficiency', trend: 'up' },
    { name: 'Node Version', value: 'v24.6.0', status: 'healthy', details: 'LTS compatible' },
    { name: 'Bun Package Manager', value: '1.2.18', status: 'healthy', details: 'Lightning fast' },
    { name: 'TypeScript', value: '5.9.2', status: 'healthy', details: 'Strict mode enabled' }
  ]);

  const [buildInfo, setBuildInfo] = useState<BuildInfo[]>([
    { 
      project: 'cognitive-engine', 
      status: 'success', 
      duration: '206ms', 
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      details: 'ElizaOS plugin compilation',
      coverage: 94
    },
    { 
      project: 'nx-workspace', 
      status: 'success', 
      duration: '1.2s', 
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      details: 'Self-awareness plugin build',
      coverage: 87
    },
    { 
      project: 'universal-tool-server', 
      status: 'building', 
      duration: '...', 
      timestamp: new Date(),
      details: 'Blockchain integration'
    }
  ]);

  const [codeMetrics, setCodeMetrics] = useState<CodeMetric[]>([
    { name: 'Test Coverage', value: 89, unit: '%', threshold: 80, status: 'good' },
    { name: 'Type Safety', value: 98, unit: '%', threshold: 95, status: 'good' },
    { name: 'Cyclomatic Complexity', value: 6, unit: '', threshold: 10, status: 'good' },
    { name: 'Tech Debt Ratio', value: 12, unit: '%', threshold: 20, status: 'good' },
    { name: 'Bundle Size', value: 2.4, unit: 'MB', threshold: 5, status: 'good' },
    { name: 'Load Time', value: 1.2, unit: 's', threshold: 3, status: 'good' }
  ]);

  const [devTools, setDevTools] = useState<DevTool[]>([
    { 
      name: 'Nx Graph', 
      description: 'Visualize project dependencies', 
      status: 'available', 
      action: 'generate_graph',
      icon: '🕸️'
    },
    { 
      name: 'ElizaOS Plugin Builder', 
      description: 'Build and test cognitive engine', 
      status: 'available', 
      action: 'build_plugin',
      icon: '🧠'
    },
    { 
      name: 'Agent Debugger', 
      description: 'Debug agent runtime and actions', 
      status: 'running', 
      action: 'debug_agent',
      icon: '🤖'
    },
    { 
      name: 'Blockchain Simulator', 
      description: 'Test smart contracts locally', 
      status: 'available', 
      action: 'start_blockchain',
      icon: '⛓️'
    },
    { 
      name: 'Performance Profiler', 
      description: 'Analyze system performance', 
      status: 'available', 
      action: 'profile_system',
      icon: '📊'
    },
    { 
      name: 'Code Generator', 
      description: 'Generate ElizaOS scaffolds', 
      status: 'available', 
      action: 'generate_code',
      icon: '⚡'
    }
  ]);

  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ bun nx build cognitive-engine',
    '✅ Cognitive engine plugin compiled successfully',
    '$ bun run start:test-agent',
    '🚀 Test agent running with cognitive capabilities',
    '$ bun install --production',
    '⚡ Dependencies installed in 23.4s (50x faster than npm)',
    '$ git status',
    'On branch main. Working tree clean.',
  ]);

  const handleToolLaunch = (tool: DevTool) => {
    console.log('TechnicalMode: Launching tool:', tool.name);
    
    if (onToolLaunch) {
      onToolLaunch(tool.action, { tool: tool.name, user: userId });
    }

    // Simulate tool responses
    const newOutput = [...terminalOutput];
    switch (tool.action) {
      case 'generate_graph':
        newOutput.push('$ bun nx graph --file=dependency-graph.json');
        newOutput.push('📊 Generating project dependency graph...');
        newOutput.push('✅ Graph generated: 47 projects, 213 dependencies');
        break;
      case 'build_plugin':
        newOutput.push('$ bun nx build cognitive-engine');
        newOutput.push('🧠 Building cognitive engine plugin...');
        newOutput.push('✅ Plugin compiled successfully (206ms)');
        break;
      case 'debug_agent':
        newOutput.push('$ bun run start:test-agent --debug');
        newOutput.push('🤖 Starting agent debugger...');
        newOutput.push('🔍 Agent runtime ready for debugging');
        break;
      case 'start_blockchain':
        newOutput.push('$ bun hardhat node --network localhost');
        newOutput.push('⛓️ Starting local blockchain...');
        newOutput.push('🟢 Blockchain running on localhost:8545');
        break;
      case 'profile_system':
        newOutput.push('$ bun run performance:profile');
        newOutput.push('📊 Starting performance analysis...');
        newOutput.push('⚡ System running at 94.2% efficiency');
        break;
      case 'generate_code':
        newOutput.push('$ bun nx g @elizaos/plugin:action cognitive-action');
        newOutput.push('⚡ Generating ElizaOS action scaffold...');
        newOutput.push('✅ Action template created successfully');
        break;
    }

    // Keep last 15 lines
    if (newOutput.length > 15) {
      newOutput.splice(0, newOutput.length - 15);
    }

    setTerminalOutput(newOutput);

    // Update tool status
    setDevTools(prev => prev.map(t => 
      t.action === tool.action 
        ? { ...t, status: t.status === 'running' ? 'available' : 'running' }
        : t
    ));
  };

  const handleQuickCommand = (command: string) => {
    const newOutput = [...terminalOutput, `$ ${command}`];
    
    switch (command) {
      case 'bun nx affected:test':
        newOutput.push('🧪 Running affected tests...');
        newOutput.push('✅ All tests passed (12 suites, 94% coverage)');
        break;
      case 'bun nx affected:build':
        newOutput.push('🔨 Building affected projects...');
        newOutput.push('✅ All builds successful (3 projects)');
        break;
      case 'git status':
        newOutput.push('On branch main');
        newOutput.push('Your branch is up to date with \'origin/main\'');
        newOutput.push('nothing to commit, working tree clean');
        break;
      case 'bun --version':
        newOutput.push('1.2.18');
        break;
    }

    if (newOutput.length > 15) {
      newOutput.splice(0, newOutput.length - 15);
    }

    setTerminalOutput(newOutput);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (duration: string) => {
    if (duration.includes('ms')) {
      return duration;
    }
    if (duration.includes('s')) {
      return duration;
    }
    return `${duration}ms`;
  };

  useEffect(() => {
    // Simulate real-time system metrics updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => prev.map(metric => {
        if (metric.name === 'CPU Usage') {
          const newValue = Math.floor(20 + Math.random() * 15);
          return {
            ...metric,
            value: `${newValue}%`,
            status: newValue > 80 ? 'warning' : 'healthy'
          };
        }
        return metric;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="technical-mode">
      <div className="technical-header">
        <div className="mode-indicator">
          <span className="mode-badge technical">Technical Mode</span>
          <p className="mode-description">Development Environment - Tools & Diagnostics</p>
        </div>
        <div className="quick-commands">
          <button 
            className="command-btn"
            onClick={() => handleQuickCommand('bun nx affected:test')}
          >
            Run Tests
          </button>
          <button 
            className="command-btn"
            onClick={() => handleQuickCommand('bun nx affected:build')}
          >
            Build Projects
          </button>
          <button 
            className="command-btn"
            onClick={() => handleQuickCommand('git status')}
          >
            Git Status
          </button>
        </div>
      </div>

      <div className="technical-grid">
        {/* System Metrics */}
        <section className="metrics-section">
          <h2>System Metrics</h2>
          <div className="metrics-grid">
            {systemMetrics.map((metric, index) => (
              <div key={index} className={`metric-card ${metric.status}`}>
                <div className="metric-header">
                  <h3>{metric.name}</h3>
                  <span className={`status-dot ${metric.status}`}></span>
                </div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-details">{metric.details}</div>
                {metric.trend && (
                  <span className={`trend-arrow ${metric.trend}`}>
                    {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Build Status */}
        <section className="builds-section">
          <h2>Build Status</h2>
          <div className="builds-list">
            {buildInfo.map((build, index) => (
              <div key={index} className={`build-card ${build.status}`}>
                <div className="build-header">
                  <div className="build-info">
                    <h3>{build.project}</h3>
                    <span className="build-details">{build.details}</span>
                  </div>
                  <div className="build-status">
                    <span className={`status-badge ${build.status}`}>
                      {build.status === 'building' ? (
                        <span className="spinner">⚡</span>
                      ) : build.status === 'success' ? '✅' : 
                        build.status === 'failed' ? '❌' : '⏳'}
                    </span>
                    <span className="build-time">
                      {formatTimestamp(build.timestamp)}
                    </span>
                  </div>
                </div>
                <div className="build-footer">
                  <span className="duration">Duration: {formatDuration(build.duration)}</span>
                  {build.coverage && (
                    <span className="coverage">Coverage: {build.coverage}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Quality Metrics */}
        <section className="quality-section">
          <h2>Code Quality</h2>
          <div className="quality-grid">
            {codeMetrics.map((metric, index) => (
              <div key={index} className={`quality-card ${metric.status}`}>
                <h4>{metric.name}</h4>
                <div className="quality-value">
                  <span className="value">{metric.value}</span>
                  <span className="unit">{metric.unit}</span>
                </div>
                <div className="quality-threshold">
                  Threshold: {metric.threshold}{metric.unit}
                </div>
                <div className="quality-bar">
                  <div 
                    className={`quality-fill ${metric.status}`}
                    style={{ 
                      width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Tools */}
        <section className="tools-section">
          <h2>Development Tools</h2>
          <div className="tools-grid">
            {devTools.map((tool, index) => (
              <div key={index} className={`tool-card ${tool.status}`}>
                <div className="tool-header">
                  <span className="tool-icon">{tool.icon}</span>
                  <div className="tool-info">
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>
                </div>
                <button 
                  className={`tool-launch ${tool.status}`}
                  onClick={() => handleToolLaunch(tool)}
                  disabled={tool.status === 'disabled'}
                >
                  {tool.status === 'running' ? 'Stop' : 
                   tool.status === 'disabled' ? 'Disabled' : 'Launch'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Terminal Output */}
        <section className="terminal-section">
          <h2>Terminal Output</h2>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn close"></span>
                <span className="terminal-btn minimize"></span>
                <span className="terminal-btn maximize"></span>
              </div>
              <span className="terminal-title">371 OS Development Terminal</span>
            </div>
            <div className="terminal-content">
              {terminalOutput.map((line, index) => (
                <div key={index} className={`terminal-line ${line.startsWith('$') ? 'command' : 'output'}`}>
                  {line}
                </div>
              ))}
              <div className="terminal-cursor">_</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechnicalMode;