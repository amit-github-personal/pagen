<template>
  <div>
    <h2 id="page-heading" data-cy="QuestionTypeHeading">
      <span v-text="$t('pagenApp.questionType.home.title')" id="question-type-heading">Question Types</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('pagenApp.questionType.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'QuestionTypeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-question-type"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('pagenApp.questionType.home.createLabel')"> Create a new Question Type </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && questionTypes && questionTypes.length === 0">
      <span v-text="$t('pagenApp.questionType.home.notFound')">No questionTypes found</span>
    </div>
    <div class="table-responsive" v-if="questionTypes && questionTypes.length > 0">
      <table class="table table-striped" aria-describedby="questionTypes">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('pagenApp.questionType.marks')">Marks</span></th>
            <th scope="row"><span v-text="$t('pagenApp.questionType.type')">Type</span></th>
            <th scope="row"><span v-text="$t('pagenApp.questionType.archived')">Archived</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="questionType in questionTypes" :key="questionType.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'QuestionTypeView', params: { questionTypeId: questionType.id } }">{{
                questionType.id
              }}</router-link>
            </td>
            <td>{{ questionType.marks }}</td>
            <td>{{ questionType.type }}</td>
            <td>{{ questionType.archived }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'QuestionTypeView', params: { questionTypeId: questionType.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'QuestionTypeEdit', params: { questionTypeId: questionType.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(questionType)"
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
        ><span id="pagenApp.questionType.delete.question" data-cy="questionTypeDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-questionType-heading" v-text="$t('pagenApp.questionType.delete.question', { id: removeId })">
          Are you sure you want to delete this Question Type?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-questionType"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeQuestionType()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./question-type.component.ts"></script>
