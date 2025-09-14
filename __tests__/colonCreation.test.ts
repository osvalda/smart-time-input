import { addColonToTime } from '../src/utils';

describe('Colon positioning tests', () => {
    it('Single hour number is unchanged below 3', () => {
        expect(addColonToTime("0", "")).toBe("0");
    });
    it('Single hour number is update above 2', () => {
        expect(addColonToTime("3", "")).toBe("03:");
    });
    it('double numbers extended with :', () => {
        expect(addColonToTime("00", "0")).toBe("00:");
    });
    it('Hour with : already in unchanged', () => {
        expect(addColonToTime("00:", "00")).toBe("00:");
    });
    it('Single minute number is unchanged below 6', () => {
        expect(addColonToTime("00:1", "00:")).toBe("00:1");
    });
    it('Single minute number is unchanged below 6', () => {
        expect(addColonToTime("00:5", "00:")).toBe("00:5");
    });
    it('Single minute number is updated above 5', () => {
        expect(addColonToTime("00:6", "00:")).toBe("00:06");
    });
    it('Single hour with : is updated', () => {
        expect(addColonToTime("2:", "2")).toBe("02:");
    });
    it('Zero hour with : is updated', () => {
        expect(addColonToTime("0:", "2")).toBe("00:");
    });
    it('Delete removes :', () => {
        expect(addColonToTime("14", "14:")).toBe("1");
    });
    it('Complete time is unchanged', () => {
        expect(addColonToTime("23:59", "23:5")).toBe("23:59");
    });
    it('Empty time is unchanged', () => {
        expect(addColonToTime("", "")).toBe("");
    });
    it('Hour above 23', () => {
        expect(addColonToTime("24", "")).toBe("02:4");
    });
    it('Hour above 23 ant minute above 5', () => {
        expect(addColonToTime("99", "")).toBe("09:09");
    });
    it('empty hour is completed to 0', () => {
        expect(addColonToTime(":", "")).toBe("00:");
    });

});

