/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import OptionUpdateComponent from '@/entities/option/option-update.vue';
import OptionClass from '@/entities/option/option-update.component';
import OptionService from '@/entities/option/option.service';

import MultipleChoiceService from '@/entities/multiple-choice/multiple-choice.service';
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
  describe('Option Management Update Component', () => {
    let wrapper: Wrapper<OptionClass>;
    let comp: OptionClass;
    let optionServiceStub: SinonStubbedInstance<OptionService>;

    beforeEach(() => {
      optionServiceStub = sinon.createStubInstance<OptionService>(OptionService);

      wrapper = shallowMount<OptionClass>(OptionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          optionService: () => optionServiceStub,
          alertService: () => new AlertService(),

          multipleChoiceService: () =>
            sinon.createStubInstance<MultipleChoiceService>(MultipleChoiceService, {
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
        comp.option = entity;
        optionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(optionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.option = entity;
        optionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(optionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundOption = { id: 123 };
        optionServiceStub.find.resolves(foundOption);
        optionServiceStub.retrieve.resolves([foundOption]);

        // WHEN
        comp.beforeRouteEnter({ params: { optionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.option).toBe(foundOption);
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
