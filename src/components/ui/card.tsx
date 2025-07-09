import * as React from 'react';
import { AspectRatio } from './aspect-ratio';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-4 rounded-lg p-4 border shadow-card',
        className,
      )}
      {...props}
    />
  );
}

function CardMedia({
  className,
  ratio,
  children,
  ...props
}: React.ComponentProps<'div'> & { ratio?: number }) {
  const content = ratio ? <AspectRatio ratio={ratio}>{children}</AspectRatio> : children;

  return (
    <div
      data-slot="card-media"
      className={cn('overflow-hidden rounded-t-lg', className)}
      {...props}
    >
      {content}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('font-display text-lg leading-7 font-bold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-base leading-7 text-card-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('px-4 flex items-center [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardMedia,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
