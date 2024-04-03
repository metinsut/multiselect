import { cn } from '../../utils';
import { Input, InputSelfProps } from './input';
import { Chips } from './chips';
import { ChangeEvent, useCallback, useState } from 'react';
import { DropDownList } from './dropDownList';
import Stick from 'react-stick';

type SelectOptions = { label: string; value: string };

type SelectProps = {
  selectRoot?: string;
  inputRootStyle?: string;
  inputWrapperStyle?: string;
  chipItemsStyle?: string;
  inputSelfStyle?: InputSelfProps;
  size?: InputSelfProps['size'];
  options: SelectOptions[];
  defaultValues?: SelectOptions[];
  isLoading?: boolean;
  isError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function MultiSelect(props: SelectProps) {
  const {
    selectRoot,
    inputRootStyle,
    inputWrapperStyle,
    chipItemsStyle,
    inputSelfStyle,
    size = 'middle',
    options = [],
    defaultValues = [],
    onChange,
  } = props;

  const [focus, setFocus] = useState<boolean>(false);
  const [selectedList, setSelectedList] =
    useState<SelectOptions[]>(defaultValues);
  const [availableList] = useState<SelectOptions[]>(options);

  const removeItemFromSelectList = useCallback(
    (removeItem: string) => {
      setSelectedList((prevList) => {
        const index = prevList.findIndex((item) => item.value === removeItem);
        if (index !== -1) {
          const newList = [...prevList];
          newList.splice(index, 1);
          return newList;
        } else {
          return prevList;
        }
      });
    },
    [setSelectedList]
  );

  const addItemFromSelectList = useCallback(
    (addItem: SelectOptions) => {
      setSelectedList((prevList) => {
        return [...prevList, addItem];
      });
    },
    [setSelectedList]
  );

  console.log('selectedList', selectedList);
  console.log('availableList', availableList);
  console.log('focus', focus);

  return (
    <div className={cn('w-full', selectRoot)}>
      <Stick
        node={
          focus && (
            <DropDownList
              addItemFromSelectList={addItemFromSelectList}
              removeItemFromSelectList={removeItemFromSelectList}
              availableList={availableList}
            />
          )
        }
        sameWidth
        position="bottom left"
        align="top left"
        autoFlipVertically
        onClickOutside={() => setFocus(false)}
        component="span"
      >
        <label
          className={cn(
            'flex gap-1 border border-solid border-border rounded-md overflow-hidden p-1 w-full cursor-text',
            inputRootStyle
          )}
        >
          <div className={cn('flex gap-1 flex-wrap w-full', inputWrapperStyle)}>
            <Chips
              chipItemsStyle={chipItemsStyle}
              removeItemFromSelectList={removeItemFromSelectList}
              selectedList={selectedList}
              size={size}
            />
            <Input
              className={cn(inputSelfStyle)}
              size={size}
              setFocus={setFocus}
              onChange={onChange}
            />
          </div>
        </label>
      </Stick>
    </div>
  );
}

Input.displayName = 'MultiSelect';

export { MultiSelect };
export type { SelectProps, SelectOptions };
