import { InputHTMLAttributes, MutableRefObject, ReactNode } from "react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: ReactNode,
  searchInputRef?: MutableRefObject<HTMLInputElement>,
}

const InputWithIcon = ({ Icon, searchInputRef,  ...props }: InputWithIconProps) => {
  return (
    <div className="relative text-gray-600 focus-within:text-gray-100">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">
          { Icon }
        </span>
      </div>
      <input type="text" name="q" className="py-2 text-sm text-gray-500 bg-gray-200 rounded-md pl-10 pr-2 focus:outline-none focus:bg-gray-100 focus:text-gray-900" placeholder="Pencarian" autoComplete="off" { ...props } ref={searchInputRef} />
    </div>
  );
};

export default InputWithIcon;