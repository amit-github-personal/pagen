/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import QuestionUpdateComponent from '@/entities/question/question-update.vue';
import QuestionClass from '@/entities/question/question-update.component';
import QuestionService from '@/entities/question/question.service';

import QuestionTypeService from '@/entities/question-type/question-type.service';

import StandardService from '@/entities/standard/standard.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Question Management Update Component', () => {
    let wrapper: Wrapper<QuestionClass>;
    let comp: QuestionClass;
    let questionServiceStub: SinonStubbedInstance<QuestionService>;

    beforeEach(() => {
      questionServiceStub = sinon.createStubInstance<QuestionService>(QuestionService);

      wrapper = shallowMount<QuestionClass>(QuestionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          questionService: () => questionServiceStub,
          alertService: () => new AlertService(),

          questionTypeService: () =>
            sinon.createStubInstance<QuestionTypeService>(QuestionTypeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          standardService: () =>
            sinon.createStubInstance<StandardService>(StandardService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.question = entity;
        questionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.question = entity;
        questionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundQuestion = { id: 123 };
        questionServiceStub.find.resolves(foundQuestion);
        questionServiceStub.retrieve.resolves([foundQuestion]);

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
