

//---------------------------------------------------------------add task---------------------------------------------------------------------------
document.getElementById('saveTaskButton').addEventListener('click', async () => {
    const taskName = document.getElementById('taskName').value.trim();

    if (!taskName) {
        alert('Task name is required!');
        return;
    }

    try {
        const response = await axios.post('/addTask', { taskName });

        if (response.data.success) {
            document.getElementById('taskName').value = '';

            const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
            modal.hide();

            const taskList = document.getElementById('todo-list');
            
            const newTaskItem = document.createElement('li');
            newTaskItem.className = 'list-group-item todo-item d-flex justify-content-between align-items-center';
            newTaskItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="form-check-input me-2" onchange="toggleTask(this)">
                    <span>${taskName}</span>
                </div>
                <div>
                    <form class="d-inline">
                        <button type="submit" class="btn btn-sm btn-outline-primary btn-action me-1 edit-task-button">

                            <i class="fas fa-edit"></i>
                        </button>
                    </form>
                    <form  class="d-inline">
                        <button type="submit" class="btn btn-sm btn-outline-danger btn-action-del">
                            
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </form>
                </div>
            `;

            taskList.appendChild(newTaskItem);

            Toastify({
                text: response.data.message,
                duration: 3000,
                close: false,
                gravity: "bottom",
                position: "right",
                offset: {
                    x: "100px",
                    y: "50px"
                },
                backgroundColor: "linear-gradient(to right, #004d00, #006400)",
                stopOnFocus: true,
            }).showToast();
        } else {
            Toastify({
                text: response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                offset: {
                    x: "100px",
                    y: "50px"
                },
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true,
            }).showToast();
        }
    } catch (error) {
        console.error('Error adding task:', error);
        document.getElementById('error-message').style.display = 'block';
    }
});



//--------------------------------------------------------------edit task------------------------------------------------------------------------------
document.addEventListener('click', (event) => {
    if (event.target.closest('.edit-task-button')) {
        const button = event.target.closest('.edit-task-button');
        const taskIndex = button.getAttribute('data-index');
        const taskName = button.getAttribute('data-task-name');

        document.getElementById('taskIndex').value = taskIndex;
        document.getElementById('taskNameInput').value = taskName;

        const editModal = new bootstrap.Modal(document.getElementById('taskModal'));
        editModal.show();
    }
});

document.getElementById('saveTaskChangesButton').addEventListener('click', async () => {
    const taskIndex = document.getElementById('taskIndex').value;
    const updatedTaskName = document.getElementById('taskNameInput').value.trim();

    if (!updatedTaskName) {
        alert('Task name is required!');
        return;
    }

    try {
        const response = await axios.post(`/edit-task/${taskIndex}`, { taskName: updatedTaskName });

        if (response.data.success) {
            const taskListItem = document.querySelector(`.edit-task-button[data-index="${taskIndex}"]`).closest('li');
            taskListItem.querySelector('span').textContent = updatedTaskName;

            const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            modal.hide();

           
            Toastify({
                text: response.data.message,
                duration: 3000,
                close: false,
                gravity: "bottom",
                position: "right",
                offset: {
                    x: "100px",
                    y: "50px"
                },
                backgroundColor: "linear-gradient(to right, #004d00, #006400)",
                stopOnFocus: true,
            }).showToast();
        } else {
            Toastify({
                text: response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                offset: {
                    x: "100px",
                    y: "50px"
                },
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true,
            }).showToast();
        }
    } catch (error) {
        console.error('Error updating task:', error);
        document.getElementById('edit-error-message').style.display = 'block';
    }
});



//----------------------------------------------------------------delete task-------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll('.btn-action-del');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
  
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this task?',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
          customClass: {
            popup: 'small-modal', 
          },
          focusCancel: true
        }).then((result) => {
          if (result.isConfirmed) {
            const form = button.closest("form");
            const actionUrl = form.action;
  
            axios.post(actionUrl)
              .then(response => {
                if (response.status === 200) {
                  localStorage.setItem('taskDeleted', 'true');
                  window.location.reload(); 
                }
              })
              .catch(error => {
                Toastify({
                  text: "Something went wrong. Please try again.",
                  gravity: "bottom",
                  position: "right",
                  offset: {
                      x: "100px",
                      y: "50px"
                  },
                  backgroundColor: "red",
                  duration: 3000
                }).showToast();
              });
          }
        });
      });
    });
  
    if (localStorage.getItem('taskDeleted') === 'true') {
      Toastify({
        text: "Task deleted successfully!",
        backgroundColor: "green",
        gravity: "bottom",
                  position: "right",
                  offset: {
                      x: "100px",
                      y: "50px"
                  },
        duration: 3000
      }).showToast();
  
      localStorage.removeItem('taskDeleted');
    }
  });
  


//----------------------------------------------------------------change status----------------------------------------------------------------------
function toggleTask(checkbox) {
    const taskIndex = checkbox.dataset.index; 
    const taskName = checkbox.dataset.taskName; 
    const completed = checkbox.checked; 
   
    
    axios.post(`/update-task/${taskIndex}`, { completed })
      .then(response => {
        if (response.status === 200) {
          Toastify({
            text: `"${taskName}" marked as ${completed ? "completed" : "incomplete"}!`,
            gravity: "bottom",
                  position: "right",
                  offset: {
                      x: "100px",
                      y: "50px"
                  },
            backgroundColor: "green",
            duration: 3000,
          }).showToast();
  
          const taskSpan = checkbox.nextElementSibling;
          if (completed) {
            taskSpan.classList.add('text-decoration-line-through');
          } else {
            taskSpan.classList.remove('text-decoration-line-through');
          }
        }
      })
      .catch(error => {
        Toastify({
          text: "Something went wrong. Please try again.",
          gravity: "bottom",
                  position: "right",
                  offset: {
                      x: "100px",
                      y: "50px"
                  },
          backgroundColor: "red",
          duration: 3000,
        }).showToast();
  
        checkbox.checked = !completed;
      });
  }

  