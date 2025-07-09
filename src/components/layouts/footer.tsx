import React from 'react';
import { Link } from '@/packages/i18n';
import { Github, Twitter, Mail } from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-10">
          <div className="space-y-6 col-span-2 max-w-sm">
            <Logo />
            <p className="text-muted-foreground">
              This is a starter codebase designed to accelerate the development
              of future projects. It provides a solid foundation with essential
              configurations, reusable components, and best practices, allowing
              for faster and more efficient project setup and execution.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-medium">Resources</h4>
            <nav className="flex flex-col gap-4 text-accent-foreground">
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </nav>
          </div>

          <div className="space-y-5">
            <h4 className="font-medium">Connect</h4>
            <div className="flex items-center gap-4">
              <Button variant="ghost" iconOnly asChild>
                <Link href="https://github.com" target="_blank">
                  <Github />
                </Link>
              </Button>
              <Button variant="ghost" iconOnly asChild>
                <Link href="https://github.com" target="_blank">
                  <Twitter />
                </Link>
              </Button>
              <Button variant="ghost" iconOnly asChild>
                <Link href="https://github.com" target="_blank">
                  <Mail />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-3 pb-6">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            <p className="font-medium text-muted-foreground">
              © {currentYear} NextClient. All rights reserved.
            </p>

            <p className="font-medium text-muted-foreground">
              Made with ❤️ from Vietnam
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
