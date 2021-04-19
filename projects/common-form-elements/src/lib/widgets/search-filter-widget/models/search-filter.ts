export type ISearchFilter<K extends string, V> = { [key in K]: V[] | V };
