/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import OptionDetailComponent from '@/entities/option/option-details.vue';
import OptionClass from '@/entities/option/option-details.component';
import OptionService from '@/entities/option/option.service';
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
  describe('Option Management Detail Component', () => {
    let wrapper: Wrapper<OptionClass>;
    let comp: OptionClass;
    let optionServiceStub: SinonStubbedInstance<OptionService>;

    beforeEach(() => {
      optionServiceStub = sinon.createStubInstance<OptionService>(OptionService);

      wrapper = shallowMount<OptionClass>(OptionDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { optionService: () => optionServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOption = { id: 123 };
        optionServiceStub.find.resolves(foundOption);

        // WHEN
        comp.retrieveOption(123);
        await comp.$nextTick();

        // THEN
        expect(comp.option).toBe(foundOption);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundOption = { id: 123 };
        optionServiceStub.find.resolves(foundOption);

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
