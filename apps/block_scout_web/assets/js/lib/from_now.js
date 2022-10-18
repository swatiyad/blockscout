import $ from 'jquery'
import moment from 'moment'

moment.relativeTimeThreshold('M', 12)
moment.relativeTimeThreshold('d', 30)
moment.relativeTimeThreshold('h', 24)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

export function updateAllAges ($container = $(document)) {
  $container.find('[data-from-now]').each((i, el) => tryUpdateAge(el))
  return $container
}
function tryUpdateAge (el) {
  if (!el.dataset.fromNow) return

  const timestamp = moment(el.dataset.fromNow)
  if (timestamp.isValid()) updateAge(el, timestamp)
}
function updateAge (el, timestamp) {
  let fromNow = timestamp.fromNow()
  // console.log("el::",el,"fromNow ::",fromNow);
  let timechunck = fromNow.split(" ");
  // show the exact time only for transaction details page. Otherwise, short entry
  const elInTile = el.hasAttribute('in-tile');
  const timeBlock = el.hasAttribute('time-block'); 
  if ((window.location.pathname.includes('/tx/') || window.location.pathname.includes('/block/') || window.location.pathname.includes('/blocks/')) && !elInTile) {
    const offset = moment().utcOffset() / 60
    const sign = offset && Math.sign(offset) ? '+' : '-'
    const formatDate = `MMMM-DD-YYYY hh:mm:ss A ${sign}${offset} UTC`
    fromNow = `${fromNow} | ${timestamp.format(formatDate)}`
      // console.log("element::",el,"from_now::",fromNow);
  }
  if (fromNow !== el.innerHTML && !timeBlock) el.innerHTML = fromNow;
  if (timeBlock) el.innerHTML =`<span class="digi_time">${timechunck[0]} </span> <span class="digi_time">${timechunck[1]} </span> <span class="digi_time">${timechunck[2]}</span>`;
}
updateAllAges()

setInterval(updateAllAges, 1000)
