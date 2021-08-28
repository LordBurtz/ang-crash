import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskservice: TaskService) { }

  ngOnInit(): void {
    this.updateTasks();
  }

  deleteTask(task: Task) {
    this.taskservice.
      deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)))
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskservice.updateTaskReminder(task).subscribe()
  }

    addTask(task: Task) {
      this.taskservice.addTask(task).subscribe( 
         error => {
        console.log(error);
      },
       response => {
        console.log(response);
      },
       () => {
        console.log('Complete');
        this.updateTasks();
      })
      this.updateTasks();
    }

    updateTasks() {
      this.taskservice.getTasks().subscribe((tasks) => this.tasks = tasks)
    }
}
