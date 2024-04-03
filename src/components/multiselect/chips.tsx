import { AiOutlineClose } from 'react-icons/ai';
import { cn } from '../../utils';
import { SelectOptions } from '.';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

type Props = {
  chipItemsStyle?: string;
  removeItemFromSelectList: (val: string) => void;
  selectedList: SelectOptions[];
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

export function Chips(props: Props) {
  const { size, className } = props;
  const { chipItemsStyle, removeItemFromSelectList, selectedList } = props;

  return (
    <>
      {selectedList.map((item, index) => (
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
            onClick={() => removeItemFromSelectList(item.value)}
          />
        </div>
      ))}
    </>
  );
}
