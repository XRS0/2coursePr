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

function openResume(command, executor) {
    if (executor) {
        if (checkRegister()) {
            console.log(executor);
            
            window.location.href = `./auth.html?${executor}`;
            return;
        }
    }
	const parentOverflow = document.querySelector(".cv-popup-block")
	const resume = document.querySelector(".cv-popup");

    if (command === "") resume.querySelector(".create-cv").setAttribute("onclick", createNewResume);

    parentOverflow.classList.toggle("open");
    resume.classList.toggle("open");

    if (command === "") resume.querySelector(".create-cv").setAttribute("onclick", "createNewResume()");
	else if (command === 1) {
        renderCVs();
        setTimeout(() => cleanResume(resume), 250)
    }
	else if (typeof command == "object") showCreatedResumeOld(command);
	else setTimeout(() => cleanResume(resume), 250);
}

function showCreatedResumeOld(parentDiv) {
	const previewResumeData = parentDiv.querySelectorAll(".preview-resume-data");
	const previewResumeTags = parentDiv.querySelectorAll(".small-tag");
    const resumeBlock = document.querySelector(".cv-popup");
    let button = resumeBlock.querySelector(".create-cv");

    button.textContent = "Назад";
    // button.removeAttribute("onclick");
    // button.setAttribute("onclick", () => openResume());

    resumeBlock.querySelector(".title").textContent = "Просмотр резюме";
	
	let [previewHeader, previewSpes, previewAboutMe] = previewResumeData;
	let [title, tags, checkboxes, aboutMe] = document.querySelectorAll(".resume-data");
	let [previewTitle, ...previewTags] = previewHeader.querySelectorAll("*");

    title.style.color = "#505050";
    checkboxes.style.color = "#505050";
    aboutMe.style.color = "#505050";
	
	title.value = previewTitle.textContent;
	aboutMe.value = previewAboutMe.textContent;

	tags.querySelectorAll(".tag").forEach(tag => {
		for (let i = 0; i < previewResumeTags.length; i++) {
			if (previewTags[i].textContent == tag.textContent) enableTag(tag);
		}
	});

	checkboxes.querySelectorAll("label").forEach(label => {
		if (previewSpes.textContent == label.textContent) {
            document.getElementById(label.attributes[0].nodeValue).checked = true;
            label.style.color = "#FFF";
        }
	});

	const resumeContent = document.querySelector(".popup-content");
	resumeContent.style.pointerEvents = "none";
}

// function showCreatedResume() {}

function renderCVs() {
    let fullBlock = "";
    const cvBlock = document.querySelector(".cv-scroll-block");

    CVs.forEach(i => {
        let stringTags = "";
        i.Tags.forEach(tag => {stringTags +=`
            <div class="small-tag tag" style="color: ${colors[tag]}; background-color: ${colors[tag].slice(0, length - 3) + "0.1)"};">${tag}</div>
        `})
        fullBlock += `
        <div class="cv-container" onclick="openResume(this)">
            <div class="main-part">
                <img src="../assets/images/user-avatar.svg" alt="user">
                <div class="info">
                    <div class="title preview-resume-data">
                        <h2>${i.Title}</h2>
                        ${stringTags}
                    </div>
                    
                    <div class="date">
                        <span style="color: var(--main-purple);">${currentUser.Course} курс</span> <img src="../assets/images/point.svg" style="margin: 0 4px 2px;"> Создано 4 декабря
                    </div>
                    <div class="spec preview-resume-data">${i.Spec}</div>
                </div>
            </div>
    
            <div class="profile-name">
                <div class="title">Имя работника</div>
                <div class="executor">${currentUser.LFM}</div>
            </div>
            
            <div class="sep-line"></div>
    
            <div class="profile-name">
                <div class="title">Информация о работнике</div>
                <div class="description preview-resume-data">${i.AboutMe}</div>
            </div>
        </div>
    `});

    cvBlock.innerHTML = "";
    cvBlock.innerHTML = fullBlock;
}

function cleanResume(resumeDiv) {
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
            <div class="checkboxes-tags-block">
                <div class="tags-block resume-data">
                    <h2>Поиск по тегам</h2>
                    <div class="tags-grid">
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
                    <div class="resume-radio-grid">
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="front1" name='spec'>
                            <label for="front1">FrontEnd</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="back1" name='spec'>
                            <label for="back1">BackEnd</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="des1" name='spec'>
                            <label for="des1">Design</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="sys1" name='spec'>
                            <label for="sys1">SysAdm</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="game1" name='spec'>
                            <label for="game1">GameDev</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="emb1" name='spec'>
                            <label for="emb1">Embeded</label>
                        </div>
                        <div class="radio">
                            <input class="custom-radio" type="radio" id="pm1" name='spec'>
                            <label for="pm1">PM</label>
                        </div>
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

renderCVs();