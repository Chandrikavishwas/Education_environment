'use client';

export default function Select({ label, error, options = [], placeholder, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={`
          w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-50
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
