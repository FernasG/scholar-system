const createAttendanceListRequest = (async (id) => {
  const response = await axios
    .post('/api/attendance-lists', { school_day_id: id })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const updateAttendanceListRequest = (async (id, attendance) => {
  const response = await axios
    .patch(`/api/attendance-lists/${id}`, { attendance })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const updateAttendanceList = (async (element, id) => {
  if (!element || !id) return null;

  const { checked } = element;

  const response = await updateAttendanceListRequest(id, checked);

  if (!response) return null;
});

const createAttendanceList = (async (id) => {
  const response = await createAttendanceListRequest(id);

  if (!response) return null;

  document.location.reload();
});