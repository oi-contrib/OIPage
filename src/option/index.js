function initOption(setOption, defaultOption) {
    for (const key in setOption) {
        defaultOption[key] = setOption[key];
    }

    return defaultOption;
}

function mergeOption(oldOption, newOption) {
    (function doit(oldOption, newOption) {

        for (const key in newOption) {
            const value = newOption[key];

            if (isPlainObject(value)) {
                if (!oldOption[key]) oldOption[key] = {};

                doit(oldOption[key], newOption[key]);
            } else {
                oldOption[key] = value;
            }

        }

    })(oldOption, newOption);

    return oldOption;
}