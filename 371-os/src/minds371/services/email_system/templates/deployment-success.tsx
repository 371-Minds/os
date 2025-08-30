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

interface DeploymentSuccessEmailProps {
  userFirstName?: string;
  projectName?: string;
  deploymentUrl?: string;
  deploymentTime?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const DeploymentSuccessEmail = ({
  userFirstName = 'Developer',
  projectName = 'Your Project',
  deploymentUrl = 'https://your-app.readysetbuild.com',
  deploymentTime = '2 minutes 34 seconds',
}: DeploymentSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>🎉 {projectName} deployed successfully!</Preview>
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
        
        <Section style={successBanner}>
          <Text style={successIcon}>🎉</Text>
          <Heading style={h1}>Deployment Successful!</Heading>
        </Section>

        <Text style={heroText}>
          Great news, {userFirstName}! Your project <strong>{projectName}</strong> has been 
          successfully deployed and is now live.
        </Text>
        
        <Section style={deploymentInfo}>
          <Text style={infoTitle}>Deployment Details:</Text>
          <Text style={infoItem}><strong>Project:</strong> {projectName}</Text>
          <Text style={infoItem}><strong>Deployment Time:</strong> {deploymentTime}</Text>
          <Text style={infoItem}><strong>Status:</strong> ✅ Live</Text>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href={deploymentUrl}>
            View Live Application
          </Button>
        </Section>

        <Section style={actionsSection}>
          <Text style={actionsTitle}>What's next?</Text>
          <Text style={actionItem}>
            📊 <Link href="https://readysetbuild.com/analytics" style={link}>Monitor performance</Link>
          </Text>
          <Text style={actionItem}>
            🔧 <Link href="https://readysetbuild.com/settings" style={link}>Configure settings</Link>
          </Text>
          <Text style={actionItem}>
            📈 <Link href="https://readysetbuild.com/scaling" style={link}>Set up auto-scaling</Link>
          </Text>
          <Text style={actionItem}>
            🔔 <Link href="https://readysetbuild.com/alerts" style={link}>Configure alerts</Link>
          </Text>
        </Section>

        <Text style={text}>
          Your application is now accessible at:{' '}
          <Link href={deploymentUrl} style={link}>
            {deploymentUrl}
          </Link>
        </Text>

        <Text style={text}>
          Need help with your deployment? Our{' '}
          <Link href="https://docs.readysetbuild.com" style={link}>
            documentation
          </Link>{' '}
          and support team are here to help.
        </Text>

        <Text style={text}>
          Happy coding!
          <br />
          The ReadySetBuild Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default DeploymentSuccessEmail;

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
  margin: '0',
};

const h1 = {
  color: '#059669',
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

const deploymentInfo = {
  background: '#f0f9ff',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
};

const infoTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const infoItem = {
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

const actionsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
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
  lineHeight: '24px',
  margin: '8px 0',
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