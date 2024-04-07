export type Results = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type ApiResponse =
  | {
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: Results[];
      error?: undefined;
    }
  | {
      info?: undefined;
      results?: undefined;
      error: string;
    };

export type SelectOptions = {
  value: number;
  label: string;
  url: string;
  subLabel: number;
};
