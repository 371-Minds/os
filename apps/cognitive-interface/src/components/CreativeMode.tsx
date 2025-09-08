/**
 * CreativeMode.tsx - Content Creation and Marketing Workspace
 *
 * This component implements the Creative cognitive mode for content creation,
 * marketing campaigns, design work, and creative ideation. It emphasizes
 * visual elements, inspiration, and creative workflows.
 *
 * Part of the revolutionary Galaxy Engine cognitive-aware interface system.
 */

import type React from 'react';
import { useEffect, useState } from 'react';
import './CreativeMode.css';

interface CreativeProject {
  id: string;
  title: string;
  type: 'campaign' | 'content' | 'design' | 'video' | 'social';
  status: 'idea' | 'draft' | 'review' | 'published' | 'archived';
  progress: number;
  dueDate?: Date;
  tags: string[];
  thumbnail?: string;
}

interface ContentMetric {
  name: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface CreativeInsight {
  type: 'trend' | 'opportunity' | 'performance' | 'idea';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

interface CreativeTool {
  name: string;
  description: string;
  category: 'design' | 'video' | 'writing' | 'analytics' | 'social';
  icon: string;
  status: 'available' | 'premium' | 'coming-soon';
}

interface CreativeModeProps {
  userId?: string;
  onModeSwitch?: (mode: string) => void;
  onProjectCreate?: (project: Partial<CreativeProject>) => void;
  onToolLaunch?: (tool: string) => void;
}

export const CreativeMode: React.FC<CreativeModeProps> = ({
  userId = 'creative-user',
  onModeSwitch,
  onProjectCreate,
  onToolLaunch,
}) => {
  const [projects, setProjects] = useState<CreativeProject[]>([
    {
      id: '1',
      title: 'Galaxy Engine Launch Campaign',
      type: 'campaign',
      status: 'draft',
      progress: 75,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      tags: ['cognitive-ui', 'launch', 'revolutionary'],
      thumbnail: '🌌',
    },
    {
      id: '2',
      title: 'Cognitive OS Demo Video',
      type: 'video',
      status: 'review',
      progress: 90,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      tags: ['demo', 'technical', 'marketing'],
      thumbnail: '🎬',
    },
    {
      id: '3',
      title: "Reader's Constellation UI Design",
      type: 'design',
      status: 'idea',
      progress: 25,
      tags: ['ui-design', 'prototype', 'galaxy-engine'],
      thumbnail: '📚',
    },
    {
      id: '4',
      title: 'Social Media Content Series',
      type: 'social',
      status: 'published',
      progress: 100,
      tags: ['social-media', 'engagement', 'brand'],
      thumbnail: '📱',
    },
  ]);

  const [contentMetrics, setContentMetrics] = useState<ContentMetric[]>([
    {
      name: 'Engagement Rate',
      value: '8.4%',
      change: 23,
      icon: '❤️',
      color: '#ef4444',
    },
    { name: 'Reach', value: '45.2K', change: 15, icon: '👥', color: '#3b82f6' },
    {
      name: 'Conversions',
      value: '312',
      change: 45,
      icon: '🎯',
      color: '#10b981',
    },
    {
      name: 'Brand Mentions',
      value: '89',
      change: 67,
      icon: '🗣️',
      color: '#f59e0b',
    },
  ]);

  const [creativeInsights, setCreativeInsights] = useState<CreativeInsight[]>([
    {
      type: 'trend',
      title: 'Cognitive UI Content Trending',
      description:
        'Content about adaptive interfaces is gaining 340% more engagement this week',
      confidence: 94,
      actionable: true,
    },
    {
      type: 'opportunity',
      title: 'Video Content Gap',
      description:
        'Technical demo videos are performing 2x better than static content',
      confidence: 87,
      actionable: true,
    },
    {
      type: 'performance',
      title: 'Galaxy Engine Messaging',
      description:
        'Universe metaphors resonate strongly with developer audience (+89% engagement)',
      confidence: 91,
      actionable: false,
    },
  ]);

  const [creativeTools, setCreativeTools] = useState<CreativeTool[]>([
    {
      name: 'AI Content Generator',
      description: 'Generate marketing copy using cognitive awareness',
      category: 'writing',
      icon: '✍️',
      status: 'available',
    },
    {
      name: 'Universe Visualizer',
      description: 'Create Galaxy Engine concept visuals',
      category: 'design',
      icon: '🌌',
      status: 'available',
    },
    {
      name: 'Demo Video Builder',
      description: 'Automated technical demo generation',
      category: 'video',
      icon: '🎥',
      status: 'available',
    },
    {
      name: 'Social Scheduler',
      description: 'AI-optimized posting schedule',
      category: 'social',
      icon: '📅',
      status: 'premium',
    },
    {
      name: 'Engagement Analytics',
      description: 'Deep dive into content performance',
      category: 'analytics',
      icon: '📊',
      status: 'available',
    },
    {
      name: 'Brand Voice AI',
      description: 'Maintain consistent brand personality',
      category: 'writing',
      icon: '🎭',
      status: 'coming-soon',
    },
  ]);

  const [inspirationBoard, setInspirationBoard] = useState<string[]>([
    '🌌 "Software that thinks with you, not against you"',
    '🧠 "The first interface that understands your mind"',
    '🚀 "From static screens to living universes"',
    '⚡ "97.6% cost reduction meets infinite possibilities"',
    '🎯 "Every click is a conversation with consciousness"',
  ]);

  const handleProjectAction = (projectId: string, action: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          switch (action) {
            case 'advance': {
              const nextStatus = {
                idea: 'draft',
                draft: 'review',
                review: 'published',
                published: 'archived',
              } as const;
              return {
                ...project,
                status:
                  nextStatus[project.status as keyof typeof nextStatus] ||
                  project.status,
                progress: Math.min(project.progress + 25, 100),
              };
            }
            case 'edit':
              console.log('Opening editor for:', project.title);
              break;
            case 'duplicate': {
              const newProject = {
                ...project,
                id: Date.now().toString(),
                title: `${project.title} (Copy)`,
                status: 'idea' as const,
                progress: 0,
              };
              setProjects((prev) => [...prev, newProject]);
              break;
            }
          }
        }
        return project;
      }),
    );
  };

  const handleCreateProject = (type: CreativeProject['type']) => {
    const newProject: CreativeProject = {
      id: Date.now().toString(),
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Project`,
      type,
      status: 'idea',
      progress: 0,
      tags: ['new-project'],
      thumbnail:
        type === 'campaign'
          ? '🚀'
          : type === 'video'
            ? '🎬'
            : type === 'design'
              ? '🎨'
              : type === 'content'
                ? '📝'
                : '📱',
    };

    setProjects((prev) => [newProject, ...prev]);

    if (onProjectCreate) {
      onProjectCreate(newProject);
    }
  };

  const handleToolLaunch = (tool: CreativeTool) => {
    console.log('CreativeMode: Launching tool:', tool.name);

    if (onToolLaunch) {
      onToolLaunch(tool.name);
    }

    // Simulate tool launches with creative feedback
    switch (tool.name) {
      case 'AI Content Generator':
        alert(
          '🧠 AI Content Generator activated! Ready to create cognitive-aware marketing copy.',
        );
        break;
      case 'Universe Visualizer':
        alert(
          '🌌 Universe Visualizer launched! Creating Galaxy Engine concept visuals...',
        );
        break;
      case 'Demo Video Builder':
        alert(
          '🎥 Demo Video Builder ready! Generating technical demonstration content.',
        );
        break;
      case 'Social Scheduler':
        alert(
          '📅 Premium feature! Social Scheduler optimizing posting times with AI.',
        );
        break;
      case 'Engagement Analytics':
        alert(
          '📊 Analytics dashboard opening! Deep dive into content performance data.',
        );
        break;
      case 'Brand Voice AI':
        alert(
          '🎭 Coming soon! Brand Voice AI will maintain consistent personality across all content.',
        );
        break;
    }
  };

  const handleInsightAction = (insight: CreativeInsight, action: string) => {
    console.log('Acting on insight:', insight.title, action);

    switch (action) {
      case 'create-content':
        handleCreateProject('content');
        break;
      case 'analyze':
        alert(
          `📊 Analyzing ${insight.title}... Opening detailed insights dashboard.`,
        );
        break;
      case 'implement':
        alert(`⚡ Implementing recommendation: ${insight.title}`);
        break;
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  const getStatusColor = (status: CreativeProject['status']) => {
    switch (status) {
      case 'idea':
        return '#64748b';
      case 'draft':
        return '#f59e0b';
      case 'review':
        return '#3b82f6';
      case 'published':
        return '#10b981';
      case 'archived':
        return '#6b7280';
      default:
        return '#64748b';
    }
  };

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setContentMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.name === 'Engagement Rate'
              ? `${(8.4 + Math.random() * 0.4).toFixed(1)}%`
              : metric.value,
        })),
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="creative-mode">
      <div className="creative-header">
        <div className="mode-indicator">
          <span className="mode-badge creative">Creative Mode</span>
          <p className="mode-description">
            Content Creation & Marketing Workspace
          </p>
        </div>
        <div className="creative-actions">
          <div className="quick-create">
            <button
              className="create-btn campaign"
              onClick={() => handleCreateProject('campaign')}
            >
              🚀 Campaign
            </button>
            <button
              className="create-btn content"
              onClick={() => handleCreateProject('content')}
            >
              📝 Content
            </button>
            <button
              className="create-btn design"
              onClick={() => handleCreateProject('design')}
            >
              🎨 Design
            </button>
            <button
              className="create-btn video"
              onClick={() => handleCreateProject('video')}
            >
              🎬 Video
            </button>
          </div>
        </div>
      </div>

      <div className="creative-grid">
        {/* Content Metrics Dashboard */}
        <section className="metrics-section">
          <h2>Content Performance</h2>
          <div className="metrics-grid">
            {contentMetrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-icon" style={{ color: metric.color }}>
                  {metric.icon}
                </div>
                <div className="metric-info">
                  <h3>{metric.name}</h3>
                  <div className="metric-value">{metric.value}</div>
                  <div
                    className={`metric-change ${metric.change >= 0 ? 'positive' : 'negative'}`}
                  >
                    {metric.change >= 0 ? '↗' : '↘'} {Math.abs(metric.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Projects */}
        <section className="projects-section">
          <h2>Creative Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <div className="project-thumbnail">{project.thumbnail}</div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <div className="project-meta">
                      <span className={`status-badge ${project.status}`}>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                      <span className={`type-badge ${project.type}`}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="project-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: getStatusColor(project.status),
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>

                {project.dueDate && (
                  <div
                    className={`due-date ${project.dueDate < new Date() ? 'overdue' : ''}`}
                  >
                    {formatDueDate(project.dueDate)}
                  </div>
                )}

                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleProjectAction(project.id, 'edit')}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn advance"
                    onClick={() => handleProjectAction(project.id, 'advance')}
                    disabled={project.status === 'archived'}
                  >
                    {project.status === 'idea'
                      ? 'Start'
                      : project.status === 'draft'
                        ? 'Review'
                        : project.status === 'review'
                          ? 'Publish'
                          : 'Archive'}
                  </button>
                  <button
                    className="action-btn duplicate"
                    onClick={() => handleProjectAction(project.id, 'duplicate')}
                  >
                    Duplicate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creative Tools */}
        <section className="tools-section">
          <h2>Creative Tools</h2>
          <div className="tools-grid">
            {creativeTools.map((tool, index) => (
              <div key={index} className={`tool-card ${tool.status}`}>
                <div className="tool-header">
                  <span className="tool-icon">{tool.icon}</span>
                  <div className="tool-info">
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>
                </div>
                <div className="tool-footer">
                  <span className={`category-badge ${tool.category}`}>
                    {tool.category}
                  </span>
                  <button
                    className={`tool-launch ${tool.status}`}
                    onClick={() => handleToolLaunch(tool)}
                    disabled={tool.status === 'coming-soon'}
                  >
                    {tool.status === 'premium'
                      ? 'Premium'
                      : tool.status === 'coming-soon'
                        ? 'Soon'
                        : 'Launch'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creative Insights */}
        <section className="insights-section">
          <h2>Creative Insights</h2>
          <div className="insights-list">
            {creativeInsights.map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <div className="insight-header">
                  <div className="insight-type">
                    <span className={`type-icon ${insight.type}`}>
                      {insight.type === 'trend'
                        ? '📈'
                        : insight.type === 'opportunity'
                          ? '💡'
                          : insight.type === 'performance'
                            ? '🎯'
                            : '💭'}
                    </span>
                    <span className="type-label">
                      {insight.type.charAt(0).toUpperCase() +
                        insight.type.slice(1)}
                    </span>
                  </div>
                  <div className="confidence-score">
                    {insight.confidence}% confidence
                  </div>
                </div>

                <h3>{insight.title}</h3>
                <p>{insight.description}</p>

                {insight.actionable && (
                  <div className="insight-actions">
                    <button
                      className="insight-btn primary"
                      onClick={() =>
                        handleInsightAction(insight, 'create-content')
                      }
                    >
                      Create Content
                    </button>
                    <button
                      className="insight-btn secondary"
                      onClick={() => handleInsightAction(insight, 'analyze')}
                    >
                      Analyze
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Inspiration Board */}
        <section className="inspiration-section">
          <h2>Inspiration Board</h2>
          <div className="inspiration-grid">
            {inspirationBoard.map((inspiration, index) => (
              <div key={index} className="inspiration-card">
                <p>{inspiration}</p>
                <button className="inspiration-action">Use This →</button>
              </div>
            ))}
            <div className="inspiration-card add-new">
              <button className="add-inspiration">
                <span className="add-icon">+</span>
                Add Inspiration
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreativeMode;
