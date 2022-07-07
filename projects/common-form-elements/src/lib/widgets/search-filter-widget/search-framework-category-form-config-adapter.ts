import {CategoryTerm, FrameworkCategory} from '@project-sunbird/client-services/models';
import {IFrameworkCategoryFilterFieldTemplateConfig} from './framework-category-filter-field-template-config';
import {ISearchFrameworkAssociationsMap, ISearchFrameworkCategoryFilter} from './models/framework';
import {Injectable} from '@angular/core';
import {FieldConfig, FieldConfigInputType, ThemeType} from '../../common-form-config';

type CategoryTermName = CategoryTerm['name'];

@Injectable()
export class SearchFrameworkCategoryFormConfigAdapter {
  constructor() {}

  map(
    frameworkAssociationsMap: ISearchFrameworkAssociationsMap,
    filterFormTemplateConfig: IFrameworkCategoryFilterFieldTemplateConfig[],
    currentFilter?: ISearchFrameworkCategoryFilter
  ): FieldConfig<FrameworkCategory['code'], FieldConfigInputType.SELECT>[] {
    return filterFormTemplateConfig.map<FieldConfig<CategoryTermName>>((config) => {
      const selectedValue: CategoryTermName | CategoryTermName[] = (() => {
        if (currentFilter && currentFilter[config.category]) {
          if (Array.isArray(currentFilter[config.category])) {
            return (currentFilter[config.category] as CategoryTermName[]).filter((categoryTermName) => {
              return (frameworkAssociationsMap[config.category] && frameworkAssociationsMap[config.category].find((associationCategoryTermName) =>
                associationCategoryTermName === categoryTermName
              ));
            });
          }

          return (frameworkAssociationsMap[config.category] && frameworkAssociationsMap[config.category].find((categoryTermName) =>
            categoryTermName === currentFilter[config.category]
          )) ?
            (currentFilter[config.category] as CategoryTermName) :
            undefined;
        }

        return undefined;
      })();

      return {
        code: config.category,
        type: FieldConfigInputType.SELECT,
        fieldName: config.category,
        default: (config.multiple && Array.isArray(selectedValue)) ? selectedValue : selectedValue,
        templateOptions: {
          inputTypeOptions: { type: config.type },
          label: config.labelText,
          placeHolder: config.placeholderText,
          multiple: config.multiple,
          autocomplete: config.autocomplete ? config.autocomplete : false,
          themeType: config.themeType ? config.themeType : ThemeType.MATERIAL,
          options: frameworkAssociationsMap[config.category] ?
            frameworkAssociationsMap[config.category]
              .map((value) => ({ label: value, value })) :
            []
        }
      };
    });
  }
}
