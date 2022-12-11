<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="pagenApp.multipleChoice.home.createOrEditLabel"
          data-cy="MultipleChoiceCreateUpdateHeading"
          v-text="$t('pagenApp.multipleChoice.home.createOrEditLabel')"
        >
          Create or edit a MultipleChoice
        </h2>
        <div>
          <div class="form-group" v-if="multipleChoice.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="multipleChoice.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.multipleChoice.name')" for="multiple-choice-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="multiple-choice-name"
              data-cy="name"
              :class="{ valid: !$v.multipleChoice.name.$invalid, invalid: $v.multipleChoice.name.$invalid }"
              v-model="$v.multipleChoice.name.$model"
              required
            />
            <div v-if="$v.multipleChoice.name.$anyDirty && $v.multipleChoice.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.multipleChoice.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.multipleChoice.archived')" for="multiple-choice-archived"
              >Archived</label
            >
            <input
              type="checkbox"
              class="form-check"
              name="archived"
              id="multiple-choice-archived"
              data-cy="archived"
              :class="{ valid: !$v.multipleChoice.archived.$invalid, invalid: $v.multipleChoice.archived.$invalid }"
              v-model="$v.multipleChoice.archived.$model"
            />
          </div>
          <div class="form-group">
            <label v-text="$t('pagenApp.multipleChoice.option')" for="multiple-choice-option">Option</label>
            <select
              class="form-control"
              id="multiple-choice-options"
              data-cy="option"
              multiple
              name="option"
              v-if="multipleChoice.options !== undefined"
              v-model="multipleChoice.options"
            >
              <option
                v-bind:value="getSelected(multipleChoice.options, optionOption)"
                v-for="optionOption in options"
                :key="optionOption.id"
              >
                {{ optionOption.name }}
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
            :disabled="$v.multipleChoice.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./multiple-choice-update.component.ts"></script>
