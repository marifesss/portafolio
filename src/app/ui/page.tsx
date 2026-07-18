import {
  AlbumArtPlaceholder,
  Badge,
  Card,
  Chip,
  DiagramPlaceholder,
  EqualizerBars,
  IconLink,
  ImagePlaceholder,
  SectionHeader,
} from "@/components/ui";

export const metadata = {
  title: "UI primitives — gallery",
  robots: { index: false },
};

/**
 * Dev-only gallery of the design-system primitives (issue 02). Not linked in
 * navigation; used to eyeball every primitive on the dark theme in one place.
 * Safe to delete once sections consume these directly.
 */
function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/5 px-6 py-8 sm:px-10">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-faint">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function UIGalleryPage() {
  return (
    <div className="pb-16">
      <SectionHeader
        eyebrow="Dev"
        title="UI primitives"
        subtitle="A gallery of the reusable design-system components and placeholders."
      />

      <Row title="Chips & badges">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>React</Chip>
          <Chip>TypeScript</Chip>
          <Chip>Tailwind</Chip>
          <Badge>Coming soon</Badge>
          <Badge tone="accent">New</Badge>
        </div>
      </Row>

      <Row title="Cards">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["Yelou", "ArrowMaze", "Partela", "SORT"].map((name, i) => (
            <Card key={name}>
              <AlbumArtPlaceholder
                size={120}
                hue={200 + i * 45}
                className="mb-3 w-full"
              />
              <p className="truncate font-bold text-white">{name}</p>
              <p className="truncate text-sm text-muted">Project</p>
            </Card>
          ))}
        </div>
      </Row>

      <Row title="Album art placeholders">
        <div className="flex flex-wrap items-end gap-4">
          <AlbumArtPlaceholder size={48} hue={140} />
          <AlbumArtPlaceholder size={80} hue={280} glyph="🎮" />
          <AlbumArtPlaceholder size={120} hue={20} shape="circle" glyph="🧑‍💻" />
        </div>
      </Row>

      <Row title="Icon links">
        <div className="max-w-md">
          <IconLink href="https://github.com" icon="🐙" label="GitHub" hint="repo" />
          <IconLink href="https://figma.com" icon="🎨" label="Figma" hint="design" />
          <IconLink href="mailto:a@b.com" icon="✉️" label="Email" external={false} />
        </div>
      </Row>

      <Row title="Asset placeholders">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImagePlaceholder label="Screenshots coming soon" />
          <DiagramPlaceholder label="Architecture diagram coming soon" />
        </div>
      </Row>

      <Row title="Equalizer">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <EqualizerBars />
            <span className="text-xs text-faint">playing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <EqualizerBars bars={6} playing={false} />
            <span className="text-xs text-faint">paused</span>
          </div>
        </div>
      </Row>
    </div>
  );
}
