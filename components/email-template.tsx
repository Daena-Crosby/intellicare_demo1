// components/email-template.tsx
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  doctorId?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
  <div>
    <p>Hey Dr. {firstName},</p>

    <p>
      Thank you for your interest in the Intellibus Care Foundation. We are grateful that you are
      taking the time to explore how your skills can support our mission of strengthening healthcare
      access and response.
    </p>

    <p>
      The next step is to schedule a short introductory call. This call helps us get to know you and
      share the Care Foundation charter, the goals of the program, and how the entire mission works.
    </p>

    <p>
      Please use the link below to choose a time that works for you:
      <br />
      <a href="https://calendly.com/daniel-callaghan-intellibus/30min">
        https://calendly.com/daniel-callaghan-intellibus/30min
      </a>
    </p>

    <p>I look forward to meeting you and learning more about your experience.</p>

    <p>
      Warm regards,<br />
      Daniel Callaghan<br />
      Intellibus Care Foundation
    </p>
  </div>
);
