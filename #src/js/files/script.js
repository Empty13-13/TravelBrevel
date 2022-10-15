document.addEventListener('DOMContentLoaded', (event) => {



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
  let openBurger = sessionStorage.getItem('burger') === 'true'
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
