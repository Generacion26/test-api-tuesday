const request = require("supertest")
const app = require('../app')
let studentId

const student = {
  firstName: "Jorge",
  lastName: "Uceta",
  birthday: "2000-09-12",
  program: "Ingenieria"
}


test("POST -> '/api/v1/students', should return status code 201", async () => {

  const res = await request(app)
    .post('/api/v1/students')
    .send(student)

  studentId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)

})

test("Get ALL-> '/api/v1/students', should return status code 200, res.body to be defined and res.body.length === 1", async () => {

  const res = await request(app)
    .get("/api/v1/students");

  expect(res.status).toBe(200);
  expect(res.status).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get ONE-> '/api/v1/students/:id', should return status code 200, res.body to be defined and res.body.firstName ==== student.firstName", async () => {

  const res = await request(app)
    .get(`/api/v1/students/${studentId}`);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
});

test("UPDATE -> '/api/v1/students/:id', should return status code 200, and res.body.firstName === studentUpdate.firstName", async () => {
  const studentUpdate = {
    firstName: "Alan",
  }
  const res = await request(app)
    .put(`/api/v1/students/${studentId}`)
    .send(studentUpdate)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(studentUpdate.firstName)
})

test("DELETE-> '/api/v1/students/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`/api/v1/students/${studentId}`);

  expect(res.status).toBe(204)
});


