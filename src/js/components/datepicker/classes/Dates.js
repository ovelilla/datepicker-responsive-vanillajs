import { dates } from "../modules/Dates.js";

class Dates {
    constructor(data) {
        Object.assign(this, data);

        this.dates = [];

        this.todayDate = null;
        this.currentDate = null;
        this.selectedDate = null;

        this.init();
    }

    init() {
        this.initDates();
        this.setDates();
    }

    initDates() {
        this.todayDate = dates.dateFromDatetime(new Date());
        this.currentDate = dates.dateFromDatetime(new Date());
        this.selectedDate = dates.dateFromDatetime(new Date());

        if (!this.value) {
            return;
        }

        const valueDate = new Date(this.value);

        if (dates.isValidDate(valueDate)) {
            this.currentDate = dates.dateFromDatetime(valueDate);
            this.selectedDate = dates.dateFromDatetime(valueDate);
        }

        this.currentDate.setDate(1);
    }

    setCurrentDate(date) {
        this.currentDate = dates.dateFromDatetime(new Date(date));
        this.currentDate.setDate(1);
    }

    setSelectedDate(date) {
        this.selectedDate = dates.dateFromDatetime(new Date(date));
    }

    prevCurrentDateMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }

    nextCurrentDateMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }

    setCurrentDateYear(date) {
        this.currentDate.setFullYear(date.getFullYear());
    }

    resetCurrentDate() {
        this.currentDate = dates.dateFromDatetime(new Date(this.selectedDate));
        this.currentDate.setDate(1);
    }

    resetDates() {
        this.clear();
        this.setDates();
    }

    setDates() {
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth();

        const prevDate = new Date(currentYear, currentMonth - 1);
        const nextDate = new Date(currentYear, currentMonth + 1);

        const prevMonth = prevDate.getMonth();
        const prevYear = prevDate.getFullYear();

        const nextMonth = nextDate.getMonth();
        const nextYear = nextDate.getFullYear();

        const daysOfPrevMonth = dates.getDaysOfMonth(prevYear, prevMonth);
        const daysOfCurrentMonth = dates.getDaysOfMonth(currentYear, currentMonth);
        const daysOfNextMonth = dates.getDaysOfMonth(nextYear, nextMonth);

        const firstDayOfMonth = dates.getFirstDayOfMonth(currentYear, currentMonth);
        const lastDayOfMonth = dates.getLastDayOfMonth(currentYear, currentMonth);

        const firstDayOfMonthWeekIndex = dates.getDayOfWeekIndex(firstDayOfMonth);
        const lastDayOfMonthWeekIndex = dates.getDayOfWeekIndex(lastDayOfMonth);

        for (let i = daysOfPrevMonth.length - firstDayOfMonthWeekIndex + 1; i < daysOfPrevMonth.length; i++) {
            this.addDate(daysOfPrevMonth[i]);
        }

        for (let i = 0; i < daysOfCurrentMonth.length; i++) {
            this.addDate(daysOfCurrentMonth[i]);
        }

        for (let i = 0; i < 7 - lastDayOfMonthWeekIndex; i++) {
            this.addDate(daysOfNextMonth[i]);
        }

        if (this.dates.length < 42) {
            for (let i = 0; i < 7; i++) {
                this.addDate(daysOfNextMonth[i + 7]);
            }
        }

        this.dates = this.dates.map((date) => {
            return {
                date,
                isPrev: date.getMonth() < currentMonth,
                isToday: date.getTime() === this.todayDate.getTime(),
                isSelected: date.getTime() === this.selectedDate.getTime(),
                isCurrent: date.getMonth() === currentMonth,
                isNext: date.getMonth() > currentMonth,
            };
        });
    }

    addDate(day) {
        this.dates = [...this.dates, day];
    }

    clear() {
        this.dates = [];
    }
}

export default Dates;
