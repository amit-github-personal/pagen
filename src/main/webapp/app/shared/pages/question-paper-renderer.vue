<template>
    <b-container>
        <div v-if="exportQuestionsModel.mcq != 0" class="mcq-section">
            <p class="text"> Multiple Choice Questions (Carries 1 marks each)</p>
            {{ 
                multipleChoice = questions.filter(question => question.questionType.name.contains('MCQ'))
            }}

            <div v-if="multipleChoice.length != 0" class="multiple-choice-questions"></div>
        </div>
       
    </b-container>
</template>

<script lang="ts" src="./QuestionRenderer.component.ts"></script>
