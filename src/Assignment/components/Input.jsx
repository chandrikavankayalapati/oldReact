const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring focus:ring-purple-400
                    focus:border-purple-500 transition ${className}`}
      />
    </div>
  );
};

export default Input;
