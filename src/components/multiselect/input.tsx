import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
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
    success?: boolean;
    error?: boolean;
    setFocus: Dispatch<SetStateAction<boolean>>;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, success, error, size, setFocus, onChange, ...rest } =
    props;

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <input
      onFocus={handleFocus}
      onChange={onChange}
      type={type}
      className={cn(
        inputVariants({ size, className }),
        clsx({
          ['bg-green-50 border-green-500 text-green-900 focus:ring-green-500 focus:border-green-500']:
            success,
          ['bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500']:
            error,
        })
      )}
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export { Input };
