/**
 * React Email Templates with Blockchain Verification
 * 
 * Revolutionary email templates that integrate:
 * - Blockchain verification footers
 * - Agent coordination metadata
 * - Cognitive optimization hints
 * - Status.network governance indicators
 * - Spatial visualization elements
 */

import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Button,
  Hr,
  Img,
  Preview
} from '@react-email/components';

// Base template props interface
export interface BaseEmailProps {
  subject: string;
  preview?: string;
  verificationHash?: string;
  agentCoordination?: {
    approvedBy: string[];
    coordinationId: string;
    governanceLevel: 'standard' | 'dao' | 'enterprise';
  };
  cognitiveOptimization?: {
    personalizedFor: string;
    optimalTiming: boolean;
    complexityLevel: 'low' | 'medium' | 'high';
  };
  branding?: {
    logoUrl?: string;
    brandColor?: string;
    organizationName?: string;
  };
}

// Blockchain verification footer component
export const BlockchainVerificationFooter: React.FC<{
  verificationHash?: string;
  agentCoordination?: BaseEmailProps['agentCoordination'];
  cognitiveOptimization?: BaseEmailProps['cognitiveOptimization'];
}> = ({ verificationHash, agentCoordination, cognitiveOptimization }) => (
  <Section style={footerStyle}>
    <Hr style={{ margin: '20px 0', borderColor: '#e6e6e6' }} />
    
    {/* Blockchain Verification */}
    {verificationHash && (
      <Row style={{ marginBottom: '10px' }}>
        <Column>
          <Text style={verificationTextStyle}>
            ✅ <strong>Blockchain Verified</strong> | Hash: {verificationHash.substring(0, 12)}...
          </Text>
        </Column>
      </Row>
    )}
    
    {/* Agent Coordination */}
    {agentCoordination && (
      <Row style={{ marginBottom: '10px' }}>
        <Column>
          <Text style={verificationTextStyle}>
            🤖 <strong>Agent Coordinated</strong> | 
            Approved by: {agentCoordination.approvedBy.join(', ')} | 
            Level: {agentCoordination.governanceLevel.toUpperCase()}
          </Text>
        </Column>
      </Row>
    )}
    
    {/* Cognitive Optimization */}
    {cognitiveOptimization && (
      <Row style={{ marginBottom: '10px' }}>
        <Column>
          <Text style={verificationTextStyle}>
            🧠 <strong>Cognitively Optimized</strong> | 
            {cognitiveOptimization.personalizedFor && `Personalized for ${cognitiveOptimization.personalizedFor} | `}
            Timing: {cognitiveOptimization.optimalTiming ? 'Optimized' : 'Standard'} | 
            Complexity: {cognitiveOptimization.complexityLevel}
          </Text>
        </Column>
      </Row>
    )}
    
    {/* 371 OS Branding */}
    <Row>
      <Column>
        <Text style={brandingTextStyle}>
          Powered by <strong>371 OS</strong> | Revolutionary Autonomous Business Intelligence
        </Text>
      </Column>
    </Row>
  </Section>
);

// Welcome email template with blockchain verification
export const BlockchainVerifiedWelcomeEmail: React.FC<BaseEmailProps & {
  recipientName: string;
  organizationName: string;
  welcomeMessage?: string;
  ctaButton?: {
    text: string;
    url: string;
  };
}> = ({
  subject,
  preview,
  verificationHash,
  agentCoordination,
  cognitiveOptimization,
  branding,
  recipientName,
  organizationName,
  welcomeMessage,
  ctaButton
}) => (
  <Html>
    <Head />
    <Preview>{preview || `Welcome to ${organizationName}!`}</Preview>
    
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        {/* Header */}
        <Section style={headerStyle}>
          {branding?.logoUrl && (
            <Img
              src={branding.logoUrl}
              alt={`${organizationName} Logo`}
              style={logoStyle}
            />
          )}
          <Heading style={headingStyle}>
            Welcome to {organizationName}!
          </Heading>
        </Section>
        
        {/* Main Content */}
        <Section style={contentStyle}>
          <Text style={greetingStyle}>
            Hello {recipientName},
          </Text>
          
          <Text style={messageStyle}>
            {welcomeMessage || `We're excited to welcome you to ${organizationName}. Your account has been successfully created and verified through our revolutionary blockchain-powered system.`}
          </Text>
          
          <Text style={messageStyle}>
            This email has been:
          </Text>
          
          <ul style={listStyle}>
            <li>✅ Verified on the blockchain for authenticity</li>
            <li>🤖 Coordinated by our autonomous agents for optimal delivery</li>
            <li>🧠 Cognitively optimized for your reading preferences</li>
            <li>🌐 Governed by decentralized consensus through Status.network</li>
          </ul>
          
          {ctaButton && (
            <Section style={buttonSectionStyle}>
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: branding?.brandColor || '#007ee6'
                }}
                href={ctaButton.url}
              >
                {ctaButton.text}
              </Button>
            </Section>
          )}
          
          <Text style={messageStyle}>
            Experience the future of autonomous business communication.
          </Text>
        </Section>
        
        {/* Blockchain Verification Footer */}
        <BlockchainVerificationFooter
          verificationHash={verificationHash}
          agentCoordination={agentCoordination}
          cognitiveOptimization={cognitiveOptimization}
        />
      </Container>
    </Body>
  </Html>
);

// DAO Governance Notification Template
export const DAOGovernanceNotificationEmail: React.FC<BaseEmailProps & {
  recipientName: string;
  proposalTitle: string;
  proposalDescription: string;
  votingEndTime: string;
  voteUrl: string;
  currentVotes?: {
    for: number;
    against: number;
    total: number;
  };
}> = ({
  subject,
  preview,
  verificationHash,
  agentCoordination,
  cognitiveOptimization,
  branding,
  recipientName,
  proposalTitle,
  proposalDescription,
  votingEndTime,
  voteUrl,
  currentVotes
}) => (
  <Html>
    <Head />
    <Preview>{preview || `New DAO Proposal: ${proposalTitle}`}</Preview>
    
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        {/* Header */}
        <Section style={headerStyle}>
          <Heading style={headingStyle}>
            🗳️ DAO Governance Notification
          </Heading>
        </Section>
        
        {/* Main Content */}
        <Section style={contentStyle}>
          <Text style={greetingStyle}>
            Hello {recipientName},
          </Text>
          
          <Text style={messageStyle}>
            A new proposal requires your vote in the 371 DAO governance system:
          </Text>
          
          {/* Proposal Details */}
          <Section style={proposalSectionStyle}>
            <Heading style={proposalTitleStyle}>
              {proposalTitle}
            </Heading>
            
            <Text style={proposalDescriptionStyle}>
              {proposalDescription}
            </Text>
            
            <Row style={{ marginTop: '20px' }}>
              <Column>
                <Text style={detailTextStyle}>
                  <strong>Voting Deadline:</strong> {votingEndTime}
                </Text>
              </Column>
            </Row>
            
            {currentVotes && (
              <Row style={{ marginTop: '10px' }}>
                <Column>
                  <Text style={detailTextStyle}>
                    <strong>Current Votes:</strong> {currentVotes.for} For, {currentVotes.against} Against 
                    ({currentVotes.total} total)
                  </Text>
                </Column>
              </Row>
            )}
          </Section>
          
          {/* Voting Button */}
          <Section style={buttonSectionStyle}>
            <Button
              style={{
                ...buttonStyle,
                backgroundColor: '#28a745'
              }}
              href={voteUrl}
            >
              📊 Cast Your Vote
            </Button>
          </Section>
          
          <Text style={messageStyle}>
            Your participation in DAO governance helps shape the future of autonomous business operations.
          </Text>
        </Section>
        
        {/* Blockchain Verification Footer */}
        <BlockchainVerificationFooter
          verificationHash={verificationHash}
          agentCoordination={agentCoordination}
          cognitiveOptimization={cognitiveOptimization}
        />
      </Container>
    </Body>
  </Html>
);

// Campaign Performance Report Template
export const CampaignPerformanceReportEmail: React.FC<BaseEmailProps & {
  recipientName: string;
  campaignName: string;
  performanceMetrics: {
    emailsSent: number;
    openRate: number;
    clickRate: number;
    cognitiveOptimizationImpact: number;
    costSavings: number;
  };
  spatialVisualizationUrl?: string;
  reportUrl?: string;
}> = ({
  subject,
  preview,
  verificationHash,
  agentCoordination,
  cognitiveOptimization,
  branding,
  recipientName,
  campaignName,
  performanceMetrics,
  spatialVisualizationUrl,
  reportUrl
}) => (
  <Html>
    <Head />
    <Preview>{preview || `Campaign Performance: ${campaignName}`}</Preview>
    
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        {/* Header */}
        <Section style={headerStyle}>
          <Heading style={headingStyle}>
            📈 Campaign Performance Report
          </Heading>
        </Section>
        
        {/* Main Content */}
        <Section style={contentStyle}>
          <Text style={greetingStyle}>
            Hello {recipientName},
          </Text>
          
          <Text style={messageStyle}>
            Your campaign <strong>{campaignName}</strong> has completed! Here's your performance summary:
          </Text>
          
          {/* Performance Metrics */}
          <Section style={metricsSectionStyle}>
            <Row>
              <Column style={metricColumnStyle}>
                <Text style={metricNumberStyle}>{performanceMetrics.emailsSent.toLocaleString()}</Text>
                <Text style={metricLabelStyle}>Emails Sent</Text>
              </Column>
              <Column style={metricColumnStyle}>
                <Text style={metricNumberStyle}>{(performanceMetrics.openRate * 100).toFixed(1)}%</Text>
                <Text style={metricLabelStyle}>Open Rate</Text>
              </Column>
            </Row>
            
            <Row style={{ marginTop: '20px' }}>
              <Column style={metricColumnStyle}>
                <Text style={metricNumberStyle}>{(performanceMetrics.clickRate * 100).toFixed(1)}%</Text>
                <Text style={metricLabelStyle}>Click Rate</Text>
              </Column>
              <Column style={metricColumnStyle}>
                <Text style={metricNumberStyle}>+{(performanceMetrics.cognitiveOptimizationImpact * 100).toFixed(0)}%</Text>
                <Text style={metricLabelStyle}>Cognitive Boost</Text>
              </Column>
            </Row>
            
            <Row style={{ marginTop: '20px' }}>
              <Column>
                <Text style={savingsTextStyle}>
                  💰 <strong>Cost Savings:</strong> ${performanceMetrics.costSavings.toFixed(2)} 
                  (97.6% reduction via Akash Network)
                </Text>
              </Column>
            </Row>
          </Section>
          
          {/* Spatial Visualization */}
          {spatialVisualizationUrl && (
            <Section style={buttonSectionStyle}>
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: '#6f42c1'
                }}
                href={spatialVisualizationUrl}
              >
                🌌 View Spatial Universe
              </Button>
            </Section>
          )}
          
          {/* Full Report */}
          {reportUrl && (
            <Section style={buttonSectionStyle}>
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: branding?.brandColor || '#007ee6'
                }}
                href={reportUrl}
              >
                📊 View Full Report
              </Button>
            </Section>
          )}
        </Section>
        
        {/* Blockchain Verification Footer */}
        <BlockchainVerificationFooter
          verificationHash={verificationHash}
          agentCoordination={agentCoordination}
          cognitiveOptimization={cognitiveOptimization}
        />
      </Container>
    </Body>
  </Html>
);

// Export all templates
export {
  BlockchainVerifiedWelcomeEmail,
  DAOGovernanceNotificationEmail,
  CampaignPerformanceReportEmail
};

// Styles
const bodyStyle = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  margin: 0,
  padding: 0
};

const containerStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  margin: '40px auto',
  maxWidth: '600px',
  padding: '20px'
};

const headerStyle = {
  textAlign: 'center' as const,
  marginBottom: '30px'
};

const logoStyle = {
  height: '40px',
  margin: '0 auto 20px'
};

const headingStyle = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0'
};

const contentStyle = {
  marginBottom: '30px'
};

const greetingStyle = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '500',
  marginBottom: '20px'
};

const messageStyle = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '20px'
};

const listStyle = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '20px',
  paddingLeft: '20px'
};

const buttonSectionStyle = {
  textAlign: 'center' as const,
  margin: '30px 0'
};

const buttonStyle = {
  backgroundColor: '#007ee6',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1',
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block'
};

const proposalSectionStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '6px',
  padding: '20px',
  margin: '20px 0'
};

const proposalTitleStyle = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 10px 0'
};

const proposalDescriptionStyle = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0'
};

const detailTextStyle = {
  color: '#6c757d',
  fontSize: '14px',
  margin: '0'
};

const metricsSectionStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '6px',
  padding: '30px',
  margin: '20px 0',
  textAlign: 'center' as const
};

const metricColumnStyle = {
  textAlign: 'center' as const,
  width: '50%'
};

const metricNumberStyle = {
  color: '#007ee6',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0'
};

const metricLabelStyle = {
  color: '#6c757d',
  fontSize: '14px',
  fontWeight: '500',
  margin: '5px 0 0 0'
};

const savingsTextStyle = {
  color: '#28a745',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '10px 0 0 0'
};

const footerStyle = {
  borderTop: '1px solid #e6ebf1',
  paddingTop: '20px',
  textAlign: 'center' as const
};

const verificationTextStyle = {
  color: '#6c757d',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '5px 0'
};

const brandingTextStyle = {
  color: '#6c757d',
  fontSize: '12px',
  fontWeight: '500',
  margin: '10px 0 0 0'
};