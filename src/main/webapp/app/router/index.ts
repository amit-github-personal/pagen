import Vue from 'vue';
import Component from 'vue-class-component';
import { Authority } from '@/shared/security/authority';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router, { RouteConfig } from 'vue-router';

const Home = () => import('@/core/home/home.vue');
const QuestionRenderer = () => import('@/shared/pages/question-paper-renderer.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';
import { ExportQuestionsModel } from '../shared/model/exportquestions.model';

Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/pdfRenderer',
      name: 'Question Paper',
      component: QuestionRenderer,
      meta: { authorities: [Authority.USER] },
      props: (route) => ({
        questionQuery: route.params.questionQuery,
        ...route.params
      })
    },
    ...account,
    ...admin,
    entities,
    ...pages
  ]
});

export default router;
