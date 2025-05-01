
$(function () {
  const weekHeader = $("#calendar>thead");
  const weekBody = $("tbody.week");
  const today = new Date();
  createCalendar(weekHeader, weekBody, today); // カレンダー作成
  selectCalender(weekHeader, weekBody, today);
  switchCalender(weekHeader, weekBody, today);

});


function createCalendar(weekHeader, weekBody, dateObj) {

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  const weekLength = weeks.length;

  $("#days-title").html("<span id='year-string'>" + year + "</span>" + '年' + "<span id='month-string'>" + month + "</span>" + "月"); //年 月
  const beforeDate = new Date(year, month - 1, 0).getDate();

  const startDateOfMonth = new Date(year, month - 1, 1); //取得する月の1日の情報
  const startDay = startDateOfMonth.getDay();

  const lastDateOfMonth = new Date(year, month, 0); //取得する月の最終日の情報
  const lastDay = lastDateOfMonth.getDate();

  // 曜日ヘッダー
  const dayHeader = $("<tr></tr>");
  if (weekHeader) {
    dayHeader.appendTo(weekHeader);
    $.map(weeks, function (n, index) {
      if (index === 0) {
        dayHeader.append($('<th>', { class: 'w0', text: n }));
      } else if (index === weekLength - 1) {
        dayHeader.append($('<th>', { class: 'w6', text: n }));
      } else {
        dayHeader.append($('<th>', { text: n }));
      }
    });
  }
  // カレンダー
  let date = startDateOfMonth.getDate();
  let day = startDay;
  let week = 0;

  while (date <= lastDay) {// 1から31日まで
    const body = weekBody;
    const weekBox = $('<tr>', { class: 'week_area' });
    if ($('.week_area').length === 0) { //一週目
      body.append(weekBox);
    }
    if (weekLength - day === 0) { // 二週目以降
      body.append(weekBox);
      week++;
      day = 0;
    }

    if (day === startDay) {//前の月の日付を追加
      for (let i = 0; i < day - date + 1; i++) {
        $('.week_area').eq(week).append($('<td>', { class: "before-month-date", text: beforeDate - (day - 1 - i) }));
      }
    }

    $('.week_area').eq(week).append($('<td>', { text: date })); // 日付を追加

    if (date >= lastDay) { //次の月の日付を追加
      for (let i = 0; i < weekLength - 1 - day; i++) {
        $('.week_area').eq(week).append($('<td>', { class: "next-month-date", text: i + 1 }));
      }
    }

    date++;
    day++;
  }
  addHoliday(year, month);
  function addHoliday(year, month) {
    const holidayData = 'data/syukujitsu.csv';
    $.get(holidayData, function (data) {
      const resultArray = data.split("\r\n");
      let holidayObj = {}; //休日オブジェクト
      resultArray.map((row) => { //CSVを分割してオブジェクトに変換
        const split = row.split(",");
        const id = split[0];
        const holiday = split[1];
        holidayObj[id] = holiday;
      });
  
      $.map($(".week_area td"), (n, index) => {
        const date = n.textContent;
        const holidayText = holidayObj[year + "/" + month + "/" + date];
        if ($(n).attr('class') === "before-month-date") {
          const preHoliday = holidayObj[(month === 1 ? year - 1 : year) + "/" + (month === 1 ? 12 : month - 1) + "/" + date];
          if (preHoliday) {
            decorateHoliday(n, preHoliday);
          }
        }
  
        if (holidayText && n.classList.length === 0) {//休日があったら変更
          decorateHoliday(n, holidayText);
        }
  
        if ($(n).attr('class') === "next-month-date") {
          const nextHoliday = holidayObj[(month === 12 ? year + 1 : year) + "/" + (month === 12 ? 1 : month + 1) + "/" + date];
          decorateHoliday(n, nextHoliday);
        }
      })
  
      function decorateHoliday(n, holidayText) {
        if (holidayText) {//休日があったら変更
          $(n).css("backgroundColor", "rgb(255, 139, 139)");
          $(n).append($("<div>", { text: holidayText }));
        }
      }
    });

  }
}

function selectCalender(weekHeader, weekBody, dateObj) {
  let setYear = dateObj.getFullYear();
  let setMonth = dateObj.getMonth() + 1;

  const selectYear = $("#select-year");
  const selectMonth = $("#select-month");
  // ここで一度空にする
  selectYear.empty();
  selectMonth.empty();

  // 西暦と年を選んでカレンダーを更新
  $.each([...Array(27)].map((_, i) => 2000 + i), function (index, year) { //西暦プルダウン生成
    const isYear = setYear === year;
    const option = $('<option>', { value: year - 1, text: year, selected: isYear });
    selectYear.append(option);
  });

  $.each([...Array(12)].map((_, i) => 1 + i), function (index, month) {//月プルダウン生成
    const isYear = setMonth === month;
    const option = $('<option>', { value: month - 1, text: month, selected: isYear });
    selectMonth.append(option);
  });

  selectYear.change((e) => { updateCalendar() });
  selectMonth.change((e) => { updateCalendar() });

  function updateCalendar() {
    setYear = Number($('#select-year option:selected').val()) + 1;
    setMonth = Number($('#select-month option:selected').val());
    const dateObj = new Date(setYear, setMonth);
    deleteCalendar();
    createCalendar(weekHeader, weekBody, dateObj);
  }

  function deleteCalendar() {
    $('#calendar thead tr').remove();
    $('#calendar tbody tr').remove();
  }

}

function switchCalender(weekHeader, weekBody, dateObj) {
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();

  $('#left-arrow').click(e => { e.preventDefault(); updateCalendar(-1); });
  $('#right-arrow').click(e => { e.preventDefault(); updateCalendar(1); });

  function updateCalendar(offset) {
    setYear = Number($('#year-string').text()) ;
    setMonth = Number($('#month-string').text());
    year = year !== setYear ? setYear : year;
    month = month !== setMonth ? setMonth - 1 : month;
    const newMonth = new Date(year, month + offset);
    deleteCalendar();
    createCalendar(weekHeader, weekBody, newMonth);
    month += offset;
    if (month < 0) { year--; month = 11; }
    if (month > 11) { year++; month = 0; }
    updateSelect(1, year, month);
  }
  function deleteCalendar() {
    $('#calendar thead tr').remove();
    $('#calendar tbody tr').remove();
  }
  function updateSelect(offset, year, month) {
    const yearOption = $("#select-year option");
    const monthOption = $("#select-month option");
    yearOption.filter(function () {
      return $(this).text() === String(year);
    }).prop('selected', true);
  
    monthOption.filter(function () {
      return $(this).text() === String(month + offset);
    }).prop('selected', true);
  
  }

}

