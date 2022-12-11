/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import StandardUpdateComponent from '@/entities/standard/standard-update.vue';
import StandardClass from '@/entities/standard/standard-update.component';
import StandardService from '@/entities/standard/standard.service';

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
  describe('Standard Management Update Component', () => {
    let wrapper: Wrapper<StandardClass>;
    let comp: StandardClass;
    let standardServiceStub: SinonStubbedInstance<StandardService>;

    beforeEach(() => {
      standardServiceStub = sinon.createStubInstance<StandardService>(StandardService);

      wrapper = shallowMount<StandardClass>(StandardUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          standardService: () => standardServiceStub,
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
        comp.standard = entity;
        standardServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(standardServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.standard = entity;
        standardServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(standardServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundStandard = { id: 123 };
        standardServiceStub.find.resolves(foundStandard);
        standardServiceStub.retrieve.resolves([foundStandard]);

        // WHEN
        comp.beforeRouteEnter({ params: { standardId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.standard).toBe(foundStandard);
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
