<template>
  <div class="container">
    <!--Start nav-->
    <div class="row">
      <div class="header">
        <p class="text-right" style="margin-top: 10px"
          >Xin chào, <strong>{{ currentUser.name }}</strong>
          <img width="25px" :src="currentUser.avatar" />
        </p>
        <p class="text-right" style="margin-top: -15px; margin-right: 30px" @click="logOut"
          >(<a href>Đăng xuất</a>)
        </p>
      </div>
    </div>
    <div class="row text-center" style="margin-top: 20px">
      <h1>
        Hệ thống đặt phòng họp
        <img src="../assets/logo.png" style="width: 5%" alt="OCG-logo" />
      </h1>
    </div>
    <!--End nav-->

    <!--Start body-->
    <div class="row" style="margin-top: 10px">
      <div class="panel panel-primary panel-transparent" style="overflow-x: scroll;">
        <div class="panel-heading panel-transparent">
          <i class="glyphicon glyphicon-home"> </i>
          <span class="mp-menu-text"> Đặt phòng theo cách của bạn</span>
        </div>
        <div class="panel-body panel-transparent">
          <div class="col-md-12 text-center">
            <button
              style="margin-bottom: 5px; margin-right: 5px"
              type="button"
              class="btn btn-success"
              @click="showModal('create')"
            >
              Đặt ngay
            </button>

            <button
              style="margin-bottom: 5px"
              type="button"
              class="btn btn-default"
              @click="backToToday"
            >
              Hôm nay
            </button>
          </div>

          <div class="col-md-12 text-center">
            <button
              style="margin-bottom: 5px; margin-right: 5px"
              type="button"
              class="btn btn-primary"
              @click="changeWeek('previous')"
            >
              «
            </button>
            <span
              >{{ getFormattedDate(currentWeek.start) }} ->
              {{ getFormattedDate(currentWeek.end) }}</span
            >
            <button
              style="margin-bottom: 5px; margin-left: 5px"
              type="button"
              class="btn btn-primary"
              @click="changeWeek('next')"
            >
              »
            </button>
          </div>
          <table
            class="table table-bordered"
            style="/* table-layout: fixed; *//* overflow: hidden; *//* overflow-x: auto; */"
          >
            <thead>
              <tr>
                <th v-for="item in weeknames" :key="item.date" scope="col">
                  <p>{{ item.name }}</p>
                  <p class="text-success">({{ item.date }})</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="bookItem in bookings" :key="bookItem.week_name">
                  <div
                    v-for="itemItem in bookItem.list"
                    :key="itemItem.booking_id"
                    class="btn btn-primary"
                    style="display: block; margin: 2px"
                    @click="showModal('update', itemItem)"
                  >
                    <p class="label label-danger">{{ itemItem.room_name }}</p>
                    <p class="label label-success">{{ itemItem.username }}</p>
                    <p
                      style="max-width: 180px; text-overflow: ellipsis;white-space: normal; margin: 0 auto;"
                    >
                      {{ itemItem.goal }}
                    </p>
                    <p>
                      {{ getTime(itemItem.start) }} -
                      {{ getTime(itemItem.end) }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--End body-->

    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 id="myModalLabel" class="modal-title">{{ modalTitle }}</h4>
          </div>
          <div class="modal-body">
            <h3 v-if="message.length > 0" class="text-danger text-center" style="margin: 2%">
              {{ message }}
            </h3>
            <form class="form-horizontal" @submit.prevent>
              <div class="form-group">
                <label for="book_date" class="col-sm-3 control-label"
                  >Chọn ngày
                  <span v-if="form.action !== 'update'" class="text-danger">(*)</span></label
                >
                <div class="col-sm-9">
                  <input
                    id="book_date"
                    v-model="form.date"
                    type="date"
                    class="form-control"
                    placeholder="Chọn ngày"
                    :disabled="form.action === 'update'"
                    @change="getBookingByDate"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label"
                  >Giờ bắt đầu
                  <span v-if="form.action !== 'update'" class="text-danger">(*)</span></label
                >
                <div class="col-sm-9">
                  <select
                    id="book_start"
                    v-model="form.start"
                    class="form-control"
                    :disabled="form.action === 'update'"
                    @change="getAvailableRooms"
                  >
                    <option v-for="(time, index) in timeList" :key="index" :value="time.value"
                      >{{ time.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="book_end" class="col-sm-3 control-label"
                  >Giờ kết thúc
                  <span v-if="form.action !== 'update'" class="text-danger">(*)</span></label
                >
                <div class="col-sm-9">
                  <select
                    id="book_end"
                    v-model="form.end"
                    class="form-control"
                    :disabled="form.action === 'update'"
                    @change="getAvailableRooms"
                  >
                    <option v-for="(time, index) in timeListEnd" :key="index" :value="time.value"
                      >{{ time.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label"
                  >Chọn phòng
                  <span v-if="form.action !== 'update'" class="text-danger">(*)</span></label
                >
                <div class="col-sm-9">
                  <button
                    v-for="(item, index) in availableRooms"
                    :key="index"
                    type="submit"
                    style="margin: 0 2px;"
                    :disabled="item.disabled || form.action === 'update'"
                    :class="{
                      'btn btn-success': form.room_id === item.id,
                      'btn btn-default': form.room_id !== item.id,
                    }"
                    @click="form.room_id = item.id"
                  >
                    {{ item.name }}
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label"
                  >Mục đích<span class="text-danger">(*)</span></label
                >
                <div class="col-sm-9">
                  <textarea v-model="form.goal" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              v-if="
                (currentUser.id == currentItem.user_id || currentUser.role == 1) &&
                  form.action === 'update'
              "
              type="button"
              class="btn btn-danger"
              @click="deleteBooking"
              >Hủy lịch
            </button>
            <button
              v-if="
                (currentUser.id == currentItem.user_id || currentUser.role == 1) &&
                  form.action === 'update'
              "
              type="button"
              class="btn btn-success"
              @click="updateBooking"
              >Cập nhật
            </button>
            <button
              v-if="form.action === 'create'"
              type="button"
              class="btn btn-primary"
              @click="bookRoom"
            >
              Đặt phòng
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="modalBookingInfo"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="booking info"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Thông tin book phòng</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal" @submit.prevent>
              <div class="form-group">
                <label for="book_date" class="col-sm-3 control-label">Người đặt</label>
                <div class="col-sm-9">
                  <input v-model="currentItem.username" class="form-control" disabled />
                </div>
              </div>
              <div class="form-group">
                <label for="book_date" class="col-sm-3 control-label">Ngày</label>
                <div class="col-sm-9">
                  <input v-model="currentItem.date" class="form-control" disabled />
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label">Giờ bắt đầu</label>
                <div class="col-sm-9">
                  <input v-model="start" class="form-control" disabled />
                </div>
              </div>
              <div class="form-group">
                <label for="book_end" class="col-sm-3 control-label">Giờ kết thúc</label>
                <div class="col-sm-9">
                  <input v-model="end" class="form-control" disabled />
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label">Phòng</label>
                <div class="col-sm-9">
                  <input v-model="currentItem.room_name" class="form-control" disabled />
                </div>
              </div>
              <div class="form-group">
                <label for="book_start" class="col-sm-3 control-label">Mục đích</label>
                <div class="col-sm-9">
                  <textarea
                    v-model="currentItem.goal"
                    disabled
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Start footer-->
    <div class="row"></div>
    <!--End footer-->
  </div>
</template>

<script>
import { listTime } from '@/utils'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      currentItem: {
        start: 0,
        end: 0,
      },
      currentWeek: {
        start: new Date(),
        end: new Date(),
      },
      currentUser: {
        name: 'Noname',
        avatar: window.location.origin + '/assets/logo.png',
        role: 0,
        id: 0,
      },
      message: '',
      form: {
        action: '', // create/update
        id: 0, // if update -> id > 0
        start: 0,
        end: 0,
        date: '',
        room_id: 0,
        goal: '',
      },
      availableRooms: [
        {
          name: 'Chọn ngày, giờ sẽ hiện phòng phù hợp',
          disabled: true,
        },
      ],
      rooms: [],
      bookings: [],
      weeknames: [],
      timeList: [
        {
          value: 16,
          label: '08:00',
          disabled: false,
        },
        {
          value: 17,
          label: '08:30',
          disabled: false,
        },
        {
          value: 18,
          label: '09:00',
          disabled: false,
        },
        {
          value: 19,
          label: '09:30',
          disabled: false,
        },
        {
          value: 20,
          label: '10:00',
          disabled: false,
        },
        {
          value: 21,
          label: '10:30',
          disabled: false,
        },
        {
          value: 22,
          label: '11:00',
          disabled: false,
        },
        {
          value: 23,
          label: '11:30',
          disabled: false,
        },
        {
          value: 24,
          label: '12:00',
          disabled: false,
        },
        {
          value: 25,
          label: '12:30',
          disabled: false,
        },
        {
          value: 26,
          label: '13:00',
          disabled: false,
        },
        {
          value: 27,
          label: '13:30',
          disabled: false,
        },
        {
          value: 28,
          label: '14:00',
          disabled: false,
        },
        {
          value: 29,
          label: '14:30',
          disabled: false,
        },
        {
          value: 30,
          label: '15:00',
          disabled: false,
        },
        {
          value: 31,
          label: '15:30',
          disabled: false,
        },
        {
          value: 32,
          label: '16:00',
          disabled: false,
        },
        {
          value: 33,
          label: '16:30',
          disabled: false,
        },
        {
          value: 34,
          label: '17:00',
          disabled: false,
        },
        {
          value: 35,
          label: '17:30',
          disabled: false,
        },
        {
          value: 36,
          label: '18:00',
          disabled: false,
        },
        {
          value: 37,
          label: '18:30',
          disabled: false,
        },
        {
          value: 38,
          label: '19:00',
          disabled: false,
        },
        {
          value: 39,
          label: '19:30',
          disabled: false,
        },
      ],
      bookedSlots: [],
      slots: [],
    }
  },
  computed: {
    timeListEnd() {
      return this.timeList.filter((item) => item.value > this.form.start)
    },
    start() {
      return this.getTime(this.currentItem.start)
    },
    end() {
      return this.getTime(this.currentItem.end)
    },
    modalTitle() {
      return this.form.action === 'create' ? 'Đặt phòng' : 'Cập nhật nội dung'
    },
  },
  created() {
    const { start, end } = this.calculateWeek(new Date())

    this.currentWeek.start = start
    this.currentWeek.end = end
    this.time = listTime('00:00', '23:30', '00:30', 0)
    this.fetch()
  },
  beforeCreate() {
    let token = localStorage.getItem('booking-token')

    if (!token) {
      this.$router.push({ path: '/' })
      return
    }

    localStorage.setItem('booking-token', token)
  },
  methods: {
    updateBooking() {
      // console.log(this.form)
      if (this.form.id == 0) {
        alert('Không tìm thấy booking id. Vui lòng thử lại')
        return
      }

      if (this.form.goal.length === 0) {
        this.message = 'Nhập vào mục đích'
        return
      }

      this.form.token = localStorage.getItem('booking-token')
      fetch('https://booking.congcu.org/api/booking.php', {
        method: 'post',
        body: JSON.stringify(this.form),
      })
        .then(async (response) => {
          const result = await response.json()
          if (result.success) {
            this.fetch()
          } else {
            alert('Book error')
            // console.log(response)
          }
        })
        .catch((error) => {
          this.isLoading = false
          throw error
        })

      this.resetForm()
      // eslint-disable-next-line no-undef
      $(function() {
        // eslint-disable-next-line no-undef
        $('#myModal').modal('toggle')
      })
    },
    logOut() {
      localStorage.removeItem('booking-token')
      this.$router.push({ path: '/' })
    },
    backToToday() {
      const { start, end } = this.calculateWeek(new Date())
      this.currentWeek.start = start
      this.currentWeek.end = end
      this.fetch()
    },
    getFormattedDate(date) {
      // Format in dd/mm/yyyy
      let dd = date.getDate()
      let mm = date.getMonth() + 1
      const yyyy = date.getFullYear()

      if (dd < 10) {
        dd = `0${dd}`
      }

      if (mm < 10) {
        mm = `0${mm}`
      }

      return `${dd}/${mm}/${yyyy}`
    },
    calculateWeek(date) {
      const current = date.getTime()
      const start = new Date(new Date(current).setDate(date.getDate() - date.getDay()))
      const end = new Date(new Date(current).setDate(date.getDate() - date.getDay() + 6))

      return {
        start: start,
        end: end,
      }
    },
    formatDate(date) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    changeCurrentItem(item) {
      this.currentItem = item
    },
    changeWeek(type) {
      let newDate

      if (type === 'next') {
        newDate = new Date(this.currentWeek.end.getTime()).setDate(
          this.currentWeek.end.getDate() + 7
        )
      } else {
        newDate = new Date(this.currentWeek.start).setDate(this.currentWeek.start.getDate() - 7)
      }

      const { start, end } = this.calculateWeek(new Date(newDate))
      this.currentWeek.start = start
      this.currentWeek.end = end
      this.fetch()
    },
    async fetch() {
      this.fetching = true
      const start = this.formatDate(this.currentWeek.start)
      const end = this.formatDate(this.currentWeek.end)
      const token = localStorage.getItem('booking-token')
      await fetch(
        `https://booking.congcu.org/api/room.php?type=list2&token=${token}&start_date=${start}&end_date=${end}`
      ).then((response) => {
        response.json().then((data) => {
          if (!data || !data.data) {
            return
          }
          this.bookings = data.data.bookings
          this.rooms = data.data.rooms
          this.weeknames = data.data.weeknames

          const user = data.user
          if (user && user.extraData) {
            const extraData = JSON.parse(user.extraData)
            if (extraData && extraData.user && extraData.user.profile) {
              this.currentUser.avatar = extraData.user.profile.image_24
              this.currentUser.name = extraData.user.profile.real_name
              this.currentUser.id = user.id
              this.currentUser.role = user.role
            }
          }
        })
      })
      this.fetching = false
    },
    async showModal(type, bookingItem) {
      this.message = ''
      this.form.action = type
      switch (type) {
        case 'create':
          this.form.id = 0
          this.form.room_id = 0
          this.form.start = 0
          this.form.end = 0
          this.form.goal = ''
          this.availableRooms = [
            {
              name: 'Chọn ngày, giờ sẽ hiện phòng phù hợp',
              disabled: true,
            },
          ]
          break
        case 'update':
          this.currentItem = bookingItem
          this.form.id = bookingItem.booking_id
          this.form.start = bookingItem.start
          this.form.end = bookingItem.end
          this.form.date = bookingItem.date
          this.availableRooms = this.rooms
          this.form.room_id = bookingItem.room_id
          this.form.goal = bookingItem.goal
          break
      }

      // console.log(this.form.id)
      // eslint-disable-next-line no-undef
      $('#myModal').modal('show')
    },

    getTime(value) {
      const time = this.time.find((item) => item.value === Number(value))

      if (!time) {
        return
      }

      return time.label
    },
    bookRoom() {
      if (this.form.start <= 0) {
        this.message = 'Chọn giờ bắt đầu'
        return
      }

      if (this.form.end <= 0) {
        this.message = 'Chọn giờ kết thúc'
        return
      }

      if (this.form.goal.length === 0) {
        this.message = 'Nhập vào mục đích'
        return
      }

      if (this.form.room_id === 0) {
        this.message = 'Chọn phòng'
        return
      }

      this.form.token = localStorage.getItem('booking-token')
      fetch('https://booking.congcu.org/api/booking.php', {
        method: 'post',
        body: JSON.stringify(this.form),
      })
        .then(async (response) => {
          const result = await response.json()
          if (result.success) {
            this.fetch()
          } else {
            alert('Book error')
            // console.log(response)
          }
        })
        .catch((error) => {
          this.isLoading = false
          throw error
        })

      // this.resetForm()
      // eslint-disable-next-line no-undef
      $(function() {
        // eslint-disable-next-line no-undef
        $('#myModal').modal('toggle')
      })
    },
    deleteBooking() {
      const token = localStorage.getItem('booking-token')
      const payload = {
        token,
        id: this.currentItem.booking_id,
      }

      fetch('https://booking.congcu.org/api/delete.php', {
        method: 'post',
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const result = await response.json()
          if (result.success) {
            this.isLoading = false
            // eslint-disable-next-line no-undef
            $('#modalBookingInfo').modal('hide')
            this.fetch()
          }
        })
        .catch((error) => {
          alert(JSON.stringify(error))
        })

      // this.resetForm()
      // eslint-disable-next-line no-undef
      $('#myModal').modal('hide')
    },
    getAvailableRooms() {
      if (this.form.start === 0 || this.form.end === 0) {
        // console.log('Chọn time_start, time_end trước rồi mới tính được')
        return
      }

      if (this.slots.length === 0) {
        // console.log('Slot length empty')
        return
      }

      // console.log(JSON.stringify(this.slots))
      const avail = []
      this.form.room_id = 0

      for (let i = 0; i < this.rooms.length; i++) {
        const room = this.rooms[i]
        const roomId = room.id
        const roomSlots = this.slots[roomId]

        let isOk = true
        // console.log('Room: ', room.name, 'Slot now: ', roomSlots)
        for (let j = this.form.start + 1; j < this.form.end; j++) {
          // console.log('Slot item: ', roomSlots[j])
          if (roomSlots[j] === false) {
            isOk = false
            break
          }
        }

        // handle case cach nhau 30'
        if (this.form.end - this.form.start === 1 && roomSlots[this.form.start] === false) {
          isOk = false
        }

        if (isOk) {
          avail.push(room)
        }
      }

      this.availableRooms = avail
    },
    async getBookingByDate() {
      const token = localStorage.getItem('booking-token')
      await fetch(
        `https://booking.congcu.org/api/room.php?type=get_by_date&date=${this.form.date}&token=${token}`
      ).then((response) => {
        response.json().then((data) => {
          this.bookedSlots = data.data

          // Make slots
          let slot = {}
          for (let i = 0; i < this.rooms.length; i++) {
            const init = {}
            for (let j = 0; j <= 48; j++) {
              init[j] = true
            }

            slot[this.rooms[i].id] = init
          }

          // Calc conflicts
          for (let i = 0; i < this.bookedSlots.length; i++) {
            const item = this.bookedSlots[i]
            const roomId = item.room_id

            // console.log('Mark room: ', roomId, 'from: ', item.start, 'to: ', item.end)
            for (let j = item.start; j <= item.end; j++) {
              slot[roomId][j] = false
            }
          }

          this.slots = slot
          // console.log(JSON.stringify(slot))
          this.getAvailableRooms()
        })
      })
      this.fetching = false
    },
    resetForm() {
      this.form = {
        start: 0,
        end: 0,
        date: '',
        room_id: 0,
        goal: '',
      }
    },
  },
}
</script>

<style>
tr > th {
  text-align: center;
}

tr,
th,
td {
  background: transparent;
}

/*.panel-transparent {*/
/*  background: none;*/
/*}*/

/*.panel-transparent .panel-heading {*/
/*  background: rgba(122, 130, 136, 0.2) !important;*/
/*}*/

/*.panel-transparent .panel-body {*/
/*  background: rgba(46, 51, 56, 0.2) !important;*/
/*}*/
</style>
