const updateClassStudentsRequest = (async (id, students) => {
  const response = await axios
    .put(`/api/classes/${id}/students`, { students })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const createSchoolDayRequest = (async (classId, date) => {
  const response = await axios
    .post('/api/school-days', { class_id: classId, date })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const createClassRequest = (async (user_id, name, description) => {
  const response = await axios
    .post('/api/classes', { user_id, name, description })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
})

const removeClassRequest = (async (classId) => {
  const response = await axios
    .delete(`/api/classes/${classId}`)
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
})

const openClass = ((id) => {
  window.location.assign(`classes/${id}`);
});

const saveClassStudents = (async (id) => {
  const inputs = document.querySelectorAll('input[type=checkbox]');

  if (!inputs || !inputs.length) return null;

  const students = [];

  for (const input of inputs) {
    const { checked, value } = input;

    if (checked) students.push(value);
  }

  const response = await updateClassStudentsRequest(id, students);

  if (!response) return null;

  window.location.reload();
});

const createSchoolDay = (async (classId) => {
  const dateElement = document.querySelector('#classDate');

  if (!dateElement) return null;

  const date = dateElement.value;

  const response = await createSchoolDayRequest(classId, date);

  if (!response) return null;

  window.location.reload();
});

const createClass = (async () => {
  const nameElement = document.querySelector('#className');
  const descriptionElement = document.querySelector('#classDescription');

  if (!nameElement || !descriptionElement) return null;

  const name = nameElement.value;
  const description = descriptionElement.value;

  if (!name || !description) return null;

  const user_id = Storage.get('id');

  const response = await createClassRequest(user_id, name, description);

  if (!response) return null;

  window.location.reload();
});

const removeClass = (async (classId) => {
  if (!classId) return null;

  const response = await removeClassRequest(classId);

  if (!response) return null;

  window.location.replace(`${window.location.origin}/classes`);
});