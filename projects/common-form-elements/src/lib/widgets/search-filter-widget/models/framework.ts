import {ISearchFilter} from './search-filter';
import {CategoryTerm, FrameworkCategory} from '@project-sunbird/client-services/models';

export type ISearchFrameworkCategoryFilter = ISearchFilter<FrameworkCategory['code'], CategoryTerm['name'] | CategoryTerm['name'][]>;
export type ISearchFrameworkAssociationsMap = {[code in FrameworkCategory['code']]?: CategoryTerm['name'][]};
