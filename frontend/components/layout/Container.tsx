type Props = React.PropsWithChildren<{ className?: string }>;

export default function Container({ className = '', children }: Props) {
  return (
    <div className={`mx-auto max-w-7xl py-4 sm:py-6 lg:py-2 ${className}`}>
      {children}
    </div>
  );
}
