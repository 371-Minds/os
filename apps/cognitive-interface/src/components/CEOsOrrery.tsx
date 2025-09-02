/**
 * CEOsOrrery.tsx - Business Intelligence Universe
 * 
 * Revolutionary business intelligence interface where financial data becomes
 * an explorable orrery (mechanical solar system). Revenue streams are planets,
 * departments are star systems, and KPIs orbit around business units.
 * 
 * This transforms boring dashboards into an immersive business universe.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CEOsOrrery.css';
import FinancialPlanets from './FinancialPlanets';
import DepartmentSolarSystems from './DepartmentSolarSystems';
import BusinessUniverseControls from './BusinessUniverseControls';
import BusinessIntelligenceIntegration from './BusinessIntelligenceIntegration';
import { SpatialBusinessData, BusinessMetric, AgentInsight } from '../types/business-intelligence';

// Mock React types for development
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface FinancialPlanet {
  id: string;
  name: string;
  type: 'revenue' | 'expense' | 'asset' | 'liability' | 'kpi' | 'department' | 'operational';
  value: number;
  target?: number;
  previousValue?: number;
  currency?: string;
  growth: number;
  volatility: number; // Affects orbital wobble
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  mass: number; // Affects gravitational influence
  color: string;
  glowIntensity: number;
  satellites: FinancialSatellite[];
  insights: string[];
  alerts: BusinessAlert[];
  trend: 'ascending' | 'descending' | 'stable' | 'volatile';
  priority: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: Date;
  dataPoints: Array<{ timestamp: Date; value: number }>;
}

interface FinancialSatellite {
  id: string;
  name: string;
  value: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  color: string;
  trend: number;
  impact: 'positive' | 'negative' | 'neutral';
}

interface DepartmentSolarSystem {
  id: string;
  name: string;
  centerPosition: { x: number; y: number };
  gravitationalPull: number; // Affects planet orbits
  planets: string[];
  performance: number;
  budget: number;
  budgetUtilization: number;
  headcount: number;
  efficiency: number;
  productivity: number;
  riskLevel: 'low' | 'medium' | 'high';
  strategicImportance: number;
  lastReview: Date;
}

interface BusinessUniverse {
  totalRevenue: number;
  totalExpenses: number;
  totalAssets: number;
  totalLiabilities: number;
  netProfit: number;
  grossMargin: number;
  operatingMargin: number;
  growthRate: number;
  cashFlow: number;
  freeCashFlow: number;
  marketCap?: number;
  enterpriseValue?: number;
  debtToEquity: number;
  currentRatio: number;
  returnOnEquity: number;
  departments: DepartmentSolarSystem[];
  globalAlerts: BusinessAlert[];
  lastUpdated: Date;
  marketConditions: 'bull' | 'bear' | 'neutral' | 'volatile';
}

interface BusinessAlert {
  id: string;
  type: 'warning' | 'critical' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  relatedPlanetId?: string;
  actionRequired: boolean;
  priority: number;
}

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

interface CEOsOrreryProps {
  userId?: string;
  initialTimeRange?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  realTimeMode?: boolean;
  agentEndpoint?: string;
  onPlanetSelect?: (planet: FinancialPlanet) => void;
  onDepartmentSelect?: (department: DepartmentSolarSystem) => void;
  onInsightCapture?: (planetId: string, insight: string) => void;
  onAlertAction?: (alert: BusinessAlert) => void;
  onDataDrillDown?: (planetId: string, timeRange: string) => void;
  onDataExport?: () => void;
}

export const CEOsOrrery: React.FC<CEOsOrreryProps> = ({
  userId = 'ceo-user',
  initialTimeRange = 'quarter',
  realTimeMode = true,
  agentEndpoint,
  onPlanetSelect,
  onDepartmentSelect,
  onInsightCapture,
  onAlertAction,
  onDataDrillDown,
  onDataExport
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const financialPlanetsRef = useRef<any>(null);
  const departmentSystemsRef = useRef<any>(null);
  const biIntegrationRef = useRef<any>(null);
  
  const [orbitTime, setOrbitTime] = useState(0);
  const [spatialBusinessData, setSpatialBusinessData] = useState<SpatialBusinessData | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [universeControls, setUniverseControls] = useState<UniverseControls>({
    timeRange: initialTimeRange,
    viewMode: 'overview',
    dataRefreshRate: 30,
    animationSpeed: 1.0,
    showSatellites: true,
    showAlerts: true,
    showTrends: true,
    showProjections: false,
    zoomLevel: 1.0,
    cameraPosition: { x: 0, y: 0, z: 0 }
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [activeAlerts, setActiveAlerts] = useState<BusinessAlert[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [planets, setPlanets] = useState<FinancialPlanet[]>([]);

  // Enhanced business universe with comprehensive financial data
  const [businessUniverse, setBusinessUniverse] = useState<BusinessUniverse>({
    totalRevenue: 12500000,
    totalExpenses: 8900000,
    totalAssets: 28000000,
    totalLiabilities: 15000000,
    netProfit: 3600000,
    grossMargin: 71.2,
    operatingMargin: 28.8,
    growthRate: 23.4,
    cashFlow: 4200000,
    freeCashFlow: 3800000,
    marketCap: 85000000,
    enterpriseValue: 92000000,
    debtToEquity: 0.35,
    currentRatio: 2.1,
    returnOnEquity: 18.5,
    lastUpdated: new Date(),
    marketConditions: 'bull',
    globalAlerts: [
      {
        id: 'alert-1',
        type: 'warning',
        title: 'Cash Flow Trend',
        message: 'Free cash flow decreased 8% this month',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actionRequired: true,
        priority: 8
      }
    ],
    departments: [
      {
        id: 'sales',
        name: 'Sales & Marketing',
        centerPosition: { x: 300, y: 200 },
        gravitationalPull: 1.2,
        planets: ['1', '2'],
        performance: 118,
        budget: 2400000,
        budgetUtilization: 87,
        headcount: 45,
        efficiency: 94,
        productivity: 156000,
        riskLevel: 'low',
        strategicImportance: 9,
        lastReview: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'engineering',
        name: 'Engineering',
        centerPosition: { x: 500, y: 300 },
        gravitationalPull: 1.5,
        planets: ['3', '4', '5'],
        performance: 102,
        budget: 3800000,
        budgetUtilization: 93,
        headcount: 72,
        efficiency: 87,
        productivity: 89000,
        riskLevel: 'medium',
        strategicImportance: 10,
        lastReview: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  // Handle real-time business intelligence data updates
  const handleBusinessDataUpdate = useCallback((data: SpatialBusinessData) => {
    console.log('🌌 Business universe data updated:', data);
    setSpatialBusinessData(data);
    setConnectionError(null);
    
    // Update business universe state
    if (data.metrics.length > 0) {
      const totalRevenue = data.metrics
        .filter(m => m.category === 'revenue')
        .reduce((sum, m) => sum + m.value, 0);
      
      const totalExpenses = data.metrics
        .filter(m => m.category === 'expense')
        .reduce((sum, m) => sum + m.value, 0);
        
      setBusinessUniverse(prev => ({
        ...prev,
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses,
        lastUpdated: data.lastUpdated,
        globalAlerts: data.alerts.map(alert => ({
          id: alert.id,
          type: alert.severity === 'critical' ? 'critical' : 'warning',
          title: alert.title,
          message: alert.message,
          timestamp: alert.timestamp,
          actionRequired: alert.actionRequired,
          priority: alert.priority
        })),
        departments: data.departments
      }));
    }
  }, []);

  // Handle connection errors
  const handleConnectionError = useCallback((error: string) => {
    console.error('💥 Business Intelligence connection error:', error);
    setConnectionError(error);
  }, []);

  // Manual data refresh
  const handleDataRefresh = useCallback(() => {
    if (biIntegrationRef.current) {
      biIntegrationRef.current.refreshData();
    }
  }, []);
  
  // Export business data
  const handleDataExport = useCallback(() => {
    if (spatialBusinessData) {
      const exportData = {
        timestamp: new Date().toISOString(),
        metrics: spatialBusinessData.metrics,
        insights: spatialBusinessData.insights,
        alerts: spatialBusinessData.alerts,
        departments: spatialBusinessData.departments
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business-intelligence-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      if (onDataExport) onDataExport();
    }
  }, [spatialBusinessData, onDataExport]);
  
  // Time travel functionality
  const handleTimeTravel = useCallback((direction: 'past' | 'future', amount: number) => {
    console.log(`⏰ Time travel: ${direction} ${amount} days`);
    // Implementation would integrate with historical data API
  }, []);
  
  // Reset view to default position
  const handleResetView = useCallback(() => {
    setUniverseControls(prev => ({
      ...prev,
      zoomLevel: 1.0,
      cameraPosition: { x: 0, y: 0, z: 0 }
    }));
  }, []);

  // Handle mouse interactions with spatial components
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    // Mouse interactions now handled by individual spatial components
    console.log('Mouse move at:', event.clientX, event.clientY);
  }, []);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    // Click interactions now handled by individual spatial components
    console.log('Canvas clicked at:', event.clientX, event.clientY);
  }, []);

  // Enhanced animation with spatial components
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and set transforms
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply zoom and camera position
    const zoom = universeControls.zoomLevel || 1.0;
    const camera = universeControls.cameraPosition || { x: 0, y: 0 };
    ctx.scale(zoom, zoom);
    ctx.translate(-camera.x, -camera.y);
    
    // Draw universe background
    drawUniverseBackground(ctx, canvas);
    
    // Note: Spatial components will render themselves when implemented
    
    ctx.restore();
    
    setOrbitTime(prev => prev + 0.01 * universeControls.animationSpeed);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [spatialBusinessData, universeControls]);

  const drawUniverseBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(0.5, '#0f172a');
    gradient.addColorStop(1, '#020617');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Remove duplicate old functions that conflict
  // Animation and interaction are now handled by spatial components

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 800;
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1000;
    canvas.height = 700;
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="ceo-orrery">
      {/* Business Intelligence Integration */}
      <BusinessIntelligenceIntegration
        onDataUpdate={handleBusinessDataUpdate}
        onError={handleConnectionError}
        realTimeMode={realTimeMode}
        refreshInterval={universeControls.dataRefreshRate * 1000}
        agentEndpoint={agentEndpoint}
      />
      
      {/* Spatial Components */}
      {spatialBusinessData && (
        <>
          <FinancialPlanets
            businessData={spatialBusinessData.metrics}
            agentInsights={spatialBusinessData.insights}
            onPlanetSelect={(planet) => onPlanetSelect && onPlanetSelect(planet as any)}
            onDrillDown={(planetId, timeRange) => onDataDrillDown && onDataDrillDown(planetId, timeRange)}
            onAlertAction={(alert) => onAlertAction && onAlertAction(alert as any)}
            animationSpeed={universeControls.animationSpeed}
            showSatellites={universeControls.showSatellites}
            realTimeMode={realTimeMode}
            canvasRef={canvasRef}
            orbitTime={orbitTime}
          />
          
          <DepartmentSolarSystems
            departments={spatialBusinessData.departments}
            agentInsights={spatialBusinessData.insights}
            onDepartmentSelect={(dept) => onDepartmentSelect && onDepartmentSelect(dept as any)}
            onTeamSelect={(team: any) => console.log('Team selected:', team)}
            onProjectSelect={(project: any) => console.log('Project selected:', project)}
            animationSpeed={universeControls.animationSpeed}
            showProjects={true}
            showTeamDetails={universeControls.viewMode === 'detailed'}
            canvasRef={canvasRef}
            orbitTime={orbitTime}
          />
        </>
      )}
      {/* Universe Controls */}
      <BusinessUniverseControls
        controls={universeControls}
        onControlsChange={setUniverseControls}
        onTimeTravel={handleTimeTravel}
        onDataRefresh={handleDataRefresh}
        onExportData={handleDataExport}
        onResetView={handleResetView}
        isRealTimeMode={realTimeMode}
        onRealTimeModeToggle={(enabled) => console.log('Real-time mode:', enabled)}
        lastUpdated={spatialBusinessData?.lastUpdated || new Date()}
        connectionStatus={spatialBusinessData?.syncStatus || 'disconnected'}
      />
      
      {/* Connection Error Display */}
      {connectionError && (
        <div className="connection-error">
          <div className="error-content">
            <h4>🚨 Connection Error</h4>
            <p>{connectionError}</p>
            <button onClick={handleDataRefresh} className="retry-btn">
              🔄 Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Main Universe Canvas */}
      <div className="orrery-container">
        <div className="orrery-header">
          <h1>🌌 CEO's Orrery - Spatial Business Intelligence</h1>
          <p>
            Revolutionary AI-powered business universe powered by ElizaOS agents
            {spatialBusinessData && (
              <span className="data-status">
                • {spatialBusinessData.metrics.length} metrics 
                • {spatialBusinessData.insights.length} insights 
                • {spatialBusinessData.alerts.length} alerts
              </span>
            )}
          </p>
        </div>
        
        <canvas
          ref={canvasRef}
          className="orrery-canvas"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          width={1200}
          height={800}
        />
      </div>
      {/* Real-time Business Summary */}
      {spatialBusinessData && (
        <div className="business-summary enhanced">
          <div className="summary-header">
            <h3>📊 Live Business Intelligence Dashboard</h3>
            <div className="agent-status">
              {Object.entries(spatialBusinessData.agentStatus).map(([role, status]) => (
                <span key={role} className={`agent-indicator ${status}`}>
                  {role}: {status === 'active' ? '✓' : '✗'}
                </span>
              ))}
            </div>
          </div>
          
          <div className="summary-metrics">
            <div className="metric-card revenue">
              <h4>Total Revenue</h4>
              <span>${(businessUniverse.totalRevenue / 1000000).toFixed(1)}M</span>
              <small>+{businessUniverse.growthRate.toFixed(1)}% growth</small>
            </div>
            <div className="metric-card profit">
              <h4>Net Profit</h4>
              <span>${(businessUniverse.netProfit / 1000000).toFixed(1)}M</span>
              <small>{businessUniverse.operatingMargin.toFixed(1)}% margin</small>
            </div>
            <div className="metric-card alerts">
              <h4>Active Alerts</h4>
              <span>{spatialBusinessData.alerts.length}</span>
              <small>{spatialBusinessData.alerts.filter(a => a.severity === 'critical').length} critical</small>
            </div>
            <div className="metric-card insights">
              <h4>AI Insights</h4>
              <span>{spatialBusinessData.insights.length}</span>
              <small>{spatialBusinessData.insights.filter(i => i.actionable).length} actionable</small>
            </div>
          </div>
          
          {/* Latest Insights Preview */}
          {spatialBusinessData.insights.length > 0 && (
            <div className="insights-preview">
              <h4>🧠 Latest AI Insights</h4>
              <div className="insights-list">
                {spatialBusinessData.insights.slice(0, 3).map(insight => (
                  <div key={insight.id} className={`insight-item ${insight.impact}`}>
                    <div className="insight-header">
                      <span className="agent-role">{insight.agentRole}</span>
                      <span className="insight-type">{insight.type.replace('_', ' ')}</span>
                    </div>
                    <div className="insight-content">
                      <strong>{insight.title}</strong>
                      <p>{insight.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};