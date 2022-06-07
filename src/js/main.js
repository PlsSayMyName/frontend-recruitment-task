const popupBtn = document.querySelector('.first-section .primary-btn');
const popupWin = document.querySelector('.window-background');
const closeBtn = popupWin.querySelector('.close-btn');
const resetBtn = popupWin.querySelector('.reset-counter');
let textTimes = popupWin.querySelector('.click-times');
const initCount = sessionStorage.getItem('myCount');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const table = document.querySelector('.additional-task table');
const loader = document.querySelector('.loader');
// open popup
popupBtn.addEventListener('click', () => {
    popupWin.style.display = 'flex';
    // counter
    function clickCounter() {
        if (typeof (Storage) !== 'undefined') {
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

    // additional task
    getData();
    async function getData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        !response ? showLoader() : hideLoader();
        showData(data);
    }
    function showLoader() {
        loader.style.display = 'flex';
    }
    function hideLoader() {
        loader.style.display = 'none';
    }
    function showData(data) {
        data.forEach((item) => {
            const { name, email, address, phone, company } = item;
            const dataEl = document.createElement("tr");
            dataEl.innerHTML = `
                <td>${name}</td>
                <td>${email}</td>
                <td>${address.city}, ${address.street}, ${address.suite}</td>
                <td>${phone}</td>
                <td>${company.name}</td>
            `;
            table.appendChild(dataEl);
        });
    }
});
// close popup
popupWin.addEventListener('click', function (e) {
    this.querySelector('.window-body').contains(e.target) || (this.style.display = 'none');
});
closeBtn.addEventListener('click', () => popupWin.style.display = 'none');
