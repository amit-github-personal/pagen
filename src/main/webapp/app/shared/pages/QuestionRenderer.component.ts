import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import QuestionService from './question.service';
import AlertService from '@/shared/alert/alert.service';
import { IExportQuestionsModel } from '../model/exportquestions.model';

@Component
export default class QuestionRenderer extends Vue {

    public exportQuestionsModel : IExportQuestionsModel = {};
    public questions: any = {};
    @Inject('questionService') private questionService: () => QuestionService;
    @Inject('alertService') private alertService: () => AlertService;

    public questions: any [] ;
    multipleChoice: any[];

    mounted() {
        this.exportQuestionsModel = this.$store.getters.getExportQuestionData
        this.retrieveAllQuestions();
    }


    public retrieveAllQuestions(): void {
        this.questionService()
          .retrieveRandomQuestions(this.exportQuestionsModel)
          .then(
            res => {
              console.log(JSON.stringify(res));
              this.questions =res;
            },
            err => {
              this.alertService().showHttpError(this, err.response);
            }
          );
      }

}
