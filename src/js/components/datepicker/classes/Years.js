import { dates } from "../modules/Dates.js";

class Years {
    constructor(data) {
        Object.assign(this, data);

        this.years = [];

        this.todayYear = null;
        this.selectedYear = null;

        this.init();
    }

    init() {
        this.initYears();
        this.setYears();
    }

    initYears() {
        this.todayYear = dates.dateFromDatetime(new Date());
        this.selectedYear = dates.dateFromDatetime(new Date());

        const valueDate = new Date(this.value);

        if (dates.isValidDate(valueDate)) {
            this.selectedYear = dates.dateFromDatetime(new Date(valueDate));
        }
    }

    setSelectedYear(date) {
        this.selectedYear = new Date(date);
    }

    resetYears() {
        this.clear();
        this.setYears();
    }

    setYears() {
        for (let i = 1900; i <= 2100; i++) {
            const year = new Date(i, 0, 1);
            this.addYear(year);
        }

        this.years = this.years.map((year) => {
            return {
                year: year,
                isSelected: year.getFullYear() === this.selectedYear.getFullYear(),
                isToday: year.getFullYear() === this.todayYear.getFullYear(),
            }
        });
    }

    addYear(year) {
        this.years = [...this.years, year];
    }

    clear() {
        this.years = [];
    }
}

export default Years;
