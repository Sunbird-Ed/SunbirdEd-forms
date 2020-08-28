
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransposeHtmlPipe } from './transpose-html/transpose-html';

@NgModule({
  declarations: [TransposeHtmlPipe],
  imports: [CommonModule],
  exports: [TransposeHtmlPipe],
  providers: [DatePipe]
})
export class PipesModule {
}
