import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import StandardService from './standard/standard.service';
import QuestionService from './question/question.service';
import MultipleChoiceService from './multiple-choice/multiple-choice.service';
import OptionService from './option/option.service';
import QuestionTypeService from './question-type/question-type.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('standardService') private standardService = () => new StandardService();
  @Provide('questionService') private questionService = () => new QuestionService();
  @Provide('multipleChoiceService') private multipleChoiceService = () => new MultipleChoiceService();
  @Provide('optionService') private optionService = () => new OptionService();
  @Provide('questionTypeService') private questionTypeService = () => new QuestionTypeService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
