import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuestionType } from '@/shared/model/question-type.model';

import QuestionTypeService from './question-type.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class QuestionType extends Vue {
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public questionTypes: IQuestionType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuestionTypes();
  }

  public clear(): void {
    this.retrieveAllQuestionTypes();
  }

  public retrieveAllQuestionTypes(): void {
    this.isFetching = true;
    this.questionTypeService()
      .retrieve()
      .then(
        res => {
          this.questionTypes = res.data;
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

  public prepareRemove(instance: IQuestionType): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeQuestionType(): void {
    this.questionTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('pagenApp.questionType.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllQuestionTypes();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
