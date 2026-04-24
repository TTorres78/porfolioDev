import type { SVGProps } from "react";

export type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function GitHubMarkIcon({ size = 20, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.13c-3.22.7-3.9-1.37-3.9-1.37a3.06 3.06 0 0 0-1.28-1.69c-1.05-.72.08-.7.08-.7a2.43 2.43 0 0 1 1.77 1.2 2.47 2.47 0 0 0 3.37.97 2.46 2.46 0 0 1 .73-1.54c-2.57-.3-5.28-1.28-5.28-5.7a4.48 4.48 0 0 1 1.2-3.12 4.16 4.16 0 0 1 .11-3.08s.98-.31 3.2 1.2a11.1 11.1 0 0 1 5.82 0c2.2-1.5 3.19-1.2 3.19-1.2.42 1 .46 2.1.12 3.09a4.48 4.48 0 0 1 1.2 3.11c0 4.43-2.71 5.4-5.3 5.68a2.75 2.75 0 0 1 .78 2.14v3.17c0 .31.2.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedInMarkIcon({ size = 20, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.82v1.71h.06c.53-1 1.83-2.06 3.76-2.06C21.06 8.65 22 10.9 22 14.07V21h-4v-6.12c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.6-2.35 3.23V21h-4V9Z" />
    </svg>
  );
}
