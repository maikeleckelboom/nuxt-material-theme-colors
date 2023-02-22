<script lang="ts" setup>
import {useNuxtApp} from "#app";
import PrettyJson from "vue-json-pretty";
import 'vue-json-pretty/lib/styles.css';

const {$theme} = useNuxtApp();
</script>

<template>
  <div>
    <PrettyJson :data="$theme" />
  </div>
</template>
