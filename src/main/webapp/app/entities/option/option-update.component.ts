import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import MultipleChoiceService from '@/entities/multiple-choice/multiple-choice.service';
import { IMultipleChoice } from '@/shared/model/multiple-choice.model';

import { IOption, Option } from '@/shared/model/option.model';
import OptionService from './option.service';

const validations: any = {
  option: {
    name: {
      required,
    },
    archived: {},
  },
};

@Component({
  validations,
})
export default class OptionUpdate extends Vue {
  @Inject('optionService') private optionService: () => OptionService;
  @Inject('alertService') private alertService: () => AlertService;

  public option: IOption = new Option();

  @Inject('multipleChoiceService') private multipleChoiceService: () => MultipleChoiceService;

  public multipleChoices: IMultipleChoice[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.optionId) {
        vm.retrieveOption(to.params.optionId);
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
    if (this.option.id) {
      this.optionService()
        .update(this.option)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.option.updated', { param: param.id });
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
      this.optionService()
        .create(this.option)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('pagenApp.option.created', { param: param.id });
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

  public retrieveOption(optionId): void {
    this.optionService()
      .find(optionId)
      .then(res => {
        this.option = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.multipleChoiceService()
      .retrieve()
      .then(res => {
        this.multipleChoices = res.data;
      });
  }
}
