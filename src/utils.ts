export const is24hTime = (val: string) => {
    if (!/^(:)|^($)|^\d{1,2}:?\d{0,2}$/.test(val)) {
        return false;
    }

    const valArr = val.split(':');
    if (valArr[0] && parseInt(valArr[0], 10) > 23 && val.length >= 3) {
        return false;
    }

    if (valArr[1] && parseInt(valArr[1], 10) > 59) {
        return false;
    }

    return true;
}

export const completeTime = (val: string): string => {
    switch (val.length) {
        case 0:
            return ("00:00");
        case 1:
            return (`0${val}:00`);
        case 3:
            return (`${val}00`);
        case 4: {
            const [h, m] = val.split(':');
            return `${h}:0${m}`;
        }
    }

    return val;
}

export const addColonToTime = (val: string, lastVal: string): string => {
    // Pad single digit hour and add colon
    if (val.length === 1 && !val.includes(':') && (Number(val) > 2 && Number(val) <= 9)) {
        return '0' + val + ':';
    }

    // Handle single digit with colon
    if (val.length === 1 && val.includes(':')) {
        return '00' + val;
    }

    // Add colon after two digits if not present
    if (val.length === 2 && lastVal.length !== 3 && !val.includes(':')) {
        if (Number(val) > 23) {
            let result: string = '0' + val.slice(0, 1) + ':' + val.slice(1, 2);
            if (Number(val.slice(1, 2)) > 5) {
                result = completeTime(result);
            }
            return result;
        }
        return val + ':';
    }

    // Pad two digits with colon
    if (val.length === 2 && val.includes(':')) {
        return '0' + val;
    }

    // Pad minute if needed
    if (val.length === 4 && val.includes(':')) {
        const [h, m] = val.split(':');
        if (Number(m) > 5) {
            return h + ':0' + m;
        }
    }

    // Remove last digit if user deletes colon
    if (val.length === 2 && lastVal.length === 3) {
        return val.slice(0, 1);
    }

    return val;
}