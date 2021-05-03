export type Facet = string;
export type FacetValue = string;

export interface IFilterFacet {
  name: Facet;
  values: IFilterFacetValue[];
}

export interface IFilterFacetValue {
  name: FacetValue;
  count: string;
}
