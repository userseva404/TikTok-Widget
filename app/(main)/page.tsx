import { Container } from "@/components/layout/Container";
import { Eye, Settings } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { HomeText } from "@/components/ui/HomeText";
import { HomeWidgetPreview } from "@/components/features/HomeWidgetPreview";
import { HomeWidgetConfiguration } from "@/components/features/HomeWidgetConfiguration";
import { HomeWidgetURL } from "@/components/features/HomeWidgetURL";
import { Select } from "@/components/ui/Select";

export default function Home() {
  return (
    <Container className="flex flex-col pt-5">
      <HomeText />
      <PageSection icon={Settings} title="Configuration">
        <HomeWidgetConfiguration />
      </PageSection>
      <PageSection icon={Settings} title="Widget url">
        <HomeWidgetURL />
      </PageSection>
      <PageSection icon={Eye} title="Preview">
        <HomeWidgetPreview />
      </PageSection>
    </Container>
  );
}
