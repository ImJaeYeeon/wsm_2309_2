//현재 구하자
let now = new Date();
//현재 년
let year = now.getFullYear();
//현재 월
let month = now.getMonth();
month++;

const handler = (event) => {
    //handler에서 year.month.date 정보를 가져와서 url 생성
    let date = event.target.innerHTML;
    const KEY = "3754e02d896842de843e9f4aea3a0a7b";
    const ATPT_OFCDC_SC_CODE = "B10";
    const SD_SCHUL_CODE = "7010569";
    let MLSV_YMD = `${year}${month.toString().padStart(2, 0)}${date.padStart(2, "0")}`;
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;
    // console.log(url);
    getMenuByAPI(url);

}

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

    //mouseover event  자리
    let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");
    for (let gridItem of gridItems) {
        //console.log(gridItem);
        gridItem.onmouseover = handler; //mouseover일 때 , 이벤트 하자
    }

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

//급식API, AJAX 급식데이터 가져오기
//.data-grid-container > .grid-item에 mousover 이벤트 발생하면, handler를 지정

//AJAX로 url 호출하자
const getMenuByAPI = (url) => {
    //XMLHttpRequest 만들자
    let xhr = new XMLHttpRequest();
    //callback
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //success
            // console.log("성공");
            // console.log(xhr.response);
            showMenu(xhr.response);
        } else {
            //fail
        }
    }
    //요청 보낼 방식,url,비동기여부 설정하자
    xhr.open("GET", url, true);
    //요청 전송하자
    xhr.send();
}
const showMenu = (jsonStirng) => {
    console.log(jsonStirng);
    //jsonString -> json
    let json = JSON.parse(jsonStirng);//JSON.stringfy(); json=>Stirng
    console.log(json);
    //json -> 조식,중식,석식
    let breakfastMenu = "없음";
    let lunchMenu = "없음";
    let dinnerMenu = "없음";
    try {
        breakfastMenu = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
        //(5.13.)삭제
        //(열고,숫자,점 여러개)닫고
        breakfastMenu = breakfastMenu.replace(/\([0123456789\.]+\)/g, "");
    } catch {
    }
    try {
        lunchMenu = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"];
        lunchMenu = lunchMenu.replace(/\([0-9\.]+\)/g, "");
    } catch {
    }
    try {
        dinnerMenu = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"];
        dinnerMenu = dinnerMenu.replace(/\(\d\.]+\)/g, "");
    } catch {
    }

    //조식,중식,석식 -> html
    //응답오면, #breakfast, #lunch, #dinner에 호출
    breakfast.innerHTML = breakfastMenu;
    lunch.innerHTML = lunchMenu;
    dinner.innerHTML = dinnerMenu;
}
let dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");
for (let gridItem of gridItems) {
    //console.log(gridItem);
    gridItem.onmouseover = handler; //mouseover일 때 , 이벤트 하자
}




