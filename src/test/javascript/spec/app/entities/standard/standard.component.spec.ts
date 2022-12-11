/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import StandardComponent from '@/entities/standard/standard.vue';
import StandardClass from '@/entities/standard/standard.component';
import StandardService from '@/entities/standard/standard.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Standard Management Component', () => {
    let wrapper: Wrapper<StandardClass>;
    let comp: StandardClass;
    let standardServiceStub: SinonStubbedInstance<StandardService>;

    beforeEach(() => {
      standardServiceStub = sinon.createStubInstance<StandardService>(StandardService);
      standardServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<StandardClass>(StandardComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          standardService: () => standardServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      standardServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllStandards();
      await comp.$nextTick();

      // THEN
      expect(standardServiceStub.retrieve.called).toBeTruthy();
      expect(comp.standards[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      standardServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(standardServiceStub.retrieve.callCount).toEqual(1);

      comp.removeStandard();
      await comp.$nextTick();

      // THEN
      expect(standardServiceStub.delete.called).toBeTruthy();
      expect(standardServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
