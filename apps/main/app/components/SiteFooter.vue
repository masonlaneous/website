<template>
  <footer class="footer">
    <p class="copyright">© masonscape.com</p>
    <div class="footer-links">
      <NuxtLink href="/privacy" class="footer-link">
        <p>Privacy</p>
      </NuxtLink>
      <NuxtLink href="/contact" class="footer-link">
        <p>Contact</p>
      </NuxtLink>
    </div>
    <div class="button-list">
      <ThemeSwitcher class="button"/>
      <LinkButton class="button" icon="grommet-icons:github" href="https://github.com/masonscape/website" target="_blank"/>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  background-color: color-mix(in srgb, var(--color-primary-90) 50%, transparent 50%);
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
  align-items: center;

  /* border-top: 1px var(--color-primary-70) solid; */

  color: color-mix(in srgb, var(--color-secondary) 70%, var(--color-primary));
}


.copyright {
  white-space: nowrap;
  font-size: min(8vw, 1em);
  margin-left: 2em;
}

.footer-links {
  position: absolute;
  display: flex;
  flex-direction: row;
  font-size: min(8vw, 1em);
  left: 50%;
  transform: translate(-50%);
}

.footer-link {
  --footer-link-gap: min(5vw, 1em);
  text-decoration: none;
  padding-left: var(--footer-link-gap);
  padding-right: var(--footer-link-gap);
  color: inherit;
}

.button-list {
  margin-left: auto;
  display: flex;
}

.button {
  width: min(var(--button-size), 16vw);
  height: min(var(--button-size), 16vw);
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
  }

  .copyright {
    margin-left: 0
  }

  .footer-links {
    position: static;
    margin: auto;
    transform: none;
    left: 0;
  }

  .button-list {
    margin-left: 0;
  }
}
</style>