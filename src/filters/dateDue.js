export default function (item) {
  const timestamp = new Date(item * 1000)
  const yyyy = timestamp.getFullYear()
  const mm = timestamp.getMonth() + 1
  const dd = timestamp.getDate()
  const hour = timestamp.getHours()
  const min = timestamp.getMinutes()
  const sec = timestamp.getSeconds()
  return `${yyyy}/${mm}/${dd}  ${hour}:${min}:${sec}`
}
