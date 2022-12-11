/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import StandardDetailComponent from '@/entities/standard/standard-details.vue';
import StandardClass from '@/entities/standard/standard-details.component';
import StandardService from '@/entities/standard/standard.service';
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
  describe('Standard Management Detail Component', () => {
    let wrapper: Wrapper<StandardClass>;
    let comp: StandardClass;
    let standardServiceStub: SinonStubbedInstance<StandardService>;

    beforeEach(() => {
      standardServiceStub = sinon.createStubInstance<StandardService>(StandardService);

      wrapper = shallowMount<StandardClass>(StandardDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { standardService: () => standardServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundStandard = { id: 123 };
        standardServiceStub.find.resolves(foundStandard);

        // WHEN
        comp.retrieveStandard(123);
        await comp.$nextTick();

        // THEN
        expect(comp.standard).toBe(foundStandard);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundStandard = { id: 123 };
        standardServiceStub.find.resolves(foundStandard);

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
