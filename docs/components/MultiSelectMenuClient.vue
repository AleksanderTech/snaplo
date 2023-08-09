<template>
  <MultiSelectMenu
    :classes="{}"
    :header-mode="HeaderMode.CHIP"
    :selected="['One']"
    :items="['One', 'Two', 'Three', 'Four', 'Five']"
  >
  </MultiSelectMenu>
</template>

<script setup lang="ts">
import MultiSelectMenu, { HeaderMode } from "./MultiSelectMenu.vue";
</script>
