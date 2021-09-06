import {
    useQuery
} from "@apollo/client";
import {COMPLETE_TODOS} from "../gqlQueries";

function CompleteTodos({checktodo}) {
    const {loading, error, data} = useQuery(COMPLETE_TODOS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div className="todoContainer">
            {
                data.todos.map(({id, task, completed}) => (
                    <div className="todo completeTodo" key={id}>
                        <div className="task"> {task}</div>
                        <input type="checkbox" checked={completed}
                        onChange={(e)=>{checktodo({variables: {id: id, completed: e.target.checked  }})}}
                        />
                    </div>

                ))
            }
        </div>
    )
}

export default CompleteTodos;
