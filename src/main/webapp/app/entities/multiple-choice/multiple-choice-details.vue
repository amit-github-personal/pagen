<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="multipleChoice">
        <h2 class="jh-entity-heading" data-cy="multipleChoiceDetailsHeading">
          <span v-text="$t('pagenApp.multipleChoice.detail.title')">MultipleChoice</span> {{ multipleChoice.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('pagenApp.multipleChoice.name')">Name</span>
          </dt>
          <dd>
            <span>{{ multipleChoice.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.multipleChoice.archived')">Archived</span>
          </dt>
          <dd>
            <span>{{ multipleChoice.archived }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.multipleChoice.option')">Option</span>
          </dt>
          <dd>
            <div v-if="multipleChoice.option">
              <router-link :to="{ name: 'OptionView', params: { optionId: multipleChoice.option.id } }">{{
                multipleChoice.option.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="multipleChoice.id"
          :to="{ name: 'MultipleChoiceEdit', params: { multipleChoiceId: multipleChoice.id } }"
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

<script lang="ts" src="./multiple-choice-details.component.ts"></script>
