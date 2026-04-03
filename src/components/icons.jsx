function IconBase({ children, className = "h-6 w-6", strokeWidth = 1.9 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BrandMark({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2H21l-6.008 6.867L22 22h-5.484l-4.298-7.915L5.29 22H2.53l6.425-7.34L2 2h5.623l3.885 7.317L18.244 2Zm-1.924 17.36h1.527L6.794 4.514H5.156Z" />
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.75 12 3l9 7.75" />
      <path d="M5.5 9.75V21h13V9.75" />
      <path d="M9.5 21v-6.25h5V21" />
    </IconBase>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function BellIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6.5 9a5.5 5.5 0 1 1 11 0c0 6 2.25 7 2.25 7H4.25S6.5 15 6.5 9Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </IconBase>
  );
}

export function MailIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </IconBase>
  );
}

export function UserIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </IconBase>
  );
}

export function BookmarkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 4.5h12v15l-6-3.75L6 19.5Z" />
    </IconBase>
  );
}

export function SparkleIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="m18.5 15 .9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
      <path d="m5.5 14 .9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </IconBase>
  );
}

export function ImageIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m6 16 4-4 3.5 3.5 2.5-2.5L18 15.5" />
    </IconBase>
  );
}

export function SmileIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M8.5 14a4.2 4.2 0 0 0 7 0" />
    </IconBase>
  );
}

export function LocationIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 20s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
      <circle cx="12" cy="10" r="2.2" />
    </IconBase>
  );
}

export function MessageIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6.5 17.5 4 20V6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v7.5A2.75 2.75 0 0 1 17.25 17H6.5Z" />
    </IconBase>
  );
}

export function RepeatIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M17 4 20 7l-3 3" />
      <path d="M4 11V9a2 2 0 0 1 2-2h14" />
      <path d="M7 20 4 17l3-3" />
      <path d="M20 13v2a2 2 0 0 1-2 2H4" />
    </IconBase>
  );
}

export function HeartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </IconBase>
  );
}

export function ChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M20 19v-3" />
    </IconBase>
  );
}

export function DotsIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}
