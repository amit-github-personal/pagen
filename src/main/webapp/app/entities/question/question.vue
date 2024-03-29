<template>
  <div>
    <h2 id="page-heading" data-cy="QuestionHeading">
      <span v-text="$t('pagenApp.question.home.title')" id="question-heading">Questions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('pagenApp.question.home.refreshListLabel')">Refresh List</span>
        </button>

        <button class="btn btn-info mr-2" v-b-modal.export-block>
          <span>Export</span>
        </button>
        <router-link :to="{ name: 'QuestionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-question"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('pagenApp.question.home.createLabel')"> Create a new Question </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && questions && questions.length === 0">
      <span v-text="$t('pagenApp.question.home.notFound')">No questions found</span>
    </div>
    <div class="table-responsive" v-if="questions && questions.length > 0">
      <table class="table table-striped" aria-describedby="questions">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('pagenApp.question.name')">Name</span></th>
            <th scope="row"><span v-text="$t('pagenApp.question.archived')">Archived</span></th>
            <th scope="row"><span v-text="$t('pagenApp.question.questionType')">Question Type</span></th>
            <th scope="row"><span v-text="$t('pagenApp.question.standard')">Standard</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions" :key="question.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'QuestionView', params: { questionId: question.id } }">{{ question.id }}</router-link>
            </td>
            <td>{{ question.name }}</td>
            <td>{{ question.archived }}</td>
            <td>
              <div v-if="question.questionType">
                <router-link :to="{ name: 'QuestionTypeView', params: { questionTypeId: question.questionType.id } }">{{
                  question.questionType.type
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="question.standard">
                <router-link :to="{ name: 'StandardView', params: { standardId: question.standard.id } }">{{
                  question.standard.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'QuestionView', params: { questionId: question.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'QuestionEdit', params: { questionId: question.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(question)"
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
        ><span id="pagenApp.question.delete.question" data-cy="questionDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-question-heading" v-text="$t('pagenApp.question.delete.question', { id: removeId })">
          Are you sure you want to delete this Question?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-question"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeQuestion()"
        >
          Delete
        </button>
      </div>
    </b-modal>

    <div class="export-model">
      <b-modal id="export-block" title="Export Questions" hide-footer>
        <b-form @submit="exportQuestions" @reset="onExportQuestionReset">
            <b-form-group
              id="exportquestion-mcq"
              label="No Of Questions in MCQ"
              label-for="mcq-questions"
            >
              <b-form-input
                id="input-1"
                v-model="exportQuestionsModel.mcq"
                type="number"
                placeholder="Enter no of MCQ Questions"
                required>
              </b-form-input>
            </b-form-group>


            <b-form-group id="input-group-2" label="2 Marks Questions" label-for="2marks">
            <b-form-input
              id="2marks"
              v-model="exportQuestionsModel.twoMarks"
              type="number"
              placeholder="Enter number of 2 marks questions"
              required ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="4 Marks Questions" label-for="4marks">
            <b-form-input
              id="4marks"
              type="number"
              v-model="exportQuestionsModel.fourMarks"
              placeholder="Enter number of 4 marks questions"
              required ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="5 Marks Questions" label-for="5marks">
            <b-form-input
              id="5marks"
              type="number"
              v-model="exportQuestionsModel.fiveMarks"
              placeholder="Enter number of 5 marks questions"
              required ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./question.component.ts"></script>
