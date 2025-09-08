import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ModuMindAgentDeploymentSuccessEmailProps {
  userFirstName?: string;
  agentName?: string;
  deploymentTime?: string;
  agentType?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ModuMindAgentDeploymentSuccessEmail = ({
  userFirstName = 'Developer',
  agentName = 'AI Agent',
  deploymentTime = 'just now',
  agentType = 'Automation Agent',
}: ModuMindAgentDeploymentSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>
      🚀 Your {agentName} has been successfully deployed and is now active!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/static/modumind-logo.png`}
            width="160"
            height="40"
            alt="ModuMind"
            style={logo}
          />
        </Section>

        <Section style={successBanner}>
          <Text style={successIcon}>🚀</Text>
          <Heading style={h1}>Deployment Successful!</Heading>
        </Section>

        <Text style={heroText}>
          Great news, {userFirstName}! Your <strong>{agentName}</strong> has
          been successfully deployed and is now actively running in your
          environment.
        </Text>

        <Section style={deploymentDetails}>
          <Text style={detailsTitle}>Deployment Summary:</Text>
          <Section style={detailRow}>
            <Text style={detailLabel}>Agent Name:</Text>
            <Text style={detailValue}>{agentName}</Text>
          </Section>
          <Section style={detailRow}>
            <Text style={detailLabel}>Agent Type:</Text>
            <Text style={detailValue}>{agentType}</Text>
          </Section>
          <Section style={detailRow}>
            <Text style={detailLabel}>Deployed:</Text>
            <Text style={detailValue}>{deploymentTime}</Text>
          </Section>
          <Section style={detailRow}>
            <Text style={detailLabel}>Status:</Text>
            <Text style={statusActive}>🟢 Active & Running</Text>
          </Section>
        </Section>

        <Section style={featuresSection}>
          <Text style={featuresTitle}>Your Agent is Now:</Text>

          <Section style={featureGroup}>
            <Text style={featureIcon}>⚡</Text>
            <Text style={featureTitle}>Processing Requests</Text>
            <Text style={featureDesc}>
              Actively handling incoming tasks and workflows
            </Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>📊</Text>
            <Text style={featureTitle}>Collecting Analytics</Text>
            <Text style={featureDesc}>
              Gathering performance metrics and usage data
            </Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🔄</Text>
            <Text style={featureTitle}>Auto-Learning</Text>
            <Text style={featureDesc}>
              Continuously improving based on interactions
            </Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🛡️</Text>
            <Text style={featureTitle}>Monitoring Health</Text>
            <Text style={featureDesc}>
              Self-monitoring for optimal performance
            </Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href="https://modumind.com/agents/dashboard">
            Monitor Agent Performance
          </Button>
        </Section>

        <Section style={nextStepsSection}>
          <Text style={nextStepsTitle}>What's Next?</Text>
          <Text style={nextStep}>
            1. 📈 Monitor your agent's performance in real-time
          </Text>
          <Text style={nextStep}>
            2. ⚙️ Fine-tune settings based on initial results
          </Text>
          <Text style={nextStep}>
            3. 📋 Review analytics and optimization suggestions
          </Text>
          <Text style={nextStep}>
            4. 🔄 Scale or replicate successful agent configurations
          </Text>
        </Section>

        <Text style={text}>
          Need to make adjustments? Visit your{' '}
          <Link href="https://modumind.com/agents/configure" style={link}>
            agent configuration panel
          </Link>{' '}
          to modify settings or deploy additional agents.
        </Text>

        <Text style={text}>
          Questions about your deployment? Our agent specialists are standing
          by:{' '}
          <Link href="mailto:agents@modumind.com" style={link}>
            agents@modumind.com
          </Link>
        </Text>

        <Text style={text}>
          Congratulations on your successful deployment!
          <br />
          The ModuMind Agent Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ModuMindAgentDeploymentSuccessEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const logoContainer = {
  marginTop: '32px',
};

const logo = {
  margin: '0 auto',
};

const successBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const successIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const h1 = {
  color: '#059669',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
  textAlign: 'center' as const,
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const deploymentDetails = {
  background: '#f0fdf4',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #059669',
};

const detailsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '8px 0',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '500',
};

const detailValue = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: '600',
};

const statusActive = {
  color: '#059669',
  fontSize: '14px',
  fontWeight: '600',
};

const featuresSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const featuresTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const featureGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const featureIcon = {
  fontSize: '24px',
  marginRight: '12px',
  flexShrink: 0,
};

const featureTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const featureDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '0',
};

const buttonContainer = {
  margin: '32px auto',
  width: 'auto',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const nextStepsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const nextStepsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const nextStep = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const text = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
};

const link = {
  color: '#059669',
  textDecoration: 'underline',
};
