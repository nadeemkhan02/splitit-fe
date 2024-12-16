export const isValidPastDate = (value) => {
  const inputDate = new Date(value)
  const currentDate = new Date()

  // Reset time on both dates to compare only the date part
  inputDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  return inputDate >= currentDate // Valid if today or future
}
