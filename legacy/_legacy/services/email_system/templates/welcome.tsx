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

interface StackSenseWelcomeEmailProps {
  userFirstName?: string;
  repositoriesConnected?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const StackSenseWelcomeEmail = ({
  userFirstName = 'Developer',
  repositoriesConnected = 0,
}: StackSenseWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to StackSense - Your code analysis journey begins!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/static/stacksense-logo.png`}
            width="140"
            height="36"
            alt="StackSense"
            style={logo}
          />
        </Section>
        
        <Section style={welcomeBanner}>
          <Text style={welcomeIcon}>🔍</Text>
          <Heading style={h1}>Welcome to StackSense, {userFirstName}!</Heading>
        </Section>

        <Text style={heroText}>
          You've just unlocked the power of intelligent code analysis. StackSense will help you 
          understand your codebase like never before, identifying issues, optimizations, and 
          architectural insights that matter most.
        </Text>
        
        <Section style={statusSection}>
          <Text style={statusTitle}>Your Setup Status:</Text>
          {repositoriesConnected > 0 ? (
            <Text style={statusSuccess}>
              ✅ {repositoriesConnected} repositories connected and ready for analysis
            </Text>
          ) : (
            <Text style={statusPending}>
              ⏳ Ready to connect your first repository
            </Text>
          )}
        </Section>

        <Section style={featuresSection}>
          <Text style={featuresTitle}>What StackSense analyzes for you:</Text>
          
          <Section style={featureGroup}>
            <Text style={featureIcon}>🔒</Text>
            <Text style={featureTitle}>Security Vulnerabilities</Text>
            <Text style={featureDesc}>Detect potential security issues and get actionable fixes</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>⚡</Text>
            <Text style={featureTitle}>Performance Bottlenecks</Text>
            <Text style={featureDesc}>Identify slow code patterns and optimization opportunities</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🏗️</Text>
            <Text style={featureTitle}>Architecture Insights</Text>
            <Text style={featureDesc}>Understand your codebase structure and dependencies</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>📊</Text>
            <Text style={featureTitle}>Code Quality Metrics</Text>
            <Text style={featureDesc}>Track maintainability, complexity, and technical debt</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🕰️</Text>
            <Text style={featureTitle}>Legacy Code Detection</Text>
            <Text style={featureDesc">Find outdated patterns and suggest modern alternatives</Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          {repositoriesConnected > 0 ? (
            <Button style={button} href="https://stacksense.com/dashboard">
              View Your Analysis
            </Button>
          ) : (
            <Button style={button} href="https://stacksense.com/connect">
              Connect Your First Repository
            </Button>
          )}
        </Section>

        <Section style={quickStartSection}>
          <Text style={quickStartTitle}>Quick Start Guide:</Text>
          <Text style={quickStartStep}>1. 🔗 Connect your GitHub, GitLab, or Bitbucket repositories</Text>
          <Text style={quickStartStep}>2. ⚙️ Configure analysis settings and preferences</Text>
          <Text style={quickStartStep}>3. 🚀 Run your first comprehensive code analysis</Text>
          <Text style={quickStartStep}>4. 📈 Review insights and implement recommendations</Text>
        </Section>

        <Text style={text}>
          Need help getting started? Our{' '}
          <Link href="https://docs.stacksense.com/getting-started" style={link}>
            getting started guide
          </Link>{' '}
          will walk you through everything step by step.
        </Text>

        <Text style={text}>
          Have questions? Our support team is here to help:{' '}
          <Link href="mailto:support@stacksense.com" style={link}>
            support@stacksense.com
          </Link>
        </Text>

        <Text style={text}>
          Welcome to smarter code analysis!
          <br />
          The StackSense Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default StackSenseWelcomeEmail;

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

const welcomeBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const welcomeIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const h1 = {
  color: '#7c3aed',
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

const statusSection = {
  background: '#f0f9ff',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
};

const statusTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const statusSuccess = {
  color: '#059669',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const statusPending = {
  color: '#f59e0b',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
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
  backgroundColor: '#7c3aed',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const quickStartSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const quickStartTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const quickStartStep = {
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
  color: '#7c3aed',
  textDecoration: 'underline',
};