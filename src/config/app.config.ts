export enum ActionState {
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  IDLE = 'IDLE',
  ERROR = 'ERROR',
}

export interface PaginatedApiResponse<T> {
  status: string;
  copyright: string;
  num_results: number;
  results: T[];
}
