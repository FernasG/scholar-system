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

const createAnnotationRequest = (async (id) => {
  const response = await axios
    .post('/api/annotations', { school_day_id: id })
    .then(({ data }) => data)
    .catch();

  if (!response) return null;

  return response;
});

const updateAnnotationRequest = (async (id, text) => {
  const response = await axios
    .patch(`/api/annotations/${id}`, { text })
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

const createAnnotation = (async (id) => {
  if (!id) return null;

  const response = await createAnnotationRequest(id);

  if (!response) return null;

  document.location.reload();
});

const updateAnnotation = (async (id) => {
  if (!id) return null;

  const textElement = document.querySelector('#classAnnotations');

  if (!textElement) return null;

  const text = textElement.value;

  if (!text) return null;

  const response = await updateAnnotationRequest(id, text);

  if (!response) return null;

  document.location.reload();
});