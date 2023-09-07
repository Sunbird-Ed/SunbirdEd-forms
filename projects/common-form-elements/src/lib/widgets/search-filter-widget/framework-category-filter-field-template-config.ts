import {FrameworkCategory} from '@project-sunbird/client-services/models';

export interface IFrameworkCategoryFilterFieldTemplateConfig {
  category: FrameworkCategory['code'];
  type: 'dropdown' | 'pills';
  labelText: string;
  placeholderText: string;
  multiple: boolean;
  autocomplete?: boolean;
  themeType?: string;
}
