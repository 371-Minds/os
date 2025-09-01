/**
 * BusinessUniverseControls.tsx - Navigation and Time Travel Controls
 * Revolutionary spatial business intelligence navigation system
 */

import React, { useState, useCallback } from 'react';
import './BusinessUniverseControls.css';

interface UniverseControls {
  timeRange: 'day' | 'week' | 'month' | 'quarter' | 'year';
  viewMode: 'overview' | 'detailed' | 'strategic' | 'tactical';
  dataRefreshRate: number;
  animationSpeed: number;
  showSatellites: boolean;
  showAlerts: boolean;
  showTrends: boolean;
  showProjections: boolean;
  zoomLevel: number;
  cameraPosition: { x: number; y: number; z: number };
}

interface BusinessUniverseControlsProps {
  controls: UniverseControls;
  onControlsChange: (controls: UniverseControls) => void;
  onTimeTravel: (direction: 'past' | 'future', amount: number) => void;
  onDataRefresh: () => void;
  onExportData: () => void;
  onResetView: () => void;
  isRealTimeMode: boolean;
  onRealTimeModeToggle: (enabled: boolean) => void;
  lastUpdated: Date;
  connectionStatus: 'connected' | 'disconnected' | 'syncing';
}

export const BusinessUniverseControls: React.FC<BusinessUniverseControlsProps> = ({
  controls,
  onControlsChange,
  onTimeTravel,
  onDataRefresh,
  onExportData,
  onResetView,
  isRealTimeMode,
  onRealTimeModeToggle,
  lastUpdated,
  connectionStatus
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTimeTravelMode, setIsTimeTravelMode] = useState(false);

  const updateControl = useCallback((key: keyof UniverseControls, value: any) => {
    onControlsChange({
      ...controls,
      [key]: value
    });
  }, [controls, onControlsChange]);

  const handleTimeRangeChange = useCallback((timeRange: UniverseControls['timeRange']) => {
    updateControl('timeRange', timeRange);
    onDataRefresh();
  }, [updateControl, onDataRefresh]);

  const handleViewModeChange = useCallback((viewMode: UniverseControls['viewMode']) => {
    updateControl('viewMode', viewMode);
  }, [updateControl]);

  const handleZoomChange = useCallback((delta: number) => {
    const newZoom = Math.max(0.1, Math.min(5.0, controls.zoomLevel + delta));
    updateControl('zoomLevel', newZoom);
  }, [controls.zoomLevel, updateControl]);

  const handleAnimationSpeedChange = useCallback((speed: number) => {
    updateControl('animationSpeed', speed);
  }, [updateControl]);

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#10b981';
      case 'syncing': return '#f59e0b';
      case 'disconnected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className={`universe-controls ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Main Control Panel */}
      <div className="control-panel">
        <div className="panel-header">
          <div className="status-indicators">
            <div 
              className="connection-status"
              style={{ backgroundColor: getConnectionStatusColor() }}
              title={`Connection: ${connectionStatus}`}
            />
            <span className="last-updated">
              Updated {formatLastUpdated()}
            </span>
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
          <select 
            className="time-selector" 
            value={controls.timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value as UniverseControls['timeRange'])}
            title="Time Range"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select 
            className="view-selector"
            value={controls.viewMode}
            onChange={(e) => handleViewModeChange(e.target.value as UniverseControls['viewMode'])}
            title="View Mode"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="strategic">Strategic</option>
            <option value="tactical">Tactical</option>
          </select>

          <button 
            className={`realtime-toggle ${isRealTimeMode ? 'active' : ''}`}
            onClick={() => onRealTimeModeToggle(!isRealTimeMode)}
            title="Toggle Real-time Mode"
          >
            {isRealTimeMode ? '⏸️' : '▶️'} Live
          </button>

          <button 
            className="refresh-btn"
            onClick={onDataRefresh}
            disabled={isRealTimeMode}
            title="Refresh Data"
          >
            🔄
          </button>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="expanded-controls">
            {/* Navigation Controls */}
            <div className="control-section">
              <h4>🧭 Navigation</h4>
              <div className="zoom-controls">
                <label>Zoom: {controls.zoomLevel.toFixed(1)}x</label>
                <div className="zoom-buttons">
                  <button onClick={() => handleZoomChange(-0.2)} title="Zoom Out">-</button>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="5.0" 
                    step="0.1" 
                    value={controls.zoomLevel}
                    onChange={(e) => updateControl('zoomLevel', parseFloat(e.target.value))}
                  />
                  <button onClick={() => handleZoomChange(0.2)} title="Zoom In">+</button>
                </div>
              </div>
              <button className="reset-view-btn" onClick={onResetView}>
                🎯 Reset View
              </button>
            </div>

            {/* Animation Controls */}
            <div className="control-section">
              <h4>⚡ Animation</h4>
              <div className="speed-controls">
                <label>Speed: {controls.animationSpeed.toFixed(1)}x</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="3.0" 
                  step="0.1" 
                  value={controls.animationSpeed}
                  onChange={(e) => handleAnimationSpeedChange(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Display Options */}
            <div className="control-section">
              <h4>👁️ Display</h4>
              <div className="display-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={controls.showSatellites}
                    onChange={(e) => updateControl('showSatellites', e.target.checked)}
                  />
                  Show Satellites
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={controls.showAlerts}
                    onChange={(e) => updateControl('showAlerts', e.target.checked)}
                  />
                  Show Alerts
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={controls.showTrends}
                    onChange={(e) => updateControl('showTrends', e.target.checked)}
                  />
                  Show Trends
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={controls.showProjections}
                    onChange={(e) => updateControl('showProjections', e.target.checked)}
                  />
                  Show Projections
                </label>
              </div>
            </div>

            {/* Time Travel Controls */}
            <div className="control-section">
              <h4>⏰ Time Travel</h4>
              <div className="time-travel-controls">
                <button 
                  className={`time-travel-toggle ${isTimeTravelMode ? 'active' : ''}`}
                  onClick={() => setIsTimeTravelMode(!isTimeTravelMode)}
                >
                  {isTimeTravelMode ? 'Exit' : 'Enter'} Time Travel
                </button>
                {isTimeTravelMode && (
                  <div className="time-travel-buttons">
                    <button onClick={() => onTimeTravel('past', 7)} title="Go back 1 week">
                      ⏪ 1w
                    </button>
                    <button onClick={() => onTimeTravel('past', 1)} title="Go back 1 day">
                      ◀️ 1d
                    </button>
                    <button onClick={() => onTimeTravel('future', 1)} title="Go forward 1 day">
                      ▶️ 1d
                    </button>
                    <button onClick={() => onTimeTravel('future', 7)} title="Go forward 1 week">
                      ⏩ 1w
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Data Controls */}
            <div className="control-section">
              <h4>💾 Data</h4>
              <div className="data-controls">
                <div className="refresh-rate">
                  <label>Refresh Rate: {controls.dataRefreshRate}s</label>
                  <select 
                    value={controls.dataRefreshRate}
                    onChange={(e) => updateControl('dataRefreshRate', parseInt(e.target.value))}
                    disabled={!isRealTimeMode}
                  >
                    <option value={5}>5 seconds</option>
                    <option value={10}>10 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                  </select>
                </div>
                <button className="export-btn" onClick={onExportData}>
                  📤 Export Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mini Stats Panel */}
      <div className="mini-stats">
        <div className="stat-item">
          <span className="stat-label">Zoom</span>
          <span className="stat-value">{controls.zoomLevel.toFixed(1)}x</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Speed</span>
          <span className="stat-value">{controls.animationSpeed.toFixed(1)}x</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Mode</span>
          <span className="stat-value">{controls.viewMode}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessUniverseControls;