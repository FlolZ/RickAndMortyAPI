/* eslint-disable angular/document-service */
// import { render, RenderResult } from '@testing-library/vue';
// import VueI18n from 'vue-i18n';
import CompositionApi from '@vue/composition-api';
import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

export function vueInit(): typeof Vue {
	Vue.use(Vuetify);
	Vue.use(CompositionApi);
	// Vue.use(VueI18n);
	const localVue = createLocalVue();
	localVue.use(Vuetify);
	return localVue;
	return Vue;
}

// export const renderWithVuetify = (
// 	component: Parameters<typeof render>[0],
// 	options?: Parameters<typeof render>[1],
// 	callback?: Parameters<typeof render>[2],
// ): RenderResult => {
// 	const root = document.createElement('div');
// 	root.setAttribute('data-app', 'true');

// 	return render(
// 		component,
// 		{
// 			container: document.body.appendChild(root),
// 			// for Vuetify components that use the $vuetify instance property
// 			vuetify: new Vuetify(),
// 			i18n: new VueI18n(),
// 			...options,
// 		},
// 		callback,
// 	);
// };