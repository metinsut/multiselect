import { cn } from '../../utils';
import { Input, InputSelfProps } from './input';
import { Chips } from './chips';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { DropDownList } from './dropDownList';
import Stick from 'react-stick';

export type DefaultValues = {
  value: number;
  label: string;
  url: string;
  subLabel: number;
} & object;

type SelectProps<T> = {
  selectRoot?: string;
  inputRootStyle?: string;
  inputWrapperStyle?: string;
  chipItemsStyle?: string;
  inputSelfStyle?: InputSelfProps;
  size?: InputSelfProps['size'];
  options: T[];
  selectedOptions: T[];
  loading: boolean;
  error: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: Dispatch<SetStateAction<T[]>>;
  searchKey: string;
};

function MultiSelect<T extends DefaultValues>(props: SelectProps<T>) {
  const {
    selectRoot,
    inputRootStyle,
    inputWrapperStyle,
    chipItemsStyle,
    inputSelfStyle,
    size = 'middle',
    options = [],
    selectedOptions = [],
    onSearch,
    onChange,
    searchKey,
    error,
    loading,
  } = props;

  const [focus, setFocus] = useState<boolean>(false);

  const removeItemFromSelectList = useCallback(
    (removeItem: number) => {
      onChange((prevList) => {
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
    [onChange]
  );

  const addItemFromSelectList = useCallback(
    (addItem: T) => {
      onChange((prevList) => {
        return [...prevList, addItem];
      });
    },
    [onChange]
  );

  return (
    <div className={cn('w-full', selectRoot)}>
      <Stick
        node={
          focus && (
            <DropDownList
              addItemFromSelectList={addItemFromSelectList}
              removeItemFromSelectList={removeItemFromSelectList}
              options={options}
              selectedOptions={selectedOptions}
              searchKey={searchKey}
              loading={loading}
              error={error}
            />
          )
        }
        sameWidth
        position="bottom left"
        align="top left"
        autoFlipVertically
        onClickOutside={() => setFocus(false)}
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
              selectedOptions={selectedOptions}
              size={size}
            />
            <Input
              className={cn(inputSelfStyle)}
              size={size}
              setFocus={setFocus}
              onSearch={onSearch}
            />
          </div>
        </label>
      </Stick>
    </div>
  );
}

Input.displayName = 'MultiSelect';

export { MultiSelect };
export type { SelectProps };
