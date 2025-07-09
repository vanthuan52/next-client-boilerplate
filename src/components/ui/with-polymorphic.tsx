import React from 'react';

type PolymorphicComponentProp<
  C extends React.ElementType,
  P extends object,
> = React.PropsWithChildren<P> &
  Omit<React.ComponentProps<C>, keyof P> & {
    as?: C;
  };

export default function withPolymorphic<P extends object>(Component: React.ElementType) {
  return function PolymorphicComponent<C extends React.ElementType = typeof Component>({
    as,
    ...props
  }: PolymorphicComponentProp<C, P>) {
    const Element = as || Component;
    return <Element {...(props as P)} />;
  };
}
