<script setup lang="ts">
import { computed } from "vue";
import { locale } from "../../../i18n/store";
import { siteContent } from "../../../seo/pages";

const english = computed(() => locale.value === "en");
const content = computed(() => siteContent[locale.value ?? "pt"]);
</script>

<template>
  <section class="discovery" aria-labelledby="discovery-heading">
    <details>
      <summary>
        <h2 id="discovery-heading">
          {{
            english
              ? "About David, technology and frequently asked questions"
              : "Sobre David, tecnologia e perguntas frequentes"
          }}
        </h2>
      </summary>
      <div class="discovery-content">
        <p>{{ content.intro }}</p>
        <p>
          {{ content.identity.fullName }} · {{ content.identity.role }} · {{ content.identity.company }} ·
          {{ content.identity.location }}
        </p>
        <h3>{{ english ? "Technologies used in this portfolio" : "Tecnologias utilizadas neste portfólio" }}</h3>
        <p>{{ content.technologies.join(", ") }}.</p>
        <h3>{{ english ? "Solutions" : "Soluções" }}</h3>
        <ul>
          <li v-for="service in content.services" :key="service">{{ service }}</li>
        </ul>
        <h3>{{ english ? "Frequently asked questions" : "Perguntas frequentes" }}</h3>
        <details v-for="faq in content.faq" :key="faq.question">
          <summary>{{ faq.question }}</summary>
          <p>{{ faq.answer }}</p>
        </details>
      </div>
    </details>
  </section>
</template>

<style scoped>
.discovery {
  width: 100%;
  padding: 32px var(--space-outer);
  background: #05090a;
  color: #f3fbfb;
}
.discovery > details {
  max-width: 880px;
  margin: 0 auto;
}
summary {
  cursor: pointer;
  padding: 12px 0;
}
h2 {
  display: inline;
  font-size: 16px;
  font-weight: 500;
}
h3 {
  font-size: 18px;
  margin: 24px 0 12px;
}
p,
li {
  line-height: 1.7;
  color: #a8bbbe;
}
.discovery-content {
  padding: 16px 0;
}
.discovery-content details {
  border-top: 1px solid #253438;
  padding: 8px 0;
}
ul {
  padding-left: 24px;
}
summary:focus-visible {
  outline: 2px solid #36dcd0;
  outline-offset: 4px;
}
</style>
