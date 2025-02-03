import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Task from "../Task";
import { getTodos } from "../../utils/storage";
import dayjs from "dayjs";

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    async function load() {
      await loadTodos();
    }
    load();
  }, []);

  const expiringTaskList = taskList.filter((task) => {
    const taskDate = dayjs(task.deathline);
    return taskDate.diff(dayjs(), "hours", true) <= 24;
  });

  async function loadTodos() {
    const todos = await getTodos();
    setTaskList(todos);
  }

  return (
    <View>
      <Text style={styles.heading}>Today's tasks!</Text>
      <View style={styles.todosWrapper}>
        {expiringTaskList.length > 0 && (
          <>
            <Text style={styles.deathlineHeading}>
              Deathline in less than a day:
            </Text>
            {expiringTaskList.map((task) => (
              <Task
                key={task.createdAt}
                task={task}
                isExpiring={true}
                setTaskList={setTaskList}
              />
            ))}
            <View style={styles.line}></View>
          </>
        )}
        {taskList.map((task) => {
          const isExpiring =
            dayjs(task.deathline).diff(dayjs(), "hours", true) <= 24;
          return (
            !isExpiring && (
              <Task
                key={task.createdAt}
                task={task}
                setTaskList={setTaskList}
              />
            )
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.addButtonText}>Add task</Text>
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
  deathlineHeading: {
    fontSize: 20,
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: "tomato",
    width: "60%",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
  },
  addButtonText: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
  line: {
    height: 1,
    width: "auto",
    backgroundColor: "black",
    marginVertical: 10,
  },
});
