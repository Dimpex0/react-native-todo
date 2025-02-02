import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Task from "../Task";
import { getTodos } from "../../utils/storage";

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    async function load() {
      console.log("loading");
      await loadTodos();
      console.log(taskList);
    }
    load();
  }, []);

  async function loadTodos() {
    const todos = await getTodos();
    setTaskList(todos);
  }

  return (
    <View>
      <Text style={styles.heading}>Today's tasks!</Text>
      <View style={styles.todosWrapper}>
        {taskList.length > 0 &&
          taskList.map((task, index) => <Task key={index} task={task} />)}
        {taskList.length <= 0 && <Text>No tasks :(</Text>}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Add")}>
        <Text>Add task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    padding: 20,
    fontWeight: "bold",
  },
});
