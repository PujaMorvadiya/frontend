import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  className?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  id,
  onChange,
  className = "",
  disabled = false,
  register,
  errorMessage,
}) => {
  return (
    <div>
      <label
        className={clsx(
          "flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200",
          { "cursor-not-allowed opacity-50": disabled }
        )}
      >
        <input
          id={id}
          type="checkbox"
          {...(register ? register : {})}
          className={clsx(
            "w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-brand-500",
            "dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-brand-500 dark:checked:border-brand-500",
            "focus:ring-offset-0 focus:outline-none",
            className
          )}
          checked={checked}
          onChange={(e) => {
            register?.onChange?.(e); 
            onChange?.(e.target.checked); 
          }}
          disabled={disabled}
        />
        {label && <span className="text-sm font-medium">{label}</span>}
      </label>

      {errorMessage && (
        <p className="mt-1 text-sm text-error-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Checkbox;
