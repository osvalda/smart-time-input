import { completeTime } from '../src/utils';

describe('Partial 24h time comletition tests', () => {
    it('Empty string to default time', () => {
        expect(completeTime("")).toBe("00:00");
    });
    it('Single zero string to default time', () => {
        expect(completeTime("0")).toBe("00:00");
    });
    it('Double zero string is not updated', () => {
        expect(completeTime("00")).toBe("00");
    });
    it('Already complete string is not updated', () => {
        expect(completeTime("23:59")).toBe("23:59");
    });
    it('Double zero with : string to default time', () => {
        expect(completeTime("00:")).toBe("00:00");
    });
    it('Three zeros string to default time', () => {
        expect(completeTime("00:0")).toBe("00:00");
    });
    it('Single minute to complete time', () => {
        expect(completeTime("00:1")).toBe("00:01");
    });
    it('Single hour to complete time', () => {
        expect(completeTime("1")).toBe("01:00");
    });
    it('Double hour to complete time', () => {
        expect(completeTime("10:")).toBe("10:00");
    });
    it('Double hour with minute to complete time', () => {
        expect(completeTime("10:2")).toBe("10:02");
    });
});