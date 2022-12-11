import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStandard } from '@/shared/model/standard.model';
import StandardService from './standard.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class StandardDetails extends Vue {
  @Inject('standardService') private standardService: () => StandardService;
  @Inject('alertService') private alertService: () => AlertService;

  public standard: IStandard = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.standardId) {
        vm.retrieveStandard(to.params.standardId);
      }
    });
  }

  public retrieveStandard(standardId) {
    this.standardService()
      .find(standardId)
      .then(res => {
        this.standard = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
