const dropDownBtn = document.querySelector(".dropdown-button");
const dropDownList = document.querySelector('.dropdown-list');
const dropDownListItems = Array.from(document.querySelectorAll('.dropdown-list-item'));
const dropdownText = document.querySelector('.dropdown-text');

const filterUp = document.querySelector("#filter-up");
const filterDown = document.querySelector("#filter-down");

dropDownBtn.addEventListener('click', e => {
	dropDownList.classList.toggle('dropdown-list--visible');
});

dropDownListItems.forEach(listItem => {
	listItem.addEventListener('click', function (e) {
		e.stopPropagation();
		dropdownText.innerText = this.innerText;
		dropDownBtn.focus();
		dropDownList.classList.remove('dropdown-list--visible');
		if (listItem.id == "new") {
			filterUp.style.filter =  "grayscale(0)"
			filterDown.style.filter =  "grayscale(1)";
		} else {
			filterUp.style.filter =  "grayscale(1)";
			filterDown.style.filter =  "grayscale(0)";
		}
	});
});

document.addEventListener('keydown', e => {
	if (e.key === 'Tab' || e.key === 'Escape') {
		dropDownList.classList.remove('dropdown-list--visible');
	}
});


function enableTag(tag) {
	tag.classList.toggle("disabled-tag");
	if (!tag.style.color) {
		tag.style.color = tag.dataset.color;
		tag.style.backgroundColor = tag.dataset.color.slice(0, length - 3) + "0.1)";
	}
}