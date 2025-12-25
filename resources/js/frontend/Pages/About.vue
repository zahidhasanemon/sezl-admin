<script setup>
import { Head } from '@inertiajs/vue3';

defineProps({
  content: String,
  seo: Object
});
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>
    <section class="section-padding">
      <div class="container">
        <!-- Contact Us -->
        <div class="space-y-6">
          <!-- Page Header -->
          <div class="text-center mb-8 lg:mb-12">
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-4 lg:mb-6">
              About Us
            </h1>
            <p class="text-sm sm:text-base lg:text-base max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Quick, honest highlights from women who shop VuexyAdmin.
            </p>
          </div>

          <div class="space-y-8 md:space-y-12 lg:space-y-16">
            <div class="ql-snow">
              <div class="ql-editor" v-html="content"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "quill/dist/quill.snow.css";

/* Only override padding for display */

/* Override padding for display */
.ql-snow .ql-editor {
  padding: 0;
}

/* Fix list bullets - match Quill's specificity */
.ql-snow .ql-editor ul > li::before {
  content: "\2022";
  margin-inline: -1em 0.3em;
}

.ql-snow .ql-editor ol > li::before {
  margin-inline: -1.5em 0.3em;
  text-align: end;
}

/* Ensure list items have proper structure */
.ql-snow .ql-editor li {
  padding-inline-start: 1.5em;
}

.ql-snow .ql-editor ul,
.ql-snow .ql-editor ol {
  padding-inline-start: 1.5em;
}
</style>
