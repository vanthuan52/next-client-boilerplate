import React from 'react';
import { useTranslations } from 'next-intl';
import Typography from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { TRANSLATION_FILES } from '@/packages/i18n';

const Hero = () => {
  const t = useTranslations(TRANSLATION_FILES.COMMON);
  const technologies = [
    'Typescript',
    'NextJS',
    'Tailwindcss',
    'Feature-based structure',
  ];

  return (
    <Container>
      <div className="text-center max-w-3xl mx-auto">
        <Typography variant="heading1">
          What do you want to discover today
        </Typography>
        <Typography variant="large">
          Discover, learn, and share knowledge
        </Typography>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 px-4">
        <Typography variant="small" className="font-medium">
          🔥 Used:
        </Typography>

        {technologies.map((topic, index) => {
          const bgColors = [
            'from-blue-500/10 to-blue-600/10 text-blue-700 dark:text-blue-300',
            'from-cyan-500/10 to-cyan-600/10 text-cyan-700 dark:text-cyan-300',
            'from-emerald-500/10 to-emerald-600/10 text-emerald-700 dark:text-emerald-300',
            'from-purple-500/10 to-purple-600/10 text-purple-700 dark:text-purple-300',
          ];

          return (
            <Badge
              key={topic}
              className={cn(
                'text-sm font-medium px-3.5 py-1 bg-gradient-to-r rounded-full',
                bgColors[index]
              )}
            >
              {topic}
            </Badge>
          );
        })}
      </div>
    </Container>
  );
};

export default Hero;
