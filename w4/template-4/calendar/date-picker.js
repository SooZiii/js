import Calendar from "./calendar.js";

export default class DatePicker {
  constructor(datePickerEl) {
    this.datePickerEl = datePickerEl;
    this.init();
    this.selectedDate = null;
  }

  init() {
    const template = document.querySelector("#calendar-template");
    const calendarEl = template.content.cloneNode(true).querySelector(".calendar");
    calendarEl.style.display = "none";

    this.calendar = new Calendar(calendarEl);
    this.datePickerEl.setAttribute("readonly", "readonly");
    this.handleDatePickerFocus();
    this.handleOutsideClicks();
    this.handleDateSelection();

    this.datePickerEl.parentElement.insertBefore(calendarEl, this.datePickerEl.nextSibling);

    this.positionCalendar();
  }

  showCalendar() {
    this.datePickerEl.parentElement.appendChild(this.calendar.calendarEl);
    this.calendar.calendarEl.style.display = "block";

    // 선택한 날짜가 있으면 해당 날짜의 셀에 selected 클래스 추가
    if (this.selectedDate) {
      const selectedCell = this.calendar.calendarEl.querySelector(
        `[data-date="${this.selectedDate}"]`
      );
      if (selectedCell) {
        selectedCell.classList.add("selected");
      }
    }
  }

  hideCalendar() {
    if (this.calendar.calendarEl.parentElement) {
      this.calendar.calendarEl.parentElement.removeChild(this.calendar.calendarEl);
    }
  }

  handleDatePickerFocus() {
    this.datePickerEl.addEventListener("focus", () => {
      this.showCalendar();
    });
  }

  handleOutsideClicks() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".calendar") && !e.target.closest(".date-picker")) {
        if (this.calendar.calendarEl.parentElement) {
          this.hideCalendar();
        }
      }
    });
  }

  handleDateSelection() {
    this.calendar.calendarEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("calendar-cell")) {
        const selectedDay = e.target.textContent;

        let adjustedMonth = this.calendar.currentMonth;
        let adjustedYear = this.calendar.currentYear;

        if (e.target.classList.contains("prev-month")) {
          if (adjustedMonth < 0) {
            adjustedMonth = 11;
            adjustedYear -= 1;
          }
        } else if (e.target.classList.contains("next-month")) {
          if (adjustedMonth > 11) {
            adjustedMonth = 0;
            adjustedYear += 1;
          }
        }

        if (
          adjustedMonth !== this.calendar.currentMonth ||
          adjustedYear !== this.calendar.currentYear
        ) {
          const lastDayOfPrevMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();

          if (selectedDay > lastDayOfPrevMonth) {
            adjustedMonth += 1;

            if (adjustedMonth > 11) {
              adjustedMonth = 0;
              adjustedYear += 1;
            }
          }
        }

        const adjustedDate = `${adjustedYear}-${String(adjustedMonth + 1).padStart(
          2,
          "0"
        )}-${String(selectedDay).padStart(2, "0")}`;
        this.datePickerEl.value = adjustedDate;
        this.hideCalendar();

        // 선택한 날짜에 동그라미 표시 추가
        this.selectedDate = adjustedDate;
        const selectedCell = e.target;
        selectedCell.classList.add("selected");
      }
    });
  }

  positionCalendar() {
    const datePickerRect = this.datePickerEl.getBoundingClientRect();

    const calendarHeight = this.calendar.calendarEl.offsetHeight;
    const windowHeight = window.innerHeight;
    const top = datePickerRect.bottom + window.pageYOffset;
    const bottom = top + calendarHeight;
    const bottomOverlap = bottom - windowHeight;

    if (bottomOverlap > 0) {
      this.calendar.calendarEl.style.top = `${top - bottomOverlap}px`;
    } else {
      this.calendar.calendarEl.style.top = `${top}px`;
    }

    this.calendar.calendarEl.style.left = `${datePickerRect.left + window.pageXOffset}px`;
  }
}
