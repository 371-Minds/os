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

interface SecurityAlertEmailProps {
  userFirstName?: string;
  repositoryName?: string;
  vulnerabilityCount?: number;
  criticalCount?: number;
  highCount?: number;
  detectedAt?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const SecurityAlertEmail = ({
  userFirstName = 'Developer',
  repositoryName = 'your-repository',
  vulnerabilityCount = 5,
  criticalCount = 2,
  highCount = 3,
  detectedAt = '2024-01-15 14:30 UTC',
}: SecurityAlertEmailProps) => (
  <Html>
    <Head />
    <Preview>🚨 Security Alert: {vulnerabilityCount} vulnerabilities found in {repositoryName}</Preview>
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
        
        <Section style={alertBanner}>
          <Text style={alertIcon}>🚨</Text>
          <Heading style={h1}>Security Alert</Heading>
          <Text style={alertSubtitle}>Immediate Action Required</Text>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, our security analysis has detected <strong>{vulnerabilityCount} 
          security vulnerabilities</strong> in your repository <strong>{repositoryName}</strong> 
          that require immediate attention.
        </Text>
        
        <Section style={summarySection}>
          <Text style={summaryTitle}>Vulnerability Summary</Text>
          <Text style={detectedTime}>Detected: {detectedAt}</Text>
          
          <Section style={severityGrid}>
            <Section style={severityCard}>
              <Text style={severityNumber}>{criticalCount}</Text>
              <Text style={severityLabel}>Critical</Text>
              <Text style={severityDesc}>Immediate fix required</Text>
            </Section>
            <Section style={severityCard}>
              <Text style={severityNumber}>{highCount}</Text>
              <Text style={severityLabel}>High</Text>
              <Text style={severityDesc}>Fix within 24 hours</Text>
            </Section>
            <Section style={severityCard}>
              <Text style={severityNumber}>{vulnerabilityCount - criticalCount - highCount}</Text>
              <Text style={severityLabel}>Medium/Low</Text>
              <Text style={severityDesc}>Address soon</Text>
            </Section>
          </Section>
        </Section>

        <Section style={vulnerabilitiesSection}>
          <Text style={vulnerabilitiesTitle}>Critical Vulnerabilities Found:</Text>
          
          <Section style={vulnItem}>
            <Section style={vulnHeader}>
              <Text style={vulnSeverity}>CRITICAL</Text>
              <Text style={vulnTitle}>SQL Injection Vulnerability</Text>
            </Section>
            <Text style={vulnDesc}>
              <strong>File:</strong> src/database/queries.js:45
            </Text>
            <Text style={vulnDesc}>
              <strong>Issue:</strong> User input is directly concatenated into SQL query without sanitization
            </Text>
            <Text style={vulnDesc}>
              <strong>Impact:</strong> Attackers could execute arbitrary SQL commands and access sensitive data
            </Text>
          </Section>

          <Section style={vulnItem}>
            <Section style={vulnHeader}>
              <Text style={vulnSeverity}>CRITICAL</Text>
              <Text style={vulnTitle}>Cross-Site Scripting (XSS)</Text>
            </Section>
            <Text style={vulnDesc}>
              <strong>File:</strong> src/components/UserProfile.jsx:23
            </Text>
            <Text style={vulnDesc}>
              <strong>Issue:</strong> User-generated content rendered without proper escaping
            </Text>
            <Text style={vulnDesc}>
              <strong>Impact:</strong> Malicious scripts could be executed in users' browsers
            </Text>
          </Section>

          <Section style={vulnItem}>
            <Section style={vulnHeader}>
              <Text style={vulnSeverity}>HIGH</Text>
              <Text style={vulnTitle">Insecure Dependency</Text>
            </Section>
            <Text style={vulnDesc}>
              <strong>Package:</strong> lodash@4.17.15
            </Text>
            <Text style={vulnDesc}>
              <strong>Issue:</strong> Known vulnerability CVE-2021-23337 in prototype pollution
            </Text>
            <Text style={vulnDesc}>
              <strong>Fix:</strong> Update to lodash@4.17.21 or higher
            </Text>
          </Section>
        </Section>

        <Section style={actionSection}>
          <Text style={actionTitle}>Immediate Actions Required:</Text>
          <Text style={actionItem}>
            1. 🔒 <strong>Review SQL queries</strong> - Implement parameterized queries or ORM
          </Text>
          <Text style={actionItem}>
            2. 🛡️ <strong>Sanitize user input</strong> - Add proper input validation and output encoding
          </Text>
          <Text style={actionItem}>
            3. 📦 <strong>Update dependencies</strong> - Run npm audit fix or yarn audit fix
          </Text>
          <Text style={actionItem}>
            4. 🧪 <strong>Test fixes</strong> - Verify patches don't break functionality
          </Text>
          <Text style={actionItem}>
            5. 🚀 <strong>Deploy immediately</strong> - Push security fixes to production ASAP
          </Text>
        </Section>

        <Section style={buttonContainer}>
          <Button style={urgentButton} href={`https://stacksense.com/security-report/${repositoryName}`}>
            View Full Security Report
          </Button>
        </Section>

        <Section style={resourcesSection}>
          <Text style={resourcesTitle">Security Resources:</Text>
          <Text style={resourceItem}>
            📚 <Link href="https://docs.stacksense.com/security-fixes" style={link}>
              Security Fix Guidelines
            </Link>
          </Text>
          <Text style={resourceItem}>
            🔧 <Link href="https://docs.stacksense.com/automated-fixes" style={link}>
              Automated Fix Suggestions
            </Link>
          </Text>
          <Text style={resourceItem}>
            📞 <Link href="mailto:security@stacksense.com" style={link}>
              Emergency Security Support
            </Link>
          </Text>
        </Section>

        <Section style={warningSection}>
          <Text style={warningTitle}>⚠️ Important Security Notice</Text>
          <Text style={warningText}>
            These vulnerabilities pose a significant risk to your application and user data. 
            We strongly recommend addressing the critical issues within the next 2 hours and 
            high-severity issues within 24 hours.
          </Text>
        </Section>

        <Section style={preventionSection}>
          <Text style={preventionTitle}>Prevent Future Issues:</Text>
          <Text style={preventionText}>
            Enable continuous security monitoring to catch vulnerabilities as soon as they're 
            introduced. Our real-time scanning can detect issues in pull requests before they 
            reach your main branch.
          </Text>
          <Button style={secondaryButton} href="https://stacksense.com/continuous-monitoring">
            Enable Continuous Monitoring
          </Button>
        </Section>

        <Text style={text}>
          Need immediate assistance? Our security team is available 24/7 for critical issues:{' '}
          <Link href="mailto:security@stacksense.com" style={urgentLink}>
            security@stacksense.com
          </Link>{' '}
          or call our emergency hotline: <Link href="tel:+1-555-SECURITY" style={urgentLink}>
            +1 (555) 732-8748
          </Link>
        </Text>

        <Text style={text}>
          Stay secure,
          <br />
          The StackSense Security Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default SecurityAlertEmail;

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

const alertBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
  padding: '24px',
  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  borderRadius: '8px',
  color: '#ffffff',
};

const alertIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  padding: '0',
};

const alertSubtitle = {
  color: '#fecaca',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
};

const summarySection = {
  background: '#fef2f2',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '2px solid #fecaca',
};

const summaryTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
};

const detectedTime = {
  color: '#6b7280',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0 0 20px 0',
};

const severityGrid = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  margin: '20px 0',
};

const severityCard = {
  flex: 1,
  textAlign: 'center' as const,
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const severityNumber = {
  color: '#dc2626',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const severityLabel = {
  color: '#1f2937',
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
  textTransform: 'uppercase' as const,
};

const severityDesc = {
  color: '#6b7280',
  fontSize: '10px',
  margin: '0',
};

const vulnerabilitiesSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const vulnerabilitiesTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const vulnItem = {
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  borderLeft: '4px solid #dc2626',
};

const vulnHeader = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 12px 0',
};

const vulnSeverity = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontSize: '10px',
  fontWeight: 'bold',
  padding: '4px 8px',
  borderRadius: '4px',
  marginRight: '12px',
  textTransform: 'uppercase' as const,
};

const vulnTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const vulnDesc = {
  color: '#374151',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '4px 0',
};

const actionSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const actionTitle = {
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

const buttonContainer = {
  margin: '32px auto',
  width: 'auto',
  textAlign: 'center' as const,
};

const urgentButton = {
  backgroundColor: '#dc2626',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const resourcesSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '1px solid #0ea5e9',
};

const resourcesTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const resourceItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const warningSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fef2f2',
  borderRadius: '8px',
  border: '2px solid #dc2626',
};

const warningTitle = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const warningText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const preventionSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #10b981',
  textAlign: 'center' as const,
};

const preventionTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const preventionText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px 0',
};

const secondaryButton = {
  backgroundColor: '#10b981',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const text = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const urgentLink = {
  color: '#dc2626',
  textDecoration: 'underline',
  fontWeight: '600',
};