<template>
  <div>
    <h2 id="page-heading" data-cy="MultipleChoiceHeading">
      <span v-text="$t('pagenApp.multipleChoice.home.title')" id="multiple-choice-heading">Multiple Choices</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('pagenApp.multipleChoice.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'MultipleChoiceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-multiple-choice"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('pagenApp.multipleChoice.home.createLabel')"> Create a new Multiple Choice </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && multipleChoices && multipleChoices.length === 0">
      <span v-text="$t('pagenApp.multipleChoice.home.notFound')">No multipleChoices found</span>
    </div>
    <div class="table-responsive" v-if="multipleChoices && multipleChoices.length > 0">
      <table class="table table-striped" aria-describedby="multipleChoices">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('pagenApp.multipleChoice.name')">Name</span></th>
            <th scope="row"><span v-text="$t('pagenApp.multipleChoice.archived')">Archived</span></th>
            <th scope="row"><span v-text="$t('pagenApp.multipleChoice.option')">Option</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="multipleChoice in multipleChoices" :key="multipleChoice.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MultipleChoiceView', params: { multipleChoiceId: multipleChoice.id } }">{{
                multipleChoice.id
              }}</router-link>
            </td>
            <td>{{ multipleChoice.name }}</td>
            <td>{{ multipleChoice.archived }}</td>
            <td>
              <span v-for="(option, i) in multipleChoice.options" :key="option.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'OptionView', params: { optionId: option.id } }">{{
                  option.name
                }}</router-link>
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'MultipleChoiceView', params: { multipleChoiceId: multipleChoice.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'MultipleChoiceEdit', params: { multipleChoiceId: multipleChoice.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(multipleChoice)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="pagenApp.multipleChoice.delete.question" data-cy="multipleChoiceDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-multipleChoice-heading" v-text="$t('pagenApp.multipleChoice.delete.question', { id: removeId })">
          Are you sure you want to delete this Multiple Choice?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-multipleChoice"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeMultipleChoice()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./multiple-choice.component.ts"></script>
