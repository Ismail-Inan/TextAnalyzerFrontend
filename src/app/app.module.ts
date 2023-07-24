import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TextAnalyzerComponent } from './text-analyzer/text-analyzer.component';
import { TextAnalyzerService } from './text-analyzer.service';
import {AutosizeModule} from 'ngx-autosize';

@NgModule({
  declarations: [TextAnalyzerComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AutosizeModule],
  providers: [TextAnalyzerService],
  bootstrap: [TextAnalyzerComponent],
})
export class AppModule {}
