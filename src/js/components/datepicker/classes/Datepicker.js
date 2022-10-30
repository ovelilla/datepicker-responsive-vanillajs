import InputDate from "./InputDate";
import Panel from "./Panel";
import Dates from "./Dates";
import Daypicker from "./Daypicker";
import Years from "./Years";
import Yearpicker from "./Yearpicker";

class Datepicker {
    constructor(data) {
        Object.assign(this, data);

        this.init();
    }

    init() {
        this.inputDate = new InputDate({
            label: this.label,
            input: this.input,
            error: this.error,
            message: this.message,
            onFocus: () => {
                this.panel.open();
                this.daypicker.render();
                this.panel.render(this.daypicker.get());
            },
            onBlur: () => {},
        });

        this.panel = new Panel({
            input: this.inputDate,
            onOpen: () => {
                this.inputDate.blur();
            },
            onClose: () => {
                this.inputDate.handleBlur();
                this.dates.resetCurrentDate();
                this.dates.resetDates();
                this.years.setSelectedYear(this.dates.selectedDate);
                this.years.resetYears();
            },
        });

        this.dates = new Dates({
            value: this.input.value,
        });

        this.years = new Years({
            value: this.input.value,
        });

        this.daypicker = new Daypicker({
            dates: this.dates,
            onPrevMonth: () => {
                this.dates.clear();
                this.dates.prevCurrentDateMonth();
                this.dates.setDates();
                this.daypicker.prev();
            },
            onNextMonth: () => {
                this.dates.clear();
                this.dates.nextCurrentDateMonth();
                this.dates.setDates();
                this.daypicker.next();
            },
            onSelectYear: () => {
                this.daypicker.destroy();
                this.yearpicker.render();
                this.panel.render(this.yearpicker.get());
            },
            onSelectDate: (date) => {
                this.inputDate.setValue(date);
                this.dates.setCurrentDate(date);
                this.dates.setSelectedDate(date);
                this.dates.resetDates();
                this.panel.close();

                this.onSelect(date);
            },
        });

        this.yearpicker = new Yearpicker({
            years: this.years,
            onGoBack: () => {
                this.yearpicker.destroy();
                this.daypicker.render();
                this.panel.render(this.daypicker.get());
            },
            onSelectYear: (year) => {
                this.yearpicker.destroy();
                this.dates.setCurrentDateYear(year);
                this.dates.resetDates();
                this.years.setSelectedYear(year);
                this.years.resetYears();
                this.daypicker.destroy();
                this.daypicker.render();
                this.panel.render(this.daypicker.get());
            },
        });
    }

    get() {
        return this.inputDate.get();
    }

    getValue() {
        return this.inputDate.getValue();
    }

    setValue(value) {
        this.inputDate.setValue(value);
        this.dates.setCurrentDate(value);
        this.dates.setSelectedDate(value);
        this.dates.resetDates();
    }
}

export default Datepicker;
