import { TestBed } from '@angular/core/testing';

import { TextAnalyzerService } from './text-analyzer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TextAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
