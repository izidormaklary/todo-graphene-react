import {gql} from "@apollo/client";

const FETCH_TODOS = gql`
      query FetchTodos {
        todos{
          id  
          task
          completed
        }
      }`;
const COMPLETE_TODOS = gql`
      query CompleteTodos {
        todos: todosComplete{
          id  
          task
          completed
        }
      }`;
const NOT_COMPLETE_TODOS = gql`
      query NotCompleteTodos {
        todos: todosIncomplete{
          id  
          task
          completed
        }
      }`;
const CREATE_TODO = gql`
      mutation CreateTodo($task: String!, $completed: Boolean = false) {
        createTodo(task: $task , completed: $completed){
        todo{
          id  
          task
          completed
          }
        }
      }`;
const UPDATE_TODO = gql`
      mutation UpdateTodo($id: Int!, $completed: Boolean = false) {
        updateTodo(id: $id , completed: $completed){
        todo{
          id  
          task
          completed
          }
        }
      }`;
export {FETCH_TODOS, CREATE_TODO, COMPLETE_TODOS, NOT_COMPLETE_TODOS, UPDATE_TODO}