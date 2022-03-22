import {
  dbToY,
  getXofFrequency,
  keyIsPressed,
  keyIsFlat,
  valueToPercentage,
  percentageToValue,
  polarToCartesian,
  cartesianToPolar,
  drawKnobTickCoordinates,
  drawSliderTickCoordinates,
  getEndCoordinates,
  getBarCoordinates,
  calculateKnobNewValue,
  calculateSliderNewValue,
} from "..";

describe("FilterDisplay utils", () => {
  const width = 100;
  test("getXofFrequency returns 0 when freq is 20 and width is > 0", () => {
    expect(getXofFrequency(20, width)).toBe(0);
  });
  test("getXofFrequency returns width when freq is 20000 and width is > 0", () => {
    expect(getXofFrequency(20000, width)).toBe(width);
  });
  test("getXofFrequency throws range error when width <= 0", () => {
    expect(() => {
      getXofFrequency(20, -1);
    }).toThrow(RangeError);
  });
  const height = 200;
  const dbScale = 50;
  const middle = height / 2; //100
  const pixelsPerDb = middle / dbScale; //2

  test("dbToY returns middle when db is 0", () => {
    expect(dbToY(0, middle, pixelsPerDb)).toBe(middle);
  });
  test("dbToY returns 0 when db is equal to dbScale", () => {
    expect(dbToY(dbScale, middle, pixelsPerDb)).toBe(0);
  });
  test("dbToY returns height when db is equal to -dbScale", () => {
    expect(dbToY(-dbScale, middle, pixelsPerDb)).toBe(height);
  });
});

describe("Key utils", () => {
  const note1 = "A";
  const note2 = "Cb";
  const octave = 1;
  const notesPlaying = ["A1"];
  test("keyIsPressed returns true when note + octave is in notesPlaying", () => {
    expect(keyIsPressed(note1, octave, notesPlaying)).toBe(true);
  });
  test("keyIsPressed returns false when note + octave is not in notesPlaying", () => {
    expect(keyIsPressed(note2, octave, notesPlaying)).toBe(false);
  });
  test("keyIsFlat returns true when note is flat", () => {
    expect(keyIsFlat(note2)).toBe(true);
  });
  test("keyIsFlat returns false when note is not flat", () => {
    expect(keyIsFlat(note1)).toBe(false);
  });
});

describe("Control utils", () => {
  const min = 0;
  const max = 200;
  test("valueToPercentage returns 50 when: value is 100, min is 0, max is 200", () => {
    expect(valueToPercentage(100, min, max)).toBe(50);
  });
  test("valueToPercentage returns 0 when value is equal to min", () => {
    expect(valueToPercentage(min, min, max)).toBe(0);
  });
  test("valueToPercentage returns 100 when value is equal to max", () => {
    expect(valueToPercentage(max, min, max)).toBe(100);
  });
  test("percentageToValue returns 100 when: percentage is 50, min is 0, max is 200", () => {
    expect(percentageToValue(50, min, max)).toBe(100);
  });
  test("percentageToValue returns 0 when percentage is equal to min", () => {
    expect(percentageToValue(min, min, max)).toBe(0);
  });
  test("percentageToValue returns max when percentage is 100", () => {
    expect(percentageToValue(100, min, max)).toBe(max);
  });
  const height = 40,
    width = 40,
    radius = 20;
  const circleX = height / 2;
  const circleY = width / 2;
  test("polarToCartesian returns {x: 20, y: 40} when: angle is 0 or 360, radius is 20, circleX is 20, and circleY is 20", () => {
    expect(polarToCartesian(0, radius, circleX, circleY)).toEqual({
      x: 20,
      y: 40,
    });
    expect(polarToCartesian(360, radius, circleX, circleY)).toEqual({
      x: 20,
      y: 40,
    });
  });
  test("polarToCartesian returns {x: 20, y: 0} when: angle is 180, radius is 20, circleX is 20, and circleY is 20", () => {
    expect(polarToCartesian(180, radius, circleX, circleY)).toEqual({
      x: 20,
      y: 0,
    });
  });
  test("polarToCartesian returns {x: 40, y: 50} when: angle is 90, radius is 10, circleX is 50, and circleY is 50", () => {
    expect(polarToCartesian(90, 10, 50, 50)).toEqual({
      x: 40,
      y: 50,
    });
  });
  test("cartesianToPolar returns 360 when: x is equal to circleX and y > circleY", () => {
    expect(cartesianToPolar(circleX, circleY + 1, circleX, circleY)).toBe(360);
  });
  test("cartesianToPolar returns 180 when: x is equal to circleX and y < circleY", () => {
    expect(cartesianToPolar(circleX, circleY - 1, circleX, circleY)).toBe(180);
  });
  test("cartesianToPolar returns 90 when: x is 0 and y is equal to circleY", () => {
    expect(cartesianToPolar(0, circleY, circleX, circleY)).toBe(90);
  });

  //TODO: test drawKnobTickCoordinates()
  //TODO: test drawSliderTickCoordinates()

  test("getEndCoordinates returns {x: 20, y: 7} when: value is 100, min is 0, max is 200, minAngle and maxAngle are conjugate, radius is 20, circleX is 20, and circleY is 20", () => {
    expect(
      getEndCoordinates(100, min, max, 45, 315, radius, circleX, circleY)
    ).toEqual({ x: 20, y: 7 });
  });
  test("getEndCoordinates returns {x: 7, y: 20} when: value is equal to min, minAngle is 90 and maxAngle is conjugate to minAngle, radius is 20, circleX is 20, and circleY is 20", () => {
    expect(
      getEndCoordinates(min, min, max, 90, 270, radius, circleX, circleY)
    ).toEqual({ x: 7, y: 20 });
  });
  const barHeight = 20;
  test("getBarCoordinates returns {x:50, y:90} when: value is 100, middle is 50, min is 0, max is 200, barHeight is 20, and height is 200", () => {
    expect(getBarCoordinates(100, 50, min, max, barHeight, 200)).toEqual({
      x: 50,
      y: 90,
    });
  });
  test("getBarCoordinates returns {x:50, y:180} when: value is equal to min, middle is 50, min is 0, max is 200, barHeight is 20, and height is 200", () => {
    expect(getBarCoordinates(min, 50, min, max, barHeight, 200)).toEqual({
      x: 50,
      y: 180,
    });
  });
  test("getBarCoordinates returns {x:50, y:0} when: value is equal to max, middle is 50, min is 0, max is 200, barHeight is 20, and height is 200", () => {
    expect(getBarCoordinates(max, 50, min, max, barHeight, 200)).toEqual({
      x: 50,
      y: 0,
    });
  });

  //TODO: test calculateKnobNewValue()
  //TODO: test calculateSliderNewValue()
});
