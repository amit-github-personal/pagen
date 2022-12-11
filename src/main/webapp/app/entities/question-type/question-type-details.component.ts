import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuestionType } from '@/shared/model/question-type.model';
import QuestionTypeService from './question-type.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class QuestionTypeDetails extends Vue {
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public questionType: IQuestionType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionTypeId) {
        vm.retrieveQuestionType(to.params.questionTypeId);
      }
    });
  }

  public retrieveQuestionType(questionTypeId) {
    this.questionTypeService()
      .find(questionTypeId)
      .then(res => {
        this.questionType = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
