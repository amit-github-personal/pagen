<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="option">
        <h2 class="jh-entity-heading" data-cy="optionDetailsHeading">
          <span v-text="$t('pagenApp.option.detail.title')">Option</span> {{ option.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('pagenApp.option.name')">Name</span>
          </dt>
          <dd>
            <span>{{ option.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('pagenApp.option.archived')">Archived</span>
          </dt>
          <dd>
            <span>{{ option.archived }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="option.id" :to="{ name: 'OptionEdit', params: { optionId: option.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./option-details.component.ts"></script>
