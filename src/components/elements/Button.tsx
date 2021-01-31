/* eslint-disable react/button-has-type */
const defaultClass: string = 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none';
const Primary = ({
  type, disabled, children, className,
}
  : { type?: any, disabled?: boolean, children: any, className?: string }) => (
    <button
      type={type || 'submit'}
      className={`${defaultClass} bg-primary hover:bg-primary-darkest focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ${className && className}`}
      disabled={disabled}
    >
      { children }
    </button>
);

export {
  // eslint-disable-next-line import/prefer-default-export
  Primary,
};
