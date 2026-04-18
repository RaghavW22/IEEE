import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant: 'gold' | 'danger' | 'safe' | 'ghost';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonProps['variant'], string> = {
  gold: 'bg-gold hover:bg-gold-light text-navy font-semibold',
  danger: 'bg-danger hover:bg-red-600 text-white font-semibold',
  safe: 'bg-safe hover:bg-green-500 text-white font-semibold',
  ghost: 'border border-white/30 text-white hover:bg-white/10',
};

export default function Button({
  variant,
  children,
  onClick,
  disabled,
  className,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-xl px-6 py-2.5 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}
