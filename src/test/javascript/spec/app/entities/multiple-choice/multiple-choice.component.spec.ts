/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MultipleChoiceComponent from '@/entities/multiple-choice/multiple-choice.vue';
import MultipleChoiceClass from '@/entities/multiple-choice/multiple-choice.component';
import MultipleChoiceService from '@/entities/multiple-choice/multiple-choice.service';
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
  describe('MultipleChoice Management Component', () => {
    let wrapper: Wrapper<MultipleChoiceClass>;
    let comp: MultipleChoiceClass;
    let multipleChoiceServiceStub: SinonStubbedInstance<MultipleChoiceService>;

    beforeEach(() => {
      multipleChoiceServiceStub = sinon.createStubInstance<MultipleChoiceService>(MultipleChoiceService);
      multipleChoiceServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MultipleChoiceClass>(MultipleChoiceComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          multipleChoiceService: () => multipleChoiceServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      multipleChoiceServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMultipleChoices();
      await comp.$nextTick();

      // THEN
      expect(multipleChoiceServiceStub.retrieve.called).toBeTruthy();
      expect(comp.multipleChoices[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      multipleChoiceServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(multipleChoiceServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMultipleChoice();
      await comp.$nextTick();

      // THEN
      expect(multipleChoiceServiceStub.delete.called).toBeTruthy();
      expect(multipleChoiceServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
