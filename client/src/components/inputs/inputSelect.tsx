import { FieldValues, UseFormRegister } from "react-hook-form";

interface Value {
  key: string;
  value: string;
}

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  className?: string;
  rows?: boolean;
  value?: Value[];
}

function InputSelect({
  id,
  label,
  disabled,
  required,
  register,
  rows = true,
  className = "",
  value = [
    { key: "Male", value: "m" },
    { key: "Female", value: "fm" },
    { key: "Other", value: "o" },
  ],
}: InputProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex ${
          rows ? "flex-row" : "flex-col"
        } items-center gap-4 p-3`}
      >
        {value.map((v, idx) => {
          console.log(typeof v);
          return (
            <label
              className={`flex items-center gap-x-3 ${disabled ?  '' : 'cursor-pointer'} group`}
              key={idx}
            >
              <input
                id={id}
                {...register(id, { required })}
                disabled={disabled}
                value={v.value}
                type="radio"
                className="peer sr-only"
              />
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 p-1 ${disabled ? '' : 'hover:ring-2 hover:ring-offset-2 hover:ring-blue-600'} peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-blue-600 peer-checked:bg-blue-600`}>
                <div className="w-2 h-2 rounded-full peer-checked:border bg-white"></div>
              </div>
              <div className="block text-base font-medium leading-6 text-gray-900">
                {v.key}
              </div>
            </label>
          );
        })}
      </div>

      <label
        htmlFor="radioButton"
        className={`absolute medium-18  duration-150 transform z-10 top-3 -translate-y-10 origin-[0] scale-100 peer-focus:text-blue-600`}
      >
        {label}
      </label>
    </div>
  );
}
export default InputSelect;
