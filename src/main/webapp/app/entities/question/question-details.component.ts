import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuestion } from '@/shared/model/question.model';
import QuestionService from './question.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class QuestionDetails extends Vue {
  @Inject('questionService') private questionService: () => QuestionService;
  @Inject('alertService') private alertService: () => AlertService;

  public question: IQuestion = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionId) {
        vm.retrieveQuestion(to.params.questionId);
      }
    });
  }

  public retrieveQuestion(questionId) {
    this.questionService()
      .find(questionId)
      .then(res => {
        this.question = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
