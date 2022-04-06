export default function (item) {
  let timestamp = new Date(item * 1000)
  let yyyy = timestamp.getFullYear()
  let mm = timestamp.getMonth() + 1
  let dd = timestamp.getDate()
  let hour = timestamp.getHours()
  let min = timestamp.getMinutes()
  let sec = timestamp.getSeconds()
  return `${yyyy}/${mm}/${dd}  ${hour}:${min}:${sec}`
}
