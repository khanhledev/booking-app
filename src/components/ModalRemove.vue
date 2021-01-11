<template>
  <div class="antialiased font-sans overflow-x-hidden fixed top-0 left-0 w-full">
    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div class="modal-overlay w-full h-full absolute z-10 inset-0" @click="onClose"></div>
      <div
        class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
      >
        <div class="md:flex items-center">
          <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p class="font-bold">Cancel your booking</p>
            <p class="text-sm text-gray-700 mt-1">Are you sure? </p>
          </div>
        </div>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            @click="onCancel()"
            >Cancel Booking</button
          >
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
            @click="onClose()"
            >Keep</button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalRemove',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', !this.visible)
    },
    onCancel() {
      this.isLoading = true
      const token = localStorage.getItem('booking-token')
      const payload = {
        token,
        id: this.id,
      }
      fetch('https://booking.congcu.org/api/delete.php', {
        method: 'post',
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const result = await response.json()
          if (result.success) {
            this.isLoading = false
            this.$emit('cancel-successfully')
            this.onClose()
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
</style>
