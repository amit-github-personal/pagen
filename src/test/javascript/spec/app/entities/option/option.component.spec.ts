/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import OptionComponent from '@/entities/option/option.vue';
import OptionClass from '@/entities/option/option.component';
import OptionService from '@/entities/option/option.service';
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
  describe('Option Management Component', () => {
    let wrapper: Wrapper<OptionClass>;
    let comp: OptionClass;
    let optionServiceStub: SinonStubbedInstance<OptionService>;

    beforeEach(() => {
      optionServiceStub = sinon.createStubInstance<OptionService>(OptionService);
      optionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<OptionClass>(OptionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          optionService: () => optionServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      optionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllOptions();
      await comp.$nextTick();

      // THEN
      expect(optionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.options[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      optionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(optionServiceStub.retrieve.callCount).toEqual(1);

      comp.removeOption();
      await comp.$nextTick();

      // THEN
      expect(optionServiceStub.delete.called).toBeTruthy();
      expect(optionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
