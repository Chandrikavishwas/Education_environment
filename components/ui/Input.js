'use client';

export default function Input({
  label,
  error,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`
          w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900
          placeholder:text-gray-400 transition-colors
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
