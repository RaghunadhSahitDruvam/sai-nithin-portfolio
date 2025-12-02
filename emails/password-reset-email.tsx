import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetCode: string;
}

export default function PasswordResetEmail({
  resetCode,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your admin password reset code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>Admin Password Reset</Heading>
            <Text style={text}>
              You requested to reset your admin password. Your password reset
              code is:
            </Text>
            <Section style={codeContainer}>
              <Text style={code}>{resetCode}</Text>
            </Section>
            <Text style={text}>
              This code will expire in 15 minutes. Please use it to complete
              your password reset.
            </Text>
            <Text style={footer}>
              If you didn't request this code, please ignore this email or
              contact support if you have concerns.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const codeContainer = {
  background: "#f4f4f4",
  borderRadius: "4px",
  margin: "16px 0",
  padding: "24px",
  textAlign: "center" as const,
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "monospace",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "12px",
};
