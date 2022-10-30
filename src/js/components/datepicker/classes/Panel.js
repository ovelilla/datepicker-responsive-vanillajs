import { tools } from "../modules/Tools";

class Panel {
    constructor(data) {
        Object.assign(this, data);

        this.isOpen = false;
        this.isClose = false;
    }

    async open() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        this.datepicker = this.create();
        document.body.appendChild(this.datepicker);

        this.onOpen();
        this.position();

        this.datepicker.classList.add("in");
        await tools.animationend(this.datepicker);
    }

    render(el) {
        this.datepicker.firstChild.appendChild(el);
    }

    create() {
        const datepicker = document.createElement("div");
        datepicker.classList.add("datepicker");
        datepicker.addEventListener("mousedown", this.checkClose.bind(this));
        datepicker.addEventListener("touchstart", this.checkClose.bind(this), { passive: true });
        datepicker.addEventListener("click", () => {
            if (this.isClose) {
                this.close();
            }
        });
        this.resize = this.handleResize.bind(this);
        window.addEventListener("resize", this.resize);

        const content = document.createElement("div");
        content.classList.add("content");
        content.addEventListener("click", (e) => e.stopPropagation());
        datepicker.appendChild(content);

        return datepicker;
    }
   
    position() {
        if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
            document.body.classList.add("noscroll");
        }

        const input = this.input.get();
        const rect = input.getBoundingClientRect();

        if (innerWidth < 768) {
            this.datepicker.firstChild.removeAttribute("style");
            return;
        }

        this.datepicker.firstChild.style.top = `${rect.top + input.offsetHeight + 2}px`;
        this.datepicker.firstChild.style.left = `${rect.left}px`;
        this.datepicker.firstChild.style.width = `${rect.width}px`;
    }

    checkClose(e) {
        if (e.target === this.datepicker) {
            this.isClose = true;
        }
    }

    async close() {
        this.isOpen = false;
        this.isClose = false;

        document.body.classList.remove("noscroll");
        this.datepicker.classList.add("out");

        await tools.animationend(this.datepicker);

        this.onClose();
        this.destroy();
    }

    handleResize() {
        this.position();
    }

    destroy() {
        window.removeEventListener("resize", this.resize);
        this.datepicker.remove();
    }
}

export default Panel;
