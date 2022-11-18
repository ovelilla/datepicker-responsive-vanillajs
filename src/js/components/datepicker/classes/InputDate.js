import Form from "./Form.js";
import IconButton from "./IconButton.js";
import { icons } from "../modules/Icons.js";
import { dates } from "../modules/Dates.js";

class InputDate extends Form {
    constructor(data) {
        super(data);

        Object.assign(this, data);

        this.isOpen = false;

        this.create();
    }

    create() {
        this.field = this.createField();
        this.wrapper = this.createWrapper();
        this.labelEl = this.createLabel();
        this.inputEl = this.createInput();

        this.field.appendChild(this.wrapper);
        this.wrapper.appendChild(this.labelEl);
        this.wrapper.appendChild(this.inputEl);

        if (this.message && !this.manualErrorHandling) {
            this.field.appendChild(this.createMessage());
        }

        const iconButtonPalette = new IconButton({
            type: "button",
            ariaLabel: "Icono calendario",
            buttonSize: "medium",
            svgSize: "medium",
            icon: icons.get("calendar-heart"),
            onClick: () => {
                this.inputEl.focus();
            },
        });

        const adornmentRight = iconButtonPalette.get();
        this.wrapper.appendChild(this.createAdornment(adornmentRight, "right"));
    }

    createInput() {
        const input = document.createElement("input");
        input.classList.add("mio-input");
        input.type = "text";
        input.name = this.input.name;
        input.id = this.input.id;
        input.value = this.formatValue();
        if (this.input.placeholder) {
            input.placeholder = this.input.placeholder;
        }
        if (this.input.readOnly) {
            input.readOnly = true;
        }
        if (this.input.maxLength) {
            input.maxLength = this.input.maxLength;
        }

        input.addEventListener("focus", this.handleFocus.bind(this));

        return input;
    }

    handleFocus() {
        this.field.classList.add("active");
        this.field.classList.add("focus");

        if (this.onFocus) {
            this.onFocus();
        }
    }

    handleBlur() {
        if (!this.input.value) {
            this.field.classList.remove("active");
        }
        this.field.classList.remove("focus");

        if (this.onBlur) {
            this.onBlur();
        }
    }

    setValue(value) {
        this.input.value = value;
        this.inputEl.value = this.formatValue();
        this.field.classList.add("active");
        this.removeMessage();
    }

    formatValue() {
        if (!this.input.value) {
            return "";
        }
        
        let date = new Date(this.input.value);

        if (!dates.isValidDate(date)) {
            return "";
        }

        if (this.input.format === "short") {
            return dates.formatDateShort(date);
        }
        if (this.input.format === "long") {
            return dates.formatDateLong(date);
        }
    }
}

export default InputDate;
