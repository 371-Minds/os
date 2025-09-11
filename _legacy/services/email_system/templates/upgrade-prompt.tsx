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

interface UpgradePromptEmailProps {
  userFirstName?: string;
  currentPlan?: string;
  analysesUsed?: number;
  analysesLimit?: number;
  repositoriesAnalyzed?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const UpgradePromptEmail = ({
  userFirstName = 'Developer',
  currentPlan = 'Starter',
  analysesUsed = 18,
  analysesLimit = 20,
  repositoriesAnalyzed = 5,
}: UpgradePromptEmailProps) => (
  <Html>
    <Head />
    <Preview>Unlock more powerful code analysis with StackSense Pro</Preview>
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
        
        <Section style={upgradeBanner}>
          <Text style={upgradeIcon}>🚀</Text>
          <Heading style={h1}>Ready to Level Up?</Heading>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, you've been making great use of StackSense! You've analyzed 
          {repositoriesAnalyzed} repositories and used {analysesUsed} of your {analysesLimit} monthly 
          analyses on the {currentPlan} plan.
        </Text>
        
        <Section style={usageSection}>
          <Text style={usageTitle}>Your Current Usage</Text>
          <Section style={progressBar}>
            <Section style={{...progressFill, width: `${(analysesUsed / analysesLimit) * 100}%`}} />
          </Section>
          <Text style={usageText}>
            {analysesUsed} of {analysesLimit} analyses used this month
          </Text>
          <Text style={usageSubtext}>
            {analysesLimit - analysesUsed} analyses remaining
          </Text>
        </Section>

        <Section style={benefitsSection}>
          <Text style={benefitsTitle}>Unlock More with StackSense Pro:</Text>
          
          <Section style={benefitGroup}>
            <Text style={benefitIcon}>🔄</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>Unlimited Analyses</Text>
              <Text style={benefitDesc}>
                No more monthly limits. Analyze as many repositories as you need.
              </Text>
            </Section>
          </Section>

          <Section style={benefitGroup}>
            <Text style={benefitIcon}>⚡</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>Real-time Monitoring</Text>
              <Text style={benefitDesc}>
                Continuous code quality monitoring with instant alerts for new issues.
              </Text>
            </Section>
          </Section>

          <Section style={benefitGroup}>
            <Text style={benefitIcon}>🎯</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>Advanced Filters</Text>
              <Text style={benefitDesc}>
                Custom analysis rules, priority filtering, and team-specific configurations.
              </Text>
            </Section>
          </Section>

          <Section style={benefitGroup}>
            <Text style={benefitIcon}>👥</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>Team Collaboration</Text>
              <Text style={benefitDesc">
                Share reports, assign issues, and track progress across your development team.
              </Text>
            </Section>
          </Section>

          <Section style={benefitGroup}>
            <Text style={benefitIcon}>📊</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>Advanced Analytics</Text>
              <Text style={benefitDesc}>
                Detailed trends, custom dashboards, and exportable reports.
              </Text>
            </Section>
          </Section>

          <Section style={benefitGroup}>
            <Text style={benefitIcon}>🔌</Text>
            <Section style={benefitContent}>
              <Text style={benefitTitle}>CI/CD Integration</Text>
              <Text style={benefitDesc}>
                Seamless integration with GitHub Actions, Jenkins, and other CI/CD tools.
              </Text>
            </Section>
          </Section>
        </Section>

        <Section style={comparisonSection}>
          <Text style={comparisonTitle}>Plan Comparison</Text>
          
          <Section style={planCard}>
            <Text style={planName}>Starter (Current)</Text>
            <Text style={planPrice}>$29/month</Text>
            <Text style={planFeature}>• 20 analyses per month</Text>
            <Text style={planFeature}>• Basic security scanning</Text>
            <Text style={planFeature}>• Email support</Text>
          </Section>

          <Section style={planCardHighlighted}>
            <Text style={planNameHighlighted}>Pro (Recommended)</Text>
            <Text style={planPriceHighlighted}>$79/month</Text>
            <Text style={planFeatureHighlighted}>• Unlimited analyses</Text>
            <Text style={planFeatureHighlighted}>• Real-time monitoring</Text>
            <Text style={planFeatureHighlighted}>• Team collaboration</Text>
            <Text style={planFeatureHighlighted}>• Advanced analytics</Text>
            <Text style={planFeatureHighlighted}>• CI/CD integration</Text>
            <Text style={planFeatureHighlighted}>• Priority support</Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={upgradeButton} href="https://stacksense.com/upgrade">
            Upgrade to Pro - 30% Off First Month
          </Button>
        </Section>

        <Section style={testimonialSection}>
          <Text style={testimonialQuote}>
            "Upgrading to StackSense Pro was a game-changer. The unlimited analyses and 
            real-time monitoring caught 3 critical security issues before they hit production."
          </Text>
          <Text style={testimonialAuthor}>
            - Alex Thompson, Senior Developer at DevCorp
          </Text>
        </Section>

        <Section style={guaranteeSection}>
          <Text style={guaranteeTitle}>30-Day Money-Back Guarantee</Text>
          <Text style={guaranteeText}>
            Try StackSense Pro risk-free. If you're not completely satisfied within 30 days, 
            we'll refund your money, no questions asked.
          </Text>
        </Section>

        <Text style={text}>
          Questions about upgrading? Our team is here to help you choose the right plan:{' '}
          <Link href="mailto:sales@stacksense.com" style={link}>
            sales@stacksense.com
          </Link>
        </Text>

        <Text style={text}>
          Ready to unlock the full power of code analysis?
          <br />
          The StackSense Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default UpgradePromptEmail;

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

const upgradeBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
  padding: '24px',
  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  borderRadius: '8px',
  color: '#ffffff',
};

const upgradeIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
};

const usageSection = {
  background: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #f59e0b',
};

const usageTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const progressBar = {
  width: '100%',
  height: '10px',
  backgroundColor: '#e5e7eb',
  borderRadius: '5px',
  margin: '12px 0',
  position: 'relative' as const,
};

const progressFill = {
  height: '100%',
  backgroundColor: '#f59e0b',
  borderRadius: '5px',
};

const usageText = {
  color: '#374151',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '8px 0 4px 0',
  fontWeight: '600',
};

const usageSubtext = {
  color: '#6b7280',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
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

const benefitGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const benefitIcon = {
  fontSize: '20px',
  marginRight: '12px',
  flexShrink: 0,
  marginTop: '2px',
};

const benefitContent = {
  flex: 1,
};

const benefitTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px 0',
};

const benefitDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '0',
};

const comparisonSection = {
  margin: '32px 0',
};

const comparisonTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const planCard = {
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  margin: '12px 0',
};

const planCardHighlighted = {
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '2px solid #7c3aed',
  margin: '12px 0',
  position: 'relative' as const,
};

const planName = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const planNameHighlighted = {
  color: '#7c3aed',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const planPrice = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const planPriceHighlighted = {
  color: '#7c3aed',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const planFeature = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
};

const planFeatureHighlighted = {
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

const upgradeButton = {
  backgroundColor: '#7c3aed',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
};

const testimonialSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #7c3aed',
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
  textAlign: 'right' as const,
};

const guaranteeSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #10b981',
  textAlign: 'center' as const,
};

const guaranteeTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const guaranteeText = {
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