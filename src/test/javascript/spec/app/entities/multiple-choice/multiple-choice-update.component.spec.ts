/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MultipleChoiceUpdateComponent from '@/entities/multiple-choice/multiple-choice-update.vue';
import MultipleChoiceClass from '@/entities/multiple-choice/multiple-choice-update.component';
import MultipleChoiceService from '@/entities/multiple-choice/multiple-choice.service';

import OptionService from '@/entities/option/option.service';
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
  describe('MultipleChoice Management Update Component', () => {
    let wrapper: Wrapper<MultipleChoiceClass>;
    let comp: MultipleChoiceClass;
    let multipleChoiceServiceStub: SinonStubbedInstance<MultipleChoiceService>;

    beforeEach(() => {
      multipleChoiceServiceStub = sinon.createStubInstance<MultipleChoiceService>(MultipleChoiceService);

      wrapper = shallowMount<MultipleChoiceClass>(MultipleChoiceUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          multipleChoiceService: () => multipleChoiceServiceStub,
          alertService: () => new AlertService(),

          optionService: () =>
            sinon.createStubInstance<OptionService>(OptionService, {
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
        comp.multipleChoice = entity;
        multipleChoiceServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(multipleChoiceServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.multipleChoice = entity;
        multipleChoiceServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(multipleChoiceServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMultipleChoice = { id: 123 };
        multipleChoiceServiceStub.find.resolves(foundMultipleChoice);
        multipleChoiceServiceStub.retrieve.resolves([foundMultipleChoice]);

        // WHEN
        comp.beforeRouteEnter({ params: { multipleChoiceId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.multipleChoice).toBe(foundMultipleChoice);
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
