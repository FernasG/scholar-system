document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'pt-br',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia'
      },
      events: [], 
      editable: true,
      eventClick: function (info) {
        var eventObj = info.event;
  
        document.getElementById('editLessonId').value = eventObj.id;
        document.getElementById('editLessonDate').value = eventObj.startStr.substring(0, 10);
        document.getElementById('editLessonTime').value = eventObj.startStr.substring(11, 16);
        document.getElementById('editLessonTopic').value = eventObj.title;
  
        var editLessonModal = new bootstrap.Modal(document.getElementById('editLessonModal'));
        editLessonModal.show();
      },
      eventDrop: function (info) {
        updateEvent(info.event);
      },
      eventResize: function (info) {
        updateEvent(info.event);
      }
    });
  
    calendar.render();
  
    function showToast(message) {
      var toastEl = document.getElementById('toast');
      var toastBody = toastEl.querySelector('.toast-body');
      toastBody.innerText = message;
  
      var toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  
    document.getElementById('addLessonForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      var lessonDate = document.getElementById('lessonDate').value;
      var lessonTime = document.getElementById('lessonTime').value;
      var lessonTopic = document.getElementById('lessonTopic').value;
  
      var newEvent = {
        id: String(Date.now()),
        title: lessonTopic,
        start: lessonDate + 'T' + lessonTime,
      };
  
      calendar.addEvent(newEvent);
  
      document.getElementById('addLessonForm').reset();
      var addLessonModal = bootstrap.Modal.getInstance(document.getElementById('addLessonModal'));
      addLessonModal.hide();
      showToast('Aula adicionada com sucesso!');
    });
  
    document.getElementById('editLessonForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      var lessonId = document.getElementById('editLessonId').value;
      var lessonDate = document.getElementById('editLessonDate').value;
      var lessonTime = document.getElementById('editLessonTime').value;
      var lessonTopic = document.getElementById('editLessonTopic').value;
  
      var event = calendar.getEventById(lessonId);
      event.setProp('title', lessonTopic);
      event.setStart(lessonDate + 'T' + lessonTime);
  
      document.getElementById('editLessonForm').reset();
      var editLessonModal = bootstrap.Modal.getInstance(document.getElementById('editLessonModal'));
      editLessonModal.hide();
      showToast('Aula editada com sucesso!');
    });
  
    document.getElementById('deleteLessonButton').addEventListener('click', function () {
      var lessonId = document.getElementById('editLessonId').value;
      var event = calendar.getEventById(lessonId);
      event.remove();
  
      document.getElementById('editLessonForm').reset();
      var editLessonModal = bootstrap.Modal.getInstance(document.getElementById('editLessonModal'));
      editLessonModal.hide();
      showToast('Aula excluída com sucesso!');
    });
  
    document.getElementById('attendanceForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
  
      document.getElementById('attendanceForm').reset();
      var attendanceModal = bootstrap.Modal.getInstance(document.getElementById('attendanceModal'));
      attendanceModal.hide();
      showToast('Frequência lançada com sucesso!');
    });
  
    document.getElementById('observationForm').addEventListener('submit', function (event) {
      event.preventDefault();
    
      document.getElementById('observationForm').reset();
      var observationModal = bootstrap.Modal.getInstance(document.getElementById('observationModal'));
      observationModal.hide();
      showToast('Anotação cadastrada com sucesso!');
    });
  
    document.getElementById('viewObservationsButton').addEventListener('click', function () {
      var viewObservationsModal = new bootstrap.Modal(document.getElementById('viewObservationsModal'));
      viewObservationsModal.show();
    });
  
  });
  