import { Container } from "@repo/ui";

const steps = [
  {
    number: "01",
    title: "Paste Your Thought",
    description: "Start with a raw idea. Paste your draft tweet directly into our smart editor.",
  },
  {
    number: "02",
    title: "Choose Your Vibe",
    description: "Select the tone—Professional, Viral, Funny, or Thread-ready—to match your audience.",
  },
  {
    number: "03",
    title: "Launch to Virality",
    description: "Get an instantly enhanced version, optimized for engagement and ready to post.",
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section">
      <Container>
        <div className="section-title">
          <h2>How It Works</h2>
        </div>
        <p className="section-subtitle">Three simple steps to tweet perfection</p>

        <div className="grid-3">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number glass">
                <span className="text-gradient">{step.number}</span>
              </div>
              <h3 className="feature-title">{step.title}</h3>
              <p className="feature-desc">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
