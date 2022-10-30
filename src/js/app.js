import Datepicker from "./components/datepicker";

const values = {
    // date: "2022-10-16 16:42:44",
    // date: new Date("2022-10-16"),
    date: "",
};

const errors = {
    date: "",
};

const container = document.querySelector(".container");

const form = document.createElement("form");
form.classList.add("mio-form");
container.appendChild(form);

const datepicker = new Datepicker({
    label: {
        text: "Fecha",
        for: "date",
    },
    input: {
        name: "date",
        id: "date",
        value: values.date,
        readOnly: true,
        format: "long",
    },
    error: errors.date.length > 0,
    message: errors.date,
    onSelect: (date) => {
        values.date = date;
        errors.date = "";
    },
});
form.appendChild(datepicker.get());
