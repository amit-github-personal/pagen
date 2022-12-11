<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="pagenApp.option.home.createOrEditLabel"
          data-cy="OptionCreateUpdateHeading"
          v-text="$t('pagenApp.option.home.createOrEditLabel')"
        >
          Create or edit a Option
        </h2>
        <div>
          <div class="form-group" v-if="option.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="option.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.option.name')" for="option-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="option-name"
              data-cy="name"
              :class="{ valid: !$v.option.name.$invalid, invalid: $v.option.name.$invalid }"
              v-model="$v.option.name.$model"
              required
            />
            <div v-if="$v.option.name.$anyDirty && $v.option.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.option.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('pagenApp.option.archived')" for="option-archived">Archived</label>
            <input
              type="checkbox"
              class="form-check"
              name="archived"
              id="option-archived"
              data-cy="archived"
              :class="{ valid: !$v.option.archived.$invalid, invalid: $v.option.archived.$invalid }"
              v-model="$v.option.archived.$model"
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
            :disabled="$v.option.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./option-update.component.ts"></script>
