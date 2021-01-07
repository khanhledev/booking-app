<template>
  <main
    class="antialiased bg-gray-200 bg-opacity-75 text-gray-900 font-sans overflow-x-hidden fixed top-0 left-0 w-full"
  >
    <div
      class="relative px-4 min-h-screen md:flex md:items-center md:justify-center"
    >
      <div
        class="modal-overlay w-full h-full absolute z-10 inset-0"
        @click="onClose"
      ></div>
      <div
        class="bg-white rounded-lg w-full md:max-w-screen-sm md:mx-auto p-8 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
      >
        <h2 class="text-center font-semibold text-2xl mb-6"
          >Finish booking meeting room -
          {{ roomId !== 0 ? roomId + 3 + 'th Floor' : roomId + 3 + 'rd Floor' }}
        </h2>
        <div class="md:flex items-center">
          <form class="contact-form w-full" autocomplete="off"
            ><div class="contact-form-group mb-6">
              <p class="font-semibold mb-2">Your name:</p>
              <input
                id="name"
                type="text"
                required
                class="py-2 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full border border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="contact-form-group mb-6">
              <p class="font-semibold mb-2">Meeting goal:</p>
              <input
                id="goal"
                type="text"
                required
                class="py-2 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full border border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="contact-form-group mb-6">
              <p class="font-semibold mb-2">Start time:</p>
              <div class="flex-shrink w-full inline-block relative">
                <select
                  class="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                >
                  <option>Please choose one...</option>
                  <option>English</option>
                  <option>France</option>
                  <option>Spanish</option>
                </select>
                <div
                  class="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="contact-form-group mb-6">
              <p class="font-semibold mb-2">End time:</p>
              <div class="flex-shrink w-full inline-block relative">
                <select
                  class="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                >
                  <option>Please choose one...</option>
                  <option>English</option>
                  <option>France</option>
                  <option>Spanish</option>
                </select>
                <div
                  class="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-blue-500 text-white rounded-lg font-bold text-sm md:ml-2 md:order-2"
            >Complete</button
          >
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
            @click="onClose"
            >Cancel</button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ModalCreate',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    roomId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', !this.visible)
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px) saturate(124%);
}
.modal-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(66, 66, 66, 0.08);
}
</style>
