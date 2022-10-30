import IconButton from "./IconButton";
import { icons } from "../modules/Icons";

class Yearpicker {
    constructor(data) {
        Object.assign(this, data);

        this.isSlide = false;
    }

    init() {
        this.yearpicker = this.create();
    }

    get() {
        return this.yearpicker;
    }

    render() {
        this.destroy();
        this.init();
    }

    create() {
        const yearpicker = document.createElement("div");
        yearpicker.classList.add("yearpicker");

        const header = document.createElement("div");
        header.classList.add("header");
        yearpicker.appendChild(header);

        const goBackBtn = new IconButton({
            type: "button",
            ariaLabel: "Volver atras",
            buttonSize: "large",
            svgSize: "large",
            icon: icons.get("arrow-left"),
            onClick: this.onGoBack,
        });
        header.appendChild(goBackBtn.get());

        const body = document.createElement("div");
        body.classList.add("body");
        yearpicker.appendChild(body);

        this.years.years.forEach((year) => {
            const yearContainer = document.createElement("div");
            yearContainer.classList.add("year");
            body.appendChild(yearContainer);

            const yearBtn = document.createElement("button");
            if (year.isSelected) yearBtn.classList.add("selected");
            if (year.isToday) yearBtn.classList.add("today");
            yearBtn.type = "button";
            yearBtn.textContent = year.year.getFullYear();
            yearBtn.addEventListener("click", () => this.onSelectYear(year.year));
            yearContainer.appendChild(yearBtn);
        });

        this.observer = new MutationObserver(() => {
            const selectedYear = this.yearpicker.querySelector(".selected");
            selectedYear.scrollIntoView({ block: "center" });
        });
        this.observer.observe(document.querySelector(".datepicker .content"), { childList: true });

        return yearpicker;
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.yearpicker) {
            this.yearpicker.remove();
        }
    }
}

export default Yearpicker;
