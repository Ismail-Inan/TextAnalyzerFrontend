import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextAnalyzerComponent } from './text-analyzer.component';
import { TextAnalyzerService, TextAnalysisResult } from '../text-analyzer.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TextAnalyzerComponent', () => {
  let component: TextAnalyzerComponent;
  let fixture: ComponentFixture<TextAnalyzerComponent>;
  let textAnalyzerService: TextAnalyzerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [TextAnalyzerComponent],
      providers: [TextAnalyzerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnalyzerComponent);
    component = fixture.componentInstance;
    textAnalyzerService = TestBed.inject(TextAnalyzerService);
    fixture.detectChanges();
  });

  it('should create TextAnalyzerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should analyze text correctly with vowels in offline mode', () => {
    component.inputText = 'Aa bb EE f I';
    component.analysisMode = 'vowels';
    component.onlineMode = false;

    component.analyzeText();

    expect(component.analysisResult?.characterCounts.get('A')).toBe(2);
    expect(component.analysisResult?.characterCounts.get('E')).toBe(2);
    expect(component.analysisResult?.characterCounts.get('I')).toBe(1);
  });

  it('should analyze text correctly with consonants in online mode', () => {
    component.inputText = 'Aa bb EE f I';
    component.analysisMode = 'consonants';
    component.onlineMode = true;

    const mockResponse: TextAnalysisResult = {
      characterCounts: new Map([
        ['A', 2],
        ['B', 2],
        ['F', 1],
        ['E', 2],
        ['I', 1],
      ]),
    };

    spyOn(textAnalyzerService, 'analyzeText').and.returnValue(of(mockResponse));

    component.analyzeText();

    expect(component.analysisResult?.characterCounts.get('A')).toBe(2);
    expect(component.analysisResult?.characterCounts.get('B')).toBe(2);
    expect(component.analysisResult?.characterCounts.get('F')).toBe(1);
    expect(component.analysisResult?.characterCounts.get('E')).toBe(2);
    expect(component.analysisResult?.characterCounts.get('I')).toBe(1);
  });


  it('should analyze text with empty input in offline mode', () => {
    component.inputText = '';
    component.analysisMode = 'vowels';
    component.onlineMode = false;

    component.analyzeText();

    expect(component.analysisResult).toBeNull();
  });

  it('should analyze text with invalid mode in online mode', () => {
    component.inputText = 'Some text';
    component.analysisMode = 'invalid';
    component.onlineMode = true;

    spyOn(textAnalyzerService, 'analyzeText').and.returnValue(of(new TextAnalysisResult()));

    component.analyzeText();

    expect(component.analysisResult).toBeTruthy();
    expect(component.analysisResult?.characterCounts).toBeTruthy();
    expect(component.analysisResult?.characterCounts.size).toBe(0);
  });
});