/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MultipleChoiceDetailComponent from '@/entities/multiple-choice/multiple-choice-details.vue';
import MultipleChoiceClass from '@/entities/multiple-choice/multiple-choice-details.component';
import MultipleChoiceService from '@/entities/multiple-choice/multiple-choice.service';
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
  describe('MultipleChoice Management Detail Component', () => {
    let wrapper: Wrapper<MultipleChoiceClass>;
    let comp: MultipleChoiceClass;
    let multipleChoiceServiceStub: SinonStubbedInstance<MultipleChoiceService>;

    beforeEach(() => {
      multipleChoiceServiceStub = sinon.createStubInstance<MultipleChoiceService>(MultipleChoiceService);

      wrapper = shallowMount<MultipleChoiceClass>(MultipleChoiceDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { multipleChoiceService: () => multipleChoiceServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMultipleChoice = { id: 123 };
        multipleChoiceServiceStub.find.resolves(foundMultipleChoice);

        // WHEN
        comp.retrieveMultipleChoice(123);
        await comp.$nextTick();

        // THEN
        expect(comp.multipleChoice).toBe(foundMultipleChoice);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMultipleChoice = { id: 123 };
        multipleChoiceServiceStub.find.resolves(foundMultipleChoice);

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
