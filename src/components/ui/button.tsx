import type React from 'react';
import { cloneElement, isValidElement, type PropsWithChildren, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium relative overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-white hover:bg-destructive/80',
        outline: 'bg-transparent border hover:bg-accent hover:text-accent-foreground',
        ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3.5 text-xs [&_svg]:size-4 rounded-sm',
        md: 'h-9 px-4 text-sm [&_svg]:size-5 rounded',
        lg: 'h-10 px-5 text-base [&_svg]:size-6 rounded-md',
        xl: 'h-12 px-6 text-base [&_svg]:size-6 rounded-md',
      },
      iconOnly: {
        true: 'px-0',
        false: '',
      },
      hasIcon: {
        true: '[&_svg]:shrink-0',
        false: '',
      },
      loading: {
        true: 'pointer-events-none cursor-not-allowed opacity-75',
        false: '',
      },
    },
    compoundVariants: [
      // Icon only variants
      { iconOnly: true, size: 'sm', className: 'size-8' },
      { iconOnly: true, size: 'md', className: 'size-9' },
      { iconOnly: true, size: 'lg', className: 'size-10' },
      { iconOnly: true, size: 'xl', className: 'size-12' },

      // Has icon padding adjustments
      { iconOnly: false, size: 'sm', hasIcon: true, className: 'px-3' },
      { iconOnly: false, size: 'md', hasIcon: true, className: 'px-3.5' },
      { iconOnly: false, size: 'lg', hasIcon: true, className: 'px-4.5' },
      { iconOnly: false, size: 'xl', hasIcon: true, className: 'px-5' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    Omit<VariantProps<typeof buttonVariants>, 'hasIcon' | 'disabled'> {
  asChild?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  iconOnly = false,
  loading = false,
  disabled,
  prefixIcon,
  suffixIcon,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  const hasIcon = Boolean(suffixIcon || prefixIcon);

  const renderContent = (content: React.ReactNode) => (
    <>
      {loading && <Loader2 strokeWidth={3} className="absolute inset-0 m-auto animate-spin" />}
      {loading ? (
        <span className="contents invisible opacity-0">
          {prefixIcon}
          {content}
          {suffixIcon}
        </span>
      ) : (
        <>
          {prefixIcon}
          {content}
          {suffixIcon}
        </>
      )}
    </>
  );

  return (
    <Comp
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          hasIcon,
          iconOnly,
          loading,
        }),
        className,
      )}
      {...props}
    >
      {asChild && isValidElement<PropsWithChildren>(children)
        ? cloneElement(children, children.props, renderContent(children.props.children))
        : renderContent(children)}
    </Comp>
  );
};

export { Button, buttonVariants };
