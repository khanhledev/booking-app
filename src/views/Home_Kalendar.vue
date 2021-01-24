<!--<template>-->
<!--  <div class="container">-->
<!--    <div> Header here</div>-->
<!--    <div> Sidebar here</div>-->
<!--    <div style="width: 70%">-->
<!--      <Kalendar :configuration="calendar_settings" :events.sync="events" />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { listTime } from '@/utils'-->
<!--import Vue from 'vue'-->
<!--import PortalVue from 'portal-vue'-->
<!--Vue.use(PortalVue)-->
<!--import { Kalendar } from 'kalendar-vue'-->

<!--export default {-->
<!--  name: 'Home',-->
<!--  components: {-->
<!--    Kalendar,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      calendar_settings: {-->
<!--        style: 'material_design',-->
<!--        view_type: 'week',-->
<!--        cell_height: 50,-->
<!--        scrollToNow: true,-->
<!--        start_day: new Date().toISOString(),-->
<!--        read_only: false,-->
<!--        day_starts_at: 0,-->
<!--        day_ends_at: 24,-->
<!--        overlap: true,-->
<!--        // hide_dates: ['2019-10-31'], // Spooky-->
<!--        // hide_days: [6],-->
<!--        past_event_creation: true,-->
<!--      },-->
<!--      events: [-->
<!--        {-->
<!--          from: '2020-03-18T18:00:00Z',-->
<!--          to: '2020-03-18T19:00:00Z',-->
<!--          data: 'Event 1',-->
<!--        },-->
<!--        {-->
<!--          from: '2020-03-18T19:00:00Z',-->
<!--          to: '2020-03-18T21:00:00Z',-->
<!--          data: 'Olive & Friends',-->
<!--        },-->
<!--      ],-->
<!--      message: '',-->
<!--      form: {-->
<!--        start: 0,-->
<!--        end: 0,-->
<!--        date: '',-->
<!--        room_id: 0,-->
<!--        goal: '',-->
<!--      },-->
<!--      availableRooms: [-->
<!--        {-->
<!--          name: 'Chọn ngày, giờ sẽ hiện phòng phù hợp',-->
<!--        },-->
<!--      ],-->
<!--      rooms: [],-->
<!--      bookings: [],-->
<!--      weeknames: [],-->
<!--      timeList: [-->
<!--        {-->
<!--          value: 16,-->
<!--          label: '08:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 17,-->
<!--          label: '08:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 18,-->
<!--          label: '09:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 19,-->
<!--          label: '09:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 20,-->
<!--          label: '10:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 21,-->
<!--          label: '10:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 22,-->
<!--          label: '11:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 23,-->
<!--          label: '11:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 24,-->
<!--          label: '12:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 25,-->
<!--          label: '12:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 26,-->
<!--          label: '13:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 27,-->
<!--          label: '13:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 28,-->
<!--          label: '14:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 29,-->
<!--          label: '14:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 30,-->
<!--          label: '15:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 31,-->
<!--          label: '15:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 32,-->
<!--          label: '16:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 33,-->
<!--          label: '16:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 34,-->
<!--          label: '17:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 35,-->
<!--          label: '17:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 36,-->
<!--          label: '18:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 37,-->
<!--          label: '18:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 38,-->
<!--          label: '19:00',-->
<!--          disabled: false,-->
<!--        },-->
<!--        {-->
<!--          value: 39,-->
<!--          label: '19:30',-->
<!--          disabled: false,-->
<!--        },-->
<!--      ],-->
<!--      bookedSlots: [],-->
<!--      slots: [],-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    getCurrentDay() {-->
<!--      let today = new Date()-->
<!--      let dd = today.getDate()-->
<!--      let mm = today.getMonth() + 1-->
<!--      const yyyy = today.getFullYear()-->

<!--      if (dd < 10) {-->
<!--        dd = `0${dd}`-->
<!--      }-->

<!--      if (mm < 10) {-->
<!--        mm = `0${mm}`-->
<!--      }-->

<!--      today = `${dd}/${mm}/${yyyy}`-->
<!--      return today-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.time = listTime('00:00', '23:30', '00:30', 0)-->
<!--    this.fetch()-->
<!--  },-->
<!--  beforeCreate() {-->
<!--    let token = localStorage.getItem('booking-token')-->

<!--    if (!token) {-->
<!--      this.$router.push({ path: '/' })-->
<!--      return-->
<!--    }-->

<!--    localStorage.setItem('booking-token', token)-->
<!--  },-->
<!--  methods: {-->
<!--    async fetch() {-->
<!--      this.fetching = true-->
<!--      const token = localStorage.getItem('booking-token')-->
<!--      await fetch(`https://booking.congcu.org/api/room.php?type=list2&token=${token}`).then(-->
<!--        (response) => {-->
<!--          response.json().then((data) => {-->
<!--            if (!data || !data.data) {-->
<!--              return-->
<!--            }-->
<!--            this.bookings = data.data.bookings-->
<!--            this.rooms = data.data.rooms-->
<!--            this.weeknames = data.data.weeknames-->
<!--          })-->
<!--        }-->
<!--      )-->
<!--      this.fetching = false-->
<!--    },-->
<!--    getTime(value) {-->
<!--      const time = this.time.find((item) => item.value === Number(value))-->

<!--      if (!time) {-->
<!--        return-->
<!--      }-->

<!--      return time.label-->
<!--    },-->
<!--    bookRoom() {-->
<!--      // console.log(this.form)-->
<!--      // start: 0,-->
<!--      //     end: 0,-->
<!--      //     date: '',-->
<!--      //     room_id: 0,-->
<!--      //     goal: '',-->

<!--      if (this.form.start <= 0) {-->
<!--        this.message = 'Chọn giờ bắt đầu đi'-->
<!--        return-->
<!--      }-->

<!--      if (this.form.end <= 0) {-->
<!--        this.message = 'Chọn giờ kết thúc đi'-->
<!--        return-->
<!--      }-->

<!--      if (this.form.goal.length === 0) {-->
<!--        this.message = 'Nhập vào mục đích đi'-->
<!--        return-->
<!--      }-->

<!--      if (this.form.room_id === 0) {-->
<!--        this.message = 'Chọn phòng đi'-->
<!--        return-->
<!--      }-->

<!--      this.form.token = localStorage.getItem('booking-token')-->
<!--      fetch('https://booking.congcu.org/api/booking.php', {-->
<!--        method: 'post',-->
<!--        body: JSON.stringify(this.form),-->
<!--      })-->
<!--        .then(async (response) => {-->
<!--          const result = await response.json()-->
<!--          if (result.success) {-->
<!--            this.fetch()-->
<!--          } else {-->
<!--            alert('Book error')-->
<!--            // console.log(response)-->
<!--          }-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          this.isLoading = false-->
<!--          throw error-->
<!--        })-->

<!--      this.resetForm()-->
<!--      // eslint-disable-next-line no-undef-->
<!--      $(function() {-->
<!--        // eslint-disable-next-line no-undef-->
<!--        $('#myModal').modal('toggle')-->
<!--      })-->
<!--    },-->
<!--    getAvailableRooms() {-->
<!--      if (this.form.start === 0 || this.form.end === 0) {-->
<!--        // console.log('Chọn time_start, time_end trước rồi mới tính được')-->
<!--        return-->
<!--      }-->

<!--      if (this.slots.length === 0) {-->
<!--        // console.log('Slot length empty')-->
<!--        return-->
<!--      }-->

<!--      // console.log(JSON.stringify(this.slots))-->
<!--      const avail = []-->
<!--      this.form.room_id = 0-->

<!--      for (let i = 0; i < this.rooms.length; i++) {-->
<!--        const room = this.rooms[i]-->
<!--        const roomId = room.id-->
<!--        const roomSlots = this.slots[roomId]-->

<!--        let isOk = true-->
<!--        // console.log('Room: ', room.name, 'Slot now: ', roomSlots)-->
<!--        for (let j = this.form.start; j < this.form.end; j++) {-->
<!--          // console.log('Slot item: ', roomSlots[j])-->
<!--          if (roomSlots[j] === false) {-->
<!--            isOk = false-->
<!--            break-->
<!--          }-->
<!--        }-->

<!--        if (isOk) {-->
<!--          avail.push(room)-->
<!--        }-->
<!--      }-->

<!--      this.availableRooms = avail-->
<!--    },-->
<!--    async getBookingByDate() {-->
<!--      const token = localStorage.getItem('booking-token')-->
<!--      await fetch(-->
<!--        `https://booking.congcu.org/api/room.php?type=get_by_date&date=${this.form.date}&token=${token}`-->
<!--      ).then((response) => {-->
<!--        response.json().then((data) => {-->
<!--          this.bookedSlots = data.data-->

<!--          // Make slots-->
<!--          let slot = {}-->
<!--          for (let i = 0; i < this.rooms.length; i++) {-->
<!--            const init = {}-->
<!--            for (let j = 0; j <= 48; j++) {-->
<!--              init[j] = true-->
<!--            }-->

<!--            slot[this.rooms[i].id] = init-->
<!--          }-->

<!--          // Calc conflicts-->
<!--          for (let i = 0; i < this.bookedSlots.length; i++) {-->
<!--            const item = this.bookedSlots[i]-->
<!--            const roomId = item.room_id-->

<!--            // console.log('Mark room: ', roomId, 'from: ', item.start, 'to: ', item.end)-->
<!--            for (let j = item.start; j <= item.end; j++) {-->
<!--              slot[roomId][j] = false-->
<!--            }-->
<!--          }-->

<!--          this.slots = slot-->
<!--          // console.log(JSON.stringify(slot))-->
<!--          this.getAvailableRooms()-->
<!--        })-->
<!--      })-->
<!--      this.fetching = false-->
<!--    },-->
<!--    resetForm() {-->
<!--      this.form = {-->
<!--        start: 0,-->
<!--        end: 0,-->
<!--        date: '',-->
<!--        room_id: 0,-->
<!--        goal: '',-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
