export const formatMinutes = (minutes: number) => {
  const hour = Math.floor(minutes / 60)
  const minute = minutes % (hour * 60)
  if (hour > 0) return `${hour} hr ${minute} mins`
  return `${minute} mins`
}