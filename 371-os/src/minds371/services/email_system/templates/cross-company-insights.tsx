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

interface ModuMindCrossCompanyInsightsEmailProps {
  userFirstName?: string;
  companyName?: string;
  insightsCount?: number;
  reportPeriod?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ModuMindCrossCompanyInsightsEmail = ({
  userFirstName = 'Executive',
  companyName = 'Your Company',
  insightsCount = 12,
  reportPeriod = 'this month',
}: ModuMindCrossCompanyInsightsEmailProps) => (
  <Html>
    <Head />
    <Preview>📊 Cross-Company Insights Report - {insightsCount} key findings for {companyName}</Preview>
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
        
        <Section style={insightsBanner}>
          <Text style={insightsIcon}>📊</Text>
          <Heading style={h1}>Cross-Company Insights Report</Heading>
        </Section>

        <Text style={heroText}>
          Hello {userFirstName}, we've analyzed performance data across our network and 
          identified <strong>{insightsCount} key insights</strong> that could benefit {companyName} 
          based on industry trends and peer comparisons from {reportPeriod}.
        </Text>
        
        <Section style={summarySection}>
          <Text style={summaryTitle}>Executive Summary:</Text>
          <Section style={summaryStats}>
            <Section style={statItem}>
              <Text style={statNumber}>{insightsCount}</Text>
              <Text style={statLabel}>Key Insights</Text>
            </Section>
            <Section style={statItem}>
              <Text style={statNumber}>85%</Text>
              <Text style={statLabel}>Accuracy Rate</Text>
            </Section>
            <Section style={statItem}>
              <Text style={statNumber}>3.2x</Text>
              <Text style={statLabel}>ROI Potential</Text>
            </Section>
          </Section>
        </Section>

        <Section style={insightsSection}>
          <Text style={insightsTitle}>Top Strategic Insights:</Text>
          
          <Section style={insightGroup}>
            <Text style={insightIcon}>🚀</Text>
            <Text style={insightTitle}>Market Opportunity</Text>
            <Text style={insightDesc}>Companies in your sector are seeing 40% growth in AI automation adoption</Text>
          </Section>

          <Section style={insightGroup}>
            <Text style={insightIcon}>⚡</Text>
            <Text style={insightTitle}>Operational Efficiency</Text>
            <Text style={insightDesc}>Peer companies reduced processing time by 60% using similar AI workflows</Text>
          </Section>

          <Section style={insightGroup}>
            <Text style={insightIcon}>💰</Text>
            <Text style={insightTitle}>Cost Optimization</Text>
            <Text style={insightDesc}>Industry leaders save $2.3M annually through intelligent resource allocation</Text>
          </Section>

          <Section style={insightGroup}>
            <Text style={insightIcon}>📈</Text>
            <Text style={insightTitle}>Competitive Advantage</Text>
            <Text style={insightDesc}>Early AI adopters in your industry report 25% higher customer satisfaction</Text>
          </Section>

          <Section style={insightGroup}>
            <Text style={insightIcon}>🎯</Text>
            <Text style={insightTitle}>Strategic Focus</Text>
            <Text style={insightDesc}>Top performers prioritize predictive analytics and customer intelligence</Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href="https://modumind.com/insights/full-report">
            View Complete Report
          </Button>
        </Section>

        <Section style={benchmarkSection}>
          <Text style={benchmarkTitle}>Industry Benchmarks:</Text>
          <Text style={benchmarkItem}>📊 AI Implementation Rate: 73% (Industry Average: 45%)</Text>
          <Text style={benchmarkItem}>⏱️ Process Automation: 68% (Industry Average: 52%)</Text>
          <Text style={benchmarkItem}>🔍 Data Analytics Maturity: 81% (Industry Average: 59%)</Text>
          <Text style={benchmarkItem}>🤖 AI-Driven Decision Making: 64% (Industry Average: 38%)</Text>
        </Section>

        <Section style={recommendationsSection}>
          <Text style={recommendationsTitle}>Recommended Actions:</Text>
          <Text style={recommendation}>1. 🎯 Prioritize AI automation in customer service operations</Text>
          <Text style={recommendation}>2. 📊 Implement predictive analytics for demand forecasting</Text>
          <Text style={recommendation}>3. 🔄 Optimize workflow automation based on peer best practices</Text>
          <Text style={recommendation}>4. 💡 Explore cross-functional AI applications for competitive edge</Text>
        </Section>

        <Text style={text}>
          Want to dive deeper into specific insights? Schedule a{' '}
          <Link href="https://modumind.com/insights/consultation" style={link}>
            strategic consultation
          </Link>{' '}
          with our insights team to discuss implementation strategies.
        </Text>

        <Text style={text}>
          Questions about these insights? Our analytics team is here to help:{' '}
          <Link href="mailto:insights@modumind.com" style={link}>
            insights@modumind.com
          </Link>
        </Text>

        <Text style={text}>
          Driving your competitive advantage through data,
          <br />
          The ModuMind Insights Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ModuMindCrossCompanyInsightsEmail;

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

const insightsBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const insightsIcon = {
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

const summarySection = {
  background: '#f0f9ff',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
};

const summaryTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const summaryStats = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const statItem = {
  textAlign: 'center' as const,
  flex: 1,
};

const statNumber = {
  color: '#0ea5e9',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  display: 'block',
};

const statLabel = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '4px 0 0 0',
};

const insightsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const insightsTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const insightGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const insightIcon = {
  fontSize: '24px',
  marginRight: '12px',
  flexShrink: 0,
};

const insightTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const insightDesc = {
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

const benchmarkSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const benchmarkTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const benchmarkItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const recommendationsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  border: '1px solid #059669',
};

const recommendationsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const recommendation = {
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