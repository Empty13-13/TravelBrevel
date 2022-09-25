document.addEventListener('DOMContentLoaded', (event) => {

  const menuBtn = document.querySelector('.menu__btn');
  const input2 = document.querySelectorAll('.autocomplete-wrap')[1]
  const input1 = document.querySelectorAll('.autocomplete-wrap')[0]
  menuBtn.addEventListener('click', (event) => {
    event.preventDefault()
    let data1 = searchInputs[0].dataset.value
    let data2 = searchInputs[1].dataset.value
    if (data1.length > 0 && data2.length > 0) {

      if (data1 == data2) {
        searchInputs[1].classList.add('_error')
        let tip = document.querySelectorAll('.antother-city')[1]
        tip.classList.add('_active');

        return false
      }
      let tempSelectedDay = String(selectedDay).length == 1 ? `0${selectedDay}` : selectedDay
      let tempSelectedMonth = String(selectedMonth).length == 1 ? `0${selectedMonth + 1}` : selectedMonth + 1
      let tempSelectedYear = String(year).substr(2, 2)
      let tempSelectedDay2 = isNaN(selectedDay2) || !selectedDay2 ? "" : String(selectedDay2).length == 1 ? `0${selectedDay2}` : selectedDay2
      let tempSelectedMonth2 = isNaN(selectedMonth2) || !selectedMonth2 ? "" : String(selectedMonth2).length == 1 ? `0${selectedMonth2 + 1}` : selectedMonth2 + 1
      let tempSelectedYear2
      if (String(selectedYear2).length > 2) {
        tempSelectedYear2 = String(selectedYear2).substr(2, 2)
      } else {
        tempSelectedYear2 = String(selectedYear2)
      }
      //let tempSelectedYear2 = String(selectedYear2) //isNaN(year2) || !selectedYear2 ? "" : String(selectedYear2).substr(2, 2)
      tempPeoplesGrown = document.getElementsByClassName('peoples-filter__grown-num')[0].innerHTML
      tempPeoplesChild = document.getElementsByClassName('peoples-filter__child-num')[0].innerHTML
      tempPeoplesBaby = document.getElementsByClassName('peoples-filter__baby-num')[0].innerHTML
      tempPeoplesNum = document.getElementsByClassName('menu__select-num')[0].outerHTML

      document.location.href = `./searchresult.html?search=${searchInputs[0].dataset.value.split('\n')[1]}` +
        `${tempSelectedDay}${tempSelectedMonth}${tempSelectedYear}` +
        `${searchInputs[1].dataset.value.split('\n')[1]}${tempSelectedDay2}${tempSelectedMonth2}${tempSelectedYear2}` +
        `${tempPeoplesGrown}${tempPeoplesChild}${tempPeoplesBaby}`;
    } else {
      if (!data1.length > 0) {
        searchInputs[0].classList.add('_error')
        let tip = document.querySelectorAll('.empty-city')[0]
        tip.innerHTML = "Укажите город отправления"
        tip.classList.add('_active');
      }
      if (!data2.length > 0) {
        searchInputs[1].classList.add('_error')
        let tip = document.querySelectorAll('.empty-city')[1]
        tip.classList.add('_active');

        return false
      }
    }
  })

  let searchFilters = document.querySelector('.search-result__filters');
  let searchBtnFilters = document.querySelector('.search-result__filters-btn');
  if (searchFilters && searchBtnFilters) {
    searchBtnFilters.addEventListener("click", function (e) {
      //menuPageBurger.classList.toggle('_active');
      _slideToggle(searchFilters);
    });
  }

  let resultCheckbox = document.querySelectorAll('.filters-search-result__checkbox');
  if (resultCheckbox.length > 0) {
    resultCheckbox[0].addEventListener("change", function (e) {
      if (this.checked) {
        for (let i = 0; i < resultCheckbox.length; i++) {
          resultCheckbox[i].checked = true;
        }
      }
    });
    for (let i = 1; i < resultCheckbox.length; i++) {
      const element = resultCheckbox[i];
      element.addEventListener("change", function (e) {
        if (!this.checked) {
          resultCheckbox[0].checked = false;
        }
      });
    }
  }

  let trash = document.querySelectorAll('#trash')[0]
  if (trash && spollersGo && filterSlider) {
    trash.addEventListener("click", function (e) {
      spollersGo = false
      for (let i = 0; i < resultCheckbox.length; i++) {
        const element = resultCheckbox[i];
        element.checked = false;
      }
      filterSlider.noUiSlider.updateOptions({
        start: [10, 45],
      });
      setTimeout(function () {
        spollersGo = true;
      }, 500);
    });
    trash.addEventListener("mouseover", function (e) {
      this.classList.toggle("_active");
    });
    trash.addEventListener("mouseout", function (e) {
      this.classList.toggle("_active");
    });

  }

  let menuPageBurger = document.querySelector('.up-header__btn-search');
  let menuPageBody = document.querySelector('.header__menu');
  let openBurger = sessionStorage.getItem('burger') == 'true' ? true : false
  if (menuPageBurger && menuPageBody) {
    menuPageBurger.addEventListener("click", function (e) {
      //menuPageBurger.classList.toggle('_active');
      _slideToggle(menuPageBody);
      openBurger = !openBurger;
      sessionStorage.setItem('burger', openBurger)
    });
  }

  if (openBurger) {
    _slideToggle(menuPageBody, 0); // Операция, которая должна быть выполнена
  }


  async function fetchData(url) {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }
})
