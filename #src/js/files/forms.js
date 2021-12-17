

//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// async function form_submit(e) {
// 	let btn = e.target;
// 	let form = btn.closest('form');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
// 		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
// 		const message = form.getAttribute('data-message');
// 		const ajax = form.getAttribute('data-ajax');
//
// 		//SendForm
// 		if (ajax) {
// 			e.preventDefault();
// 			let formData = new FormData(form);
// 			form.classList.add('_sending');
// 			let response = await fetch(formAction, {
// 				method: formMethod,
// 				body: formData
// 			});
// 			if (response.ok) {
// 				let result = await response.json();
// 				form.classList.remove('_sending');
// 				if (message) {
// 					popup_open('_' + message + '-message');
// 				}
// 				form_clean(form);
// 			} else {
// 				alert("Ошибка");
// 				form.classList.remove('_sending');
// 			}
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		e.preventDefault();
// 	}
// }
//
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
//
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');
//
// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input)) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '') {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
//
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');
//
// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
//
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');
//
// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
//
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
// let isNotSelectActive = true
// let selects = document.getElementsByTagName('select');
// let selectsClassName = ""
// try {
// 	selectsClassName = selects[1].classList[0];
// } catch (error) { }
// if (selects.length > 0) {
// 	selects_init();
// }
//
// function selects_init() {
// 	for (let index = 0; index < selects.length; index++) {
// 		const select = selects[index];
// 		select_init(select, index);
// 	}
// 	//select_callback();
// 	document.addEventListener('click', function (e) {
// 		selects_close(e);
// 	});
// 	document.addEventListener('keydown', function (e) {
// 		if (e.code === 'Escape') {
// 			selects_close(e);
// 		}
// 	});
// }
//
// function selects_close(e) {
// 	const selects = document.querySelectorAll('.select');
// 	if (!e.target.closest('.select')) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_body_options = select.querySelector('.select__options');
// 			select.classList.remove('_active');
// 			select.children[1].children[0].classList.remove('_active');
// 			select.children[1].classList.remove('_active');
// 			_slideUp(select_body_options, 250);
// 		}
// 	}
// }
//
// function select_init(select, index) {
// 	const select_parent = select.parentElement;
// 	const select_modifikator = select.getAttribute('class');
// 	const select_selected_option = select.querySelector('option:checked');
// 	select.setAttribute('data-default', select_selected_option.value);
// 	select.style.display = 'none';
//
// 	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
//
// 	let new_select = select.parentElement.querySelector('.select');
// 	new_select.appendChild(select);
// 	select_item(select, index);
// }
//
// function select_item(select, index) {
// 	const select_parent = select.parentElement;
// 	const select_items = select_parent.querySelector(`.select__item_${index} ${selectsClassName}_item`);
// 	const select_options = select.querySelectorAll('option');
// 	const select_selected_option = select.querySelector('option:checked');
// 	const select_selected_text = select_selected_option.text;
// 	const select_type = select.getAttribute('data-type');
//
// 	if (select_items) {
// 		select_items.remove();
// 	}
//
// 	let select_type_content = '';
// 	if (select_type == 'input') {
// 		select_type_content = `<div class="select__value select__value_${index} ${selectsClassName}_value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="` + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
// 	} else {
// 		select_type_content = `<div class="select__value select__value_${index} ${selectsClassName}_value icon-select-arrow"><span>` + select_selected_text + '</span></div>';
// 	}
//
// 	select_parent.insertAdjacentHTML('beforeend',
// 		`<div class="select__item select__item_${index} ${selectsClassName}_item">` +
// 		`<div class="select__title select__title_${index} ${selectsClassName}_title">` + select_type_content + '</div>' +
// 		`<div class="select__options select__options_${index} ${selectsClassName}_options">` + select_get_options(select_options) + '</div>' +
// 		'</div></div>');
//
// 	select_actions(select, select_parent, index);
// }
//
// function select_actions(original, select, index) {
// 	const select_item = select.querySelector(`.select__item`);
// 	const select_body_options = select.querySelector(`.select__options_${index}`);
// 	const select_options = select.querySelectorAll('.select__option');
// 	const select_type = original.getAttribute('data-type');
// 	const select_input = select.querySelector('.select__input');
// 	const globalIndex = index;
//
// 	select_item.addEventListener('click', function () {
// 		if (isNotSelectActive) {
// 			isNotSelectActive = false
// 			let selects = document.querySelectorAll('.select');
// 			for (let index = 0; index < selects.length; index++) {
// 				const select = selects[index];
// 				const select_body_options = select.querySelector('.select__options');
// 				if (select != select_item.closest('.select')) {
// 					select.classList.remove('_active');
// 					select.children[1].children[0].classList.remove('_active');
// 					select.children[1].classList.remove('_active');
// 					_slideUp(select_body_options, 250);
// 				}
// 			}
// 			_slideToggle(select_body_options, 250);
// 			select.classList.toggle('_active');
// 			select.children[1].children[0].classList.toggle('_active');
// 			select.children[1].classList.toggle('_active');
// 			setTimeout(isNotSelectActive = true, 2500)
// 		}
// 	});
//
// 	for (let index = 0; index < select_options.length; index++) {
// 		const select_option = select_options[index];
// 		const select_option_value = select_option.getAttribute('data-value');
// 		const select_option_text = select_option.innerHTML;
//
// 		if (select_type == 'input') {
// 			select_input.addEventListener('keyup', select_search);
// 		} else {
// 			if (select_option.getAttribute('data-value') == original.value) {
// 				select_option.style.display = 'none';
// 			}
// 		}
// 		select_option.addEventListener('click', function () {
// 			//Логика для фильтров ====================================================================================================
// 			//select_option_text - текст при выборе
// 			filtersSelect[globalIndex] = select_option_text.trim()
// 			updateSlides();
//
//
// 			//====================================================================================================
// 			for (let index = 0; index < select_options.length; index++) {
// 				const el = select_options[index];
// 				el.style.display = 'block';
// 			}
// 			if (select_type == 'input') {
// 				select_input.value = select_option_text;
// 				original.value = select_option_value;
// 			} else {
// 				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
// 				original.value = select_option_value;
// 				select_option.style.display = 'none';
// 			}
// 		});
// 	}
// }
//
// function select_get_options(select_options) {
// 	if (select_options) {
// 		let select_options_content = '';
// 		for (let index = 0; index < select_options.length; index++) {
// 			const select_option = select_options[index];
// 			const select_option_value = select_option.value;
// 			if (select_option_value != '') {
// 				const select_option_text = select_option.text;
// 				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
// 			}
// 		}
// 		return select_options_content;
// 	}
// }
//
// function select_search(e) {
// 	let select_item = select.querySelector(`.select__item`);
// 	let select_title = select.querySelector(`.select__title`);
// 	let select_block = e.target.closest('.select ').querySelector('.select__options');
// 	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
// 	let select_search_text = e.target.value.toUpperCase();
//
// 	for (let i = 0; i < select_options.length; i++) {
// 		let select_option = select_options[i];
// 		let select_txt_value = select_option.textContent || select_option.innerText;
// 		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
// 			select_option.style.display = "";
// 		} else {
// 			select_option.style.display = "none";
// 		}
// 	}
// }
//
// function selects_update_all() {
// 	let selects = document.querySelectorAll('select');
// 	if (selects) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			select_item(select);
// 		}
// 	}
// }

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
				}
			});
		}
	}
}

function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}

function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//RANGE
const priceSlider = document.querySelector('.return-main-info-ticket__range');
if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [10, 45],
		behaviour: 'drag',
		step: 1,
		connect: true,
		range: {
			'min': 1,
			'max': 60
		}
	});
}

const filterSlider = document.querySelector('.filters-search-result__range');
if (filterSlider) {
	noUiSlider.create(filterSlider, {
		start: [10, 45],
		behaviour: 'drag',
		step: 1,
		connect: true,
		range: {
			'min': 1,
			'max': 60
		}
	});
}