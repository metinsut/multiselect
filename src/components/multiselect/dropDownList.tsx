import { DefaultValues } from '.';
import { BoldText } from '../BoldText';
import { LoadingSpin } from '../LoadingSpin';
import { HiOutlineDocument } from 'react-icons/hi';

type Props<T> = {
  options: T[];
  selectedOptions: T[];
  updateSelectedOptions: (val: T) => void;
  searchKey: string;
  loading: boolean;
  error: string;
};

export function DropDownList<T extends DefaultValues>(props: Props<T>) {
  const {
    options,
    selectedOptions,
    updateSelectedOptions,
    searchKey,
    loading,
    error,
  } = props;

  return (
    <div className="flex flex-col max-h-72 overflow-auto border border-solid border-border rounded-md bg-gray-200 mt-1">
      {loading && (
        <div className="grid flex-1 min-h-24 items-center justify-items-center content-center justify-center">
          <LoadingSpin />
        </div>
      )}
      {error && (
        <div className="grid flex-1 min-h-24 items-center justify-items-center content-center justify-center">
          <HiOutlineDocument size="30" />
          <span>No Data Found</span>
        </div>
      )}
      {options.map((item) => {
        const hasSelected = selectedOptions.find(
          (selected) => selected.value === item.value
        );
        return (
          <label
            key={item.value}
            className="flex items-center gap-2 cursor-pointer border-b border-border border-solid last:border-b-0 bg-gray-200 hover:bg-gray-300 px-3 py-1.5"
          >
            <input
              type="checkbox"
              checked={!!hasSelected}
              onChange={() => updateSelectedOptions(item)}
            />
            <img src={item.url} className="w-8 h-8 object-cover rounded-md" />
            <div>
              <p className="text-sm text-gray-700">
                <BoldText text={item.label} keyText={searchKey} />
              </p>
              <p className="text-xs text-gray-700">{item.subLabel} Episodes</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
