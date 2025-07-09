import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    // Base styles
    'w-full rounded-md border border-border bg-input text-input-foreground outline-none transition-colors',
    'placeholder:text-muted-foreground',
    // Text selection
    'selection:bg-primary selection:text-primary-foreground',
    // File input styles
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Focus styles
    'focus-visible:ring-2  focus-visible:ring-ring/50 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-xs px-2',
        md: 'h-9 text-sm px-3',
        lg: 'h-10 text-base px-4',
        xl: 'h-12 text-base px-5',
      },
      error: {
        true: 'border-destructive focus-visible:ring-destructive/50',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
      disabled: false,
    },
  },
);
export type InputVariantProps = VariantProps<typeof inputVariants>;

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'disabled'>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = ({
  className,
  type = 'text',
  size = 'md',
  error = false,
  disabled = false,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      disabled={!!disabled}
      aria-invalid={error}
      data-state={disabled ? 'disabled' : undefined}
      className={cn(inputVariants({ size, error, disabled }), className)}
      {...props}
    />
  );
};

export { Input, type InputProps, inputVariants };
