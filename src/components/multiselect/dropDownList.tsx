import { SelectOptions } from '.';

type Props = {
  availableList: SelectOptions[];
  addItemFromSelectList: (val: SelectOptions) => void;
  removeItemFromSelectList: (val: string) => void;
};

export function DropDownList(props: Props) {
  const { availableList, addItemFromSelectList, removeItemFromSelectList } =
    props;

  const handleUpdate = () => {
    console.log(addItemFromSelectList);
    console.log(removeItemFromSelectList);
  };
  return (
    <div className="flex flex-col max-h-72 overflow-auto border border-solid border-border rounded-md bg-gray-200 mt-1">
      {availableList.map((item, index) => {
        return (
          <label
            key={index}
            onClick={handleUpdate}
            className="flex gap-2 cursor-pointer border-b border-border border-solid last:border-b-0 bg-gray-200 hover:bg-gray-300 px-3 py-1"
          >
            <input type="checkbox" />
            <img src="" />
            <div>
              <p>{item.label}</p>
              <p>{item.label}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
