import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMultipleChoice } from '@/shared/model/multiple-choice.model';

import MultipleChoiceService from './multiple-choice.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MultipleChoice extends Vue {
  @Inject('multipleChoiceService') private multipleChoiceService: () => MultipleChoiceService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public multipleChoices: IMultipleChoice[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMultipleChoices();
  }

  public clear(): void {
    this.retrieveAllMultipleChoices();
  }

  public retrieveAllMultipleChoices(): void {
    this.isFetching = true;
    this.multipleChoiceService()
      .retrieve()
      .then(
        res => {
          this.multipleChoices = res.data;
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

  public prepareRemove(instance: IMultipleChoice): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMultipleChoice(): void {
    this.multipleChoiceService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('pagenApp.multipleChoice.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMultipleChoices();
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
