import { IQuestion } from '@/shared/model/question.model';

export interface IQuestionType {
  id?: number;
  marks?: number;
  type?: string;
  archived?: boolean | null;
  question?: IQuestion | null;
}

export class QuestionType implements IQuestionType {
  constructor(
    public id?: number,
    public marks?: number,
    public type?: string,
    public archived?: boolean | null,
    public question?: IQuestion | null
  ) {
    this.archived = this.archived ?? false;
  }
}
