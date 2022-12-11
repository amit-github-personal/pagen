import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import OptionService from '@/entities/option/option.service';
import { IOption } from '@/shared/model/option.model';

import { IMultipleChoice, MultipleChoice } from '@/shared/model/multiple-choice.model';
import MultipleChoiceService from './multiple-choice.service';

const validations: any = {
  multipleChoice: {
    name: {
      required,
    },
    archived: {},
  },
};

@Component({
  validations,
})
export default class MultipleChoiceUpdate extends Vue {
  @Inject('multipleChoiceService') private multipleChoiceService: () => MultipleChoiceService;
  @Inject('alertService') private alertService: () => AlertService;

  public multipleChoice: IMultipleChoice = new MultipleChoice();

  @Inject('optionService') private optionService: () => OptionService;

  public options: IOption[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.multipleChoiceId) {
        vm.retrieveMultipleChoice(to.params.multipleChoiceId);
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
    if (this.multipleChoice.id) {
      this.multipleChoiceService()
        .update(this.multipleChoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.multipleChoice.updated', { param: param.id });
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
      this.multipleChoiceService()
        .create(this.multipleChoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.multipleChoice.created', { param: param.id });
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

  public retrieveMultipleChoice(multipleChoiceId): void {
    this.multipleChoiceService()
      .find(multipleChoiceId)
      .then(res => {
        this.multipleChoice = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.optionService()
      .retrieve()
      .then(res => {
        this.options = res.data;
      });
  }
}
