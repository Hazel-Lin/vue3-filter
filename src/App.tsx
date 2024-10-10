import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <main class="font-sans p-x-4 p-y-10 text-center text-gray-700 dark:text-gray-200">
        <RouterView />
      </main>
    )
  },
})
