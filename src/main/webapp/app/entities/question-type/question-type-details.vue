<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="questionType">
        <h2 class="jh-entity-heading" data-cy="questionTypeDetailsHeading">
          <span v-text="$t('pagenApp.questionType.detail.title')">QuestionType</span> {{ questionType.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('pagenApp.questionType.marks')">Marks</span>
          </dt>
          <dd>
            <span>{{ questionType.marks }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.questionType.type')">Type</span>
          </dt>
          <dd>
            <span>{{ questionType.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.questionType.archived')">Archived</span>
          </dt>
          <dd>
            <span>{{ questionType.archived }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="questionType.id"
          :to="{ name: 'QuestionTypeEdit', params: { questionTypeId: questionType.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./question-type-details.component.ts"></script>
