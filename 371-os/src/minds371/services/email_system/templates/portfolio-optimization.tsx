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

interface ModuMindPortfolioOptimizationEmailProps {
  userFirstName?: string;
  companyName?: string;
  optimizationScore?: number;
  potentialSavings?: string;
  reportDate?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ModuMindPortfolioOptimizationEmail = ({
  userFirstName = 'Portfolio Manager',
  companyName = 'Your Company',
  optimizationScore = 87,
  potentialSavings = '$2.4M',
  reportDate = 'this quarter',
}: ModuMindPortfolioOptimizationEmailProps) => (
  <Html>
    <Head />
    <Preview>📈 Portfolio Optimization Report - {potentialSavings} in potential savings identified</Preview>
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
        
        <Section style={optimizationBanner}>
          <Text style={optimizationIcon}>📈</Text>
          <Heading style={h1}>Portfolio Optimization Report</Heading>
        </Section>

        <Text style={heroText}>
          Hello {userFirstName}, our AI-powered portfolio analysis has identified significant 
          optimization opportunities for {companyName}. We've discovered <strong>{potentialSavings}</strong> 
          in potential savings and efficiency improvements for {reportDate}.
        </Text>
        
        <Section style={scoreSection}>
          <Text style={scoreTitle}>Optimization Score</Text>
          <Section style={scoreDisplay}>
            <Text style={scoreNumber}>{optimizationScore}</Text>
            <Text style={scoreOutOf}>/100</Text>
          </Section>
          <Text style={scoreDescription}>
            {optimizationScore >= 90 ? 'Excellent' : 
             optimizationScore >= 80 ? 'Very Good' : 
             optimizationScore >= 70 ? 'Good' : 
             optimizationScore >= 60 ? 'Fair' : 'Needs Improvement'} optimization potential
          </Text>
        </Section>

        <Section style={metricsSection}>
          <Text style={metricsTitle}>Key Performance Metrics:</Text>
          
          <Section style={metricGroup}>
            <Text style={metricIcon}>💰</Text>
            <Text style={metricTitle}>Cost Reduction Potential</Text>
            <Text style={metricValue}>{potentialSavings}</Text>
            <Text style={metricDesc}>Through resource reallocation and efficiency improvements</Text>
          </Section>

          <Section style={metricGroup}>
            <Text style={metricIcon}>⚡</Text>
            <Text style={metricTitle}>Performance Improvement</Text>
            <Text style={metricValue}>34%</Text>
            <Text style={metricDesc}>Expected increase in portfolio performance metrics</Text>
          </Section>

          <Section style={metricGroup}>
            <Text style={metricIcon}>🎯</Text>
            <Text style={metricTitle}>Risk Optimization</Text>
            <Text style={metricValue}>22%</Text>
            <Text style={metricDesc}>Reduction in portfolio risk through diversification</Text>
          </Section>

          <Section style={metricGroup}>
            <Text style={metricIcon}>📊</Text>
            <Text style={metricTitle}>ROI Enhancement</Text>
            <Text style={metricValue}>18%</Text>
            <Text style={metricDesc}>Projected improvement in return on investment</Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href="https://modumind.com/portfolio/detailed-report">
            View Detailed Analysis
          </Button>
        </Section>

        <Section style={recommendationsSection}>
          <Text style={recommendationsTitle}>Top Optimization Recommendations:</Text>
          
          <Section style={recommendationItem}>
            <Text style={recommendationPriority}>HIGH PRIORITY</Text>
            <Text style={recommendationTitle}>Resource Reallocation</Text>
            <Text style={recommendationDesc}>
              Shift 15% of underperforming assets to high-growth opportunities
            </Text>
            <Text style={recommendationImpact}>Impact: {potentialSavings.split('.')[0]}.1M savings</Text>
          </Section>

          <Section style={recommendationItem}>
            <Text style={recommendationPriority}>MEDIUM PRIORITY</Text>
            <Text style={recommendationTitle}>Technology Stack Optimization</Text>
            <Text style={recommendationDesc}>
              Consolidate redundant tools and upgrade core infrastructure
            </Text>
            <Text style={recommendationImpact}>Impact: $890K annual savings</Text>
          </Section>

          <Section style={recommendationItem}>
            <Text style={recommendationPriority}>MEDIUM PRIORITY</Text>
            <Text style={recommendationTitle}>Process Automation</Text>
            <Text style={recommendationDesc}>
              Automate 60% of manual portfolio management tasks
            </Text>
            <Text style={recommendationImpact}>Impact: 40% efficiency increase</Text>
          </Section>
        </Section>

        <Section style={timelineSection}>
          <Text style={timelineTitle}>Implementation Timeline:</Text>
          <Text style={timelineStep}>📅 Week 1-2: Resource reallocation planning</Text>
          <Text style={timelineStep}>📅 Week 3-6: Technology stack optimization</Text>
          <Text style={timelineStep">📅 Week 7-10: Process automation deployment</Text>
          <Text style={timelineStep}>📅 Week 11-12: Performance monitoring and fine-tuning</Text>
        </Section>

        <Text style={text}>
          Ready to implement these optimizations? Schedule a{' '}
          <Link href="https://modumind.com/portfolio/consultation" style={link}>
            strategy session
          </Link>{' '}
          with our portfolio optimization specialists.
        </Text>

        <Text style={text}>
          Questions about your optimization report? Our portfolio team is here to help:{' '}
          <Link href="mailto:portfolio@modumind.com" style={link}>
            portfolio@modumind.com
          </Link>
        </Text>

        <Text style={text}>
          Maximizing your portfolio potential,
          <br />
          The ModuMind Portfolio Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ModuMindPortfolioOptimizationEmail;

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

const optimizationBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const optimizationIcon = {
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

const scoreSection = {
  background: '#f0fdf4',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #059669',
  textAlign: 'center' as const,
};

const scoreTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const scoreDisplay = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  margin: '16px 0',
};

const scoreNumber = {
  color: '#059669',
  fontSize: '48px',
  fontWeight: 'bold',
  margin: '0',
};

const scoreOutOf = {
  color: '#6b7280',
  fontSize: '24px',
  margin: '0 0 0 4px',
};

const scoreDescription = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '8px 0 0 0',
};

const metricsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const metricsTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const metricGroup = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const metricIcon = {
  fontSize: '32px',
  margin: '0 0 8px 0',
};

const metricTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
  textAlign: 'center' as const,
};

const metricValue = {
  color: '#059669',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '4px 0',
};

const metricDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '4px 0 0 0',
  textAlign: 'center' as const,
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

const recommendationsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const recommendationsTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const recommendationItem = {
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const recommendationPriority = {
  color: '#dc2626',
  fontSize: '11px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  margin: '0 0 8px 0',
};

const recommendationTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px 0',
};

const recommendationDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '0 0 8px 0',
};

const recommendationImpact = {
  color: '#059669',
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

const timelineSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '1px solid #0ea5e9',
};

const timelineTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const timelineStep = {
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