/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import QuestionTypeDetailComponent from '@/entities/question-type/question-type-details.vue';
import QuestionTypeClass from '@/entities/question-type/question-type-details.component';
import QuestionTypeService from '@/entities/question-type/question-type.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('QuestionType Management Detail Component', () => {
    let wrapper: Wrapper<QuestionTypeClass>;
    let comp: QuestionTypeClass;
    let questionTypeServiceStub: SinonStubbedInstance<QuestionTypeService>;

    beforeEach(() => {
      questionTypeServiceStub = sinon.createStubInstance<QuestionTypeService>(QuestionTypeService);

      wrapper = shallowMount<QuestionTypeClass>(QuestionTypeDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { questionTypeService: () => questionTypeServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuestionType = { id: 123 };
        questionTypeServiceStub.find.resolves(foundQuestionType);

        // WHEN
        comp.retrieveQuestionType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.questionType).toBe(foundQuestionType);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundQuestionType = { id: 123 };
        questionTypeServiceStub.find.resolves(foundQuestionType);

        // WHEN
        comp.beforeRouteEnter({ params: { questionTypeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.questionType).toBe(foundQuestionType);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
