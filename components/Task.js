import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteTodo } from "../utils/storage";

export default function Task({ task }) {
  async function deleteTask() {
    await deleteTodo(task);
    // refactor task to be saved with zustand
  }

  return (
    <View style={styles.task}>
      <Text style={styles.title}>{task.title}</Text>
      <TouchableOpacity onPress={deleteTask}>
        <FontAwesomeIcon style={styles.icon} icon={faCheck} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
  },
  icon: {
    color: "green",
  },
});
