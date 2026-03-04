import { Container, Card } from "@repo/ui";
import { Sparkles, Sliders, Zap, Repeat, TrendingUp, Terminal } from "lucide-react";

const features = [
  {
    title: "Instant Polishing",
    description: "Fix grammar, typos, and awkward phrasing instantly with our advanced AI models.",
    icon: Sparkles,
  },
  {
    title: "Tone Adjustment",
    description: "Switch your tweet's voice from casual to professional or funny in a single click.",
    icon: Sliders,
  },
  {
    title: "Viral Hooks",
    description: "Generate scroll-stopping hooks that grab attention and increase click-through rates.",
    icon: Zap,
  },
  {
    title: "Thread Maker",
    description: "Expand a single thought into a coherent, engaging thread automatically.",
    icon: Repeat,
  },
  {
    title: "Engagement Booster",
    description: "Optimize for algorithms with strategic keyword placement and structure.",
    icon: TrendingUp,
  },
  {
    title: "API Integration",
    description: "Seamlessly integrate our enhancement engine into your own workflows via our robust API.",
    icon: Terminal,
  }
];

export const Features = () => {
  return (
    <section id="features" className="section">
      <Container>
        <div className="section-title">
          <h2>Powerful Features</h2>
        </div>
        <p className="section-subtitle">
          Everything you need to grow your presence on X (formerly Twitter).
        </p>

        <div className="grid-3">
          {features.map((feature, idx) => (
            <Card key={idx} title={feature.title}>
              <feature.icon className="feature-icon" size={32} />
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
