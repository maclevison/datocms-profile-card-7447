<template>
  <div v-if="data">  
    <div
      :class="[
        'content flex flex-col p-12 h-screen content-center justify-center font-sans antialiased leading-normal relative',
        nightMode ? 'text-primary-white bg-primary-black' : 'text-primary-black bg-primary-white',
      ]"
    >
      <h1 class="text-sm font-mono">/ {{ data.profile.name }}</h1>

      <div class="description py-20 font-sans w-6/12 leading-none z-10">
        {{ data.profile.description }}
      </div>

      <div class="flex flex-wrap items-center justify-start">
        <a
          v-for="profile in data.socials"
          class="link text-sm pr-4 font-mono"
          :href="profile.url"
          :key="profile.social"
          target="_blank"
          rel="noreferrer"
        >
        / {{ profile.social }}
        </a>
      </div>

      <div class="circle absolute rounded-full w-40 h-40 bg-primary-purple z-0"></div>

      <!-- Pin to top right corner -->
      <div class="absolute top-0 right-0 h-12 w-18 p-4">
        <button class="js-change-theme focus:outline-none text-xs font-mono"
          @click="toggleDayNight"
        >
          {{ nightMode ? "light" : "dark" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "./lib/datocms";
import { toHead } from "vue-datocms";

export default {
  name: "App",
  data() {
    return {
      nightMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      data: null
    };
  },
  methods: {
    toggleDayNight() {
      this.nightMode = !this.nightMode;
    }
  },
  metaInfo() {
    if (!this || !this.data) {
      return;
    }
    return toHead(this.data.profile.seo, this.data.site.favicon);
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          site: _site {
            favicon: faviconMetaTags {
              ...metaTagsFragment
            }
          }
          profile {
            seo: _seoMetaTags {
              ...metaTagsFragment
            }
            name
            description
          }
          socials: allSocials {
            social
            url
          }
        }
        fragment metaTagsFragment on Tag {
          attributes
          content
          tag
        }
      `
    });
  }
};
</script>

<style>
.circle {
  right: 3.5rem;
}
.description {
  font-size: clamp(4.9rem, 10vw, 9rem);
}
</style>
