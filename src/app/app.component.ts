import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from './shared/todo.model';
import { DataStorageService } from './shared/data-storage.service';

const storageName = 'aah_todo_list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do-list';
  todoList:  Todo[];
  isShowingModal: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit(): void {
    this.todoList = this.dataStorageService.getAllTodos();
  }

  onSubmit(form: NgForm) {
    const newTodo = new Todo(form.value.textInput);
    this.dataStorageService.addTodo(newTodo);
    form.reset();
  }

  removeTodo( todo :  Todo ) {
    this.isShowingModal = true;
    this.onConfirm(todo);
  }

  onConfirm(todo: any) {
    const index = this.todoList.indexOf(todo);
    this.dataStorageService.deleteTodo(index);
  }

  onTodoClicked(todo: Todo) {
    todo.completed = !todo.completed;
    const index = this.todoList.indexOf(todo);
    this.dataStorageService.updateTodo(index, todo);
  }
}
