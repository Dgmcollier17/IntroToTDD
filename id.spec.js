// id.spec.js

user = {
  user: "John Smith",
  email: "js@someFakeEmailServer.com",
  posts: [],
};
const currentIds = [1, 2, 3, 4];

function getNewId() {
  return Math.floor(Math.random());
}

function getRandomId(min = 0, max = 0, ids = []) {
  let id;
  let a = [];
  do {
    id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (a.indexOf(id) === -1) {
      a.push(id);
    }
    if (a.length === max - min + 1) {
      if (ids.indexOf(id) > -1) {
        return "failed";
      }
    }
  } while (ids.indexOf(id) > -1);
  return id;
}

test("returns a random number", () => {
  jest.spyOn(Math, "floor");
  const mockMath = Object.create(global.Math);
  const originalMath = Object.create(global.Math);
  mockMath.random = () => 0.75;
  global.Math = mockMath;
  const id = getRandomId(10, 100);
  expect(id).toBe(78);
  global.Math = originalMath;
});

test("returns an integer", () => {
  const id = getRandomId();
  expect(id).toBe(Math.floor(id));
});

test("generates a number within a defined range", () => {
  const min = 10;
  const max = 100;
  const range = [];
  for (let i = min; i < max + 1; i++) {
    range.push(i);
  }
  for (let i = 0; i < 100; i++) {
    const id = getRandomId(min, max);
    expect(range).toContain(id);
  }
});

test("generates a unique number", () => {
  const id = getRandomId();
  const index = currentIds.indexOf(id);
  expect(index).toBe(-1);
});
