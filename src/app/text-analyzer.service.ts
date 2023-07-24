import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export class TextAnalysisResult {
  characterCounts: Map<string, number>;

  constructor(characterCounts: Map<string, number> = new Map<string, number>()) {
    this.characterCounts = characterCounts;
  }
}

@Injectable({
  providedIn: 'root',
})
export class TextAnalyzerService {
  private backendUrl = 'http://localhost:8080/api/text_analyzer/analyze';

  constructor(private http: HttpClient) { }

  analyzeText(mode: string, inputText: string): Observable<TextAnalysisResult> {
    const requestBody = {
      mode: mode,
      input: inputText,
    };

    return this.http.post<TextAnalysisResult>(this.backendUrl, requestBody).pipe(
      map((response: any) => {
        const characterCounts = new Map<string, number>(Object.entries(response.characterCounts));
        return new TextAnalysisResult(characterCounts);
      })
    );
  }
}