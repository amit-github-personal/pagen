<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="standard">
        <h2 class="jh-entity-heading" data-cy="standardDetailsHeading">
          <span v-text="$t('pagenApp.standard.detail.title')">Standard</span> {{ standard.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('pagenApp.standard.name')">Name</span>
          </dt>
          <dd>
            <span>{{ standard.name }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="standard.id" :to="{ name: 'StandardEdit', params: { standardId: standard.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./standard-details.component.ts"></script>
