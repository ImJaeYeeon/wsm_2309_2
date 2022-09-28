//현재 구하자
let now = new Date();
//현재 년
let year = now.getFullYear();
//현재 월
let month = now.getMonth();
month++;

const setCalendar = (year, month) => {

    //1일이 무슨 요일?
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = firstDate.getDay();
    //말일은 며칠?
    let lastDate = new Date(year, month, 0).getDate();
    //제목 표시하자
    const setTitle = (year, month) => {
        // console.log(`${year}년 ${month}월`);
        // let title_year = document.getElementById("title_year");
        title_year.innerHTML = year;
        // let title_month = document.getElementById("title_month");
        title_month.innerHTML = month;
    }
    setTitle(year, month)

    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
    dateGridContainerDiv.innerHTML = "";
    //1~말일까지 grid-item 만들자
    for (let i = 1; i <= lastDate; i++) {
        //요소 만들자
        let newDiv = document.createElement("div");
        //class에 grid-item 넣자
        newDiv.classList.add("grid-item");
        //text에 숫자 넣자
        newDiv.innerHTML = i;
        //부모의 newDiv 달자
        dateGridContainerDiv.appendChild(newDiv);

    }
    //1일에 해당하는 div를 grid-column-start: 요일 +1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumn = firstDay + 1;
}
setCalendar(year, month);
//이전 달 달력 보이자
const prevMonth = () => {
    month--;

    if (month < 1) {
        month = 12;
        year--;
    }
    setCalendar(year, month);
}
//다음 달 달력 보이자
const nextMonth = () => {
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    setCalendar(year, month);
}
const initButton = () => {
    //html => js
    // const prev_btn = document.getElementById("prev_btn");
    // const next_btn = document.getElementById("next_btn");

    //js event 넣자
    // prev_btn.addEventListener("click", prevMonth);
    // next_btn.addEventListener("click", nextMonth);
    prev_btn.onclick = prevMonth;
    next_btn.onclick = nextMonth;
}
initButton();
