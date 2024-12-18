const mainSearchInput = document.querySelector('.filter-input');
let copiedCV
setTimeout(() => copiedCV = [...CVs], 400);

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