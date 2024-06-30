const findAllStudentsRequest = (async () => {
  const response = await axios
    .get('/api/students')
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const createStudentRequest = (async (name, birthdate, gender) => {
  const response = await axios
    .post('/api/students', { name, birthdate, gender })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const removeStudentRequest = (async (id) => {
  const response = await axios
    .delete(`/api/students/${id}`)
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const parseBirthdate = ((birthdate) => {
  const [year, month, day] = birthdate.split('-');

  return `${day}/${month}/${year}`;
});

const genderMap = new Map([
  ['F', 'Feminino'],
  ['M', 'Masculino']
]);

const createHTMLElement = ((index, id, name, birthdate, gender) => {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const tdName = document.createElement('td');
  const tdBirthdate = document.createElement('td');
  const tdGender = document.createElement('td');
  const tdActions = document.createElement('td');
  const button = document.createElement('button');
  const icon = document.createElement('i');

  th.scope = 'row';
  th.textContent = index;
  tdName.textContent = name;
  tdBirthdate.textContent = parseBirthdate(birthdate);
  tdGender.textContent = genderMap.get(gender);
  button.classList.add('btn', 'btn-danger', 'min-button');
  button.onclick = (() => removeStudent(id));
  icon.classList.add('bi', 'bi-trash');

  button.appendChild(icon);
  tdActions.appendChild(button);
  tr.appendChild(th);
  tr.appendChild(tdName);
  tr.appendChild(tdBirthdate);
  tr.appendChild(tdGender);
  tr.appendChild(tdActions);

  return tr;
});

const createStudentsList = (async () => {
  const students = await findAllStudentsRequest();

  if (!students || !students.length) return null;

  const tBody = document.querySelector('body > main > table > tbody');

  if (!tBody) return null;

  const htmlElements = [];

  for (const [index, student] of students.entries()) {
    const { id, name, birthdate, gender } = student;

    htmlElements.push(createHTMLElement(index + 1, id, name, birthdate, gender));
  }

  htmlElements.forEach((htmlElement) => tBody.appendChild(htmlElement));
});

const createStudent = (async () => {
  const nameElement = document.getElementById('studentName');
  const birthdateElement = document.getElementById('studentBirthDate');
  const genderElement = document.getElementById('studentGender');

  if (!nameElement || !birthdateElement || !genderElement) return null;

  const name = nameElement.value;
  const birthdate = birthdateElement.value;
  const gender = genderElement.value;

  if (!name || !birthdate || !gender) return null;

  const student = await createStudentRequest(name, birthdate, gender);

  if (!student) return null;

  window.location.assign('students');
});

const removeStudent = (async (id) => {
  if (!id) return null;

  const response = await removeStudentRequest(id);

  if (!response) return null;

  window.location.assign('students');
});

(async () => {
  await createStudentsList();
})();