import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ContactFormEmailProps {
  name: string;
  email: string;
  type: string;
  message: string;
}

export default function ContactFormEmail({
  name,
  email,
  type,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Contact Form Submission
              </Heading>
              <Text>You have received a new contact form submission:</Text>
              <Hr />
              <Text>
                <strong>Name: </strong> {name}
              </Text>
              <Text>
                <strong>Email: </strong> {email}
              </Text>
              <Text>
                <strong>Type: </strong> {type}
              </Text>
              <Hr />
              <Text>
                <strong>Message:</strong>
              </Text>
              <Text>{message}</Text>
              <Hr />
              <Text className="text-gray-500 text-sm">
                This email was sent from your portfolio website's contact form.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
