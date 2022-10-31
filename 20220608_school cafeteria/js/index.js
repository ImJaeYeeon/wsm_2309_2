//오늘의 날짜
const showToday = () => {
    //오늘의 년, 월, 일, 요일 구하자
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay(); //dydlf:0-6: 0:일요일

    let namesOfDaysOfTheweek_array = ["일", "월", "화", "수", "목", "금", "토"];
    day = namesOfDaysOfTheweek_array[day];
    let title = `${year}.${month}.${date}.(${day})`;
    //console.log(title);
    //HTML에 표시
    //let cardDateDivs = document.getElementsByClassName("card-date");
    let cardDateDivs = document.querySelectorAll(".card-date");
    console.log(cardDateDivs);
    for (cardDateDivs of cardDateDivs) {
        cardDateDivs.innerHTML = title;
    }
}
showToday();

//다가올 급식에 강조
const addNow = (mainCardId) => {
    //html -> js
    const mainCard = document.getElementById(mainCardId);

    //지금 몇시? 다음 식사 -> 몇번째 카드인지
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    // console.log(`${hour}시 ${minute}분`);
    let minutes = hour * 60 + minute; //현재 시와 분을 통해 분으로 단위통일

    //지금 시각 -> index
    //조식 끝: 7:30 -> 1
    //중식 끝: 13:10 -> 2
    //석식 끝: 18:10 -> 0
    let index = 0;
    if (18 * 60 + 10 <= minutes) {  //18:10 <= now
        index = 0;
    } else if (13 * 60 + 10 <= minutes) { //13:10 <= now
        index = 2;
    } else if (7 * 60 + 30 <= minutes) { //7:30 <= now
        index = 1;
    } else {
        index = 0;
    }

    let selectedCard = mainCard.getElementsByClassName('card')[index];
    //now 클래스 추가
    selectedCard.classList.add('now');
}
addNow('main-card');

//오늘의 급식 메뉴 표시하자
const showTodayMenu = () => {
    //년,월,일 구하고
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    //급식 API 구하고
    const KEY = "3754e02d896842de843e9f4aea3a0a7b";
    const ATPT_OFCDC_SC_CODE = "B10";
    const SD_SCHUL_CODE = "7010569";
    let MLSV_YMD = `${year}${month.toString().padStart(2, 0)}${date.toString().padStart(2, "0")}`;
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;
    //console.log(url);

    //비동기로 호출하자
    //응답오면 표시하자
    fetch(url).then((response) => response.json()).then((json) => console.log(json));
}
showTodayMenu();