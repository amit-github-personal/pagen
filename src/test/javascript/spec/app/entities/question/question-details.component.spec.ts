/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import QuestionDetailComponent from '@/entities/question/question-details.vue';
import QuestionClass from '@/entities/question/question-details.component';
import QuestionService from '@/entities/question/question.service';
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
  describe('Question Management Detail Component', () => {
    let wrapper: Wrapper<QuestionClass>;
    let comp: QuestionClass;
    let questionServiceStub: SinonStubbedInstance<QuestionService>;

    beforeEach(() => {
      questionServiceStub = sinon.createStubInstance<QuestionService>(QuestionService);

      wrapper = shallowMount<QuestionClass>(QuestionDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { questionService: () => questionServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuestion = { id: 123 };
        questionServiceStub.find.resolves(foundQuestion);

        // WHEN
        comp.retrieveQuestion(123);
        await comp.$nextTick();

        // THEN
        expect(comp.question).toBe(foundQuestion);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundQuestion = { id: 123 };
        questionServiceStub.find.resolves(foundQuestion);

        // WHEN
        comp.beforeRouteEnter({ params: { questionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.question).toBe(foundQuestion);
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
