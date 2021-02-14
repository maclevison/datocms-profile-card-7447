import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBriefcase, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";
import { DatocmsImagePlugin } from "vue-datocms";
import VueMeta from "vue-meta";

import App from "./App.vue";

import "./assets/tailwind.css";

library.add(faBriefcase);
library.add(faTwitter);
library.add(faGithub);
library.add(faDribbble);
library.add(faInstagram);
library.add(faLinkedin);
library.add(faYoutube);
library.add(faGlobe);
library.add(faFacebook);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
