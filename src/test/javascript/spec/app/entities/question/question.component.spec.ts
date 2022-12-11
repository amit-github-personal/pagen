/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import QuestionComponent from '@/entities/question/question.vue';
import QuestionClass from '@/entities/question/question.component';
import QuestionService from '@/entities/question/question.service';
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
  describe('Question Management Component', () => {
    let wrapper: Wrapper<QuestionClass>;
    let comp: QuestionClass;
    let questionServiceStub: SinonStubbedInstance<QuestionService>;

    beforeEach(() => {
      questionServiceStub = sinon.createStubInstance<QuestionService>(QuestionService);
      questionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<QuestionClass>(QuestionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          questionService: () => questionServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      questionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllQuestions();
      await comp.$nextTick();

      // THEN
      expect(questionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.questions[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      questionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(questionServiceStub.retrieve.callCount).toEqual(1);

      comp.removeQuestion();
      await comp.$nextTick();

      // THEN
      expect(questionServiceStub.delete.called).toBeTruthy();
      expect(questionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
