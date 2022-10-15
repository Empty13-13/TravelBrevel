if(document.querySelector('.hot-offer')) {
// region Global vars
  var moreBtn = document.querySelector('#moreTicket')
  let filtersStatus = [false, false, false, false];
  let urlTicket = "http://194.58.92.109/v1/advantageousTickets?page="
  let numPage = 0
  let activeData = []
  let allData = []
  let data = []
  let totalPages = 0
// endregion

// region Buttons
  let fireBtn = document.querySelector('#fireBtn')
  let fastBtn = document.querySelector('#fastBtn')
  let twiceBtn = document.querySelector('#twiceBtn')
  let onceBtn = document.querySelector('#onceBtn')
// endregion

// region AddEventListener
  if (fireBtn) {
    fireBtn.addEventListener("click", function (e) {
      fireBtn.classList.toggle('_active')
      filtersStatus[0] = !filtersStatus[0]
      filterTicket()
    });
  }
  if (fastBtn) {
    fastBtn.addEventListener("click", function (e) {
      fastBtn.classList.toggle('_active')
      filtersStatus[1] = !filtersStatus[1]
      filterTicket()
    });
  }
  if (twiceBtn) {
    twiceBtn.addEventListener("click", function (e) {
      twiceBtn.classList.toggle('_active')
      filtersStatus[2] = !filtersStatus[2]
      filterTicket()
    });
  }
  if (onceBtn) {
    onceBtn.addEventListener("click", function (e) {
      onceBtn.classList.toggle('_active')
      filtersStatus[3] = !filtersStatus[3]
      filterTicket()
    });
  }

  if (onceBtn && twiceBtn) {
    twiceBtn.addEventListener("click", function (e) {
      onceBtn.classList.remove('_active')
      filtersStatus[3] = false
      filterTicket()
    });
    onceBtn.addEventListener("click", function (e) {
      twiceBtn.classList.remove('_active')
      filtersStatus[2] = false
      filterTicket()
    });
  }
  if (moreBtn) {
    moreBtn.addEventListener("click", async function (e) {
      numPage++
      await startTicket()
      filterTicket()
      console.log(totalPages, numPage)
      if (!(numPage < totalPages - 1)) {
        moreBtn.style.cssText = "display:none;"
        return false
      }
    });
  }


// endregion

  async function startTicket() {
    moreBtn.disabled = true
    allData = await fetchData(urlTicket)
    data = data.concat(allData.content)
    totalPages = allData.totalPages
    activeData = JSON.parse(JSON.stringify(data));
    getTickets()
    moreBtn.disabled = false
  }

  startTicket()

// region functions
  async function fetchData(url) {
    try {
      const response = await fetch(url + numPage)
      return response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async function getTickets() {
    let body = document.querySelector('#dates')
    body.innerHTML = ''

    if (body) {
      let tickets = []

      //Создаем билеты
      activeData.forEach(item => {
        tickets.push(getTicket(item))
      })

      //Добавляем билет в группу
      let group = getGroup(tickets)
      body.append(group)
    }
  }

//Функция фильтров
  function filterTicket() {
    let body = document.querySelector('#dates')
    activeData = JSON.parse(JSON.stringify(data));

    if (filtersStatus[0]) {
      activeData = activeData.map((item) => {
        if (item.discountPercentage >= 70) {
          return item
        } else {
          return null
        }
      })
      activeData = activeData.filter(item => !!item)
    }
    if (filtersStatus[1]) {
      activeData = activeData.map((item) => {
        let dateNow = new Date();
        let date2 = new Date(item.departure_date)
        if (Math.abs(date2 - dateNow) < 2.592e+8) {
          return item
        } else {
          return null
        }
      })
      activeData = activeData.filter(item => !!item)
    }
    if (filtersStatus[2]) {
      activeData = activeData.filter(item => !!item.arrivalDate)
    }
    if (filtersStatus[3]) {
      activeData = activeData.filter(item => !item.arrivalDate)
    }
    activeData.filter(item => item.length > 0)


    getTickets()
  }

// region getters

  const getTicket = (data) => {
    // region Vars
    let {
      arrivalCityName,
      arrivalCountryName,
      arrivalDate,
      currency_name,
      departureCityName,
      departureCountryName,
      departureDate,
      discountPercentage,
      price,
      id,
      transfers,
      isVisa
    } = data
    let discount = ``
    let arrival = ``
    let transferIcon = ''
    let visaIcon = ''
    let fireIcon = ''
    let bellIcon = ``
    // endregion

    //Назначение времени
    departureDate = new Date(departureDate)
    arrivalDate ? arrivalDate = new Date(arrivalDate) : null


    // region If group
    if (discountPercentage) {
      discount = `<div class="top-newTicket__sale">-${discountPercentage}%</div>`
    }
    if (arrivalCityName && arrivalDate) {
      arrival = `
                        <div class="center-newTicket__departure departure-center-newTicket">
                          <div class="departure-center-newTicket__back-arrow">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 5.99999L2.00001 5.99999M5.81837 10.8184L1.00001 5.99999L5.81837 1.18163"
                                    stroke="#7B7B7B"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <div class="departure-center-newTicket__data">
                            <div class="departure-center-newTicket__date">${arrivalDate.toLocaleString().split(',')[0].replaceAll('/', '.').replaceAll(',', ' ')}</div>
                            <div class="departure-center-newTicket__city">${arrivalCityName}, ADD</div>
                          </div>
                        </div>
      `
    }
    if (discountPercentage >= 70) {
      fireIcon = `
      <div class="icons-center-newTicket__fire icons-center-newTicket__icon-group">
          <img src="img/icons/fire.svg" alt="">
      </div>
      `
      discount = `<div class="top-newTicket__sale _red">-${discountPercentage}%</div>`
    }

    if (transfers) {
      transferIcon = `
        <div class="icons-center-newTicket__transfer icons-center-newTicket__icon-group">
         ${transfers}
        </div>
        `
    }
    if (isVisa) {
      visaIcon = `
        <div class="icons-center-newTicket__warning icons-center-newTicket__icon-group">
            <img src="img/icons/warning-circle.svg" alt="">
        </div>
        `
    }

    let dateNow = new Date();
    let date2 = new Date(departureDate)
    if (Math.abs(date2 - dateNow) < 2.592e+8) {
      bellIcon = `
      <div class="icons-center-newTicket__bell icons-center-newTicket__icon-group">
          <img src="img/icons/bell.svg" alt="">
      </div>
      `
    }
    // endregion

    let div = document.createElement('div');
    div.classList.add('newTicket')
    div.innerHTML = `
                      <div class="newTicket__body">
                    <div class="newTicket__top top-newTicket">
                      <div class="top-newTicket__body">
                        <div class="top-newTicket__title">
                          <p class="top-newTicket__city">${arrivalCityName}</p>
                          <p class="top-newTicket__country">${arrivalCountryName}</p>
                        </div>
                        ${discount}
                      </div>
                    </div>
                    <div class="newTicket__center center-newTicket">
                      <div class="center-newTicket__body">
                        <div class="center-newTicket__departure departure-center-newTicket">
                          <div class="departure-center-newTicket__arrow">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.999985 6.00001H14M10.1816 1.18164L15 6.00001L10.1816 10.8184" stroke="#7B7B7B"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <div class="departure-center-newTicket__data">
                            <div class="departure-center-newTicket__date">${departureDate.toLocaleString().split(',')[0].replaceAll('/', '.').replaceAll(',', ' ')}</div>
                            <div class="departure-center-newTicket__city">${departureCityName.replaceAll('/', '.').replaceAll(',', ' ')}, SVO</div>
                          </div>
                        </div>
                        ${arrival}
                      </div>
                    </div>
                    <div class="center-newTicket__icons icons-center-newTicket">
                      ${bellIcon}
                      ${transferIcon}
                      ${visaIcon}
                      ${fireIcon}
                    </div>
                    <div class="newTicket__bottom bottom-newTicket">
                      <div class="bottom-newTicket__body">
                        <div class="bottom-newTicket__price">${price.toLocaleString().replaceAll(',', ' ')} ₽</div>
                        <a href="/ticket.html?uuid=${id}" class="bottom-newTicket__btn-more">Подробнее</a>
                      </div>
                    </div>
                  </div>
    `
    return div
  }

  const getGroup = (tickets) => {
    let div = document.createElement('div')
    div.classList.add('slider-hot-offer__group')

    // let titleDiv = document.createElement('div')
    // titleDiv.classList.add('slider-hot-offer__title')
    // titleDiv.innerText = title
    //
    // div.append(titleDiv)

    let block = document.createElement('div')
    block.classList.add('swiper-slide', 'hot-offer__slider-block')
    block.append(...tickets)

    div.append(block)

    return div
  }

// endregion

// endregion
}
