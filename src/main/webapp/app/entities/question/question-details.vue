<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="question">
        <h2 class="jh-entity-heading" data-cy="questionDetailsHeading">
          <span v-text="$t('pagenApp.question.detail.title')">Question</span> {{ question.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('pagenApp.question.name')">Name</span>
          </dt>
          <dd>
            <span>{{ question.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.question.archived')">Archived</span>
          </dt>
          <dd>
            <span>{{ question.archived }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.question.questionType')">Question Type</span>
          </dt>
          <dd>
            <div v-if="question.questionType">
              <router-link :to="{ name: 'QuestionTypeView', params: { questionTypeId: question.questionType.id } }">{{
                question.questionType.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.question.standard')">Standard</span>
          </dt>
          <dd>
            <div v-if="question.standard">
              <router-link :to="{ name: 'StandardView', params: { standardId: question.standard.id } }">{{
                question.standard.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="question.id" :to="{ name: 'QuestionEdit', params: { questionId: question.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./question-details.component.ts"></script>
