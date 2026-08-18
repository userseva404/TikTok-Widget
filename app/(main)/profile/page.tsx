"use client";

import { ProfileConnections } from "@/components/features/ProfileConnections";
import { ProfileUser } from "@/components/features/ProfileUser";
import { Container } from "@/components/layout/Container";
import { PageSection } from "@/components/layout/PageSection";
import { Globe } from "lucide-react";

export default function Profile() {
  return (
    <Container>
      <div>
        <PageSection>
          <ProfileUser />
        </PageSection>
        <PageSection title="Connections" icon={Globe}>
          <ProfileConnections />
        </PageSection>
      </div>
    </Container>
  );
}
