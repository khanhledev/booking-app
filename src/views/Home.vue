<template>
  <div v-if="!fetching" class="container my-12 mx-auto px-4 body-font md:px-12">
    <h1 class="text-center font-bold text-5xl mb-8">OCG - Booking Meeting Room</h1>
    <p class="text-center font-medium text-xl mb-4">{{ getCurrentDay }}</p>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <template v-if="fetching">
        <div
          v-for="$cardIndex in 3"
          :key="$cardIndex"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <div class="overflow-hidden rounded-lg shadow-md mb-8 transition hover:shadow-lg">
            <div class="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center"></div>
            <h2
              class="bg-gray-300 animate-pulse w-1/4 mx-auto my-4 leading-tight p-2 md:p-4 rounded"
            ></h2>
            <div class="p-x2 md:px-4">
              <div v-for="index in 3" :key="index" class="list-item-loading mb-2 md:mb-4 border-b">
                <div class="flex justify-between items-center">
                  <p
                    class="leading-relaxed mb-3 w-8 h-8 rounded-full animate-pulse bg-gray-300"
                  ></p>
                  <p class="leading-relaxed mb-3 w-1/3 h-3 rounded animate-pulse bg-gray-300"></p>
                </div>
                <h1 class="w-2/3 mb-4 h-3 animate-pulse rounded bg-gray-300"></h1>
              </div>
              <button
                class="bg-blue-300 w-full h-8 animate-pulse mt-2 rounded-lg p-x2 md:px-4 md:mb-4"
              >
              </button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(listMeeting, index) in listMeetings"
          :key="index"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <article class="overflow-hidden rounded-lg shadow-md mb-8 transition hover:shadow-lg">
            <div class="card-image bg-gray-200">
              <img
                alt="Placeholder"
                class="block h-auto w-full"
                :src="`https://picsum.photos/600/400/?random=${index}`"
              />
            </div>

            <header class="flex items-center justify-center leading-tight p-2 md:p-4">
              <h1 class="text-lg text-black font-bold">
                {{ index !== 0 ? index + 3 + 'th Floor' : index + 3 + 'rd Floor' }}
              </h1>
            </header>

            <div class="list p-x2 md:px-4">
              <div v-if="listMeeting.list.length === 0" class="mx-auto max-width-empty-state">
                <img src="https://tailwindcomponents.com/svg/undraw_no_data_qbuo.svg" alt="" />
                <p class="text-center mt-4 font-medium">This room has not been booked yet</p>
              </div>
              <div
                v-for="(item, itemIndex) in listMeeting.list"
                :key="item.id"
                class="list-item mb-2 md:mb-4 border-b"
              >
                <div class="flex justify-between items-center">
                  <div class="owner flex items-center">
                    <img
                      alt="Placeholder"
                      class="block rounded-full"
                      :src="`https://picsum.photos/32/32/?random=${itemIndex}`"
                    />
                    <span class="font-medium ml-2">{{ item.user }}</span>
                  </div>
                  <div class="time text-white font-medium bg-gray-400 p-2 rounded-lg"
                    >{{ item.time_start }}:00 - {{ item.time_end }}:00
                  </div>
                </div>
                <p class="meeting-goal mt-2 mb-3">Meeting goal</p>
              </div>
            </div>

            <footer class="flex items-center leading-none p-2 md:p-4">
              <button
                class="bg-blue-500 text-white font-medium p-3 rounded-lg w-full"
                @click="onClick(index)"
                >Booking</button
              >
            </footer>
          </article>
        </div>
      </template>
    </div>
    <ModalCreate
      v-if="visible"
      :visible.sync="visible"
      :room-id="floor"
      @booking-successfully="fetch()"
    />
  </div>
</template>

<script>
import ModalCreate from '../components/ModalCreate'

export default {
  name: 'Home',
  components: {
    ModalCreate,
  },
  data() {
    return {
      visible: false,
      floor: 0,
      listMeetings: [],
      fetching: true,
    }
  },
  computed: {
    getCurrentDay() {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      const yyyy = today.getFullYear()

      if (dd < 10) {
        dd = `0${dd}`
      }

      if (mm < 10) {
        mm = `0${mm}`
      }

      today = `${dd}/${mm}/${yyyy}`
      return today
    },
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetching = true
      await fetch(
        'https://booking.congcu.org/api/room.php?type=list&token=2337620625.1636668251329.22f91c789195ea7707dc5afbc31245c060137303b6322eabd26a6c1dee0dae80'
      ).then((response) => {
        response.json().then((data) => {
          this.listMeetings = data.data
        })
      })
      this.fetching = false
    },
    onClick(value) {
      this.visible = true
      this.floor = value
    },
  },
}
</script>

<style scoped>
.card-image {
  min-height: 248px;
  max-height: 400px;
}

.max-width-empty-state {
  max-width: 20rem;
}
</style>
