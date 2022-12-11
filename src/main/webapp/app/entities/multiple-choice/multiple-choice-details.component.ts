import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMultipleChoice } from '@/shared/model/multiple-choice.model';
import MultipleChoiceService from './multiple-choice.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MultipleChoiceDetails extends Vue {
  @Inject('multipleChoiceService') private multipleChoiceService: () => MultipleChoiceService;
  @Inject('alertService') private alertService: () => AlertService;

  public multipleChoice: IMultipleChoice = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.multipleChoiceId) {
        vm.retrieveMultipleChoice(to.params.multipleChoiceId);
      }
    });
  }

  public retrieveMultipleChoice(multipleChoiceId) {
    this.multipleChoiceService()
      .find(multipleChoiceId)
      .then(res => {
        this.multipleChoice = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
