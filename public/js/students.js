let currentStudent = null;

$(document).ready(function() {
    fetchStudents();
    document.getElementById('searchInput').addEventListener('input', function() {
        searchStudents();
    });
});

function showStudentForm() {
    currentStudent = null;
    document.getElementById('studentForm').reset();
    document.getElementById('studentModalLabel').innerText = 'Cadastrar Novo Aluno';
    clearValidationStyles();
    new bootstrap.Modal(document.getElementById('studentModal')).show();
}

function editStudent(button) {
    const row = button.closest('tr');
    const name = row.cells[0].innerText;
    const birthdate = row.cells[1].innerText;
    const gender = row.cells[2].innerText;

    currentStudent = row;

    document.getElementById('studentName').value = name;
    document.getElementById('studentBirthdate').value = formatDate(birthdate);
    document.getElementById('studentGender').value = gender === 'Feminino' ? 'F' : 'M';
    document.getElementById('studentModalLabel').innerText = 'Editar Aluno';
    clearValidationStyles();
    new bootstrap.Modal(document.getElementById('studentModal')).show();
}

function confirmDelete(button) {
    currentStudent = button.closest('tr');
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function deleteStudent() {
    currentStudent.remove();
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

function submitStudentForm(event) {
    event.preventDefault();
    const nameInput = document.getElementById('studentName');
    const birthdateInput = document.getElementById('studentBirthdate');
    const genderInput = document.getElementById('studentGender');
  
    if (!isFormValid(nameInput, birthdateInput, genderInput)) {
        return;
    }
  
    const name = nameInput.value;
    const birthdate = formatDate(birthdateInput.value); 
    const gender = genderInput.value === 'F' ? 'Feminino' : 'Masculino';
  
    if (currentStudent) {
        currentStudent.cells[0].innerText = name;
        currentStudent.cells[1].innerText = birthdate;
        currentStudent.cells[2].innerText = gender;
        currentStudent = null;
    } else {
        const table = document.getElementById('studentTable');
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = name;
        newRow.insertCell(1).innerText = birthdate;
        newRow.insertCell(2).innerText = gender;
        const actionsCell = newRow.insertCell(3);
        actionsCell.innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="editStudent(this)">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete(this)">Excluir</button>
        `;
    }
  
    const modal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    modal.hide();
    showSuccessToast(); 
}

function isFormValid(nameInput, birthdateInput, genderInput) {
    const name = nameInput.value.trim();
    const birthdate = birthdateInput.value.trim();
    const gender = genderInput.value;
  
    if (name.length < 3) {
        nameInput.classList.add('is-invalid');
        return false;
    } else {
        nameInput.classList.remove('is-invalid');
    }
  
    if (!isValidDate(birthdate)) {
        birthdateInput.classList.add('is-invalid');
        return false;
    } else {
        birthdateInput.classList.remove('is-invalid');
    }
  
    if (gender === '') {
        genderInput.classList.add('is-invalid');
        return false;
    } else {
        genderInput.classList.remove('is-invalid');
    }
  
    return true;
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }

    return true;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function clearValidationStyles() {
    document.getElementById('studentName').classList.remove('is-invalid');
    document.getElementById('studentBirthdate').classList.remove('is-invalid');
    document.getElementById('studentGender').classList.remove('is-invalid');
}

function fetchStudents() {
    const students = [
        { name: 'Maria Silva', birthdate: '2000-05-15', gender: 'Feminino' },
        { name: 'João Santos', birthdate: '1999-08-25', gender: 'Masculino' }
    ];

    const table = document.getElementById('studentTable');
    students.forEach(student => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = student.name;
        newRow.insertCell(1).innerText = formatDate(student.birthdate); 
        newRow.insertCell(2).innerText = student.gender;
        const actionsCell = newRow.insertCell(3);
        actionsCell.innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="editStudent(this)">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete(this)">Excluir</button>
        `;
    });
}

function searchStudents() {
    const nameInput = document.getElementById('searchInput').value.toUpperCase();
    const genderFilter = document.getElementById('filterGender').value;
    const birthdateFilter = document.getElementById('filterBirthdate').value;

    const table = document.getElementById('studentTable');
    const rows = table.getElementsByTagName('tr');
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const nameColumn = rows[i].getElementsByTagName('td')[0];
        const genderColumn = rows[i].getElementsByTagName('td')[2];
        const birthdateColumn = rows[i].getElementsByTagName('td')[1];

        if (nameColumn && genderColumn && birthdateColumn) {
            const nameValue = nameColumn.textContent || nameColumn.innerText;
            const genderValue = genderColumn.textContent || genderColumn.innerText;
            const birthdateValue = birthdateColumn.textContent || birthdateColumn.innerText;

            // Aplica os filtros
            const nameMatch = nameValue.toUpperCase().indexOf(nameInput) > -1;
            const genderMatch = genderFilter === '' || genderValue === genderFilter;
            const birthdateMatch = birthdateFilter === '' || birthdateValue === formatDate(birthdateFilter);

            if (nameMatch && genderMatch && birthdateMatch) {
                rows[i].style.display = '';
                found = true;
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    const notFoundMessage = document.getElementById('notFoundMessage');
    if (!found) {
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }
}



