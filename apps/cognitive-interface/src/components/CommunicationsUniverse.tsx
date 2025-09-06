/**
 * CommunicationsUniverse.tsx - Revolutionary Spatial Email Management System
 * 
 * Transform email communications into an explorable universe where:
 * - Email campaigns become galactic formations with stellar engagement metrics
 * - Individual emails transform into cosmic entities with delivery trajectories
 * - Contact lists become constellation networks with relationship dynamics
 * - Email flows and automation become cosmic streams connecting systems
 * 
 * This serves as the Universal Galaxy Engine Template - demonstrating infinite scalability
 * across any vertical domain. Completes C3 milestone with enterprise-grade communication management.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CommunicationsUniverse.css';

interface EmailEntity {
  id: string;
  subject: string;
  type: 'campaign' | 'transactional' | 'automation' | 'broadcast' | 'personal';
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  engagementScore: number;
  recipientCount: number;
  color: string;
  satellites: EmailSatellite[];
  isSelected: boolean;
  sentAt?: Date;
  scheduledFor?: Date;
}

interface EmailSatellite {
  id: string;
  name: string;
  type: 'recipient' | 'attachment' | 'link' | 'tag' | 'metric';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  value: number;
  color: string;
}

interface ContactConstellation {
  id: string;
  name: string;
  listType: 'subscribers' | 'customers' | 'leads' | 'vips' | 'segments';
  emails: string[];
  centerPosition: { x: number; y: number };
  connectionStrength: number;
  engagementLevel: number;
  size: number;
  memberCount: number;
}

interface CommunicationFlow {
  id: string;
  name: string;
  type: 'drip_campaign' | 'welcome_series' | 'nurture_sequence' | 're_engagement' | 'agent_coordination';
  stages: FlowStage[];
  emails: string[];
  status: 'active' | 'paused' | 'completed' | 'draft';
  progress: number;
  effectiveness: number;
}

interface FlowStage {
  id: string;
  name: string;
  delay?: number;
  conditions?: string[];
  status: 'pending' | 'active' | 'complete' | 'skipped';
}

interface UniverseControls {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedEmail: string | null;
  viewMode: 'universe' | 'constellation' | 'flow' | 'analytics';
  showSatellites: boolean;
  showFlows: boolean;
  showMetrics: boolean;
  showConnections: boolean;
  animationSpeed: number;
  timeRange: '24h' | '7d' | '30d' | '90d' | 'all';
}

interface CommunicationsUniverseProps {
  emails?: EmailEntity[];
  constellations?: ContactConstellation[];
  flows?: CommunicationFlow[];
  onEmailSelect: (email: EmailEntity) => void;
  onConstellationSelect?: (constellation: ContactConstellation) => void;
  onFlowAction?: (flow: CommunicationFlow, action: string) => void;
  onUniverseAction?: (action: string, data: any) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const CommunicationsUniverse: React.FC<CommunicationsUniverseProps> = ({
  emails = [],
  constellations = [],
  flows = [],
  onEmailSelect,
  onConstellationSelect,
  onFlowAction,
  onUniverseAction,
  canvasRef
}) => {
  const [universeEmails, setUniverseEmails] = useState<EmailEntity[]>([]);
  const [controls, setControls] = useState<UniverseControls>({
    zoomLevel: 1.0,
    centerPosition: { x: 400, y: 300 },
    selectedEmail: null,
    viewMode: 'universe',
    showSatellites: true,
    showFlows: true,
    showMetrics: true,
    showConnections: true,
    animationSpeed: 1.0,
    timeRange: '7d'
  });
  const [orbitTime, setOrbitTime] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize universe with sample email communications
  useEffect(() => {
    if (emails.length === 0) {
      const sampleEmails: EmailEntity[] = [
        {
          id: 'galaxy-launch-campaign',
          subject: 'Galaxy Engine: Revolutionary Spatial Interface Launch',
          type: 'campaign',
          status: 'delivered',
          position: { x: 400, y: 300 },
          orbitRadius: 0,
          orbitSpeed: 0,
          orbitAngle: 0,
          size: 35,
          deliveryRate: 98.5,
          openRate: 47.3,
          clickRate: 12.8,
          engagementScore: 89,
          recipientCount: 25000,
          color: '#8b5cf6',
          satellites: generateSatellites('galaxy-launch-campaign'),
          isSelected: false,
          sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
          id: 'agent-coordination-alerts',
          subject: 'CEO Agent: Weekly Business Intelligence Update',
          type: 'automation',
          status: 'opened',
          position: { x: 600, y: 200 },
          orbitRadius: 180,
          orbitSpeed: 0.005,
          orbitAngle: 0,
          size: 28,
          deliveryRate: 100,
          openRate: 85.2,
          clickRate: 34.6,
          engagementScore: 94,
          recipientCount: 150,
          color: '#10b981',
          satellites: generateSatellites('agent-coordination-alerts'),
          isSelected: false,
          sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 'developer-galaxy-announcement',
          subject: 'Developer Galaxy: Transform Your Development Workflow',
          type: 'broadcast',
          status: 'clicked',
          position: { x: 200, y: 400 },
          orbitRadius: 200,
          orbitSpeed: 0.007,
          orbitAngle: Math.PI,
          size: 30,
          deliveryRate: 97.8,
          openRate: 52.1,
          clickRate: 18.4,
          engagementScore: 86,
          recipientCount: 18500,
          color: '#3b82f6',
          satellites: generateSatellites('developer-galaxy-announcement'),
          isSelected: false,
          sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
        },
        {
          id: 'creators-cosmos-preview',
          subject: 'Creator\'s Cosmos: Revolutionary Creative Workflows',
          type: 'campaign',
          status: 'sent',
          position: { x: 650, y: 450 },
          orbitRadius: 220,
          orbitSpeed: 0.004,
          orbitAngle: Math.PI / 2,
          size: 26,
          deliveryRate: 99.2,
          openRate: 41.7,
          clickRate: 9.3,
          engagementScore: 78,
          recipientCount: 12300,
          color: '#ec4899',
          satellites: generateSatellites('creators-cosmos-preview'),
          isSelected: false,
          sentAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
        },
        {
          id: 'business-intelligence-digest',
          subject: 'CFO Agent: Monthly Financial Performance Report',
          type: 'transactional',
          status: 'delivered',
          position: { x: 150, y: 150 },
          orbitRadius: 120,
          orbitSpeed: 0.009,
          orbitAngle: Math.PI / 4,
          size: 22,
          deliveryRate: 100,
          openRate: 78.9,
          clickRate: 45.2,
          engagementScore: 92,
          recipientCount: 85,
          color: '#f59e0b',
          satellites: generateSatellites('business-intelligence-digest'),
          isSelected: false,
          sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
        },
        {
          id: 'welcome-series-automation',
          subject: 'Welcome to the Future of Cognitive Interfaces',
          type: 'automation',
          status: 'scheduled',
          position: { x: 550, y: 120 },
          orbitRadius: 150,
          orbitSpeed: 0.006,
          orbitAngle: Math.PI / 6,
          size: 20,
          deliveryRate: 0,
          openRate: 0,
          clickRate: 0,
          engagementScore: 0,
          recipientCount: 1200,
          color: '#06b6d4',
          satellites: generateSatellites('welcome-series-automation'),
          isSelected: false,
          scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000)
        }
      ];
      setUniverseEmails(sampleEmails);
    } else {
      setUniverseEmails(emails);
    }
  }, [emails]);

  const generateSatellites = (emailId: string): EmailSatellite[] => {
    const satelliteCount = Math.floor(Math.random() * 6) + 3;
    const satellites: EmailSatellite[] = [];
    
    for (let i = 0; i < satelliteCount; i++) {
      const angle = (i / satelliteCount) * Math.PI * 2;
      const orbitRadius = 25 + (i * 6);
      
      satellites.push({
        id: `${emailId}-satellite-${i}`,
        name: getSatelliteName(i),
        type: getSatelliteType(i),
        position: { x: 0, y: 0 },
        orbitRadius,
        orbitSpeed: 0.015 + (Math.random() * 0.01),
        size: 2 + Math.random() * 2,
        value: Math.random() * 100,
        color: getSatelliteColor(getSatelliteType(i))
      });
    }
    
    return satellites;
  };

  const getSatelliteName = (index: number): string => {
    const names = ['Opens', 'Clicks', 'Replies', 'Forwards', 'Unsubscribes', 'Bounces', 'Attachments', 'Links', 'Tags'];
    return names[index % names.length];
  };

  const getSatelliteType = (index: number): EmailSatellite['type'] => {
    const types: EmailSatellite['type'][] = ['metric', 'metric', 'recipient', 'link', 'tag', 'attachment'];
    return types[index % types.length];
  };

  const getSatelliteColor = (type: EmailSatellite['type']): string => {
    const colors = {
      'metric': '#10b981',
      'recipient': '#3b82f6',
      'link': '#8b5cf6',
      'tag': '#f59e0b',
      'attachment': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  const getEmailColor = (type: string, status: string): string => {
    if (status === 'failed' || status === 'bounced') return '#ef4444';
    if (status === 'scheduled') return '#06b6d4';
    if (status === 'draft') return '#6b7280';
    
    const colors = {
      'campaign': '#8b5cf6',
      'automation': '#10b981',
      'broadcast': '#3b82f6',
      'transactional': '#f59e0b',
      'personal': '#ec4899'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setOrbitTime(prev => prev + 0.016 * controls.animationSpeed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [controls.animationSpeed]);

  // Update email positions
  useEffect(() => {
    setUniverseEmails(prev => prev.map(email => {
      if (email.orbitRadius === 0) {
        return email; // Central emails don't orbit
      }

      const angle = orbitTime * email.orbitSpeed;
      const newX = controls.centerPosition.x + Math.cos(angle + email.orbitAngle) * email.orbitRadius;
      const newY = controls.centerPosition.y + Math.sin(angle + email.orbitAngle) * email.orbitRadius;

      const updatedSatellites = email.satellites.map(satellite => {
        const satelliteAngle = orbitTime * satellite.orbitSpeed;
        return {
          ...satellite,
          position: {
            x: newX + Math.cos(satelliteAngle) * satellite.orbitRadius,
            y: newY + Math.sin(satelliteAngle) * satellite.orbitRadius
          }
        };
      });

      return {
        ...email,
        position: { x: newX, y: newY },
        satellites: updatedSatellites,
        color: getEmailColor(email.type, email.status)
      };
    }));
  }, [orbitTime, controls.centerPosition]);

  // Render universe
  const renderUniverse = useCallback((ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background cosmic effects
    renderCosmicBackground(ctx);

    // Communication flow connections
    if (controls.showFlows) {
      renderCommunicationFlows(ctx);
    }

    // Contact constellation connections
    if (controls.showConnections) {
      renderConstellationConnections(ctx);
    }

    // Email entities
    universeEmails.forEach(email => {
      renderEmailEntity(ctx, email);
    });

    // Engagement metrics overlay
    if (controls.showMetrics) {
      renderEngagementMetrics(ctx);
    }
  }, [universeEmails, controls]);

  const renderCosmicBackground = (ctx: CanvasRenderingContext2D) => {
    // Cosmic dust and stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Communication energy streams
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const startX = Math.random() * ctx.canvas.width;
      const startY = Math.random() * ctx.canvas.height;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = startY + (Math.random() - 0.5) * 200;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const renderCommunicationFlows = (ctx: CanvasRenderingContext2D) => {
    flows.forEach(flow => {
      if (flow.status === 'active') {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        
        // Render flow connections between related emails
        flow.emails.forEach((emailId, index) => {
          const email = universeEmails.find(e => e.id === emailId);
          if (email && index > 0) {
            const prevEmail = universeEmails.find(e => e.id === flow.emails[index - 1]);
            if (prevEmail) {
              ctx.beginPath();
              ctx.moveTo(prevEmail.position.x, prevEmail.position.y);
              ctx.lineTo(email.position.x, email.position.y);
              ctx.stroke();
            }
          }
        });
        
        ctx.shadowBlur = 0;
      }
    });
  };

  const renderConstellationConnections = (ctx: CanvasRenderingContext2D) => {
    constellations.forEach(constellation => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // Connect constellation center to related emails
      constellation.emails.forEach(emailId => {
        const email = universeEmails.find(e => e.id === emailId);
        if (email) {
          ctx.beginPath();
          ctx.moveTo(constellation.centerPosition.x, constellation.centerPosition.y);
          ctx.lineTo(email.position.x, email.position.y);
          ctx.stroke();
        }
      });
      
      ctx.setLineDash([]);
    });
  };

  const renderEmailEntity = (ctx: CanvasRenderingContext2D, email: EmailEntity) => {
    const { x, y } = email.position;

    // Email glow effect based on engagement
    ctx.fillStyle = email.color;
    ctx.shadowColor = email.color;
    ctx.shadowBlur = email.isSelected ? 25 : (email.engagementScore / 100) * 20;
    
    // Draw email as cosmic entity
    ctx.beginPath();
    ctx.arc(x, y, email.size, 0, Math.PI * 2);
    ctx.fill();

    // Status indicator ring
    if (email.status === 'delivered' || email.status === 'opened' || email.status === 'clicked') {
      const statusColor = email.status === 'clicked' ? '#10b981' : 
                         email.status === 'opened' ? '#3b82f6' : '#f59e0b';
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, email.size + 6, 0, (email.openRate / 100) * Math.PI * 2);
      ctx.stroke();
    }

    // Render satellites if enabled
    if (controls.showSatellites) {
      email.satellites.forEach(satellite => {
        ctx.fillStyle = satellite.color;
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(satellite.position.x, satellite.position.y, satellite.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Engagement pulse effect for high-performing emails
    if (email.engagementScore > 80) {
      renderEngagementPulse(ctx, x, y, email.size);
    }

    // Scheduled email indicator
    if (email.status === 'scheduled') {
      renderScheduledIndicator(ctx, x, y, email.size);
    }

    ctx.shadowBlur = 0;
  };

  const renderEngagementPulse = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const pulseRadius = size + 15 + Math.sin(orbitTime * 2) * 8;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();
  };

  const renderScheduledIndicator = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const time = Date.now() / 1000;
    const opacity = (Math.sin(time * 3) + 1) / 2;
    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 15;
    
    // Draw clock-like indicator
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const innerRadius = size + 8;
      const outerRadius = size + 12;
      
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(angle) * innerRadius, y + Math.sin(angle) * innerRadius);
      ctx.lineTo(x + Math.cos(angle) * outerRadius, y + Math.sin(angle) * outerRadius);
      ctx.stroke();
    }
  };

  const renderEngagementMetrics = (ctx: CanvasRenderingContext2D) => {
    // Render real-time engagement data overlay
    const totalEmails = universeEmails.length;
    const avgEngagement = universeEmails.reduce((sum, email) => sum + email.engagementScore, 0) / totalEmails || 0;
    const totalRecipients = universeEmails.reduce((sum, email) => sum + email.recipientCount, 0);
    
    // Cosmic metrics display
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Emails: ${totalEmails}`, 20, 30);
    ctx.fillText(`Recipients: ${totalRecipients.toLocaleString()}`, 20, 50);
    ctx.fillText(`Avg Engagement: ${avgEngagement.toFixed(1)}%`, 20, 70);
  };

  // Handle canvas interactions
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check email clicks
    const clickedEmail = universeEmails.find(email => {
      const distance = Math.sqrt(
        Math.pow(x - email.position.x, 2) + Math.pow(y - email.position.y, 2)
      );
      return distance <= email.size + 10;
    });

    if (clickedEmail) {
      setControls(prev => ({
        ...prev,
        selectedEmail: prev.selectedEmail === clickedEmail.id ? null : clickedEmail.id
      }));
      
      setUniverseEmails(prev => prev.map(e => ({
        ...e,
        isSelected: e.id === clickedEmail.id
      })));
      
      onEmailSelect(clickedEmail);
      return;
    }

    // Check constellation clicks
    if (controls.viewMode === 'constellation' && onConstellationSelect) {
      constellations.forEach(constellation => {
        const distance = Math.sqrt(
          Math.pow(x - constellation.centerPosition.x, 2) + 
          Math.pow(y - constellation.centerPosition.y, 2)
        );
        if (distance <= constellation.size + 15) {
          onConstellationSelect(constellation);
        }
      });
    }
  }, [universeEmails, controls.viewMode, onEmailSelect, onConstellationSelect, constellations, canvasRef]);

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderUniverse(ctx);
  }, [renderUniverse, canvasRef]);

  return (
    <div className="communications-universe">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="universe-canvas"
      />
    </div>
  );
};

export default CommunicationsUniverse;