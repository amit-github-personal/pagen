import { IOption } from '@/shared/model/option.model';

export interface IMultipleChoice {
  id?: number;
  name?: string;
  archived?: boolean | null;
  options?: IOption[] | null;
}

export class MultipleChoice implements IMultipleChoice {
  constructor(public id?: number, public name?: string, public archived?: boolean | null, public options?: IOption[] | null) {
    this.archived = this.archived ?? false;
  }
}
