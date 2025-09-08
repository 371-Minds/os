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

interface ModuMindEnterpriseIntegrationEmailProps {
  userFirstName?: string;
  companyName?: string;
  integrationStatus?: string;
  systemsConnected?: number;
  completionDate?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ModuMindEnterpriseIntegrationEmail = ({
  userFirstName = 'IT Director',
  companyName = 'Your Company',
  integrationStatus = 'Completed',
  systemsConnected = 8,
  completionDate = 'today',
}: ModuMindEnterpriseIntegrationEmailProps) => (
  <Html>
    <Head />
    <Preview>
      🔗 Enterprise Integration {integrationStatus} - {systemsConnected} systems
      now connected
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

        <Section style={integrationBanner}>
          <Text style={integrationIcon}>🔗</Text>
          <Heading style={h1}>
            Enterprise Integration {integrationStatus}
          </Heading>
        </Section>

        <Text style={heroText}>
          Excellent news, {userFirstName}! The ModuMind enterprise integration
          for {companyName}
          has been {integrationStatus.toLowerCase()} successfully. We've
          connected{' '}
          <strong>
            {systemsConnected}
            enterprise systems
          </strong>{' '}
          and your unified AI platform is now operational as of {completionDate}
          .
        </Text>

        <Section style={statusSection}>
          <Text style={statusTitle}>Integration Summary:</Text>
          <Section style={statusGrid}>
            <Section style={statusItem}>
              <Text style={statusIcon}>✅</Text>
              <Text style={statusLabel}>Systems Connected</Text>
              <Text style={statusValue}>{systemsConnected}</Text>
            </Section>
            <Section style={statusItem}>
              <Text style={statusIcon}>🚀</Text>
              <Text style={statusLabel}>Status</Text>
              <Text style={statusValue}>{integrationStatus}</Text>
            </Section>
            <Section style={statusItem}>
              <Text style={statusIcon}>⚡</Text>
              <Text style={statusLabel}>Performance</Text>
              <Text style={statusValue}>Optimal</Text>
            </Section>
          </Section>
        </Section>

        <Section style={systemsSection}>
          <Text style={systemsTitle}>Connected Enterprise Systems:</Text>

          <Section style={systemGroup}>
            <Text style={systemIcon}>💼</Text>
            <Text style={systemTitle}>ERP Integration</Text>
            <Text style={systemDesc}>
              SAP, Oracle, Microsoft Dynamics - Real-time data synchronization
            </Text>
          </Section>

          <Section style={systemGroup}>
            <Text style={systemIcon}>👥</Text>
            <Text style={systemTitle}>CRM Connectivity</Text>
            <Text style={systemDesc}>
              Salesforce, HubSpot, Pipedrive - Customer data unification
            </Text>
          </Section>

          <Section style={systemGroup}>
            <Text style={systemIcon}>📊</Text>
            <Text style={systemTitle}>Analytics Platforms</Text>
            <Text style={systemDesc}>
              Tableau, Power BI, Looker - Advanced reporting capabilities
            </Text>
          </Section>

          <Section style={systemGroup}>
            <Text style={systemIcon}>☁️</Text>
            <Text style={systemTitle}>Cloud Infrastructure</Text>
            <Text style={systemDesc}>
              AWS, Azure, GCP - Scalable computing resources
            </Text>
          </Section>

          <Section style={systemGroup}>
            <Text style={systemIcon}>🔒</Text>
            <Text style={systemTitle}>Security & Compliance</Text>
            <Text style={systemDesc}>
              Active Directory, Okta, Compliance monitoring
            </Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button
            style={button}
            href="https://modumind.com/enterprise/dashboard"
          >
            Access Enterprise Dashboard
          </Button>
        </Section>

        <Section style={capabilitiesSection}>
          <Text style={capabilitiesTitle}>
            Now Available - Enterprise Capabilities:
          </Text>

          <Section style={capabilityItem}>
            <Text style={capabilityIcon}>🔄</Text>
            <Text style={capabilityTitle}>Unified Data Flow</Text>
            <Text style={capabilityDesc}>
              Seamless data exchange between all connected systems with
              real-time synchronization
            </Text>
          </Section>

          <Section style={capabilityItem}>
            <Text style={capabilityIcon}>🤖</Text>
            <Text style={capabilityTitle}>Cross-System AI</Text>
            <Text style={capabilityDesc}>
              AI agents can now access and process data from multiple enterprise
              systems
            </Text>
          </Section>

          <Section style={capabilityItem}>
            <Text style={capabilityIcon}>📈</Text>
            <Text style={capabilityTitle}>Enterprise Analytics</Text>
            <Text style={capabilityDesc}>
              Comprehensive insights across all business functions and
              departments
            </Text>
          </Section>

          <Section style={capabilityItem}>
            <Text style={capabilityIcon}>🛡️</Text>
            <Text style={capabilityTitle}>Enterprise Security</Text>
            <Text style={capabilityDesc}>
              Advanced security protocols with role-based access and audit
              trails
            </Text>
          </Section>
        </Section>

        <Section style={nextStepsSection}>
          <Text style={nextStepsTitle}>Recommended Next Steps:</Text>
          <Text style={nextStep}>
            1. 🎯 Configure user roles and permissions for team access
          </Text>
          <Text style={nextStep}>
            2. 📊 Set up custom dashboards for different departments
          </Text>
          <Text style={nextStep}>
            3. 🤖 Deploy AI workflows across integrated systems
          </Text>
          <Text style={nextStep}>
            4. 📈 Schedule training sessions for key stakeholders
          </Text>
          <Text style={nextStep}>
            5. 🔍 Review integration performance and optimization opportunities
          </Text>
        </Section>

        <Section style={supportSection}>
          <Text style={supportTitle}>Enterprise Support Available:</Text>
          <Text style={supportItem}>📞 24/7 Enterprise Support Hotline</Text>
          <Text style={supportItem}>
            👨‍💼 Dedicated Customer Success Manager
          </Text>
          <Text style={supportItem}>🎓 Comprehensive Training Programs</Text>
          <Text style={supportItem}>📚 Enterprise Documentation Portal</Text>
        </Section>

        <Text style={text}>
          Ready to maximize your integration? Schedule a{' '}
          <Link
            href="https://modumind.com/enterprise/optimization"
            style={link}
          >
            post-integration optimization session
          </Link>{' '}
          with our enterprise specialists.
        </Text>

        <Text style={text}>
          Enterprise integration questions? Our dedicated team is here 24/7:{' '}
          <Link href="mailto:enterprise@modumind.com" style={link}>
            enterprise@modumind.com
          </Link>
        </Text>

        <Text style={text}>
          Congratulations on your successful enterprise integration!
          <br />
          The ModuMind Enterprise Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ModuMindEnterpriseIntegrationEmail;

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

const integrationBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const integrationIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const h1 = {
  color: '#0ea5e9',
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
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
};

const statusTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const statusGrid = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const statusItem = {
  textAlign: 'center' as const,
  flex: 1,
};

const statusIcon = {
  fontSize: '24px',
  margin: '0 0 8px 0',
  display: 'block',
};

const statusLabel = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 4px 0',
};

const statusValue = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const systemsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const systemsTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const systemGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const systemIcon = {
  fontSize: '24px',
  marginRight: '12px',
  flexShrink: 0,
};

const systemTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const systemDesc = {
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
  backgroundColor: '#0ea5e9',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const capabilitiesSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const capabilitiesTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const capabilityItem = {
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const capabilityIcon = {
  fontSize: '24px',
  margin: '0 0 8px 0',
  display: 'block',
};

const capabilityTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px 0',
};

const capabilityDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '0',
};

const nextStepsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  border: '1px solid #059669',
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

const supportSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#fdf2f8',
  borderRadius: '8px',
  border: '1px solid #ec4899',
};

const supportTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const supportItem = {
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
  color: '#0ea5e9',
  textDecoration: 'underline',
};
