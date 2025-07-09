import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariant = cva('', {
  variants: {
    variant: {
      heading1: 'font-display font-bold text-3xl md:text-4xl leading-tight mt-10 mb-4 first:mt-0',
      heading2: 'font-display font-bold text-xl md:text-2xl leading-snug mt-8 mb-3 first:mt-0',
      heading3: 'font-display font-semibold text-lg md:text-xl leading-snug mt-6 mb-2 first:mt-0',
      heading4: 'font-display font-semibold text-base md:text-lg leading-snug mt-5 mb-2 first:mt-0',
      heading5: 'font-display font-medium text-sm md:text-base leading-snug mt-4 mb-1 first:mt-0',
      heading6: 'font-display font-medium text-xs md:text-sm leading-snug mt-3 mb-1 first:mt-0',
      body: 'text-base leading-normal mb-6 last:mb-0',
      large: 'text-base text-secondary-foreground leading-7 md:text-lg md:leading-8',
      small: 'text-sm',
      caption: 'text-xs text-muted-foreground leading-tight',
      muted: 'text-sm text-muted-foreground leading-normal',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariant> & {
    as?: React.ElementType;
    children: React.ReactNode;
  };

const componentMap = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  body: 'p',
  large: 'p',
  small: 'span',
  caption: 'span',
  muted: 'span',
};

const Typography: React.FC<TypographyProps> = ({
  as,
  variant = 'body',
  className,
  children,
  ...props
}) => {
  const Component = as || componentMap[variant as keyof typeof componentMap] || 'div';

  return (
    <Component className={cn(typographyVariant({ variant }), className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
