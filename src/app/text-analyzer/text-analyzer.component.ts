import { Component } from '@angular/core';
import { TextAnalysisResult, TextAnalyzerService } from '../text-analyzer.service';

@Component({
  selector: 'app-root',
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.css'],
})
export class TextAnalyzerComponent {
  inputText: string = '';
  analysisMode: string = 'vowels';
  analysisResult: TextAnalysisResult | null = null;
  previousResult: TextAnalysisResult | null = null;
  errorMessage: string = '';
  onlineMode: boolean = false;

  constructor(private textAnalyzerService: TextAnalyzerService) { }

  analyzeText(): void {
    if (this.inputText.trim().length === 0) {
      return;
    }

    if (this.onlineMode) {
      this.analyzeOnline();
    } else {
      this.analyzeOffline();
    }
  }

  private analyzeOnline(): void {
    this.textAnalyzerService.analyzeText(this.analysisMode, this.inputText).subscribe(
      (result: TextAnalysisResult) => {
        this.previousResult = this.analysisResult;
        this.analysisResult = result;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error analyzing text. Please try again.';
        this.analysisResult = null;
      }
    );
  }


  private analyzeOffline(): void {
    const characterCounts: Map<string, number> = new Map();
    const chars = this.inputText.toUpperCase().replace(/[^A-Z]/g, '').split('');

    for (const char of chars) {
      if ((this.analysisMode === 'vowels' && this.isVowel(char)) || (this.analysisMode === 'consonants' && this.isConsonant(char))) {
        characterCounts.set(char, (characterCounts.get(char) || 0) + 1);
      }
    }

    this.previousResult = this.analysisResult;
    this.analysisResult = new TextAnalysisResult(characterCounts);
    this.errorMessage = '';
  }

  private isVowel(char: string): boolean {
    return 'AEIOU'.indexOf(char) !== -1;
  }

  private isConsonant(char: string): boolean {
    return /[A-Z]/i.test(char) && !this.isVowel(char);
  }

  isResultEmpty(obj: Map<string, number>): boolean {
    return obj.size === 0;
  }
}