interface SeverityBadgeProps {
  severity: 1 | 2 | 3 | 4 | 5;
}

const severityConfig: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Level 1 — Low' },
  2: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Level 2 — Guarded' },
  3: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Level 3 — Elevated' },
  4: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Level 4 — High' },
  5: { bg: 'bg-red-900/40', text: 'text-red-300', label: 'Level 5 — Critical' },
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  return (
    <span
      className={`${config.bg} ${config.text} rounded-full text-xs font-semibold px-3 py-1`}
    >
      {config.label}
    </span>
  );
}
