<!DOCTYPE html>
<html lang="jp">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>カレンダー</title>
  <link href="css/calendar.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.14.1/jquery-ui.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/i18n/jquery.ui.datepicker-ja.min.js"></script>
  <script src="js/calendar.js"></script>

</head>

<body>
  <div>
    <h3>カレンダー</h3>
    <div class="pull-down-group">
      <select name="year" id="select-year">
      </select>
      <p>年</p>
      <select name="month" id="select-month">
      </select>
      <p>月</p>
    </div>

    <div>

      <div class="arrows">

        <button class="arrow-btn" type="button" id="left-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path
              d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </button>
        <div id="days-title"></div>
        <button class="arrow-btn " type="button" id="right-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path
              d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>

      </div>

      <table id="calendar">
        <thead></thead>
        <tbody class="week"></tbody>
      </table>
    </div>

  </div>

</body>

</html>