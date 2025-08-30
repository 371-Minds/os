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

interface EnterpriseDemoInviteEmailProps {
  userFirstName?: string;
  companyName?: string;
  teamSize?: number;
  currentPlan?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const EnterpriseDemoInviteEmail = ({
  userFirstName = 'Developer',
  companyName = 'Your Company',
  teamSize = 25,
  currentPlan = 'Pro',
}: EnterpriseDemoInviteEmailProps) => (
  <Html>
    <Head />
    <Preview>Scale your deployments with ReadySetBuild Enterprise</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/static/readysetbuild-logo.png`}
            width="120"
            height="36"
            alt="ReadySetBuild"
            style={logo}
          />
        </Section>
        
        <Section style={enterpriseBanner}>
          <Text style={enterpriseLabel}>ENTERPRISE</Text>
          <Heading style={h1}>Ready to Scale?</Heading>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, we've noticed {companyName} has been growing rapidly on our {currentPlan} plan. 
          With {teamSize}+ team members, it might be time to explore our Enterprise solution 
          designed for organizations like yours.
        </Text>
        
        <Section style={benefitsSection}>
          <Text style={benefitsTitle}>Enterprise Features Include:</Text>
          
          <Section style={featureGroup}>
            <Text style={featureGroupTitle}>🏢 Advanced Team Management</Text>
            <Text style={featureItem}>• Unlimited team members and projects</Text>
            <Text style={featureItem}>• Role-based access controls (RBAC)</Text>
            <Text style={featureItem}>• Single Sign-On (SSO) integration</Text>
            <Text style={featureItem}>• Advanced audit logging</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureGroupTitle}>🚀 Enhanced Performance</Text>
            <Text style={featureItem}>• Dedicated build infrastructure</Text>
            <Text style={featureItem}>• Priority deployment queues</Text>
            <Text style={featureItem}>• Custom resource allocation</Text>
            <Text style={featureItem}>• 99.99% SLA guarantee</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureGroupTitle}>🔒 Enterprise Security</Text>
            <Text style={featureItem}>• Private cloud deployment options</Text>
            <Text style={featureItem}>• Advanced compliance (SOC 2, GDPR)</Text>
            <Text style={featureItem}>• Custom security policies</Text>
            <Text style={featureItem}>• Dedicated security team support</Text>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureGroupTitle}>📊 Advanced Analytics</Text>
            <Text style={featureItem}>• Custom dashboards and reporting</Text>
            <Text style={featureItem}>• Cost optimization insights</Text>
            <Text style={featureItem}>• Performance benchmarking</Text>
            <Text style={featureItem}>• API usage analytics</Text>
          </Section>
        </Section>

        <Section style={demoSection}>
          <Text style={demoTitle}>See It In Action</Text>
          <Text style={demoText}>
            Book a personalized demo to see how ReadySetBuild Enterprise can 
            streamline your deployment workflow and scale with your growing team.
          </Text>
          
          <Text style={demoIncludes}>Your demo will include:</Text>
          <Text style={demoItem">✅ Live walkthrough of Enterprise features</Text>
          <Text style={demoItem}>✅ Custom deployment pipeline setup</Text>
          <Text style={demoItem">✅ ROI analysis for your organization</Text>
          <Text style={demoItem">✅ Migration planning and timeline</Text>
        </Section>

        <Section style={buttonContainer}>
          <Button style={primaryButton} href="https://readysetbuild.com/enterprise-demo">
            Schedule Your Demo
          </Button>
        </Section>

        <Section style={urgencySection}>
          <Text style={urgencyTitle}>Limited Time Offer</Text>
          <Text style={urgencyText}>
            Book your demo this month and receive:
          </Text>
          <Text style={offerItem}>🎁 3 months free on annual Enterprise plans</Text>
          <Text style={offerItem}>🎁 Free migration assistance (valued at $5,000)</Text>
          <Text style={offerItem}>🎁 Dedicated customer success manager</Text>
        </Section>

        <Section style={socialProofSection}>
          <Text style={socialProofTitle}>Join Industry Leaders</Text>
          <Text style={socialProofText}>
            "ReadySetBuild Enterprise transformed our deployment process. We went from 
            2-hour deployments to 5 minutes, and our team productivity increased by 300%."
          </Text>
          <Text style={socialProofAuthor}>
            - Michael Rodriguez, CTO at InnovateTech (500+ employees)
          </Text>
        </Section>

        <Text style={text}>
          Ready to take the next step? Our Enterprise team is standing by to show you 
          exactly how ReadySetBuild can scale with your organization.
        </Text>

        <Text style={text}>
          Questions before your demo? Reach out to our Enterprise team:{' '}
          <Link href="mailto:enterprise@readysetbuild.com" style={link}>
            enterprise@readysetbuild.com
          </Link>{' '}
          or call <Link href="tel:+1-555-0123" style={link}>+1 (555) 012-3456</Link>
        </Text>

        <Text style={text}>
          Looking forward to showing you what's possible!
          <br />
          The ReadySetBuild Enterprise Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EnterpriseDemoInviteEmail;

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

const enterpriseBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
  padding: '24px',
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  borderRadius: '8px',
  color: '#ffffff',
};

const enterpriseLabel = {
  fontSize: '12px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
  color: '#fbbf24',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '8px 0 0 0',
  padding: '0',
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
};

const benefitsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const benefitsTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const featureGroup = {
  margin: '20px 0',
};

const featureGroupTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const featureItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
  paddingLeft: '8px',
};

const demoSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '1px solid #0ea5e9',
};

const demoTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
};

const demoText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const demoIncludes = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 8px 0',
};

const demoItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
};

const buttonContainer = {
  margin: '32px auto',
  width: 'auto',
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#1e293b',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
};

const urgencySection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '2px solid #f59e0b',
};

const urgencyTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
};

const urgencyText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
};

const offerItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '6px 0',
  textAlign: 'center' as const,
};

const socialProofSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #3b82f6',
};

const socialProofTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const socialProofText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'italic',
  margin: '0 0 12px 0',
};

const socialProofAuthor = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'right' as const,
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