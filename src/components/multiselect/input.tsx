import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';

const inputVariants = cva(
  'flex w-0 min-w-12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        middle: 'leading-5 text-md',
        small: 'leading-4 text-sm',
        large: 'leading-6 text-lg',
      },
    },
    defaultVariants: {
      size: 'middle',
    },
  }
);

export type InputSelfProps = VariantProps<typeof inputVariants>;

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  InputSelfProps & {
    setFocus: Dispatch<SetStateAction<boolean>>;
    onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, size, setFocus, onSearch, ...rest } = props;

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <input
      onFocus={handleFocus}
      onChange={onSearch}
      type={type}
      className={cn(inputVariants({ size, className }))}
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export { Input };
