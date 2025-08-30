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

interface ModuMindAIPlatformWelcomeEmailProps {
  userFirstName?: string;
  companyName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ModuMindAIPlatformWelcomeEmail = ({
  userFirstName = 'Developer',
  companyName = 'Your Company',
}: ModuMindAIPlatformWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to ModuMind AI Platform - Transform your business with intelligent automation!</Preview>
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
        
        <Section style={welcomeBanner}>
          <Text style={welcomeIcon}>🧠</Text>
          <Heading style={h1}>Welcome to ModuMind AI Platform, {userFirstName}!</Heading>
        </Section>

        <Text style={heroText}>
          You've just joined the future of intelligent business automation. ModuMind's AI Platform 
          will help you streamline operations, enhance decision-making, and unlock new possibilities 
          for {companyName} through cutting-edge artificial intelligence.
        </Text>
        
        <Section style={featuresSection}>
          <Text style={featuresTitle}>Your AI-Powered Toolkit:</Text>
          
          <Section style={featureGroup}>
            <Text style={featureIcon}>🤖</Text>
            <Text style={featureTitle}>Intelligent Automation</Text>
            <Text style={featureDesc}>Automate complex workflows with AI-driven decision making</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>📊</Text>
            <Text style={featureTitle}>Predictive Analytics</Text>
            <Text style={featureDesc}>Forecast trends and make data-driven decisions with confidence</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>💬</Text>
            <Text style={featureTitle}>Natural Language Processing</Text>
            <Text style={featureDesc}>Extract insights from text, automate customer interactions</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🔍</Text>
            <Text style={featureTitle}>Computer Vision</Text>
            <Text style={featureDesc}>Analyze images and videos for quality control and insights</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>⚡</Text>
            <Text style={featureTitle}>Real-time Processing</Text>
            <Text style={featureDesc}>Get instant AI-powered responses and recommendations</Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href="https://modumind.com/platform/dashboard">
            Explore Your AI Platform
          </Button>
        </Section>

        <Section style={quickStartSection}>
          <Text style={quickStartTitle}>Getting Started with AI:</Text>
          <Text style={quickStartStep}>1. 🎯 Define your AI use cases and business objectives</Text>
          <Text style={quickStartStep}>2. 📋 Configure your first AI workflow or model</Text>
          <Text style={quickStartStep}>3. 🔗 Connect your data sources and integrations</Text>
          <Text style={quickStartStep}>4. 🚀 Deploy and monitor your AI solutions</Text>
        </Section>

        <Text style={text}>
          Ready to dive deeper? Check out our{' '}
          <Link href="https://docs.modumind.com/ai-platform" style={link}>
            AI Platform documentation
          </Link>{' '}
          for comprehensive guides and tutorials.
        </Text>

        <Text style={text}>
          Questions about AI implementation? Our AI specialists are here to help:{' '}
          <Link href="mailto:ai-support@modumind.com" style={link}>
            ai-support@modumind.com
          </Link>
        </Text>

        <Text style={text}>
          Welcome to the future of intelligent business!
          <br />
          The ModuMind AI Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ModuMindAIPlatformWelcomeEmail;

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
  color: '#6366f1',
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
  backgroundColor: '#6366f1',
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
  color: '#6366f1',
  textDecoration: 'underline',
};