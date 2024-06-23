let currentClass = null;

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', performSearch);
});

function showClassForm() {
  currentClass = null;
  document.getElementById('classForm').reset();
  document.getElementById('classModalLabel').innerText = 'Cadastrar Nova Turma';
  clearValidationStyles();
  new bootstrap.Modal(document.getElementById('classModal')).show();
}

function editClass(button) {
  const row = button.closest('tr');
  const name = row.cells[0].innerText;
  const description = row.cells[1].innerText;

  currentClass = row;

  document.getElementById('className').value = name;
  document.getElementById('classDescription').value = description;
  document.getElementById('classModalLabel').innerText = 'Editar Turma';
  clearValidationStyles();
  new bootstrap.Modal(document.getElementById('classModal')).show();
}

function confirmDelete(button) {
  currentClass = button.closest('tr');
  new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function deleteClass() {
  currentClass.remove();
  const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
  deleteModal.hide(); 
  showDeleteToast(); 
}

function showDeleteToast() {
  const deleteToast = new bootstrap.Toast(document.getElementById('deleteToast'));
  deleteToast.show();
}

function showSuccessToast() {
  const successToast = new bootstrap.Toast(document.getElementById('successToast'));
  successToast.show();
}

function submitClassForm(event) {
  event.preventDefault();
  const nameInput = document.getElementById('className');
  const descriptionInput = document.getElementById('classDescription');
  
  if (!isFormValid(nameInput, descriptionInput)) {
    return;
  }

  const name = nameInput.value;
  const description = descriptionInput.value;

  if (currentClass) {
    currentClass.cells[0].innerText = name;
    currentClass.cells[1].innerText = description;
    currentClass = null;
  } else {
    const table = document.getElementById('classTable');
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = description;
    const actionsCell = newRow.insertCell(2);
    actionsCell.innerHTML = `
      <button class="btn btn-warning btn-sm" onclick="editClass(this)">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="confirmDelete(this)">Excluir</button>
    `;
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('classModal'));
  modal.hide();
  showSuccessToast(); 
}

function isFormValid(nameInput, descriptionInput) {
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (name.length < 3) {
    nameInput.classList.add('is-invalid');
    return false;
  } else {
    nameInput.classList.remove('is-invalid');
  }

  if (description.length < 3) {
    descriptionInput.classList.add('is-invalid');
    return false;
  } else {
    descriptionInput.classList.remove('is-invalid');
  }

  return true;
}

function clearValidationStyles() {
  document.getElementById('className').classList.remove('is-invalid');
  document.getElementById('classDescription').classList.remove('is-invalid');
}

function performSearch() {
  const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
  const rows = document.getElementById('classTable').getElementsByTagName('tr');

  let found = false;
  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].cells[0].innerText.trim().toLowerCase();
    if (name.includes(searchText)) {
      rows[i].style.display = '';
      found = true;
    } else {
      rows[i].style.display = 'none';
    }
  }

  const noResultsMessage = document.getElementById('noResults');
  if (found) {
    noResultsMessage.classList.add('d-none');
  } else {
    noResultsMessage.classList.remove('d-none');
  }
}
