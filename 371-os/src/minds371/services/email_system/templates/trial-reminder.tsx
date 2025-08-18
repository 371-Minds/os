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

interface TrialReminderEmailProps {
  userFirstName?: string;
  daysRemaining?: number;
  deploymentsUsed?: number;
  totalDeployments?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const TrialReminderEmail = ({
  userFirstName = 'Developer',
  daysRemaining = 7,
  deploymentsUsed = 15,
  totalDeployments = 25,
}: TrialReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>Your ReadySetBuild trial expires in {daysRemaining} days</Preview>
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
        
        <Section style={reminderBanner}>
          <Text style={reminderIcon}>⏰</Text>
          <Heading style={h1}>Trial Ending Soon</Heading>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, your ReadySetBuild trial expires in <strong>{daysRemaining} days</strong>.
          Don't lose access to your seamless deployment experience!
        </Text>
        
        <Section style={usageStats}>
          <Text style={statsTitle}>Your Trial Usage:</Text>
          <Section style={progressBar}>
            <Section style={{...progressFill, width: `${(deploymentsUsed / totalDeployments) * 100}%`}} />
          </Section>
          <Text style={statsText}>
            {deploymentsUsed} of {totalDeployments} deployments used
          </Text>
          <Text style={statsText}>
            {daysRemaining} days remaining
          </Text>
        </Section>

        <Section style={benefitsSection}>
          <Text style={benefitsTitle}>Continue enjoying:</Text>
          <Text style={benefitItem}>🚀 Unlimited deployments</Text>
          <Text style={benefitItem}>⚡ Lightning-fast builds</Text>
          <Text style={benefitItem}>📊 Advanced analytics</Text>
          <Text style={benefitItem}>🔧 Custom domains</Text>
          <Text style={benefitItem}>🛡️ SSL certificates</Text>
          <Text style={benefitItem}>📞 Priority support</Text>
        </Section>

        <Section style={buttonContainer}>
          <Button style={upgradeButton} href="https://readysetbuild.com/upgrade">
            Upgrade Now - 20% Off
          </Button>
        </Section>

        <Section style={pricingSection}>
          <Text style={pricingTitle}>Choose Your Plan:</Text>
          <Text style={pricingItem}>
            <strong>Starter:</strong> $19/month - Perfect for personal projects
          </Text>
          <Text style={pricingItem}>
            <strong>Pro:</strong> $49/month - Great for growing teams
          </Text>
          <Text style={pricingItem}>
            <strong>Enterprise:</strong> Custom pricing - For large organizations
          </Text>
        </Section>

        <Text style={urgencyText}>
          ⚠️ <strong>Important:</strong> After your trial expires, your deployments will be paused. 
          Upgrade now to keep your applications running smoothly.
        </Text>

        <Text style={text}>
          Questions about upgrading? Our team is here to help:{' '}
          <Link href="mailto:support@readysetbuild.com" style={link}>
            support@readysetbuild.com
          </Link>
        </Text>

        <Text style={text}>
          Thank you for choosing ReadySetBuild!
          <br />
          The ReadySetBuild Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default TrialReminderEmail;

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

const reminderBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
};

const reminderIcon = {
  fontSize: '48px',
  margin: '0',
};

const h1 = {
  color: '#dc2626',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '16px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const usageStats = {
  background: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #f59e0b',
};

const statsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const progressBar = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e5e7eb',
  borderRadius: '4px',
  margin: '12px 0',
  position: 'relative' as const,
};

const progressFill = {
  height: '100%',
  backgroundColor: '#f59e0b',
  borderRadius: '4px',
};

const statsText = {
  color: '#374151',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '4px 0',
};

const benefitsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
};

const benefitsTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const benefitItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '6px 0',
};

const buttonContainer = {
  margin: '32px auto',
  width: 'auto',
  textAlign: 'center' as const,
};

const upgradeButton = {
  backgroundColor: '#dc2626',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const pricingSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const pricingTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const pricingItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const urgencyText = {
  color: '#dc2626',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0',
  padding: '16px',
  backgroundColor: '#fef2f2',
  borderRadius: '6px',
  border: '1px solid #fecaca',
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