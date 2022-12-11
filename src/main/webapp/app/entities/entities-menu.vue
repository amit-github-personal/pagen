<template>
  <div>
    <b-dropdown-item to="/standard">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.standard')">Standard</span>
    </b-dropdown-item>
    <b-dropdown-item to="/question">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.question')">Question</span>
    </b-dropdown-item>
    <b-dropdown-item to="/multiple-choice">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.multipleChoice')">Multiple Choice</span>
    </b-dropdown-item>
    <b-dropdown-item to="/option">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.option')">Option</span>
    </b-dropdown-item>
    <b-dropdown-item to="/question-type">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.questionType')">Question Type</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
