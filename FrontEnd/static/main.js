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

function openResume(div = null) {
	const parentOverflow = document.querySelector(".cv-popup-block")
	const resume = document.querySelector(".cv-popup");

    parentOverflow.classList.toggle("open");
    resume.classList.toggle("open");

    // if (div.parentElement.className == "cv-popup") createCV(collectResumeData());

	if (div) showCreatedResume(div);
	else setTimeout(() => closeResume(resume), 300);
}

function showCreatedResume(parentDiv) {
	const previewResumeData = parentDiv.querySelectorAll(".preview-resume-data");
	const previewResumeTags = parentDiv.querySelectorAll(".small-tag");
	
	let [previewHeader, previewSpes, previewAboutMe] = previewResumeData;
	let [title, bio, tags, checkboxes, aboutMe] = document.querySelectorAll(".resume-data");
	let [previewTitle, ...previewTags] = previewHeader.querySelectorAll("*");
	
	title.value = previewTitle.textContent;
	bio.value = "on DataBase";
	aboutMe.value = previewAboutMe.textContent;

	tags.querySelectorAll(".tag").forEach(tag => {
		for (let i = 0; i < previewResumeTags.length; i++) {
			if (previewTags[i].textContent == tag.textContent) enableTag(tag);
		}
	});

	checkboxes.querySelectorAll("label").forEach(label => {
		if (previewSpes.textContent == label.textContent) document.getElementById(label.attributes[0].nodeValue).checked = true;
	});

	const resumeContent = document.querySelector(".popup-content");
	resumeContent.style.pointerEvents = "none";
}

function closeResume(resumeDiv) {
	resumeDiv.innerHTML = `
        <div class="title">
            Cоздание резюме
            <img src="../assets/images/resume-title-icon.svg">
        </div>
        
        <div class="popup-content">
            <div class="input-field">
                <div class="input-title">Заголовок резюме</div>
                <input type="text" placeholder="Название резюме" class="resume-data">
            </div>
    
            <div class="input-field">
                <div class="input-title">Контактные данные</div>
                <input type="text" placeholder="Почта или номер" class="resume-data">
            </div>
            <div class="checkboxes-tags-block">
                <div class="tags-block resume-data">
                    <h2>Поиск по тегам</h2>
                    <div class="tags-grid ">
                        <div class="tag disabled-tag" data-color="rgba(0, 112, 255, 1)" onclick="enableTag(this)">#HTML/CSS</div>
                        <div class="tag disabled-tag" data-color="rgba(255, 149, 0, 1)" onclick="enableTag(this)">#JavaScript</div>
                        <div class="tag disabled-tag" data-color="rgba(255, 4, 105, 1)" onclick="enableTag(this)">#React</div>
                        <div class="tag disabled-tag" data-color="rgba(0, 255, 242, 1)" onclick="enableTag(this)">#GoLang</div>
                        <div class="tag disabled-tag" data-color="rgba(255, 246, 0, 1)" onclick="enableTag(this)">#Java</div>
                        <div class="tag disabled-tag" data-color="rgba(0, 255, 9, 1)" onclick="enableTag(this)">#C/C#</div>
                        <div class="tag disabled-tag" data-color="rgba(255, 0, 0, 1)" onclick="enableTag(this)">#C++</div>
                        <div class="tag disabled-tag" data-color="rgba(149, 255, 0, 1)" onclick="enableTag(this)">#Web</div>
                        <div class="tag disabled-tag" data-color="rgba(255, 0, 200, 1)" onclick="enableTag(this)">#UX/UI</div>
                    </div>
                </div>

                <div class="spec-block resume-data">
                    <h3>Специальность</h3>
                    <div class="checkboxes">
                        <input type="checkbox" class="filter-checkbox" id="front1"value="yes">
                        <label for="front1">FrontEnd</label>
                        <input type="checkbox" class="filter-checkbox" id="back1"value="yes">
                        <label for="back1">BackEnd</label>
                        <input type="checkbox" class="filter-checkbox" id="des1"value="yes">
                        <label for="des1">Design</label>
                        <input type="checkbox" class="filter-checkbox" id="sys1"value="yes">
                        <label for="sys1">SysAdm</label>
                        <input type="checkbox" class="filter-checkbox" id="game1"value="yes">
                        <label for="game1">GameDev</label>
                        <input type="checkbox" class="filter-checkbox" id="emb1" value="yes">
                        <label for="emb1">Embeded</label>
                        <input type="checkbox" class="filter-checkbox" id="pm1" value="yes">
                        <label for="pm1">PM</label>
                    </div>
                </div>
            </div>

            <div class="input-field">
                <div class="input-title">Напишите о себе</div>
                <textarea type="text" placeholder="Напишите пару строк" class="resume-data"></textarea>
            </div>
        </div>
        <div class="create-cv" onclick="openResume()">Создать</div>
	`
};

function collectResumeData() {
	let [title, bio, tags, spec, aboutMe] = document.querySelectorAll(".resume-data");
	let [previewTitle, ...previewTags] = previewHeader.querySelectorAll("*");

    tags = Array.from(tags.querySelectorAll(".tag").map(tag => tag.textContent));
    spec.parentElement.querySelectorAll("label").forEach(l => {
        if(l.attributes[0].nodeValue == spec.id) spec = l.textContent;
    });

    return {
        title: title.textContent,
        spec,
        tags,
        aboutMe: aboutMe.value
    }
}