export default function PawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <ellipse cx="14" cy="18" rx="7" ry="9" />
      <ellipse cx="32" cy="12" rx="6" ry="8" />
      <ellipse cx="50" cy="18" rx="7" ry="9" />
      <ellipse cx="8" cy="36" rx="5.5" ry="7" />
      <path d="M32 24c-10 0-20 6-18 18 1.5 9 7 14 12 16 2 .7 4 1 6 1s4-.3 6-1c5-2 10.5-7 12-16 2-12-8-18-18-18z" />
    </svg>
  );
}
