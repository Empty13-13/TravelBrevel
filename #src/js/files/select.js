const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? ''

  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = "selected"
    }
    return `
    <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })

  return `
      <div class="select__backdrop" data-type="backdrop"></div>
      <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        <i class="fa fa-chevron-down" data-type="arrow"></i>
      </div>
      <div class="select__dropdown">
        <ul class="select__list">
          ${items.join('')}
        </ul>
      </div>
  `
}

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId
    this.numeric = options.numeric || 0

    this.#render()
    this.#setup()
  }

  #render() {
    const {placeholder, data} = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  refresh(data){
    this.destroy()
    this.options.data = data
    this.#render()
    this.#setup()
  }

  clickHandler(event) {
    const {type} = event.target.dataset

    if (type === 'input' || type === 'value' || type === 'arrow') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {

    return  this.options.data.find(item =>+item.id === +this.selectedId)
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.options.onOpen ? this.options.onOpen() : null;

    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.remove('fa-chevron-up')
    this.$arrow.classList.add('fa-chevron-down')
  }

  select(id) {
    if (this.selectedId || this.selectedId === 0) {
      this.$el.querySelector(`[data-id="${this.selectedId}"]`).classList.remove('selected')
    }
    this.selectedId = id
    this.$value.textContent = this.current.value
    this.close()
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current,this.numeric) : null;
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ""
  }
}


//====================================================================================================

let selectsFilter = []
let citiesSelect = []
let directionSelect = []
let transferSelect = []

async function startSelect() {
  citiesSelect = []
  directionSelect = []
  transferSelect = []

  ticketData.forEach(item => {
    if (item.type === "ticket") {
      citiesSelect.push({id: item.id, value: item.departureCity})
      directionSelect.push({id: item.id, value: item.departureCountry})
      if (item?.meta) {
        if (item.meta[0].name === "Пересадка") {
          transferSelect.push({id: item.id, value: String(item.meta[0].counter)})
        }
      }
    }
  })

  // region Delete Dublicate
  citiesSelect = citiesSelect.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.value === thing.value
      ))
  )
  directionSelect = directionSelect.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.value === thing.value
      ))
  )
  transferSelect = transferSelect.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.value === thing.value
      ))
  )
  // endregion

  // region Sort
  citiesSelect.sort((a, b) => {
    var nameA = a.value.toLowerCase(), nameB = b.value.toLowerCase()

    if (nameA < nameB) //сортируем строки по возрастанию
      return -1
    if (nameA > nameB)
      return 1
    return 0 // Никакой сортировки
  })
  directionSelect.sort((a, b) => {
    var nameA = a.value.toLowerCase(), nameB = b.value.toLowerCase()

    if (nameA < nameB) //сортируем строки по возрастанию
      return -1
    if (nameA > nameB)
      return 1
    return 0 // Никакой сортировки
  })
  transferSelect.sort((a, b) => {
    var nameA = a.value.toLowerCase(), nameB = b.value.toLowerCase()

    if (nameA < nameB) //сортируем строки по возрастанию
      return -1
    if (nameA > nameB)
      return 1
    return 0 // Никакой сортировки
  })
  // endregion

  // region Add start
  citiesSelect.unshift({id:0,value:filtersSelectStart[0]})
  directionSelect.unshift({id:0,value:filtersSelectStart[1]})
  transferSelect.unshift({id:0,value:filtersSelectStart[4]})
  transferSelect.unshift({id:-1,value:filtersSelectStart[3]})
  // endregion

  // region Set select
  selectsFilter.push(new Select('#select1', {
    placeholder: 'Все города',
    data: citiesSelect,
    selectedId: 0,
    numeric: 0,
    onOpen() {
      closeAllSelects()
    },
    onSelect,
  }))
  selectsFilter.push(new Select('#select2', {
    placeholder: 'Все варианты',
    data: directionSelect,
    selectedId: 0,
    onOpen() {
      closeAllSelects()
    },
    numeric: 1,
    onSelect,
  }))
  selectsFilter.push(new Select('#select3', {
    placeholder: 'Все варианты',
    data: [{id: 0, value: "Все варианты"}, {id: 1, value: "Обязательно"}, {id: 2, value: "Без визы"},],
    selectedId: 0,
    numeric: 2,
    onOpen() {
      closeAllSelects()
    },
    onSelect,
  }))
  selectsFilter.push(new Select('#select4', {
    placeholder: 'Все варианты',
    data: transferSelect,
    selectedId: -1,
    numeric: 3,
    onOpen() {
      closeAllSelects()
    },
    onSelect,
  }))
  // endregion
}

function closeAllSelects() {
  selectsFilter.forEach(select => {
    select.close()
  })
}

function onSelect(current,numeric) {
  filtersSelect[numeric] = current.value
  console.log(filtersSelect);
  updateSlides()
}