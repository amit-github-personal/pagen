import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOption } from '@/shared/model/option.model';
import OptionService from './option.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class OptionDetails extends Vue {
  @Inject('optionService') private optionService: () => OptionService;
  @Inject('alertService') private alertService: () => AlertService;

  public option: IOption = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.optionId) {
        vm.retrieveOption(to.params.optionId);
      }
    });
  }

  public retrieveOption(optionId) {
    this.optionService()
      .find(optionId)
      .then(res => {
        this.option = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
