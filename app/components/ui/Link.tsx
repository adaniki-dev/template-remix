import { default as NextLink } from 'next/link';

type LinkProps = any;

export function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={`${href}`} {...props}>
      {children}
    </NextLink>
  );
}
