import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteTodo, getTodos } from "../utils/storage";
import dayjs from "dayjs";

export default function Task({ task, isExpiring = false, setTaskList }) {
  async function deleteTask() {
    await deleteTodo(task);
    const updatedTaskList = await getTodos();
    setTaskList(updatedTaskList);
  }

  // const taskDate = dayjs(task.deathline);
  // console.log(taskDate);
  // const dateDiff = taskDate.diff(dayjs(), "hours", true);
  // console.log(task.title, dateDiff);
  // const isExpiringInLessThanADay = dateDiff <= 24;
  // console.log(isExpiringInLessThanADay);

  return (
    <View style={[styles.task, isExpiring && styles.expiring]}>
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
  expiring: {
    backgroundColor: "#ffce1b",
  },
  title: {
    fontSize: 20,
  },
  icon: {
    color: "green",
  },
});
