import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOption } from '@/shared/model/option.model';

import OptionService from './option.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Option extends Vue {
  @Inject('optionService') private optionService: () => OptionService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public options: IOption[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllOptions();
  }

  public clear(): void {
    this.retrieveAllOptions();
  }

  public retrieveAllOptions(): void {
    this.isFetching = true;
    this.optionService()
      .retrieve()
      .then(
        res => {
          this.options = res.data;
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

  public prepareRemove(instance: IOption): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeOption(): void {
    this.optionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('pagenApp.option.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllOptions();
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
