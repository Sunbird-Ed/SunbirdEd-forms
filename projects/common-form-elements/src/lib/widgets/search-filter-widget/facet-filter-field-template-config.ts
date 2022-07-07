import {Facet} from './models/facets';

export interface IFacetFilterFieldTemplateConfig {
  facet: Facet;
  type: 'dropdown' | 'pills';
  labelText: string;
  placeholderText: string;
  multiple: boolean;
  autocomplete?: boolean;
  themeType?: string;
}
