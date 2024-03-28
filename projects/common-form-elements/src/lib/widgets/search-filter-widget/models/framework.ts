import { CategoryTerm, FrameworkCategory } from '../../../common-form-config';
import {ISearchFilter} from './search-filter';

export type ISearchFrameworkCategoryFilter = ISearchFilter<FrameworkCategory['code'], CategoryTerm['name'] | CategoryTerm['name'][]>;
export type ISearchFrameworkAssociationsMap = {[code in FrameworkCategory['code']]?: CategoryTerm['name'][]};
