//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) {}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) {}

let slider_main = new Swiper('.slider-block__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.slider-block__next',
		prevEl: '.slider-block__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

// let slider_hot = new Swiper('.hot-offer__slider', {
// 	/*
// 	effect: 'fade',
// 	autoplay: {q
// 		delay: 3000,
// 		disableOnInteraction: false,
// 	},
// 	*/
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 0,
// 	autoHeight: true,
// 	speed: 800,
// 	watchOverflow: true,
// 	simulateTouch: false,
// 	hashNavigation: {
// 		watchState: true,
// 	},
// 	//touchRatio: 0,
// 	//simulateTouch: false,
// 	//loop: true,
// 	//preloadImages: false,
// 	//lazy: true,
// 	// Dotts
//
// 	pagination: {
// 		el: '.hot-offer__pagination',
// 		clickable: true,
// 		type: "custom",
// 		renderCustom: function (swiper, current, total) {
// 			let dots = '<p class="pagination-hot-offer__dots">...</p>'
// 			let activeStr = ' _active';
// 			let currentStr = " _current";
// 			let isActive = true;
// 			let isCurrent = true;
// 			let countVisible = 3;
//
// 			if (total < countVisible) {
// 				countVisible = total
// 			}
//
// 			result = `<ul class="pagination-hot-offer__current-list">`
//
// 			if (countVisible == total) {
// 				for (let i = 0; i < countVisible; i++) {
// 					result += `<li><a href="#hot-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
// 				}
// 				result += `</ul>`
// 				return result
// 			}
//
// 			//Если количествено разное
// 			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
// 			//  for (let index = 0; index < total; index++) {
// 			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
// 			//  }
// 			//} else
// 			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
// 				//Стоит в центре
// 				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
// 				result += dots
// 				let startIndex = current - Math.floor(countVisible / 2) - 1
// 				for (let index = startIndex; index < startIndex + countVisible; index++) {
// 					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
// 				}
// 				result += dots
// 				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
// 			} else if ((current - countVisible) < 1) {
// 				//Стоит в начале
// 				let plus = (current - countVisible) == 0 ? 1 : 0;
// 				for (let index = 0; index < countVisible + plus; index++) {
// 					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
// 				}
//
// 				result += dots
// 				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
// 			} else {
// 				//Стоит в конце
// 				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
// 				result += dots
//
// 				let plus = (total - countVisible) < current ? 1 : 0;
// 				for (let index = total - countVisible - plus; index < total; index++) {
// 					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
// 				}
// 			}
//
//
// 			result += `</ul>`
// 			return result
// 		}
// 	},
// 	// Arrows
// 	navigation: {
// 		nextEl: '.hot-offer__next',
// 		prevEl: '.hot-offer__prev',
// 	},
// 	/*
// 	breakpoints: {
// 		320: {
// 		},
// 		768: {
// 			observer: true,
// 			observeParents: true,
// 			slidesPerView: 1,
// 			spaceBetween: 0,
// 			autoHeight: true,
// 			speed: 800,
// 			watchOverflow: true,
// 			simulateTouch: false,
// 		},
// 	},
// 	 */
// 	on: {
//
// 	}
// 	//on: {
// 	//  lazyImageReady: function () {
// 	//    ibg();
// 	//  },
// 	//}
// 	// And if we need scrollbar
// 	//scrollbar: {
// 	//	el: '.swiper-scrollbar',
// 	//},
//
// });

// document.addEventListener("DOMContentLoaded", function(event) {
// 	slider_hot.on('slideChange', function () {
// 		let titleSlider = document.querySelector('.hot-offer__title');
// 		_goto(titleSlider,600)
// 	});
// });

let searchResult = new Swiper('.search-result__tickets', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 100,
	autoHeight: true,
	speed: 800,
	watchOverflow: true,
	hashNavigation: {
		watchState: true,
	},
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.hot-offer__pagination',
		clickable: true,
		type: "custom",
		renderCustom: function (swiper, current, total) {
			let dots = '<p class="pagination-hot-offer__dots">...</p>'
			let activeStr = ' _active';
			let currentStr = " _current";
			let isActive = true;
			let isCurrent = true;
			let countVisible = 3;

			if (total < countVisible) {
				countVisible = total
			}

			result = `<ul class="pagination-hot-offer__current-list">`

			if (countVisible == total) {
				for (let i = 0; i < countVisible; i++) {
					result += `<li><a href="#hot-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
				}
				result += `</ul>`
				return result
			}

			//Если количествено разное
			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
			//  for (let index = 0; index < total; index++) {
			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
			//  }
			//} else
			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
				//Стоит в центре
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots
				let startIndex = current - Math.floor(countVisible / 2) - 1
				for (let index = startIndex; index < startIndex + countVisible; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else if ((current - countVisible) < 1) {
				//Стоит в начале
				let plus = (current - countVisible) == 0 ? 1 : 0;
				for (let index = 0; index < countVisible + plus; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}

				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else {
				//Стоит в конце
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots

				let plus = (total - countVisible) < current ? 1 : 0;
				for (let index = total - countVisible - plus; index < total; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
			}


			result += `</ul>`
			return result
		}
	},
	// Arrows
	navigation: {
		nextEl: '.hot-offer__next',
		prevEl: '.hot-offer__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	//on: {
	//  lazyImageReady: function () {
	//    ibg();
	//  },
	//}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

let articleshResult = new Swiper('.articles-main__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	autoHeight: true,
	speed: 800,
	watchOverflow: true,
	hashNavigation: {
		watchState: true,
	},
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.articles-main__pagination',
		clickable: true,
		type: "custom",
		renderCustom: function (swiper, current, total) {
			let dots = '<p class="pagination-hot-offer__dots">...</p>'
			let activeStr = ' _active';
			let currentStr = " _current";
			let isActive = true;
			let isCurrent = true;
			let countVisible = 3;

			if (total < countVisible) {
				countVisible = total
			}

			result = `<ul class="pagination-hot-offer__current-list">`

			if (countVisible == total) {
				for (let i = 0; i < countVisible; i++) {
					result += `<li><a href="#articles-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
				}
				result += `</ul>`
				return result
			}

			//Если количествено разное
			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
			//  for (let index = 0; index < total; index++) {
			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
			//  }
			//} else
			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
				//Стоит в центре
				result += `<li><a href="#articles-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots
				let startIndex = current - Math.floor(countVisible / 2) - 1
				for (let index = startIndex; index < startIndex + countVisible; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
				result += dots
				result += `<li><a href="#articles-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else if ((current - countVisible) < 1) {
				//Стоит в начале
				let plus = (current - countVisible) == 0 ? 1 : 0;
				for (let index = 0; index < countVisible + plus; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}

				result += dots
				result += `<li><a href="#articles-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else {
				//Стоит в конце
				result += `<li><a href="#articles-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots

				let plus = (total - countVisible) < current ? 1 : 0;
				for (let index = total - countVisible - plus; index < total; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
			}


			result += `</ul>`
			return result
		}
	},
	// Arrows
	navigation: {
		nextEl: '.hot-offer__next',
		prevEl: '.hot-offer__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	//on: {
	//  lazyImageReady: function () {
	//    ibg();
	//  },
	//}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});
