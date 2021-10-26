let filtersBtn = [false, false, false, false]
let filtersSelect = ["Все города", "Все варианты", "Все варианты", "Все варианты"]
let filtersSelectStart = ["Все города", "Все варианты", "Все варианты", "Все варианты", "Без пересадок"]
let ticketData = []
let ticketDataUsed = []
let ticketOrder = []
let data = []
let totalCountSlides = 0
let urlTicket = "https://tb.vps.webdock.io/api/tickets/advantageous_tickets"

async function startTicket() {
  data = await fetchData(urlTicket)
  ticketData = data.content
  ticketOrder = ticketData.map(item => item.type === "ticket")
  startSelect()
  // updateSlides()
}

const getTicket = (data) => {
  const getBell = () => {
    return `
      <li class="block-slider-hot-offer__bell-filter block-slider-hot-offer__filter">
        <picture>
          <source srcset="img/icons/bell.svg" type="image/webp">
          <img src="img/icons/bell.svg" alt="">
        </picture>
      </li>
    `
  }
  const getArrow = (two = false) => {
    let src = "arrow-right.svg"
    if (two) {
      src = "arrows.svg"
    }
    return `
          <li class="block-slider-hot-offer__arrow-filter block-slider-hot-offer__filter">
            <picture>
              <source srcset="img/icons/${src}" type="image/webp">
              <img src="img/icons/${src}" alt=""></picture>
          </li>
    `
  }
  const getFire = () => {
    return `
          <li class="block-slider-hot-offer__fire-filter block-slider-hot-offer__filter">
            <picture>
              <source srcset="img/icons/fire.svg" type="image/webp">
              <img src="img/icons/fire.svg" alt=""></picture>
          </li>
    `
  }
  let {
    departureCountry,
    departureCity,
    departureDate,
    arrivalCountry,
    arrivalCity,
    arrivalDate,
    discountPercentage,
    price,
    meta
  } = data

  let isBack = !!arrivalCountry;
  let isVisa = !!meta?.find(item => item.name === "Виза")
  let isTransfer = !!meta?.find(item => item.name === "Пересадка")
  let backBlockDate = ""
  let backBlockPlace = ""
  let visaBlock = ""
  let transferBlock = ""

  let filters = []
  if (discountPercentage > 70) {
    filters.push(getFire())
  }
  if (isDate()) {
    filters.push(getBell())
  }
  if (isBack) {
    filters.push(getArrow(true))
  } else {
    filters.push(getArrow(false))
  }
  filters = filters.join('')

  if (isBack){
    backBlockDate = `
       <div class="text-line__date-until">
          <div class="text-line__date-until-name">Обратно:</div>
          <div class="text-line__date-until-num">${arrivalDate}</div>
       </div>
    `
    backBlockPlace = `
    <div class="block-slider-hot-offer__line-from">
      <h4 class="block-slider-hot-offer__line-from-title">От куда:</h4>
      <p class="block-slider-hot-offer__line-from-text"> ${arrivalCity} <br> <span>${arrivalCountry}</span></p>
    </div>
    `
  }
  if (isVisa){
    visaBlock = `
      <div class="block-slider-hot-offer__info-block"> 
        <div class="block-slider-hot-offer__info-block-body">
        <p class="block-slider-hot-offer__info-block-text _visa">Виза</p></div>
      </div>
    `
  }
  if (isTransfer) {
    let counter = (meta?.find(item => item.name === "Пересадка"))?.counter
    transferBlock = `
    <div class="block-slider-hot-offer__info-block">
      <div class="block-slider-hot-offer__info-block-body">
        <p class="block-slider-hot-offer__info-block-text block-slider-hot-offer__info-block-text_num">
              Пересадка <span>${counter}</span>
        </p>
      </div>
    </div>
    `
  }


  return `
  <div class="slider-hot-offer__slide">
  <div class="slider-hot-offer__block block-slider-hot-offer">
    <div class="block-slider-hot-offer__body">
      <div class="block-slider-hot-offer__top">
        <div class="block-slider-hot-offer__top-sale">-${discountPercentage}%</div>
        <ul class="block-slider-hot-offer__top-block-filters">
          ${filters}
        </ul>
      </div>
      <hr class="hr">
      <div class="block-slider-hot-offer__text">
        <h4 class="block-slider-hot-offer__text-line text-line">
          <div class="text-line__date-from">
            <div class="text-line__date-from-name">Вылет:</div>
            <div class="text-line__date-from-num">${departureDate}</div>
          </div>
          ${backBlockDate}
        </h4>
        <div class="block-slider-hot-offer__line-to"><h4 class="block-slider-hot-offer__line-to-title">
          Куда:</h4>
          <p class="block-slider-hot-offer__line-to-text"> ${departureCity} <br> <span>${departureCountry}</span></p>
        </div>
        ${backBlockPlace}
      </div>
      <hr class="hr">
      <div class="block-slider-hot-offer__down">
        <div class="block-slider-hot-offer__info">
        ${visaBlock}
        ${transferBlock}
        </div>
        <a class="block-slider-hot-offer__down-btn btn">от ${price.toLocaleString()} ₽</a></div>
    </div>
  </div>
  </div>
  `


  function isDate() {
    let Date2 = new Date(+departureDate.split('-')[0], +departureDate.split('-')[1] - 1, departureDate.split('-')[2]);
    let Date1 = new Date();
    let Days = Math.floor((Date2.getTime() - Date1.getTime()) / (1000 * 60 * 60 * 24));
    return Days > 3 && Days < -1
  }
}


startTicket()

function constructorTicket(ticket) {
  let {
    segments,
    discount_percentage,
    proposal,
    meta
  } = ticket;
  let visa = "",
    textNum = "",
    otherText = "";
  let discount = ticket.discount_percentage > "70%" ? `          <li
  class="block-slider-hot-offer__fire-filter block-slider-hot-offer__filter">
<img src="img/icons/fire.svg" alt=""></li>` : ``;

  var Date2 = new Date(+ticket.segments[0].departure_date.split('-')[0], +ticket.segments[0].departure_date.split('-')[1] - 1, +ticket.segments[0].departure_date.split('-')[2]);
  var Date1 = new Date();
  var Days = Math.floor((Date2.getTime() - Date1.getTime()) / (1000 * 60 * 60 * 24));
  let quick = (Days < 3 || Days > -1) ? `<li
  class="block-slider-hot-offer__bell-filter block-slider-hot-offer__filter">
<img src="img/icons/bell.svg" alt=""></li>` : ``;
  let arrow = ticket.segments.length > 1 ?
    `<li
  class="block-slider-hot-offer__arrow-filter block-slider-hot-offer__filter">
<img src="img/icons/arrows.svg" alt=""></li>` :
    `<li
    class="block-slider-hot-offer__arrow-filter block-slider-hot-offer__filter">
  <img src="img/icons/arrow-right.svg" alt=""></li>`;

  let departureDate = ticket.segments.length > 1 ? `<div class="text-line__date-until">
  <div class="text-line__date-until-name">Обратно:</div>
  <div class="text-line__date-until-num">${segments[1].departure_date}</div>
</div>` : ``;


  if (!filterTickets(ticket)) {
    return ""
  }


  meta.forEach(element => {
    if (element.name == "Нужна виза") {
      visa = `
      <div class="block-slider-hot-offer__info-block">
            <div class="block-slider-hot-offer__info-block-body">
              <p class="block-slider-hot-offer__info-block-text _visa">Виза</p>
            </div>
      </div>`
      return
    }

    if (element.name == "Количество пересадоĸ") {
      textNum = `
      <div class="block-slider-hot-offer__info-block">
      <div class="block-slider-hot-offer__info-block-body">
        <p
           class="block-slider-hot-offer__info-block-text block-slider-hot-offer__info-block-text_num">
          Пересадка <span>${element.counter}</span></p>
      </div>
    </div>`
      return
    }

    otherText += `
    <div class="block-slider-hot-offer__info-block">
      <div class="block-slider-hot-offer__info-block-body">
        <p class="block-slider-hot-offer__info-block-text">${element.name}</p>
      </div>
    </div>`
  });

  return `<div class="slider-hot-offer__slide">
  <div class="slider-hot-offer__block block-slider-hot-offer">
    <div class="block-slider-hot-offer__body">
      <div class="block-slider-hot-offer__top">
        <div class="block-slider-hot-offer__top-sale">-${discount_percentage}</div>
        <ul class="block-slider-hot-offer__top-block-filters">
          ${arrow}
          ${quick}
          ${discount}
        </ul>
      </div>
      <hr class="hr">
      </hr>
      <div class="block-slider-hot-offer__text">
        <h4 class="block-slider-hot-offer__text-line text-line">
          <div class="text-line__date-from">
            <div class="text-line__date-from-name">Вылет:</div>
            <div class="text-line__date-from-num">${segments[0].departure_date}</div>
          </div>
          ${departureDate}

        </h4>
        <div class="block-slider-hot-offer__line-to">
          <h4 class="block-slider-hot-offer__line-to-title">Куда:</h4>
          <p class="block-slider-hot-offer__line-to-text">
            ${segments[0].departure_city} <br>
            <span>${segments[0].departure_country}</span>
          </p>
        </div>
        <div class="block-slider-hot-offer__line-from">
          <h4 class="block-slider-hot-offer__line-from-title">От куда:</h4>
          <p class="block-slider-hot-offer__line-from-text">
          ${segments[0].arrival_city} <br>
          <span>${segments[0].arrival_country}</span>
        </div>
      </div>
      <hr class="hr">
      </hr>
      <div class="block-slider-hot-offer__down">
        <div class="block-slider-hot-offer__info">
          ${visa}
          ${textNum}
          ${otherText}
        </div>
        <a class="block-slider-hot-offer__down-btn btn">от ${proposal.price.toLocaleString()} ₽</a>
      </div>
    </div>
  </div>
</div>`
}

function constructorAd(ad) {
  let {
    meta: {
      size,
      link,
      redirect_href
    }
  } = ad

  return `
  <a href="${link}" class="slider-hot-offer__slide ${size == 1 ? "_ad" : "_big-ad"} _ibg">
    <img src="${redirect_href}" alt="">
  </a>`
}


function updateSlides() {
  ticketDataUsed = ticketData;

  filterTicket()
  slider_hot.removeAllSlides()

  loadAllSlides()
}

function filterTicket() {
  // region Btns Filter
  if (filtersBtn[0]) {
    ticketDataUsed = ticketDataUsed.filter(item => item.type !== "ticket" || item.discountPercentage > 70)
  }
  if (filtersBtn[1]) {
    ticketDataUsed = ticketDataUsed.filter(item => {
      if (item.type !== "ticket") {
        return true
      }
      let Date2 = new Date(+item.departureDate.split('-')[0], +item.departureDate.split('-')[1] - 1, +item.departureDate.split('-')[2]);
      let Date1 = new Date();
      let Days = Math.floor((Date2.getTime() - Date1.getTime()) / (1000 * 60 * 60 * 24));
      return Days > 3 && Days < -1
    })
  }
  if (filtersBtn[2]) {
    ticketDataUsed = ticketDataUsed.filter(item => item.type !== "ticket" || !!item.arrivalCountry)
  }
  if (filtersBtn[3]) {
    ticketDataUsed = ticketDataUsed.filter(item => item.type !== "ticket" || !item.arrivalCountry)
  }
  // endregion

  //region Selects Filter
  if(filtersSelect[0] !== filtersSelectStart[0]){
    ticketDataUsed = ticketDataUsed.filter(item => item.departureCity === filtersSelect[0])
  }
  if(filtersSelect[1] !== filtersSelectStart[1]){
    ticketDataUsed = ticketDataUsed.filter(item => item.departureCountry === filtersSelect[1])
  }
  if(filtersSelect[2] !== filtersSelectStart[2]){
    if(filtersSelect[2] === "Обязательно") {
      ticketDataUsed = ticketDataUsed.filter(item => !!item.meta?.find(meta => meta.name === "Виза"))
    }
    else {
      ticketDataUsed = ticketDataUsed.filter(item => !item.meta?.find(meta => meta.name === "Виза"))
    }
  }
  if(filtersSelect[3] !== filtersSelectStart[3]){
    if (filtersSelect[3] === filtersSelectStart[4]) {
      ticketDataUsed = ticketDataUsed.filter(item => !!item.meta?.find(meta => meta.name === "Прямой перелет"))
    } else {
      ticketDataUsed = ticketDataUsed.filter(item => !!item.meta?.find(meta => meta.name === "Пересадка" && +meta.counter === +filtersSelect[3].trim()))
    }
  }
  // endregion

}

async function loadAllSlides() {
  let i = 0
  while (i < ticketDataUsed.length) {
    let resultEl = [];

    while (resultEl.length < 16 && i < ticketDataUsed.length) {
      let ticket = ticketDataUsed[i]
      if (ticket.type === "ticket") {
        resultEl.push(getTicket(ticket))
      } else {
        // resultEl.push(await constructorAd(ticket))
      }
      i++
    }
    resultEl = resultEl.join("")
    totalCountSlides = slider_hot.slides.length
    const slide = `<div data-hash="hot-${totalCountSlides + 1}" class="swiper-slide hot-offer__slider-block">${resultEl}</div>`
    await slider_hot.appendSlide(slide)
  }
}

let filtersList = document.querySelectorAll('.filters-hot-offer__btn');
if (filtersList.length > 0) {
  for (let index = 0; index < filtersList.length; index++) {
    const element = filtersList[index];
    element.addEventListener("click",  function (e) {
      element.classList.toggle('_active');
      filtersBtn[index] = !filtersBtn[index]
      if (index === 2) {
        filtersBtn[3] = false;
        filtersList[3].classList.remove('_active');
      }
      if (index === 3) {
        filtersBtn[2] = false;
        filtersList[2].classList.remove('_active');
      }

      updateSlides();

    });
  }
}
