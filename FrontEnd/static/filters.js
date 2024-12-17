const mainSearchInput = document.querySelector('.filter-input');
const copiedCV = CVs;
mainSearchInput.addEventListener("input", () => setTimeout(getSearchedCV, 400));

function getSearchedCV() {
    let newCvArr = [];
    
    if (mainSearchInput.value == "") CVs = copiedCV;
    else {
        CVs = copiedCV;
        CVs.forEach(cv => {
            if(cv.Title.toLowerCase().includes(mainSearchInput.value.toLowerCase()))
                newCvArr.push(cv);
        });
        CVs = newCvArr;
    }
    renderCVs();
}