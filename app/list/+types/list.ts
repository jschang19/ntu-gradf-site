import type { LoaderFunctionArgs } from 'react-router';

export interface LoaderArgs extends LoaderFunctionArgs {}

export interface ListProgram {
  name: string;
  group: string | null;
  code: string;
  recruiting_num: number;
  announce_batch: number;
  evaluation_criteria: {
    materials: {
      percentage: number | null;
    };
    exam: {
      percentage: number | null;
    };
    interview: {
      percentage: number | null;
    };
  };
}

export interface LoaderData {
  department: string | null;
  programs: ListProgram[];
}