import {
    gql,
    useMutation
} from "@apollo/client";
import {COMPLETE_TODOS, NOT_COMPLETE_TODOS, CREATE_TODO} from "../gqlQueries";

function CreateTodo() {
    let input;

    const [createTodo, {loading, error}] = useMutation(CREATE_TODO, {
        refetchQueries: [
            COMPLETE_TODOS,
            'fetch complete todos',
            NOT_COMPLETE_TODOS,
            'fetch not complete todos'
        ],
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return <div className="create">
        <form
            onSubmit={e => {
                e.preventDefault();
                createTodo({variables: {task: input.value}});
                input.value = '';
            }}
        >
            <input
                ref={node => {
                    input = node;
                }}
            />
            <button type="submit">Add Todo</button>
        </form>
    </div>
        ;
}

export default CreateTodo;
