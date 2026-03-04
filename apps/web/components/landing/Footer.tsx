import { Container, Button } from "@repo/ui";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-cta">
          <h2 className="cta-title">
            Ready to go viral?
          </h2>
          <p className="cta-desc">
            Join thousands of creators growing their audience with Twitzie.
          </p>
          <Link href="/auth">
            <Button 
              >
              Get Started Now
            </Button>
          </Link>
          
        </div>

        <div className="footer-content">
          <div>
            <h3 className="logo">twitzie.</h3>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Twitzie. All rights reserved.
            </p>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Twitter</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
