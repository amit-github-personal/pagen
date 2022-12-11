<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="pagenApp.questionType.home.createOrEditLabel"
          data-cy="QuestionTypeCreateUpdateHeading"
          v-text="$t('pagenApp.questionType.home.createOrEditLabel')"
        >
          Create or edit a QuestionType
        </h2>
        <div>
          <div class="form-group" v-if="questionType.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="questionType.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.questionType.marks')" for="question-type-marks">Marks</label>
            <input
              type="number"
              class="form-control"
              name="marks"
              id="question-type-marks"
              data-cy="marks"
              :class="{ valid: !$v.questionType.marks.$invalid, invalid: $v.questionType.marks.$invalid }"
              v-model.number="$v.questionType.marks.$model"
              required
            />
            <div v-if="$v.questionType.marks.$anyDirty && $v.questionType.marks.$invalid">
              <small class="form-text text-danger" v-if="!$v.questionType.marks.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.questionType.marks.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.questionType.type')" for="question-type-type">Type</label>
            <input
              type="text"
              class="form-control"
              name="type"
              id="question-type-type"
              data-cy="type"
              :class="{ valid: !$v.questionType.type.$invalid, invalid: $v.questionType.type.$invalid }"
              v-model="$v.questionType.type.$model"
              required
            />
            <div v-if="$v.questionType.type.$anyDirty && $v.questionType.type.$invalid">
              <small class="form-text text-danger" v-if="!$v.questionType.type.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.questionType.archived')" for="question-type-archived">Archived</label>
            <input
              type="checkbox"
              class="form-check"
              name="archived"
              id="question-type-archived"
              data-cy="archived"
              :class="{ valid: !$v.questionType.archived.$invalid, invalid: $v.questionType.archived.$invalid }"
              v-model="$v.questionType.archived.$model"
            />
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
            :disabled="$v.questionType.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./question-type-update.component.ts"></script>
