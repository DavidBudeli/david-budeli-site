<script setup>
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">David<br />Budeli</h1>
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
        </div>
        <div class="hero-profile" v-if="!preloaderVisible">
          <img src="/david-budeli-profile-2026.webp" alt="David Budeli" class="hero-profile-image" />
          <div class="hero-profile-copy">
            <strong>David Budeli</strong>
            <span>{{ t("location-value") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 46%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-lg);

    @include mixins.landscape {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-xl);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xxl);
      }
    }
  }

  &-banner {
    position: absolute;
    bottom: 0;
    right: -16px;
    z-index: 10;
    transform: rotate(-5deg) translate(0, 65%);

    @include mixins.mq("sm") {
      right: -24px;
      transform: rotate(-5deg) translate(0, 70%);
    }

    @include mixins.mq("lg") {
      right: -32px;
      transform: rotate(-5deg) translate(0, 80%);
    }
  }

  &-profile {
    position: absolute;
    left: 50%;
    bottom: -118px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 7px 12px 7px 7px;
    border: 1px solid rgba(54, 220, 208, 0.3);
    border-radius: 999px;
    background: rgba(3, 12, 15, 0.82);
    backdrop-filter: blur(12px);
    color: var(--color-white-400);
    animation: profile-in 0.55s var(--ease-smooth) both;

    @include mixins.landscape {
      left: auto;
      right: -180px;
      bottom: 2px;
      transform: none;
    }

    &-image {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      object-position: 50% 28%;
    }

    &-copy {
      display: flex;
      flex-direction: column;
      min-width: 92px;
      font-size: var(--font-size-sm);
      line-height: 1.2;

      span {
        color: var(--color-text-cyan-300);
        font-size: var(--font-size-xs);
      }
    }
  }

  @keyframes profile-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
</style>
