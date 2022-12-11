import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IStandard } from '@/shared/model/standard.model';

import StandardService from './standard.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Standard extends Vue {
  @Inject('standardService') private standardService: () => StandardService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public standards: IStandard[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllStandards();
  }

  public clear(): void {
    this.retrieveAllStandards();
  }

  public retrieveAllStandards(): void {
    this.isFetching = true;
    this.standardService()
      .retrieve()
      .then(
        res => {
          this.standards = res.data;
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

  public prepareRemove(instance: IStandard): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeStandard(): void {
    this.standardService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('pagenApp.standard.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllStandards();
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
