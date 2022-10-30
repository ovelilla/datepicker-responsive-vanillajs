export const tools = (() => {
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    };

    const animationend = async (target) => {
        return new Promise((resolve) => {
            target.addEventListener("animationend", resolve, { once: true });
        });
    };

    return {
        capitalizeFirstLetter,
        animationend,
    };
})();
