import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuestion } from '@/shared/model/question.model';
import { IExportQuestionsModel } from '../../shared/model/exportquestions.model';

import QuestionService from './question.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Question extends Vue {
  @Inject('questionService') private questionService: () => QuestionService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = 0;

  public questions: IQuestion[] = [];

  public exportQuestionsModel : IExportQuestionsModel = {};

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuestions();
  }

  public clear(): void {
    this.retrieveAllQuestions();
  }

  public retrieveAllQuestions(): void {
    this.isFetching = true;
    this.questionService()
      .retrieve()
      .then(
        res => {
          this.questions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IQuestion): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeQuestion(): void {
    this.questionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('pagenApp.question.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllQuestions();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public exportQuestions(event): void {
    event.preventDefault();
    this.$store.commit("setExportQuestions", this.exportQuestionsModel)
    this.$router.push({ path: '/pdfRenderer'}); 
  }

  public onExportQuestionReset(event): void {
    event.preventDefault();
    this.exportQuestionsModel.mcq = 0;
    this.exportQuestionsModel.threeMarks = 0;
    this.exportQuestionsModel.twoMarks = 0;
    this.exportQuestionsModel.fourMarks = 0;
    this.exportQuestionsModel.fiveMarks = 0;

  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
