const popupBtn = document.querySelector('.first-section .primary-btn');
const popupWin = document.querySelector('.window-background');
const closeBtn = popupWin.querySelector('.close-btn');
const resetBtn = popupWin.querySelector('.reset-counter');
let textTimes = popupWin.querySelector('.click-times');

const initCount = sessionStorage.getItem("myCount");
// open popup
popupBtn.addEventListener('click', () => {
    popupWin.style.display = 'flex'
    function clickCounter() {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.clickCount) {
                localStorage.clickCount = Number(localStorage.clickCount) + 1;
            } else {
                localStorage.clickCount = 1;
            }
            textTimes.innerText = `${localStorage.clickCount} times`;
        }
    }
    clickCounter();
    // reset counter
    if (localStorage.clickCount > 5) {
        resetBtn.style.display = 'flex';
        resetBtn.addEventListener('click', function () {
            localStorage.clickCount = 0
            textTimes.innerText = `${localStorage.clickCount} times`;
            this.style.display = 'none';
        });
    }
});

// close popup
popupWin.addEventListener("click", function (e) {
    this.querySelector(".window-body").contains(e.target) || (this.style.display = "none");
});
closeBtn.addEventListener("click", () => popupWin.style.display = "none");