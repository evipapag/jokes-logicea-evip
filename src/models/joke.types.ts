export interface Column {
  id: 'id' | 'Title' | 'Body' | 'Author' | 'Views' | 'CreatedAt';
  label: string;
  cellFormatter?: (val: any, id: any) => any;
}

export interface Joke {
  id?: number;
  Title?: string;
  Body?: string;
  Author?: string;
  Views?: number;
  CreatedAt?: number | string;
}
