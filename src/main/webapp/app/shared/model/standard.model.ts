import { IQuestion } from '@/shared/model/question.model';

export interface IStandard {
  id?: number;
  name?: string;
  questions?: IQuestion[] | null;
}

export class Standard implements IStandard {
  constructor(public id?: number, public name?: string, public questions?: IQuestion[] | null) {}
}
