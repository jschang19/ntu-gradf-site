export interface Duration {
  startAt: string;
  endAt: string | null;
}

export interface MaterialsEvaluation {
  method: string | null;
  percentage: number | null;
  note: string | null;
  document_url: string | null;
}

export interface ExamEvaluation {
  criteria: string | null;
  method: string | null;
  subject: string | null;
  notice: string | null;
  percentage: number | null;
  duration: Duration | null;
  place: string | null;
}

export interface InterviewEvaluation {
  criteria: string | null;
  method: string | null;
  percentage: number | null;
  notice: string | null;
  duration: Duration | null;
  place: string | null;
}

export interface EvaluationCriterias {
  materials: MaterialsEvaluation;
  exam: ExamEvaluation;
  interview: InterviewEvaluation;
  others: string[];
}

export interface HistoricalData {
  year: number;
  application_num: number;
  admission_num: number;
  recruiting_rate: number;
  baseline_score: number;
}

export interface Program {
  name: string | null;
  group: string | null;
  code: string;
  identity: string;
  recruiting_num: number;
  application_criteria: string | null;
  application_materials: string[];
  evaluation_criterias: EvaluationCriterias;
  announce_batch: number;
  phone: string;
  website: string;
  historical_data: HistoricalData[] | null;
}
