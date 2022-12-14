import { IQuestionType } from '@/shared/model/question-type.model';
import { IStandard } from '@/shared/model/standard.model';

export interface IQuestion {
  id?: number;
  name?: string;
  archived?: boolean | null;
  questionType?: IQuestionType | null;
  standard?: IStandard | null;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public name?: string,
    public archived?: boolean | null,
    public questionType?: IQuestionType | null,
    public standard?: IStandard | null
  ) {
    this.archived = this.archived ?? false;
  }
}
