
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransposeHtmlPipe } from './transpose-html/transpose-html';
import { SafeHtmlPipe } from './safe-html/safe-html';

@NgModule({
  declarations: [TransposeHtmlPipe, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [TransposeHtmlPipe, SafeHtmlPipe],
  providers: [DatePipe]
})
export class PipesModule {
}
