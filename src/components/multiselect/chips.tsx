import { AiOutlineClose } from 'react-icons/ai';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { DefaultValues } from '.';

type Props<T> = {
  chipItemsStyle?: string;
  updateSelectedOptions: (val: T) => void;
  selectedOptions: T[];
} & ChipTextProps &
  ComponentProps<'div'>;

const chipTextVariants = cva('', {
  variants: {
    size: {
      middle: 'text-sm',
      small: 'text-sm',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'middle',
  },
});

export type ChipTextProps = VariantProps<typeof chipTextVariants>;

export function Chips<T extends DefaultValues>(props: Props<T>) {
  const { size, className } = props;
  const { chipItemsStyle, updateSelectedOptions, selectedOptions } = props;

  return (
    <>
      {selectedOptions.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-1 bg-chip rounded-md px-1',
            chipItemsStyle
          )}
        >
          <span className={cn(chipTextVariants({ size, className }))}>
            {item.label}
          </span>
          <AiOutlineClose
            className="cursor-pointer text-gray-400 hover:text-gray-700"
            size="12"
            onClick={() => updateSelectedOptions(item)}
          />
        </div>
      ))}
    </>
  );
}
