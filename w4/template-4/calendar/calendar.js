export default class Calendar {
  constructor(calendarEl) {
    this.calendarEl = calendarEl;
    this.calendarGridEl = this.calendarEl.querySelector(".calendar-grid");
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.init();
  }

  init() {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.renderCalendar();
    this.handleNavButtonClicks();
    this.handleDateClicks();
  }

  renderCalendar() {
    const monthDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    // Clear previous calendar cells
    this.calendarGridEl.innerHTML = "";

    // Set month and year label
    this.calendarEl.querySelector(".month-year-label").textContent = `${
      this.monthNames[this.currentMonth]
    } ${this.currentYear}`;

    // Render last month days
    for (let i = firstDay - 1; i >= 0; i -= 1) {
      const lastMonthDay = lastMonthDays - i;
      const cell = this.createCalendarCell(lastMonthDay, "prev-month");
      this.calendarGridEl.appendChild(cell);
    }

    // Render current month days
    for (let i = 1; i <= monthDays; i += 1) {
      const cell = this.createCalendarCell(i);
      if (
        i === this.today.getDate() &&
        this.currentMonth === this.today.getMonth() &&
        this.currentYear === this.today.getFullYear()
      ) {
        cell.classList.add("today");
      }
      this.calendarGridEl.appendChild(cell);
    }

    // Render next month days
    const remainingDays = 7 - ((monthDays + firstDay) % 7);
    for (let i = 1; i < remainingDays; i += 1) {
      const cell = this.createCalendarCell(i, "next-month");
      this.calendarGridEl.appendChild(cell);
    }
  }

  createCalendarCell(day, monthType) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");
    cell.textContent = day;

    if (monthType === "prev-month" || monthType === "next-month") {
      cell.classList.add(monthType);
    }

    if (new Date(this.currentYear, this.currentMonth, day).getDay() === 0) {
      cell.style.color = "red";
    }

    cell.dataset.date = `${this.currentYear}-${String(this.currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return cell;
  }

  handleNavButtonClicks() {
    const prevMonthBtn = this.calendarEl.querySelector(".prev-month-btn");
    const nextMonthBtn = this.calendarEl.querySelector(".next-month-btn");

    prevMonthBtn.addEventListener("click", () => {
      this.currentMonth -= 1;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      }
      this.renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
      this.currentMonth += 1;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      }
      this.renderCalendar();
    });
  }

  handleDateClicks() {
    this.calendarEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("calendar-cell")) {
        // 수정: 이전 달 및 다음 달의 날짜를 클릭하면 해당 월에 맞춰서 날짜를 변경
        if (e.target.classList.contains("prev-month")) {
          this.currentMonth -= 1;
          if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
          }
        } else if (e.target.classList.contains("next-month")) {
          this.currentMonth += 1;
          if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
          }
        }

        // 선택한 날짜의 월에 따라 캘린더를 다시 렌더링
        this.renderCalendar();
      }
    });
  }
}
