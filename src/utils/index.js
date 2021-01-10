const parseTime = function(time) {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)

    return {
      hours,
      minutes,
    }
  }
  /* istanbul ignore next */
  return null
}

const compareTime = function(time1, time2) {
  const value1 = parseTime(time1)
  const value2 = parseTime(time2)

  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60

  if (minutes1 === minutes2) {
    return 0
  }

  return minutes1 > minutes2 ? 1 : -1
}

const formatTime = function(time) {
  return (
    (time.hours < 10 ? '0' + time.hours : time.hours) +
    ':' +
    (time.minutes < 10 ? '0' + time.minutes : time.minutes)
  )
}

const nextTime = function(time, step) {
  const timeValue = parseTime(time)
  const stepValue = parseTime(step)

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes,
  }

  next.minutes += stepValue.minutes
  next.hours += stepValue.hours

  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60

  return formatTime(next)
}

export const listTime = (start, end, step, indexStartFrom) => {
  const result = []
  const minTime = ''
  const maxTime = ''

  if (start && end && step) {
    let current = start
    let i = indexStartFrom
    while (compareTime(current, end) <= 0) {
      result.push({
        value: i++,
        label: current,
        disabled:
          compareTime(current, minTime || '-1:-1') <= 0 ||
          compareTime(current, maxTime || '100:100') >= 0,
      })
      current = nextTime(current, step)
    }
  }

  return result
}
