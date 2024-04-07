import { MultiSelect } from './components/multiselect';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { ApiResponse, SelectOptions } from './types';
import { useDebounceCallback } from 'usehooks-ts';

function App() {
  const [hasError, setHasError] = useState('');
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const debouncedSearchKey = useDebounceCallback(setSearchKey, 300);

  const { data, isFetching } = useQuery<ApiResponse>({
    queryKey: ['fetchRickAndMortyChars', searchKey],
    queryFn: async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character?name=${searchKey}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (data?.error) {
      setOptions([]);
      setHasError(data?.error);
    } else {
      setHasError('');
      setOptions(
        data?.results?.map((item) => ({
          value: item.id,
          label: item.name,
          url: item.image,
          subLabel: item.episode.length,
        })) ?? []
      );
    }
  }, [data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearchKey(e.target.value);
  };

  return (
    <main className="grid p-12 place-items-center pt-40">
      <MultiSelect
        options={options}
        selectedOptions={selectedOptions}
        loading={isFetching}
        error={hasError}
        onChange={setSelectedOptions}
        onSearch={handleSearch}
        searchKey={searchKey}
      />
    </main>
  );
}

export default App;
