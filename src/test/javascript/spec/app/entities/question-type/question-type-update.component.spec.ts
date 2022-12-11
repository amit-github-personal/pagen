/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import QuestionTypeUpdateComponent from '@/entities/question-type/question-type-update.vue';
import QuestionTypeClass from '@/entities/question-type/question-type-update.component';
import QuestionTypeService from '@/entities/question-type/question-type.service';

import QuestionService from '@/entities/question/question.service';
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
  describe('QuestionType Management Update Component', () => {
    let wrapper: Wrapper<QuestionTypeClass>;
    let comp: QuestionTypeClass;
    let questionTypeServiceStub: SinonStubbedInstance<QuestionTypeService>;

    beforeEach(() => {
      questionTypeServiceStub = sinon.createStubInstance<QuestionTypeService>(QuestionTypeService);

      wrapper = shallowMount<QuestionTypeClass>(QuestionTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          questionTypeService: () => questionTypeServiceStub,
          alertService: () => new AlertService(),

          questionService: () =>
            sinon.createStubInstance<QuestionService>(QuestionService, {
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
        comp.questionType = entity;
        questionTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.questionType = entity;
        questionTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundQuestionType = { id: 123 };
        questionTypeServiceStub.find.resolves(foundQuestionType);
        questionTypeServiceStub.retrieve.resolves([foundQuestionType]);

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
