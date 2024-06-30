const updateClassStudentsRequest = (async (id, students) => {
  const response = await axios
    .put(`/api/classes/${id}/students`, { students })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

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