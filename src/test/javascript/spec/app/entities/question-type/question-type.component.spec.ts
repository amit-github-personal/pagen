/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import QuestionTypeComponent from '@/entities/question-type/question-type.vue';
import QuestionTypeClass from '@/entities/question-type/question-type.component';
import QuestionTypeService from '@/entities/question-type/question-type.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('QuestionType Management Component', () => {
    let wrapper: Wrapper<QuestionTypeClass>;
    let comp: QuestionTypeClass;
    let questionTypeServiceStub: SinonStubbedInstance<QuestionTypeService>;

    beforeEach(() => {
      questionTypeServiceStub = sinon.createStubInstance<QuestionTypeService>(QuestionTypeService);
      questionTypeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<QuestionTypeClass>(QuestionTypeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          questionTypeService: () => questionTypeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      questionTypeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllQuestionTypes();
      await comp.$nextTick();

      // THEN
      expect(questionTypeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.questionTypes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      questionTypeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(questionTypeServiceStub.retrieve.callCount).toEqual(1);

      comp.removeQuestionType();
      await comp.$nextTick();

      // THEN
      expect(questionTypeServiceStub.delete.called).toBeTruthy();
      expect(questionTypeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
