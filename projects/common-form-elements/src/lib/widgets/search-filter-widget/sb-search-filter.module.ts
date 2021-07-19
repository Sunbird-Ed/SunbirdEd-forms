import {ModuleWithProviders, NgModule} from '@angular/core';
import {SbSearchFacetFilterComponent} from './sb-search-facet-filter.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PLATFORM_TOKEN} from './injection-tokens';
import {SbSearchFrameworkFilterComponent} from './sb-search-framework-filter.component';
import {CommonFormElementsModule} from '../../common-form-elements.module';

@NgModule({
  declarations: [
    SbSearchFacetFilterComponent,
    SbSearchFrameworkFilterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    CommonFormElementsModule
  ],
  exports: [
    SbSearchFacetFilterComponent,
    SbSearchFrameworkFilterComponent
  ]
})
export class SbSearchFilterModule {
  static forRoot(
    platform: 'mobile' | 'web'
  ): ModuleWithProviders<SbSearchFilterModule> {
    return {
      ngModule: SbSearchFilterModule,
      providers: [
        { provide: PLATFORM_TOKEN, useValue: platform }
      ]
    };
  }
}
