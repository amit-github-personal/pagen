import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import { ExportQuestionsModel } from '../model/exportquestions.model';

@Component
export default class QuestionRenderer extends Vue {
    
    public exportQuestionsModel: ExportQuestionsModel;

    public mounted(): void {
        this.init();
    }

    init() {
        console.log("Initialized question renderer")
    }
}