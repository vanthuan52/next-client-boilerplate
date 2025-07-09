import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('w-full mx-auto px-4', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
    },
    fluid: {
      true: 'w-full max-w-none',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    fluid: false,
  },
});

interface ContainerProps extends VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Container = ({
  as: Component = 'div',
  size,
  fluid,
  className,
  ...props
}: ContainerProps) => {
  return <Component className={cn(containerVariants({ size, fluid }), className)} {...props} />;
};

export default Container;
