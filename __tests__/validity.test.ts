import { is24hTime } from '../src/utils';

describe('24h time format Hour validity tests', () => {
  it('Empty is accepted', () => {
    expect(is24hTime("")).toBeTruthy();
  })

  it('Hour alone is accepted', () => {
    expect(is24hTime("10")).toBeTruthy();
  })

  it('A single hour is accepted', () => {
    expect(is24hTime("1")).toBeTruthy();
  })

  it('Hour with : is accepted', () => {
    expect(is24hTime("10:")).toBeTruthy();
  })

  it('Zero Hour with : is accepted', () => {
    expect(is24hTime("00:")).toBeTruthy();
  })

  it('Zero and an hour with : is accepted', () => {
    expect(is24hTime("05:")).toBeTruthy();
  })

  it('Single zero as hour with : is accepted', () => {
    expect(is24hTime("0:")).toBeTruthy();
  })

  it('Single number as hour with : is accepted', () => {
    expect(is24hTime("9:")).toBeTruthy();
  })

  it('24 hour is provisionary accepted', () => {
    expect(is24hTime("24")).toBeTruthy();
  })

  it('Empty hour is provisionary accepted', () => {
    expect(is24hTime(":")).toBeTruthy();
  })

});

describe('24h time format Hour validity negative tests', () => {

  it('String as hour is Not accepted', () => {
    expect(is24hTime("HH:")).toBeFalsy();
  })

  it('String as hour is Not accepted', () => {
    expect(is24hTime("H")).toBeFalsy();
  })

  it('Special char as hour is Not accepted', () => {
    expect(is24hTime("-")).toBeFalsy();
  })

});

describe('24h time format Minute validity tests', () => {
  it('Zero minute is accepted', () => {
    expect(is24hTime("20:00")).toBeTruthy();
  })

  it('Single zero minute is accepted', () => {
    expect(is24hTime("20:0")).toBeTruthy();
  })

  it('Max  minute is accepted', () => {
    expect(is24hTime("20:59")).toBeTruthy();
  })

  it('Zero and number minute is accepted', () => {
    expect(is24hTime("20:09")).toBeTruthy();
  })

});

describe('24h time format Minute validity negative tests', () => {
  it('Minute above 59 is unaccepted', () => {
    expect(is24hTime("20:99")).toBeFalsy();
  })

  it('Hour above 24 is unaccepted', () => {
    expect(is24hTime("25:09")).toBeFalsy();
  })
  it('String as minute is unaccepted', () => {
    expect(is24hTime("20:mm")).toBeFalsy();
  })
});