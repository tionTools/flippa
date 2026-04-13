<script setup lang="ts">
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/90e043e1959496cc5eca0cbd890c276a',
  app: {
    name: 'flippa',
    version: '1.0.0',
    environment: 'production'
  },

  instrumentations: [
    ...getWebInstrumentations(),

    new TracingInstrumentation(),
  ],
});

console.log(`\x1b[101mDear hackers, a small disappointment awaits you: this is only a demo project.
Most of the content here uses mock data, and database access is either temporary, read-only, or will be removed entirely after review.`)
</script>

<template>
  <RouterView />
</template>
