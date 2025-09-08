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

interface StackSenseUpsellEmailProps {
  userFirstName?: string;
  projectsDeployed?: number;
  potentialIssues?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const StackSenseUpsellEmail = ({
  userFirstName = 'Developer',
  projectsDeployed = 12,
  potentialIssues = 8,
}: StackSenseUpsellEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Supercharge your deployments with StackSense code analysis
    </Preview>
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

        <Section style={partnershipBanner}>
          <Text style={partnershipText}>ReadySetBuild + StackSense</Text>
          <Heading style={h1}>Deploy Smarter, Not Harder</Heading>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, you've deployed {projectsDeployed} projects with
          ReadySetBuild. That's awesome! But what if we told you there might be
          hidden issues in your code that could affect performance and security?
        </Text>

        <Section style={insightBox}>
          <Text style={insightIcon}>🔍</Text>
          <Text style={insightTitle}>Code Analysis Insight</Text>
          <Text style={insightText}>
            Based on similar projects, we estimate your codebase might have
            <strong>
              {' '}
              {potentialIssues} potential optimization opportunities
            </strong>{' '}
            that StackSense could identify and help you fix.
          </Text>
        </Section>

        <Section style={benefitsSection}>
          <Text style={benefitsTitle}>
            What StackSense brings to your deployments:
          </Text>
          <Text style={benefitItem}>
            🔒 <strong>Security Analysis:</strong> Identify vulnerabilities
            before they go live
          </Text>
          <Text style={benefitItem}>
            ⚡ <strong>Performance Optimization:</strong> Find bottlenecks and
            inefficiencies
          </Text>
          <Text style={benefitItem}>
            📊 <strong>Code Quality Metrics:</strong> Track technical debt and
            maintainability
          </Text>
          <Text style={benefitItem}>
            🏗️ <strong>Architecture Insights:</strong> Understand your codebase
            structure
          </Text>
          <Text style={benefitItem}>
            🔄 <strong>Legacy Code Detection:</strong> Identify outdated
            patterns and dependencies
          </Text>
        </Section>

        <Section style={integrationSection}>
          <Text style={integrationTitle}>Seamless Integration</Text>
          <Text style={integrationStep}>
            1. Connect your ReadySetBuild account
          </Text>
          <Text style={integrationStep}>
            2. StackSense analyzes your code during deployment
          </Text>
          <Text style={integrationStep}>
            3. Get detailed reports and recommendations
          </Text>
          <Text style={integrationStep}>4. Deploy with confidence</Text>
        </Section>

        <Section style={buttonContainer}>
          <Button
            style={primaryButton}
            href="https://stacksense.com/readysetbuild-integration"
          >
            Try StackSense Free for 14 Days
          </Button>
        </Section>

        <Section style={pricingSection}>
          <Text style={pricingTitle}>
            Special ReadySetBuild Customer Pricing:
          </Text>
          <Text style={pricingItem}>
            <strong>Starter:</strong> $29/month (reg. $39) - Up to 5
            repositories
          </Text>
          <Text style={pricingItem}>
            <strong>Professional:</strong> $79/month (reg. $99) - Up to 25
            repositories
          </Text>
          <Text style={pricingItem}>
            <strong>Enterprise:</strong> Custom pricing - Unlimited repositories
          </Text>
        </Section>

        <Section style={testimonialSection}>
          <Text style={testimonialQuote}>
            "StackSense helped us identify 15 security vulnerabilities and
            improved our deployment performance by 40%. It's now an essential
            part of our workflow."
          </Text>
          <Text style={testimonialAuthor}>
            - Sarah Chen, Lead Developer at TechCorp
          </Text>
        </Section>

        <Text style={text}>
          Ready to take your deployments to the next level? Start your free
          trial today and see what StackSense can discover in your code.
        </Text>

        <Text style={text}>
          Questions? Our integration specialists are here to help:{' '}
          <Link href="mailto:partnerships@stacksense.com" style={link}>
            partnerships@stacksense.com
          </Link>
        </Text>

        <Text style={text}>
          Happy deploying!
          <br />
          The ReadySetBuild & StackSense Teams
        </Text>
      </Container>
    </Body>
  </Html>
);

export default StackSenseUpsellEmail;

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

const partnershipBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
  padding: '20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '8px',
  color: '#ffffff',
};

const partnershipText = {
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
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

const insightBox = {
  background: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #0ea5e9',
  textAlign: 'center' as const,
};

const insightIcon = {
  fontSize: '32px',
  margin: '0 0 12px 0',
};

const insightTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const insightText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const benefitsSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f9fafb',
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
  margin: '8px 0',
};

const integrationSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
};

const integrationTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const integrationStep = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  paddingLeft: '8px',
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

const pricingSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #10b981',
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

const testimonialSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #3b82f6',
};

const testimonialQuote = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'italic',
  margin: '0 0 12px 0',
};

const testimonialAuthor = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
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
