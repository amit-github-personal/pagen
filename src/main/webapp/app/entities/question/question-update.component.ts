import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import QuestionTypeService from '@/entities/question-type/question-type.service';
import { IQuestionType } from '@/shared/model/question-type.model';

import StandardService from '@/entities/standard/standard.service';
import { IStandard } from '@/shared/model/standard.model';

import { IQuestion, Question } from '@/shared/model/question.model';
import QuestionService from './question.service';

const validations: any = {
  question: {
    name: {
      required,
    },
    archived: {},
  },
};

@Component({
  validations,
})
export default class QuestionUpdate extends Vue {
  @Inject('questionService') private questionService: () => QuestionService;
  @Inject('alertService') private alertService: () => AlertService;

  public question: IQuestion = new Question();

  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;

  public questionTypes: IQuestionType[] = [];

  @Inject('standardService') private standardService: () => StandardService;

  public standards: IStandard[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionId) {
        vm.retrieveQuestion(to.params.questionId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.question.id) {
      this.questionService()
        .update(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.question.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.questionService()
        .create(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.question.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveQuestion(questionId): void {
    this.questionService()
      .find(questionId)
      .then(res => {
        this.question = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.questionTypeService()
      .retrieve()
      .then(res => {
        this.questionTypes = res.data;
      });
    this.standardService()
      .retrieve()
      .then(res => {
        this.standards = res.data;
      });
  }
}
