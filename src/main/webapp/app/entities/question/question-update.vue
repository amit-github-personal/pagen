<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="pagenApp.question.home.createOrEditLabel"
          data-cy="QuestionCreateUpdateHeading"
          v-text="$t('pagenApp.question.home.createOrEditLabel')"
        >
          Create or edit a Question
        </h2>
        <div>
          <div class="form-group" v-if="question.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="question.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.question.name')" for="question-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="question-name"
              data-cy="name"
              :class="{ valid: !$v.question.name.$invalid, invalid: $v.question.name.$invalid }"
              v-model="$v.question.name.$model"
              required
            />
            <div v-if="$v.question.name.$anyDirty && $v.question.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.question.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.question.archived')" for="question-archived">Archived</label>
            <input
              type="checkbox"
              class="form-check"
              name="archived"
              id="question-archived"
              data-cy="archived"
              :class="{ valid: !$v.question.archived.$invalid, invalid: $v.question.archived.$invalid }"
              v-model="$v.question.archived.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.question.questionType')" for="question-questionType"
              >Question Type</label
            >
            <select
              class="form-control"
              id="question-questionType"
              data-cy="questionType"
              name="questionType"
              v-model="question.questionType"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  question.questionType && questionTypeOption.id === question.questionType.id ? question.questionType : questionTypeOption
                "
                v-for="questionTypeOption in questionTypes"
                :key="questionTypeOption.id"
              >
                {{ questionTypeOption.type }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.question.standard')" for="question-standard">Standard</label>
            <select class="form-control" id="question-standard" data-cy="standard" name="standard" v-model="question.standard">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="question.standard && standardOption.id === question.standard.id ? question.standard : standardOption"
                v-for="standardOption in standards"
                :key="standardOption.id"
              >
                {{ standardOption.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.question.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./question-update.component.ts"></script>
