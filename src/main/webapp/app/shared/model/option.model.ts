import { IMultipleChoice } from '@/shared/model/multiple-choice.model';

export interface IOption {
  id?: number;
  name?: string;
  archived?: boolean | null;
  multipleChoices?: IMultipleChoice[] | null;
}

export class Option implements IOption {
  constructor(
    public id?: number,
    public name?: string,
    public archived?: boolean | null,
    public multipleChoices?: IMultipleChoice[] | null
  ) {
    this.archived = this.archived ?? false;
  }
}
