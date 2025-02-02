import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getTodos() {
  try {
    const data = await AsyncStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error getting todos from memory.", error);
    return [];
  }
}

export async function saveTodo(task) {
  try {
    const todos = await getTodos();
    const updatedTodos = [task, ...todos];
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  } catch (error) {
    console.log("Couldn't save task.", error);
  }
}

export async function deleteTodo(task) {
  try {
    const todos = await getTodos();
    const updatedTodos = todos.filter(
      (todo) => todo.deathline != task.deathline
    );
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  } catch (error) {
    console.log("Couldn't delete task.", error);
  }
}
