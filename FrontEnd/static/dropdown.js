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
	listItem.addEventListener('click', function(e) {
		e.stopPropagation();
		dropdownText.innerText = this.innerText;
		dropDownBtn.focus();
		sortCVs(this.id);
		dropDownList.classList.remove('dropdown-list--visible');
		if (listItem.id.includes("new")) {
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

function sortCVs(optionId) {
	if (optionId.includes("Date")) {
		optionId.includes("new") ? CVs.sort((a, b) => a.Date - b.Date) : CVs.sort((a, b) => b.Date - a.Date);
	} else {
		optionId.includes("new") ? CVs.sort((a, b) => a.Course - b.Course) : CVs.sort((a, b) => b.Course - a.Course);
	}
	renderCVs();
}