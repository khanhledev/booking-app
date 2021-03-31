<template>
  <main
    class="antialiased bg-gray-200 bg-opacity-75 text-gray-900 font-sans overflow-x-hidden fixed top-0 left-0 w-full"
  >
    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div class="modal-overlay w-full h-full absolute z-10 inset-0" @click="onClose"></div>
      <div
        class="bg-white rounded-lg w-full md:max-w-screen-sm md:mx-auto p-8 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
      >
        <h2 class="text-center font-semibold text-2xl mb-6"
          >Booking meeting room -
          {{ roomId !== 0 ? roomId + 2 + 'th Floor' : roomId + 2 + 'rd Floor' }}
        </h2>
        <div class="md:flex items-center">
          <form class="contact-form w-full" autocomplete="off" @submit.prevent="onSubmit">
            <div class="contact-form-group mb-6 relative">
              <p class="font-semibold mb-2">Meeting goal:</p>
              <input
                id="goal"
                v-model="form.goal"
                type="text"
                required
                class="py-2 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full border border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-600"
                @focus="visibleSuggestion = true"
              />
              <div
                v-show="visibleSuggestion"
                class="suggestion absolute border border-gray-200 rounded-lg mt-2 py-2 text-gray-900 bg-white shadow-xl w-full inset-x-0 z-10"
              >
                <span
                  v-for="suggest in suggestions"
                  :key="suggest"
                  class="hover:bg-blue-400 hover:text-white transition-all z-10 text-left block px-4 py-1"
                  @click="onSelectSuggest(suggest)"
                  >{{ suggest }}</span
                >
              </div>
            </div>
            <div class="contact-form-group mb-6">
              <p class="font-semibold mb-2">Start time:</p>
              <div class="flex-shrink w-full inline-block relative">
                <select
                  v-model="form.start"
                  class="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                >
                  <option>Please choose one...</option>
                  <option v-for="(time, index) in timeItems" :key="index" :value="time.value">{{
                    time.label
                  }}</option>
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
                  v-model="form.end"
                  class="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                >
                  <option>Please choose one...</option>
                  <option v-for="(time, index) in timeItems" :key="index" :value="time.value">{{
                    time.label
                  }}</option>
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
        <p class="text-red-500">{{ errorMessage }}</p>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            class="flex justify-center px-4 w-24 h-10 md:py-2 bg-blue-500 text-white rounded-lg font-bold text-sm md:ml-2 md:order-2 focus:outline-none"
            @click.prevent="onSubmit"
          >
            <Spinner v-show="isLoading" />
            <span v-show="!isLoading">Complete</span>
          </button>
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
import Spinner from '@/components/Spinner'
import { listTime } from '@/utils'

export default {
  name: 'ModalCreate',
  components: {
    Spinner,
  },
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
  data() {
    return {
      isLoading: false,
      start: '08:00',
      end: '19:30',
      step: '00:30',
      visibleSuggestion: false,
      suggestions: [
        'Grooming meeting',
        'Planing meeting',
        'OKR meeting',
        'Interview',
        '1 on 1',
        'Other',
      ],
      form: {
        token: '',
        room_id: this.roomId || 0,
        start: '',
        end: '',
        goal: '',
      },
      errorMessage: '',
      timeItems: [],
    }
  },
  created() {
    this.timeItems = listTime('08:00', '19:30', '00:30', 16)
  },
  methods: {
    onClose() {
      this.$emit('update:visible', !this.visible)
    },
    onSelectSuggest(value) {
      this.form.goal = value
      this.visibleSuggestion = false
    },
    onSubmit() {
      this.isLoading = true
      this.form.token = localStorage.getItem('booking-token')
      fetch('https://booking.congcu.org/api/booking.php', {
        method: 'post',
        body: JSON.stringify(this.form),
      })
        .then(async (response) => {
          const result = await response.json()
          if (result.success) {
            this.isLoading = false
            this.$emit('booking-successfully')
            this.onClose()
          } else {
            this.isLoading = false
            this.errorMessage = result.message
          }
        })
        .catch((error) => {
          this.isLoading = false
          throw error
        })
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

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
