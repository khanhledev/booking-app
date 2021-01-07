<template>
  <div v-if="!fetching" class="container my-12 mx-auto px-4 md:px-12">
    <h1 class="text-center font-bold text-5xl mb-8">Booking Meeting Room</h1>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div
        v-for="(listMeeting, index) in listMeetings"
        :key="index"
        class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
      >
        <article
          class="overflow-hidden rounded-lg shadow-md mb-8 transition hover:shadow-lg"
        >
          <div class="card-image bg-gray-200">
            <img
              alt="Placeholder"
              class="block h-auto w-full"
              :src="`https://picsum.photos/600/400/?random=${index}`"
            />
          </div>

          <header
            class="flex items-center justify-center leading-tight p-2 md:p-4"
          >
            <h1 class="text-lg text-black font-bold">
              {{
                index !== 0 ? index + 3 + 'th Floor' : index + 3 + 'rd Floor'
              }}
            </h1>
          </header>

          <div class="list p-x2 md:px-4">
            <div
              v-for="(item, itemIndex) in listMeeting.list"
              :key="item.id"
              class="list-item flex justify-between items-center mb-2 md:mb-4"
            >
              <div class="owner flex items-center">
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  :src="`https://picsum.photos/32/32/?random=${itemIndex}`"
                />
                <span class="font-medium ml-2">{{ item.user }}</span>
              </div>
              <div
                class="time text-white font-medium bg-gray-400 p-2 rounded-lg"
                >{{ item.time_start }} - {{ item.time_end }}</div
              >
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
    </div>
    <ModalCreate v-if="visible" :visible.sync="visible" :room-id="floor" />
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
  async created() {
    await fetch('https://62730c53787c9fa535c0418067b788c7.m.pipedream.net/')
      .then((response) => {
        response.json().then((data) => {
          this.listMeetings = data.data
          this.fetching = false
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
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
