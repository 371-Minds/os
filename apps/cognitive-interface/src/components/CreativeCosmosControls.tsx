/**
 * CreativeCosmosControls.tsx - Creative Universe Navigation & Control Interface
 *
 * Professional control interface for the Creator's Cosmos spatial creative environment.
 * Provides comprehensive navigation, creative workflow management, and project coordination.
 *
 * Part of the Galaxy Engine cognitive-aware interface revolution.
 */

import React, { useCallback, useEffect, useState } from 'react';
import './CreativeCosmosControls.css';

interface CreativeProject {
  id: string;
  title: string;
  type: 'campaign' | 'content' | 'design' | 'video' | 'social' | 'brand';
  status: 'idea' | 'draft' | 'review' | 'published' | 'archived';
  progress: number;
  engagement: number;
  creativity: number;
  impact: number;
  lastUpdated: Date;
}

interface CreativeFlow {
  id: string;
  name: string;
  status: 'ideation' | 'creation' | 'review' | 'publication';
  progress: number;
  energy: number;
}

interface CosmosControls {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedProject: string | null;
  viewMode: 'cosmos' | 'constellation' | 'particle';
  showParticles: boolean;
  showFlows: boolean;
  showInspiration: boolean;
  showEngagement: boolean;
  animationSpeed: number;
}

interface CreativeAction {
  id: string;
  name: string;
  description: string;
  category: 'ideation' | 'creation' | 'optimization' | 'publishing';
  status: 'available' | 'running' | 'completed' | 'failed';
  progress?: number;
  result?: string;
}

interface CreativeCosmosControlsProps {
  projects: CreativeProject[];
  creativeFlows: CreativeFlow[];
  controls: CosmosControls;
  onControlsChange: (controls: CosmosControls) => void;
  onProjectFilter: (filters: ProjectFilters) => void;
  onCreativeAction: (action: CreativeAction) => void;
  onExportData: () => void;
  onResetView: () => void;
}

interface ProjectFilters {
  types: string[];
  statuses: string[];
  progressRange: [number, number];
  creativityRange: [number, number];
  sortBy: 'lastUpdated' | 'progress' | 'engagement' | 'creativity' | 'impact';
  sortOrder: 'asc' | 'desc';
}

export const CreativeCosmosControls: React.FC<CreativeCosmosControlsProps> = ({
  projects,
  creativeFlows,
  controls,
  onControlsChange,
  onProjectFilter,
  onCreativeAction,
  onExportData,
  onResetView,
}) => {
  const [activePanel, setActivePanel] = useState<
    'navigation' | 'projects' | 'workflows' | 'actions'
  >('navigation');
  const [projectFilters, setProjectFilters] = useState<ProjectFilters>({
    types: [],
    statuses: [],
    progressRange: [0, 100],
    creativityRange: [0, 100],
    sortBy: 'lastUpdated',
    sortOrder: 'desc',
  });
  const [creativeActions, setCreativeActions] = useState<CreativeAction[]>([]);
  const [realTimeMode, setRealTimeMode] = useState(true);

  // Initialize creative actions
  useEffect(() => {
    const actions: CreativeAction[] = [
      {
        id: 'generate-ideas',
        name: 'Generate Ideas',
        description: 'AI-powered ideation for new creative projects',
        category: 'ideation',
        status: 'available',
      },
      {
        id: 'analyze-engagement',
        name: 'Analyze Engagement',
        description: 'Deep analysis of content engagement patterns',
        category: 'optimization',
        status: 'available',
      },
      {
        id: 'optimize-content',
        name: 'Optimize Content',
        description: 'AI-driven content optimization suggestions',
        category: 'optimization',
        status: 'available',
      },
      {
        id: 'schedule-campaign',
        name: 'Schedule Campaign',
        description: 'Intelligent campaign scheduling and coordination',
        category: 'publishing',
        status: 'available',
      },
      {
        id: 'create-variants',
        name: 'Create Variants',
        description: 'Generate creative variations for A/B testing',
        category: 'creation',
        status: 'available',
      },
      {
        id: 'sync-platforms',
        name: 'Sync Platforms',
        description: 'Synchronize content across all creative platforms',
        category: 'publishing',
        status: 'available',
      },
    ];
    setCreativeActions(actions);
  }, []);

  // Update controls
  const updateControls = useCallback(
    (updates: Partial<CosmosControls>) => {
      onControlsChange({ ...controls, ...updates });
    },
    [controls, onControlsChange],
  );

  // Handle project filtering
  const handleFilterChange = useCallback(
    (newFilters: Partial<ProjectFilters>) => {
      const updatedFilters = { ...projectFilters, ...newFilters };
      setProjectFilters(updatedFilters);
      onProjectFilter(updatedFilters);
    },
    [projectFilters, onProjectFilter],
  );

  // Execute creative action
  const executeAction = useCallback(
    async (action: CreativeAction) => {
      setCreativeActions((prev) =>
        prev.map((a) =>
          a.id === action.id ? { ...a, status: 'running', progress: 0 } : a,
        ),
      );

      // Simulate action execution
      const duration = 2000 + Math.random() * 3000;
      const startTime = Date.now();

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);

        setCreativeActions((prev) =>
          prev.map((a) => (a.id === action.id ? { ...a, progress } : a)),
        );

        if (progress < 100) {
          setTimeout(updateProgress, 100);
        } else {
          setCreativeActions((prev) =>
            prev.map((a) =>
              a.id === action.id
                ? {
                    ...a,
                    status: 'completed',
                    result: `${action.name} completed successfully!`,
                  }
                : a,
            ),
          );

          onCreativeAction({ ...action, status: 'completed' });

          // Reset to available after 3 seconds
          setTimeout(() => {
            setCreativeActions((prev) =>
              prev.map((a) =>
                a.id === action.id
                  ? { ...a, status: 'available', progress: undefined }
                  : a,
              ),
            );
          }, 3000);
        }
      };

      updateProgress();
    },
    [onCreativeAction],
  );

  // Calculate project statistics
  const projectStats = React.useMemo(() => {
    const total = projects.length;
    const byStatus = projects.reduce(
      (acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const avgProgress =
      projects.reduce((sum, p) => sum + p.progress, 0) / total || 0;
    const avgCreativity =
      projects.reduce((sum, p) => sum + p.creativity, 0) / total || 0;
    const avgEngagement =
      projects.reduce((sum, p) => sum + p.engagement, 0) / total || 0;

    return {
      total,
      byStatus,
      avgProgress,
      avgCreativity,
      avgEngagement,
    };
  }, [projects]);

  return (
    <div className="creative-cosmos-controls">
      {/* Control Panel Header */}
      <div className="controls-header">
        <h2 className="controls-title">Creator's Cosmos</h2>
        <div className="real-time-indicator">
          <span
            className={`status-dot ${realTimeMode ? 'active' : 'inactive'}`}
          ></span>
          <span className="status-text">
            {realTimeMode ? 'Real-time Sync' : 'Manual Mode'}
          </span>
        </div>
      </div>

      {/* Panel Navigation */}
      <div className="panel-navigation">
        {[
          { id: 'navigation', label: 'Navigation', icon: '🧭' },
          { id: 'projects', label: 'Projects', icon: '🎨' },
          { id: 'workflows', label: 'Workflows', icon: '⚡' },
          { id: 'actions', label: 'Actions', icon: '🚀' },
        ].map((panel) => (
          <button
            key={panel.id}
            className={`panel-tab ${activePanel === panel.id ? 'active' : ''}`}
            onClick={() => setActivePanel(panel.id as any)}
          >
            <span className="panel-icon">{panel.icon}</span>
            <span className="panel-label">{panel.label}</span>
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="panel-content">
        {/* Navigation Panel */}
        {activePanel === 'navigation' && (
          <div className="navigation-panel">
            <div className="control-group">
              <label className="control-label">View Mode</label>
              <div className="view-mode-selector">
                {['cosmos', 'constellation', 'particle'].map((mode) => (
                  <button
                    key={mode}
                    className={`view-mode-btn ${controls.viewMode === mode ? 'active' : ''}`}
                    onClick={() => updateControls({ viewMode: mode as any })}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">Zoom Level</label>
              <div className="zoom-controls">
                <button
                  className="zoom-btn"
                  onClick={() =>
                    updateControls({
                      zoomLevel: Math.max(0.1, controls.zoomLevel - 0.1),
                    })
                  }
                >
                  −
                </button>
                <span className="zoom-value">
                  {(controls.zoomLevel * 100).toFixed(0)}%
                </span>
                <button
                  className="zoom-btn"
                  onClick={() =>
                    updateControls({
                      zoomLevel: Math.min(3.0, controls.zoomLevel + 0.1),
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">Animation Speed</label>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={controls.animationSpeed}
                onChange={(e) =>
                  updateControls({ animationSpeed: parseFloat(e.target.value) })
                }
                className="speed-slider"
              />
              <span className="speed-value">
                {controls.animationSpeed.toFixed(1)}x
              </span>
            </div>

            <div className="control-group">
              <label className="control-label">Display Options</label>
              <div className="display-options">
                {[
                  { key: 'showParticles', label: 'Particles' },
                  { key: 'showFlows', label: 'Creative Flows' },
                  { key: 'showInspiration', label: 'Inspiration' },
                  { key: 'showEngagement', label: 'Engagement' },
                ].map((option) => (
                  <label key={option.key} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={
                        controls[option.key as keyof CosmosControls] as boolean
                      }
                      onChange={(e) =>
                        updateControls({ [option.key]: e.target.checked })
                      }
                    />
                    <span className="checkbox-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="control-group">
              <button className="reset-view-btn" onClick={onResetView}>
                🎯 Reset View
              </button>
            </div>
          </div>
        )}

        {/* Projects Panel */}
        {activePanel === 'projects' && (
          <div className="projects-panel">
            <div className="project-stats">
              <div className="stat-item">
                <span className="stat-value">{projectStats.total}</span>
                <span className="stat-label">Total Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {projectStats.avgProgress.toFixed(0)}%
                </span>
                <span className="stat-label">Avg Progress</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {projectStats.avgCreativity.toFixed(0)}
                </span>
                <span className="stat-label">Avg Creativity</span>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Filter Projects</h4>

              <div className="filter-group">
                <label className="filter-label">Project Types</label>
                <div className="filter-checkboxes">
                  {[
                    'campaign',
                    'content',
                    'design',
                    'video',
                    'social',
                    'brand',
                  ].map((type) => (
                    <label key={type} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={projectFilters.types.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...projectFilters.types, type]
                            : projectFilters.types.filter((t) => t !== type);
                          handleFilterChange({ types: newTypes });
                        }}
                      />
                      <span className="filter-text">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Status</label>
                <div className="filter-checkboxes">
                  {['idea', 'draft', 'review', 'published', 'archived'].map(
                    (status) => (
                      <label key={status} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={projectFilters.statuses.includes(status)}
                          onChange={(e) => {
                            const newStatuses = e.target.checked
                              ? [...projectFilters.statuses, status]
                              : projectFilters.statuses.filter(
                                  (s) => s !== status,
                                );
                            handleFilterChange({ statuses: newStatuses });
                          }}
                        />
                        <span className="filter-text">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                  value={projectFilters.sortBy}
                  onChange={(e) =>
                    handleFilterChange({ sortBy: e.target.value as any })
                  }
                  className="sort-select"
                >
                  <option value="lastUpdated">Last Updated</option>
                  <option value="progress">Progress</option>
                  <option value="engagement">Engagement</option>
                  <option value="creativity">Creativity</option>
                  <option value="impact">Impact</option>
                </select>
              </div>
            </div>

            <div className="project-list">
              {projects.slice(0, 10).map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-header">
                    <span className="project-name">{project.title}</span>
                    <span className={`project-status status-${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="project-metrics">
                    <div className="metric">
                      <span className="metric-label">Progress</span>
                      <span className="metric-value">{project.progress}%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Creativity</span>
                      <span className="metric-value">{project.creativity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflows Panel */}
        {activePanel === 'workflows' && (
          <div className="workflows-panel">
            <div className="workflow-stats">
              <div className="stat-item">
                <span className="stat-value">{creativeFlows.length}</span>
                <span className="stat-label">Active Flows</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {creativeFlows.reduce((sum, flow) => sum + flow.progress, 0) /
                    creativeFlows.length || 0}
                  %
                </span>
                <span className="stat-label">Avg Progress</span>
              </div>
            </div>

            <div className="workflow-list">
              {creativeFlows.map((flow) => (
                <div key={flow.id} className="workflow-item">
                  <div className="workflow-header">
                    <span className="workflow-name">{flow.name}</span>
                    <span className={`workflow-status status-${flow.status}`}>
                      {flow.status}
                    </span>
                  </div>
                  <div className="workflow-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${flow.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{flow.progress}%</span>
                  </div>
                  <div className="workflow-energy">
                    <span className="energy-label">Energy:</span>
                    <span className="energy-value">{flow.energy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Panel */}
        {activePanel === 'actions' && (
          <div className="actions-panel">
            <div className="actions-header">
              <h4 className="actions-title">Creative Actions</h4>
              <div className="real-time-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={realTimeMode}
                    onChange={(e) => setRealTimeMode(e.target.checked)}
                  />
                  <span className="toggle-text">Real-time Mode</span>
                </label>
              </div>
            </div>

            <div className="actions-grid">
              {creativeActions.map((action) => (
                <div key={action.id} className={`action-card ${action.status}`}>
                  <div className="action-header">
                    <span className="action-name">{action.name}</span>
                    <span className={`action-status status-${action.status}`}>
                      {action.status}
                    </span>
                  </div>
                  <p className="action-description">{action.description}</p>

                  {action.status === 'running' &&
                    action.progress !== undefined && (
                      <div className="action-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${action.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {action.progress.toFixed(0)}%
                        </span>
                      </div>
                    )}

                  {action.result && (
                    <div className="action-result">{action.result}</div>
                  )}

                  <button
                    className="action-btn"
                    onClick={() => executeAction(action)}
                    disabled={action.status === 'running'}
                  >
                    {action.status === 'running' ? 'Running...' : 'Execute'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export Controls */}
      <div className="export-controls">
        <button className="export-btn" onClick={onExportData}>
          📊 Export Data
        </button>
      </div>
    </div>
  );
};

export default CreativeCosmosControls;
