import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Standard = () => import('@/entities/standard/standard.vue');
const StandardUpdate = () => import('@/entities/standard/standard-update.vue');
const StandardDetails = () => import('@/entities/standard/standard-details.vue');

const Question = () => import('@/entities/question/question.vue');
const QuestionUpdate = () => import('@/entities/question/question-update.vue');
const QuestionDetails = () => import('@/entities/question/question-details.vue');

const MultipleChoice = () => import('@/entities/multiple-choice/multiple-choice.vue');
const MultipleChoiceUpdate = () => import('@/entities/multiple-choice/multiple-choice-update.vue');
const MultipleChoiceDetails = () => import('@/entities/multiple-choice/multiple-choice-details.vue');

const Option = () => import('@/entities/option/option.vue');
const OptionUpdate = () => import('@/entities/option/option-update.vue');
const OptionDetails = () => import('@/entities/option/option-details.vue');

const QuestionType = () => import('@/entities/question-type/question-type.vue');
const QuestionTypeUpdate = () => import('@/entities/question-type/question-type-update.vue');
const QuestionTypeDetails = () => import('@/entities/question-type/question-type-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'standard',
      name: 'Standard',
      component: Standard,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard/new',
      name: 'StandardCreate',
      component: StandardUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard/:standardId/edit',
      name: 'StandardEdit',
      component: StandardUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard/:standardId/view',
      name: 'StandardView',
      component: StandardDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question',
      name: 'Question',
      component: Question,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question/new',
      name: 'QuestionCreate',
      component: QuestionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question/:questionId/edit',
      name: 'QuestionEdit',
      component: QuestionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question/:questionId/view',
      name: 'QuestionView',
      component: QuestionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'multiple-choice',
      name: 'MultipleChoice',
      component: MultipleChoice,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'multiple-choice/new',
      name: 'MultipleChoiceCreate',
      component: MultipleChoiceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'multiple-choice/:multipleChoiceId/edit',
      name: 'MultipleChoiceEdit',
      component: MultipleChoiceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'multiple-choice/:multipleChoiceId/view',
      name: 'MultipleChoiceView',
      component: MultipleChoiceDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'option',
      name: 'Option',
      component: Option,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'option/new',
      name: 'OptionCreate',
      component: OptionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'option/:optionId/edit',
      name: 'OptionEdit',
      component: OptionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'option/:optionId/view',
      name: 'OptionView',
      component: OptionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question-type',
      name: 'QuestionType',
      component: QuestionType,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question-type/new',
      name: 'QuestionTypeCreate',
      component: QuestionTypeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question-type/:questionTypeId/edit',
      name: 'QuestionTypeEdit',
      component: QuestionTypeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'question-type/:questionTypeId/view',
      name: 'QuestionTypeView',
      component: QuestionTypeDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
