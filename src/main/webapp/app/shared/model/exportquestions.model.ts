
export interface IExportQuestionsModel {
    mcq?:number,
    twoMarks?: number,
    threeMarks?: number,
    fourMarks?: number,
    fiveMarks?:number

}

export class ExportQuestionsModel implements IExportQuestionsModel {
    constructor(public mcq?: number, public twoMarks?: number, public threeMarks?: number | 0, public fourMarks?: number | 0, 
        public fiveMarks ? : number | 0) {
        
      }
}