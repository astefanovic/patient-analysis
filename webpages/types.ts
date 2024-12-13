export enum Status {
    Completed = 'Completed',
    Unmatched = 'Unmatched',
    ProcessingError = 'Processing Error',
    AnalysisError = 'Analysis Error',
  }
  
  export enum Relevance {
    Relevant = 'Relevant',
    Irrelevant = 'Irrelevant',
    Ignore = 'Ignore'
  }
  
  export type Patient = {
    date: string;
    firstName: string;
    lastName: string;
    dob: string;
    medicareId: string;
    rawData: string;
    processedData: string;
    response: string;
    status: Status;
    relevance: Relevance | '';
  }
  
  