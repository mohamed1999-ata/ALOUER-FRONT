import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentFormatPipe } from './moment-format.pipe';

@NgModule({
  declarations: [MomentFormatPipe],
  imports: [CommonModule],
  exports: [MomentFormatPipe],
})
export class DatePipeModule {}
