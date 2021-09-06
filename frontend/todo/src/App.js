import './App.css';
import {
    gql, useMutation
} from "@apollo/client";
import CreateTodo from "./components/CreateTodo";
import {COMPLETE_TODOS, NOT_COMPLETE_TODOS, UPDATE_TODO} from "./gqlQueries";
import CompleteTodos from "./components/CompleteTodos";
import NotCompleteTodos from "./components/NotCompleteTodos";

function App() {

    const [checktodo, {loading, error}] = useMutation(UPDATE_TODO, {
        refetchQueries: [
            COMPLETE_TODOS,
            'fetch complete todos',
            NOT_COMPLETE_TODOS,
            'fetch not complete todos'
        ],
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div className="app">
            <CreateTodo />
            <NotCompleteTodos checktodo={checktodo} />
            <CompleteTodos  checktodo={checktodo} />
        </div>
    )
}

export default App;
