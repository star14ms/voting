export default function Skeleton({
  className = '',
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'card' | 'image' | 'text' | 'button';
}) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    default: 'h-4 w-full',
    card: 'h-48 w-full',
    image: 'h-44 w-full',
    text: 'h-4 w-3/4',
    button: 'h-8 w-16',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
} 