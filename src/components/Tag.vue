<script setup lang="ts">
import { computed } from "vue";
import { tagLabels, type TagVariant } from "./tagVariants";

const props = defineProps<{
  variant: TagVariant;
}>();

const classes = computed(() => ["tag", `tag-variant-${props.variant}`]);
</script>

<template>
  <div :class="classes">
    <p class="tag-copy">{{ tagLabels[props.variant] }}</p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: var(--radius-md);
  padding: calc(var(--space-xxs) - var(--stroke-md)) calc(var(--space-sm  ) - var(--stroke-md));
  border: var(--stroke-md) solid transparent;

  &-copy {
    font-size: var(--font-size-xs);
    font-weight: 700;
  }

  &-variant {
    &-next {
      background-color: white;
      color: black;
    }

    &-product { background-color: #36dcd0; color: #021211; }
    &-ai { background-color: #8b5cf6; color: white; }
    &-automation { background-color: #0ea5e9; color: #00151f; }
    &-payments { background-color: #34d399; color: #022c22; }
    &-analytics { background-color: #22d3ee; color: #083344; }
    &-design { background-color: #f472b6; color: #500724; }
    &-conversion { background-color: #fbbf24; color: #422006; }
    &-seo { background-color: #fb7185; color: #4c0519; }
    &-performance { background-color: #bef264; color: #1a2e05; }
  }
}
</style>
