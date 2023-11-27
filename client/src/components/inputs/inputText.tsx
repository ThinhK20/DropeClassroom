import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

function InputText({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputProps) {
  return (
    <div className="relative w-full group">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        className={`block p-2 pt-5 pl-3 my-1 w-full regular-18 text-gray-900 bg-blue-600/5 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 transition disabled:cursor-not-allowed disabled:opacity-50 peer`}
      />

      <label
        className={`absolute medium-16 text-zinc-500 duration-150 transform -translate-y-5 -z-10 top-10 origin-[0] pl-3 peer-placeholder-shown:scale-125 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:text-blue-600 ${errors[id] ? `text-rose-500` : 'text-zinc-500'} `}
      >
        {label}
      </label>
    </div>
  );
}

export default InputText;
