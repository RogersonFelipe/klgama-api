import { createPinia } from 'pinia'

export default function bootPinia({ app }) {
  app.use(createPinia())
}
