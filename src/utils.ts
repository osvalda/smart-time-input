export const is24hTime = (val: string) => {
    if (!/^($)|^\d{1,2}\:?\d{0,2}$/.test(val)) {
        return false;
    }

    const valArr = val.split(':');
    if (valArr[0] && parseInt(valArr[0], 10) > 23 && val.length === 5) {
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
    if (val.length === 2 && lastVal.length !== 3 && val.indexOf(':') === -1) {
        if (Number(val) > 23) {
            let result: string = '0' + val.slice(0, 1) + ':' + val.slice(1, 2);
            if (Number(val.slice(1, 2)) > 5) {
                result = completeTime(result);
            }
            return result;
        }
        return val + ':';
    }

    if (val.length === 1 && val.indexOf(':') === -1 && (Number(val) > 2 && Number(val) <= 9)) {
        return "0" + val + ':';
    }

    if (val.length === 2 && val.indexOf(':') !== -1) {
        return "0" + val;
    }

    if (val.length === 4 && val.indexOf(':') !== -1) {
        const valArr = val.split(':');
        if (Number(valArr[1]) > 5) {
            return valArr[0] + ':0' + valArr[1];
        }
    }

    if (val.length === 2 && lastVal.length === 3) {
        return val.slice(0, 1);
    }

    return val;
}