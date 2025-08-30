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

interface AnalysisCompleteEmailProps {
  userFirstName?: string;
  repositoryName?: string;
  analysisTime?: string;
  issuesFound?: number;
  securityIssues?: number;
  performanceIssues?: number;
  codeQualityScore?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const AnalysisCompleteEmail = ({
  userFirstName = 'Developer',
  repositoryName = 'your-repository',
  analysisTime = '3 minutes 42 seconds',
  issuesFound = 12,
  securityIssues = 3,
  performanceIssues = 5,
  codeQualityScore = 78,
}: AnalysisCompleteEmailProps) => (
  <Html>
    <Head />
    <Preview>✅ Analysis complete for {repositoryName} - {issuesFound} issues found</Preview>
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
        
        <Section style={completeBanner}>
          <Text style={completeIcon}>✅</Text>
          <Heading style={h1}>Analysis Complete!</Heading>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, we've finished analyzing <strong>{repositoryName}</strong>. 
          The analysis took {analysisTime} and uncovered some interesting insights about your codebase.
        </Text>
        
        <Section style={summarySection}>
          <Text style={summaryTitle}>Analysis Summary</Text>
          
          <Section style={scoreSection}>
            <Text style={scoreLabel}>Code Quality Score</Text>
            <Section style={scoreBar}>
              <Section style={{...scoreFill, width: `${codeQualityScore}%`, backgroundColor: getScoreColor(codeQualityScore)}} />
            </Section>
            <Text style={scoreText}>{codeQualityScore}/100</Text>
          </Section>

          <Section style={metricsGrid}>
            <Section style={metricCard}>
              <Text style={metricNumber}>{issuesFound}</Text>
              <Text style={metricLabel}>Total Issues</Text>
            </Section>
            <Section style={metricCard}>
              <Text style={metricNumber}>{securityIssues}</Text>
              <Text style={metricLabel}>Security</Text>
            </Section>
            <Section style={metricCard}>
              <Text style={metricNumber}>{performanceIssues}</Text>
              <Text style={metricLabel}>Performance</Text>
            </Section>
          </Section>
        </Section>

        <Section style={issuesSection}>
          <Text style={issuesTitle}>Key Findings:</Text>
          
          {securityIssues > 0 && (
            <Section style={issueGroup}>
              <Text style={issueIcon}>🔒</Text>
              <Section style={issueContent}>
                <Text style={issueTitle}>Security Issues ({securityIssues})</Text>
                <Text style={issueDesc}>
                  Found potential vulnerabilities including SQL injection risks and 
                  insecure dependencies. Immediate attention recommended.
                </Text>
              </Section>
            </Section>
          )}

          {performanceIssues > 0 && (
            <Section style={issueGroup}>
              <Text style={issueIcon}>⚡</Text>
              <Section style={issueContent}>
                <Text style={issueTitle}>Performance Issues ({performanceIssues})</Text>
                <Text style={issueDesc}>
                  Identified inefficient database queries and memory leaks that could 
                  impact application performance under load.
                </Text>
              </Section>
            </Section>
          )}

          <Section style={issueGroup}>
            <Text style={issueIcon}>🏗️</Text>
            <Section style={issueContent}>
              <Text style={issueTitle}>Architecture Insights</Text>
              <Text style={issueDesc}>
                Detected circular dependencies and suggested refactoring opportunities 
                to improve code maintainability.
              </Text>
            </Section>
          </Section>

          <Section style={issueGroup}>
            <Text style={issueIcon}>📊</Text>
            <Section style={issueContent}>
              <Text style={issueTitle}>Code Quality</Text>
              <Text style={issueDesc}>
                Found areas with high complexity and low test coverage. Consider 
                breaking down large functions and adding unit tests.
              </Text>
            </Section>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={primaryButton} href={`https://stacksense.com/analysis/${repositoryName}`}>
            View Detailed Report
          </Button>
        </Section>

        <Section style={actionsSection}>
          <Text style={actionsTitle}>Recommended Next Steps:</Text>
          <Text style={actionItem}>
            1. 🔍 Review the detailed security findings and apply suggested fixes
          </Text>
          <Text style={actionItem}>
            2. ⚡ Optimize the identified performance bottlenecks
          </Text>
          <Text style={actionItem}>
            3. 📈 Set up continuous monitoring for ongoing code quality tracking
          </Text>
          <Text style={actionItem}>
            4. 🔄 Schedule regular analysis runs to catch issues early
          </Text>
        </Section>

        <Section style={insightSection}>
          <Text style={insightTitle}>💡 Pro Tip</Text>
          <Text style={insightText}>
            Enable automatic analysis on every commit to catch issues before they 
            reach production. This can reduce debugging time by up to 60%.
          </Text>
        </Section>

        <Text style={text}>
          Want to dive deeper? The full report includes line-by-line recommendations, 
          code examples, and priority rankings for all findings.
        </Text>

        <Text style={text}>
          Questions about your analysis results? Our team is here to help:{' '}
          <Link href="mailto:support@stacksense.com" style={link}>
            support@stacksense.com
          </Link>
        </Text>

        <Text style={text}>
          Keep building better code!
          <br />
          The StackSense Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const getScoreColor = (score: number) => {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#f59e0b';
  return '#dc2626';
};

export default AnalysisCompleteEmail;

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

const completeBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const completeIcon = {
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

const summarySection = {
  background: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
};

const summaryTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const scoreSection = {
  margin: '20px 0',
};

const scoreLabel = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
};

const scoreBar = {
  width: '100%',
  height: '12px',
  backgroundColor: '#e5e7eb',
  borderRadius: '6px',
  margin: '8px 0',
  position: 'relative' as const,
};

const scoreFill = {
  height: '100%',
  borderRadius: '6px',
  transition: 'width 0.3s ease',
};

const scoreText = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '8px 0 0 0',
};

const metricsGrid = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  margin: '20px 0',
};

const metricCard = {
  flex: 1,
  textAlign: 'center' as const,
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const metricNumber = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const metricLabel = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
};

const issuesSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const issuesTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const issueGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const issueIcon = {
  fontSize: '20px',
  marginRight: '12px',
  flexShrink: 0,
  marginTop: '2px',
};

const issueContent = {
  flex: 1,
};

const issueTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px 0',
};

const issueDesc = {
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

const primaryButton = {
  backgroundColor: '#7c3aed',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const actionsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const actionsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const actionItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const insightSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #10b981',
};

const insightTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const insightText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
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