import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}

function InputBoxText({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  className = "",
}: InputProps) {
  return (
    <div className={`relative ${className} group`}>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`block p-2 pl-3 my-1 w-full regular-18 text-gray-900 border-2 rounded-md border-gray-500/50 ${
          disabled ? "" : "hover:border-black"
        } focus:outline-none focus:ring-0
        focus:border-blue-600 focus:ring-blue-600 transition  disabled:bg-white peer ${
          errors[id] ? "border-rose-500" : ""
        } ${
          errors[id]
            ? "focus:border-rose-500"
            : "focus:border-blue-600 focus:ring-blue-600"
        }`}
      />

      <label
        htmlFor={id}
        className={`absolute medium-18  duration-150 transform z-10 top-3 -translate-y-10 origin-[0] scale-100  peer-focus:text-blue-600`}
      >
        {label}
      </label>
    </div>
  );
}

export default InputBoxText;
