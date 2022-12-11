import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import QuestionService from '@/entities/question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import { IQuestionType, QuestionType } from '@/shared/model/question-type.model';
import QuestionTypeService from './question-type.service';

const validations: any = {
  questionType: {
    marks: {
      required,
      numeric,
    },
    type: {
      required,
    },
    archived: {},
  },
};

@Component({
  validations,
})
export default class QuestionTypeUpdate extends Vue {
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public questionType: IQuestionType = new QuestionType();

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionTypeId) {
        vm.retrieveQuestionType(to.params.questionTypeId);
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
    if (this.questionType.id) {
      this.questionTypeService()
        .update(this.questionType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.questionType.updated', { param: param.id });
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
      this.questionTypeService()
        .create(this.questionType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.questionType.created', { param: param.id });
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

  public retrieveQuestionType(questionTypeId): void {
    this.questionTypeService()
      .find(questionTypeId)
      .then(res => {
        this.questionType = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.questionService()
      .retrieve()
      .then(res => {
        this.questions = res.data;
      });
  }
}
