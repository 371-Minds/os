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

interface LegacyArchaeologistIntroEmailProps {
  userFirstName?: string;
  legacyCodePercentage?: number;
  outdatedDependencies?: number;
  technicalDebtScore?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const LegacyArchaeologistIntroEmail = ({
  userFirstName = 'Developer',
  legacyCodePercentage = 35,
  outdatedDependencies = 12,
  technicalDebtScore = 68,
}: LegacyArchaeologistIntroEmailProps) => (
  <Html>
    <Head />
    <Preview>Discover hidden legacy code patterns with Legacy Code Archaeologist</Preview>
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
        
        <Section style={introBanner}>
          <Text style={introIcon}>🏛️</Text>
          <Heading style={h1}>Meet Legacy Code Archaeologist</Heading>
          <Text style={introSubtitle}>Unearth the secrets of your codebase</Text>
        </Section>

        <Text style={heroText}>
          Hi {userFirstName}, based on your recent StackSense analysis, we've detected significant 
          legacy code patterns in your repositories. We'd like to introduce you to our specialized 
          tool: <strong>Legacy Code Archaeologist</strong>.
        </Text>
        
        <Section style={discoverySection}>
          <Text style={discoveryTitle">What We Found in Your Code:</Text>
          
          <Section style={findingCard}>
            <Text style={findingIcon}>📊</Text>
            <Section style={findingContent}>
              <Text style={findingNumber}>{legacyCodePercentage}%</Text>
              <Text style={findingLabel}>Legacy Code Patterns</Text>
              <Text style={findingDesc}>
                Outdated coding practices that could benefit from modernization
              </Text>
            </Section>
          </Section>

          <Section style={findingCard}>
            <Text style={findingIcon}>📦</Text>
            <Section style={findingContent}>
              <Text style={findingNumber}>{outdatedDependencies}</Text>
              <Text style={findingLabel}>Outdated Dependencies</Text>
              <Text style={findingDesc}>
                Packages that are multiple versions behind current releases
              </Text>
            </Section>
          </Section>

          <Section style={findingCard}>
            <Text style={findingIcon}>⚖️</Text>
            <Section style={findingContent}>
              <Text style={findingNumber}>{technicalDebtScore}</Text>
              <Text style={findingLabel}>Technical Debt Score</Text>
              <Text style={findingDesc">
                Higher scores indicate more accumulated technical debt
              </Text>
            </Section>
          </Section>
        </Section>

        <Section style={archaeologistSection}>
          <Text style={archaeologistTitle}>What Legacy Code Archaeologist Does:</Text>
          
          <Section style={featureGroup}>
            <Text style={featureIcon}>🔍</Text>
            <Section style={featureContent}>
              <Text style={featureTitle">Pattern Detection</Text>
              <Text style={featureDesc}>
                Identifies outdated design patterns, deprecated APIs, and legacy frameworks 
                that are no longer considered best practice.
              </Text>
            </Section>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>📈</Text>
            <Section style={featureContent}>
              <Text style={featureTitle}>Modernization Roadmap</Text>
              <Text style={featureDesc}>
                Creates a prioritized plan for updating your codebase, focusing on 
                high-impact, low-risk improvements first.
              </Text>
            </Section>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🔄</Text>
            <Section style={featureContent}>
              <Text style={featureTitle">Migration Assistance</Text>
              <Text style={featureDesc">
                Provides step-by-step guidance for migrating from legacy patterns 
                to modern alternatives with code examples.
              </Text>
            </Section>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>⚡</Text>
            <Section style={featureContent}>
              <Text style={featureTitle}>Performance Impact Analysis</Text>
              <Text style={featureDesc}>
                Shows how modernizing specific legacy patterns could improve 
                performance, maintainability, and security.
              </Text>
            </Section>
          </Section>

          <Section style={featureGroup}>
            <Text style={featureIcon}>🎯</Text>
            <Section style={featureContent}>
              <Text style={featureTitle}>Risk Assessment</Text>
              <Text style={featureDesc}>
                Evaluates the risk and effort required for each modernization 
                task to help you make informed decisions.
              </Text>
            </Section>
          </Section>
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Example Legacy Patterns We Detect:</Text>
          
          <Section style={exampleItem}>
            <Text style={examplePattern}>jQuery → Modern JavaScript</Text>
            <Text style={exampleDesc">
              Replace jQuery selectors and DOM manipulation with vanilla JS or modern frameworks
            </Text>
          </Section>

          <Section style={exampleItem}>
            <Text style={examplePattern}>Callback Hell → Async/Await</Text>
            <Text style={exampleDesc}>
              Modernize nested callbacks to use Promises and async/await syntax
            </Text>
          </Section>

          <Section style={exampleItem}>
            <Text style={examplePattern}>Class Components → Hooks</Text>
            <Text style={exampleDesc}>
              Convert React class components to functional components with hooks
            </Text>
          </Section>

          <Section style={exampleItem}>
            <Text style={examplePattern}>Legacy Build Tools → Modern Bundlers</Text>
            <Text style={exampleDesc">
              Upgrade from Grunt/Gulp to Webpack, Vite, or other modern build tools
            </Text>
          </Section>
        </Section>

        <Section style={buttonContainer}>
          <Button style={primaryButton} href="https://legacycodearchaeologist.com/stacksense-integration">
            Try Legacy Code Archaeologist Free
          </Button>
        </Section>

        <Section style={benefitsSection}>
          <Text style={benefitsTitle">Why Modernize Your Legacy Code?</Text>
          
          <Text style={benefitItem}>🚀 <strong>Improved Performance:</strong> Modern patterns are often more efficient</Text>
          <Text style={benefitItem">🔒 <strong>Better Security:</strong> Newer frameworks have built-in security features</Text>
          <Text style={benefitItem">👥 <strong>Developer Experience:</strong> Easier to onboard new team members</Text>
          <Text style={benefitItem">🛠️ <strong>Maintainability:</strong> Cleaner, more readable code</Text>
          <Text style={benefitItem">📱 <strong>Future-Proofing:</strong> Stay compatible with modern tools and libraries</Text>
        </Section>

        <Section style={integrationSection}>
          <Text style={integrationTitle">Seamless StackSense Integration</Text>
          <Text style={integrationText">
            Legacy Code Archaeologist integrates directly with your StackSense dashboard. 
            Your existing analysis data helps us provide more accurate legacy pattern 
            detection and personalized modernization recommendations.
          </Text>
          
          <Text style={integrationFeature">✅ One-click setup from StackSense</Text>
          <Text style={integrationFeature">✅ Shared repository access</Text>
          <Text style={integrationFeature">✅ Combined reporting dashboard</Text>
          <Text style={integrationFeature">✅ Unified issue tracking</Text>
        </Section>

        <Section style={testimonialSection}>
          <Text style={testimonialQuote}>
            "Legacy Code Archaeologist helped us modernize a 5-year-old React app in just 
            3 weeks. The automated detection saved us months of manual code review."
          </Text>
          <Text style={testimonialAuthor}>
            - Jennifer Park, Tech Lead at ModernTech Solutions
          </Text>
        </Section>

        <Text style={text}>
          Ready to excavate the hidden potential in your codebase? Start your free 
          analysis today and see what legacy patterns are holding your code back.
        </Text>

        <Text style={text}>
          Questions about Legacy Code Archaeologist? Our integration specialists are here to help:{' '}
          <Link href="mailto:partnerships@legacycodearchaeologist.com" style={link}>
            partnerships@legacycodearchaeologist.com
          </Link>
        </Text>

        <Text style={text}>
          Happy modernizing!
          <br />
          The StackSense & Legacy Code Archaeologist Teams
        </Text>
      </Container>
    </Body>
  </Html>
);

export default LegacyArchaeologistIntroEmail;

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

const introBanner = {
  textAlign: 'center' as const,
  margin: '40px 0 20px 0',
  padding: '24px',
  background: 'linear-gradient(135deg, #8b5a3c 0%, #a0522d 100%)',
  borderRadius: '8px',
  color: '#ffffff',
};

const introIcon = {
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

const introSubtitle = {
  color: '#f3e8d0',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  fontStyle: 'italic',
};

const heroText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
};

const discoverySection = {
  background: '#fef3c7',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #f59e0b',
};

const discoveryTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const findingCard = {
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const findingIcon = {
  fontSize: '24px',
  marginRight: '16px',
  flexShrink: 0,
};

const findingContent = {
  flex: 1,
};

const findingNumber = {
  color: '#f59e0b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const findingLabel = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const findingDesc = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

const archaeologistSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const archaeologistTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const featureGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const featureIcon = {
  fontSize: '20px',
  marginRight: '12px',
  flexShrink: 0,
  marginTop: '2px',
};

const featureContent = {
  flex: 1,
};

const featureTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px 0',
};

const featureDesc = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '0',
};

const exampleSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '1px solid #0ea5e9',
};

const exampleTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const exampleItem = {
  margin: '12px 0',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  border: '1px solid #e5e7eb',
};

const examplePattern = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const exampleDesc = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

const buttonContainer = {
  margin: '32px auto',
  width: 'auto',
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#8b5a3c',
  borderRadius: '6px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
};

const benefitsSection = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #10b981',
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
  padding: '20px',
  backgroundColor: '#faf5ff',
  borderRadius: '8px',
  border: '1px solid #a855f7',
};

const integrationTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
};

const integrationText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const integrationFeature = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
};

const testimonialSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #8b5a3c',
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

const text = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
};

const link = {
  color: '#8b5a3c',
  textDecoration: 'underline',
};