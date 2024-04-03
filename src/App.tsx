import { MultiSelect, SelectOptions } from './components/multiselect';
import { AntSelect } from './components/antdSelect';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';

function App() {
  const options: SelectOptions[] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const fetchRickAndMortyChars = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ['fetchRickAndMortyChars'],
    queryFn: fetchRickAndMortyChars,
  });

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    console.log(`selected ${value}`);
  };

  console.log('data', data);

  return (
    <main className="grid p-12 place-items-center pt-40">
      <MultiSelect
        options={options}
        defaultValues={[
          { label: 'a10', value: 'a10' },
          { label: 'c12', value: 'c12' },
        ]}
        size="small"
        isLoading={isLoading}
        isError={isError}
        onChange={handleChange}
      />
      {/* <MultiSelect
        options={options}
        defaultValues={[
          { label: 'a10', value: 'a10' },
          { label: 'c12', value: 'c12' },
        ]}
        size="middle"
      />
      <MultiSelect
        options={options}
        defaultValues={[
          { label: 'a10', value: 'a10' },
          { label: 'c12', value: 'c12' },
        ]}
        size="large"
      /> */}
      <hr className="w-full h-2 m-12" />
      <AntSelect />
    </main>
  );
}

export default App;
