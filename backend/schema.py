from graphene import ObjectType, Mutation, List, Schema, Field, Int, Boolean, String
from graphene_django import DjangoObjectType
from .models import Todo


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ('id', 'task', 'completed', 'date_created')


class Query(ObjectType):
    todos = List(TodoType, description="All todos")
    todo_by_id = Field(TodoType, pk=Int(required=True), description="Get todo by id")
    todos_incomplete = List(TodoType, description="Not yet completed tasks")
    todos_complete = List(TodoType, description="Completed tasks")

    def resolve_todos(root, info, **kwargs):
        return Todo.objects.all()

    def resolve_todo_by_id(root, info, pk):
        return Todo.objects.get(id=pk)

    def resolve_todos_incomplete(root, info, **kwargs):
        return Todo.objects.filter(completed=False)

    def resolve_todos_complete(root, info, **kwargs):
        return Todo.objects.filter(completed=True)


class UpdateTodo(Mutation):
    class Arguments:
        # Mutation to update a todo
        id = Int(required=True)
        completed = Boolean()

    todo = Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id, completed):
        todo = Todo.objects.get(id=id)
        todo.completed = completed
        todo.save()

        return UpdateTodo(todo=todo)


class CreateTodo(Mutation):
    class Arguments:
        task = String(required=True)
        completed = Boolean()

    todo = Field(TodoType)

    @classmethod
    def mutate(cls, root, info, task, completed):
        todo = Todo()
        todo.task = task
        todo.completed = completed
        todo.save()

        return CreateTodo(todo=todo)


class Mutation(ObjectType):
    update_todo = UpdateTodo.Field()
    create_todo = CreateTodo.Field()


schema = Schema(query=Query, mutation=Mutation)
