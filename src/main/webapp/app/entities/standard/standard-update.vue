<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="pagenApp.standard.home.createOrEditLabel"
          data-cy="StandardCreateUpdateHeading"
          v-text="$t('pagenApp.standard.home.createOrEditLabel')"
        >
          Create or edit a Standard
        </h2>
        <div>
          <div class="form-group" v-if="standard.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="standard.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.standard.name')" for="standard-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="standard-name"
              data-cy="name"
              :class="{ valid: !$v.standard.name.$invalid, invalid: $v.standard.name.$invalid }"
              v-model="$v.standard.name.$model"
              required
            />
            <div v-if="$v.standard.name.$anyDirty && $v.standard.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.standard.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.standard.question')" for="standard-question">Question</label>
            <select class="form-control" id="standard-question" data-cy="question" name="question" v-model="standard.question">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="standard.question && questionOption.id === standard.question.id ? standard.question : questionOption"
                v-for="questionOption in questions"
                :key="questionOption.id"
              >
                {{ questionOption.id }}
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
            :disabled="$v.standard.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./standard-update.component.ts"></script>
