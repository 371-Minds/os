/**
 * DeveloperGalaxyControls.tsx - Navigation Controls for Developer's Galaxy
 *
 * Advanced control interface for navigating the spatial development environment,
 * including project filtering, build controls, and galaxy navigation.
 */

import type React from 'react';
import { useCallback, useState } from 'react';
import './DeveloperGalaxyControls.css';

interface GalaxyViewControls {
  viewMode: 'galaxy' | 'system' | 'module';
  zoomLevel: number;
  showDependencies: boolean;
  showBuildPipelines: boolean;
  showMetrics: boolean;
  showTests: boolean;
  filterByType: string[];
  filterByStatus: string[];
  animationSpeed: number;
}

interface BuildControl {
  action: 'build' | 'test' | 'lint' | 'deploy';
  targets: string[];
  parallel: boolean;
  watch: boolean;
}

interface DeveloperGalaxyControlsProps {
  controls: GalaxyViewControls;
  onControlsChange: (controls: GalaxyViewControls) => void;
  onBuildAction: (action: BuildControl) => void;
  onNavigate: (direction: 'zoom-in' | 'zoom-out' | 'center' | 'fit') => void;
  onProjectFilter: (filter: string) => void;
  selectedProjects: string[];
  buildStatus: 'idle' | 'running' | 'success' | 'failed';
  lastBuildTime?: Date;
}

export const DeveloperGalaxyControls: React.FC<
  DeveloperGalaxyControlsProps
> = ({
  controls,
  onControlsChange,
  onBuildAction,
  onNavigate,
  onProjectFilter,
  selectedProjects,
  buildStatus,
  lastBuildTime,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [buildTargets, setBuildTargets] = useState<string[]>([]);
  const [buildOptions, setBuildOptions] = useState({
    parallel: true,
    watch: false,
    skipCache: false,
  });

  const updateControl = useCallback(
    (key: keyof GalaxyViewControls, value: any) => {
      onControlsChange({
        ...controls,
        [key]: value,
      });
    },
    [controls, onControlsChange],
  );

  const handleViewModeChange = useCallback(
    (mode: GalaxyViewControls['viewMode']) => {
      updateControl('viewMode', mode);
    },
    [updateControl],
  );

  const handleZoomChange = useCallback(
    (delta: number) => {
      const newZoom = Math.max(0.1, Math.min(5.0, controls.zoomLevel + delta));
      updateControl('zoomLevel', newZoom);
    },
    [controls.zoomLevel, updateControl],
  );

  const handleBuildAction = useCallback(
    (action: BuildControl['action']) => {
      const targets = selectedProjects.length > 0 ? selectedProjects : ['all'];

      onBuildAction({
        action,
        targets,
        parallel: buildOptions.parallel,
        watch: buildOptions.watch,
      });
    },
    [selectedProjects, buildOptions, onBuildAction],
  );

  const handleFilterToggle = useCallback(
    (filterType: 'type' | 'status', value: string) => {
      const currentFilter =
        filterType === 'type' ? controls.filterByType : controls.filterByStatus;
      const newFilter = currentFilter.includes(value)
        ? currentFilter.filter((f) => f !== value)
        : [...currentFilter, value];

      updateControl(
        filterType === 'type' ? 'filterByType' : 'filterByStatus',
        newFilter,
      );
    },
    [controls, updateControl],
  );

  const formatBuildTime = () => {
    if (!lastBuildTime) return 'Never';
    const now = new Date();
    const diff = now.getTime() - lastBuildTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) return `${minutes}m ${seconds}s ago`;
    return `${seconds}s ago`;
  };

  const getBuildStatusIcon = () => {
    switch (buildStatus) {
      case 'running':
        return '⚡';
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏸️';
    }
  };

  return (
    <div
      className={`developer-galaxy-controls ${isExpanded ? 'expanded' : 'collapsed'}`}
    >
      {/* Main Control Panel */}
      <div className="control-panel">
        <div className="panel-header">
          <div className="header-info">
            <h3 className="panel-title">🌌 Developer's Galaxy</h3>
            <div className="build-status">
              <span className={`status-indicator ${buildStatus}`}>
                {getBuildStatusIcon()}
              </span>
              <span className="status-text">
                {buildStatus === 'running'
                  ? 'Building...'
                  : `Last: ${formatBuildTime()}`}
              </span>
            </div>
          </div>
          <button
            className="expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse Controls' : 'Expand Controls'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>

        {/* Quick Controls - Always Visible */}
        <div className="quick-controls">
          <div className="view-mode-selector">
            <button
              className={`mode-btn ${controls.viewMode === 'galaxy' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('galaxy')}
              title="Galaxy Overview"
            >
              🌌 Galaxy
            </button>
            <button
              className={`mode-btn ${controls.viewMode === 'system' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('system')}
              title="System View"
            >
              ⭐ System
            </button>
            <button
              className={`mode-btn ${controls.viewMode === 'module' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('module')}
              title="Module Details"
            >
              🔬 Module
            </button>
          </div>

          <div className="build-actions">
            <button
              className={`build-btn ${buildStatus === 'running' ? 'disabled' : ''}`}
              onClick={() => handleBuildAction('build')}
              disabled={buildStatus === 'running'}
              title="Build Selected Projects"
            >
              🔨 Build
            </button>
            <button
              className={`test-btn ${buildStatus === 'running' ? 'disabled' : ''}`}
              onClick={() => handleBuildAction('test')}
              disabled={buildStatus === 'running'}
              title="Run Tests"
            >
              🧪 Test
            </button>
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="expanded-controls">
            {/* Navigation Controls */}
            <div className="control-section">
              <h4>🧭 Navigation</h4>
              <div className="navigation-controls">
                <div className="zoom-controls">
                  <label>Zoom: {controls.zoomLevel.toFixed(1)}x</label>
                  <div className="zoom-buttons">
                    <button
                      onClick={() => handleZoomChange(-0.2)}
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="0.1"
                      max="5.0"
                      step="0.1"
                      value={controls.zoomLevel}
                      onChange={(e) =>
                        updateControl('zoomLevel', parseFloat(e.target.value))
                      }
                    />
                    <button
                      onClick={() => handleZoomChange(0.2)}
                      title="Zoom In"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="nav-buttons">
                  <button
                    onClick={() => onNavigate('center')}
                    title="Center View"
                  >
                    🎯 Center
                  </button>
                  <button
                    onClick={() => onNavigate('fit')}
                    title="Fit All Projects"
                  >
                    📐 Fit All
                  </button>
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div className="control-section">
              <h4>👁️ Display</h4>
              <div className="display-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={controls.showDependencies}
                    onChange={(e) =>
                      updateControl('showDependencies', e.target.checked)
                    }
                  />
                  Show Dependencies
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={controls.showBuildPipelines}
                    onChange={(e) =>
                      updateControl('showBuildPipelines', e.target.checked)
                    }
                  />
                  Show Build Pipelines
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={controls.showMetrics}
                    onChange={(e) =>
                      updateControl('showMetrics', e.target.checked)
                    }
                  />
                  Show Metrics
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={controls.showTests}
                    onChange={(e) =>
                      updateControl('showTests', e.target.checked)
                    }
                  />
                  Show Test Coverage
                </label>
              </div>
            </div>

            {/* Project Filters */}
            <div className="control-section">
              <h4>🔍 Filters</h4>
              <div className="filter-section">
                <div className="filter-group">
                  <label>Project Types:</label>
                  <div className="filter-buttons">
                    {['application', 'library', 'plugin', 'service'].map(
                      (type) => (
                        <button
                          key={type}
                          className={`filter-btn ${controls.filterByType.includes(type) ? 'active' : ''}`}
                          onClick={() => handleFilterToggle('type', type)}
                        >
                          {type}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="filter-group">
                  <label>Build Status:</label>
                  <div className="filter-buttons">
                    {['success', 'failed', 'building', 'pending'].map(
                      (status) => (
                        <button
                          key={status}
                          className={`filter-btn ${controls.filterByStatus.includes(status) ? 'active' : ''}`}
                          onClick={() => handleFilterToggle('status', status)}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Build Configuration */}
            <div className="control-section">
              <h4>🔨 Build Configuration</h4>
              <div className="build-config">
                <div className="build-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={buildOptions.parallel}
                      onChange={(e) =>
                        setBuildOptions((prev) => ({
                          ...prev,
                          parallel: e.target.checked,
                        }))
                      }
                    />
                    Parallel Execution
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={buildOptions.watch}
                      onChange={(e) =>
                        setBuildOptions((prev) => ({
                          ...prev,
                          watch: e.target.checked,
                        }))
                      }
                    />
                    Watch Mode
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={buildOptions.skipCache}
                      onChange={(e) =>
                        setBuildOptions((prev) => ({
                          ...prev,
                          skipCache: e.target.checked,
                        }))
                      }
                    />
                    Skip Cache
                  </label>
                </div>

                <div className="build-actions-extended">
                  <button
                    className="action-btn build"
                    onClick={() => handleBuildAction('build')}
                    disabled={buildStatus === 'running'}
                  >
                    🔨 Build{' '}
                    {selectedProjects.length > 0
                      ? `(${selectedProjects.length})`
                      : 'All'}
                  </button>
                  <button
                    className="action-btn test"
                    onClick={() => handleBuildAction('test')}
                    disabled={buildStatus === 'running'}
                  >
                    🧪 Test{' '}
                    {selectedProjects.length > 0
                      ? `(${selectedProjects.length})`
                      : 'All'}
                  </button>
                  <button
                    className="action-btn lint"
                    onClick={() => handleBuildAction('lint')}
                    disabled={buildStatus === 'running'}
                  >
                    📝 Lint{' '}
                    {selectedProjects.length > 0
                      ? `(${selectedProjects.length})`
                      : 'All'}
                  </button>
                  <button
                    className="action-btn deploy"
                    onClick={() => handleBuildAction('deploy')}
                    disabled={
                      buildStatus === 'running' || selectedProjects.length === 0
                    }
                  >
                    🚀 Deploy ({selectedProjects.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Controls */}
            <div className="control-section">
              <h4>⚡ Performance</h4>
              <div className="performance-controls">
                <div className="animation-speed">
                  <label>
                    Animation Speed: {controls.animationSpeed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={controls.animationSpeed}
                    onChange={(e) =>
                      updateControl(
                        'animationSpeed',
                        parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mini Stats Panel */}
      <div className="mini-stats">
        <div className="stat-item">
          <span className="stat-label">Projects</span>
          <span className="stat-value">{selectedProjects.length || 'All'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">View</span>
          <span className="stat-value">{controls.viewMode}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Zoom</span>
          <span className="stat-value">{controls.zoomLevel.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperGalaxyControls;
