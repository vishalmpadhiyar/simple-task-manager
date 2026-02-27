interface ChipProps {
  label: string;
  value: number;
  className: string;
}

export default function Chip({ label, value, className = "" }: ChipProps) {
  return (
    <div
      className={`flex items-center gap-4 px-3 lg:px-6 py-2 rounded-lg shadow-md bg-linear-to-br min-w-20 ${className}`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
    </div>
  );
}
