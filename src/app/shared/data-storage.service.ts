import { Todo } from './todo.model';
import { Injectable} from '@angular/core';

const storageName = 'Todo list';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  todoList: Todo[];

  constructor () {
    this.todoList = this.getData(storageName) || [];
  }

  getData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getAllTodos() {
    return this.todoList;
  }

  saveTodoList(): void {
    this.setData(storageName, this.todoList);
  }

  addTodo(todo: Todo): void {
    this.todoList.push(todo);
    this.saveTodoList();
  }

  deleteTodo(item: number): void {
    this.todoList.splice(item, 1);
    this.saveTodoList();
  }

  updateTodo(item, changes) : void {
    this.todoList[item] = { ...item, ...changes };
    this.saveTodoList();
  }

}
