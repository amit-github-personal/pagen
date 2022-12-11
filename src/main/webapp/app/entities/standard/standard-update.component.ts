import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import QuestionService from '@/entities/question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import { IStandard, Standard } from '@/shared/model/standard.model';
import StandardService from './standard.service';

const validations: any = {
  standard: {
    name: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class StandardUpdate extends Vue {
  @Inject('standardService') private standardService: () => StandardService;
  @Inject('alertService') private alertService: () => AlertService;

  public standard: IStandard = new Standard();

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.standardId) {
        vm.retrieveStandard(to.params.standardId);
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
    if (this.standard.id) {
      this.standardService()
        .update(this.standard)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.standard.updated', { param: param.id });
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
      this.standardService()
        .create(this.standard)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.standard.created', { param: param.id });
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

  public retrieveStandard(standardId): void {
    this.standardService()
      .find(standardId)
      .then(res => {
        this.standard = res;
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
