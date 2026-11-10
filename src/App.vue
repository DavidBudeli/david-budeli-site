<script setup lang="ts">
import Header from "./components/Header.vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useRouteObserver } from "./composables/useRouteObserver";
import Home from "./features/home/components/Home.vue";
import Project from "./features/projects/components/Project.vue";
import { useProjectTransition } from "./composables/useProjectTransition";
import { useScroll } from "./composables/useScroll";
import { projectVisible } from "./composables/useRouteObserver";
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useClickSound } from "./features/sounds/composables/useClickSounds";
import { useSeo } from "./composables/useSeo";
//import { useHoverSound } from "./features/sounds/composables/useHoverSounds";

const { isTransitioning } = useProjectTransition();

useTranslations();
useSeo();
usePreloader();
useMusic();
useHowler();
useScroll();
useRouteObserver();
useClickSound();
//useHoverSound();
const { isTouch } = useAgent();
</script>

<template>
  <a class="skip-link" :href="projectVisible ? '#project-main' : '#home-main'">Ir para o conteúdo / Skip to content</a>
  <Header />

  <!-- main page -->
  <main
    id="home-main"
    tabindex="-1"
    :aria-hidden="projectVisible"
    :inert="projectVisible"
    :class="{ 'home-wrapper-projectIsReady': projectVisible }"
  >
    <Home />
  </main>

  <!-- overlay page -->
  <ProjectBackground />
  <div
    class="project-wrapper"
    :class="{
      'project-wrapper-visible': projectVisible,
      'project-wrapper-transitioning': isTransitioning,
    }"
  >
    <main
      id="project-main"
      tabindex="-1"
      class="project-content"
      :aria-hidden="!projectVisible"
      :inert="!projectVisible"
    >
      <Project />
    </main>
  </div>

  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 1000;
  transform: translateY(-200%);
  padding: 12px 18px;
  background: #05090a;
  color: #36dcd0;
  border: 1px solid currentColor;
  &:focus {
    transform: none;
  }
}
.home-wrapper-projectIsReady {
  visibility: hidden;
  position: fixed;
  inset: 0;
}

.project-wrapper {
  position: fixed; /* <-- key */
  inset: 0;
  overflow: hidden; /* new page must NOT scroll during transition */
  z-index: var(--z-index-layout-project);
  visibility: hidden;
  pointer-events: none; /* avoid interaction before fully opened */

  &-visible {
    visibility: visible;
    pointer-events: auto;
    position: static;
  }
}

.project-content {
  width: 100%;
  height: 100%;
  overflow: hidden; /* ensure no scroll container */
}
</style>
