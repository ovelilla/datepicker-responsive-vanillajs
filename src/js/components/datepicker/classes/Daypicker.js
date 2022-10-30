import IconButton from "./IconButton";
import { dates } from "../modules/Dates";
import { icons } from "../modules/Icons";
import { tools } from "../modules/Tools";

class Daypicker {
    constructor(data) {
        Object.assign(this, data);

        this.isSlide = false;
    }

    init() {
        this.daypicker = this.create();
    }

    get() {
        return this.daypicker;
    }

    render() {
        this.destroy();
        this.init();
    }

    create() {
        const daypicker = document.createElement("div");
        daypicker.classList.add("daypicker");

        const header = document.createElement("div");
        header.classList.add("header");
        daypicker.appendChild(header);

        const prevButton = new IconButton({
            type: "button",
            ariaLabel: "Mes anterior",
            buttonSize: "large",
            svgSize: "large",
            icon: icons.get("chevron-left"),
            onClick: () => {
                if (this.isSlide) {
                    return;
                }
                this.onPrevMonth();
            },
        });
        header.appendChild(prevButton.get());

        this.date = this.createDate();
        header.appendChild(this.date);

        const nextButton = new IconButton({
            type: "button",
            ariaLabel: "Mes siguiente",
            buttonSize: "large",
            svgSize: "large",
            icon: icons.get("chevron-right"),
            onClick: () => {
                if (this.isSlide) {
                    return;
                }
                this.onNextMonth();
            },
        });
        header.appendChild(nextButton.get());

        const weekdays = this.createWeekdays();
        daypicker.appendChild(weekdays);

        this.slide = document.createElement("div");
        this.slide.classList.add("slide");
        daypicker.appendChild(this.slide);

        this.currentDays = this.createDays();
        this.slide.appendChild(this.currentDays);

        return daypicker;
    }

    createDate() {
        const dateEl = document.createElement("button");
        dateEl.classList.add("date");
        const date = this.dates.currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
        dateEl.textContent = tools.capitalizeFirstLetter(date);
        dateEl.addEventListener("click", () => this.onSelectYear());
        return dateEl;
    }

    createWeekdays() {
        const weekdays = document.createElement("div");
        weekdays.classList.add("weekdays");

        const weekdaysNarrow = dates.getWeekdays("es-ES", "narrow");

        weekdaysNarrow.forEach((weekday) => {
            const div = document.createElement("div");
            div.classList.add("weekday");
            div.textContent = weekday;
            weekdays.appendChild(div);
        });
        return weekdays;
    }

    createDays() {
        const days = document.createElement("div");
        days.classList.add("days");

        this.dates.dates.forEach((date) => {
            const day = document.createElement("div");
            day.classList.add("day");
            days.appendChild(day);

            const button = document.createElement("button");
            if (date.isPrev) button.classList.add("prev");
            if (date.isCurrent) button.classList.add("current");
            if (date.isToday) button.classList.add("today");
            if (date.isSelected) button.classList.add("selected");
            if (date.isNext) button.classList.add("next");
            button.addEventListener("click", () => this.onSelectDate(date.date));
            day.appendChild(button);

            const number = document.createElement("div");
            number.classList.add("number");
            number.textContent = date.date.getDate();
            button.appendChild(number);
        });

        return days;
    }

    async prev() {
        this.isSlide = true;

        this.prevDate = this.createDate();
        this.date.replaceWith(this.prevDate);
        this.date = this.prevDate;

        this.slide.classList.add("left");

        this.prevDays = this.createDays();
        this.prevDays.classList.add("slide-right");
        this.slide.appendChild(this.prevDays);

        this.currentDays.classList.add("slide-right");

        await tools.animationend(this.currentDays);

        this.currentDays.remove();
        this.currentDays = this.prevDays;
        this.slide.classList.remove("left");
        this.currentDays.classList.remove("slide-right");

        this.isSlide = false;
    }

    async next() {
        this.isSlide = true;

        this.nextDate = this.createDate();
        this.date.replaceWith(this.nextDate);
        this.date = this.nextDate;

        this.nextDays = this.createDays();
        this.nextDays.classList.add("slide-left");
        this.slide.appendChild(this.nextDays);

        this.currentDays.classList.add("slide-left");

        await tools.animationend(this.currentDays);

        this.currentDays.remove();
        this.currentDays = this.nextDays;
        this.currentDays.classList.remove("slide-left");

        this.isSlide = false;
    }

    destroy() {
        if (this.daypicker) {
            this.daypicker.remove();
        }
    }
}

export default Daypicker;
