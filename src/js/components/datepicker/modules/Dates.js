export const dates = (() => {
    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    const getDaysOfMonth = (year, month) => {
        const date = new Date(year, month, 1);

        const dates = [];

        while (date.getMonth() === month) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1);
    };

    const getLastDayOfMonth = (year, month) => {
        return new Date(year, month + 1, 0);
    };

    const getMonths = (locale, value) => {
        return [...Array(12).keys()].map((key) => new Date(0, key).toLocaleDateString(locale, { month: value }));
    };

    const getWeekdays = (locale, value) => {
        return [...Array(7).keys()].map((key) =>
            new Date(0, 0, key + 1).toLocaleDateString(locale, { weekday: value })
        );
    };

    const getDayOfWeekIndex = (date) => {
        return !date.getDay() ? 7 : date.getDay();
    };

    const dateFromDatetime = (datetime) => {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate());
    };

    const formatDateShort = (date) => {
        return date.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
    };

    const formatDateLong = (date) => {
        return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    };

    return {
        isValidDate,
        getDaysOfMonth,
        getFirstDayOfMonth,
        getLastDayOfMonth,
        getMonths,
        getWeekdays,
        getDayOfWeekIndex,
        dateFromDatetime,
        formatDateShort,
        formatDateLong,
    };
})();
