import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { saveTodo } from "../../utils/storage";

export default function AddScreen({ navigation, route }) {
  const [task, setTask] = useState({
    title: "",
    deathline: dayjs(),
  });

  useEffect(() => {
    console.log(task);
    console.log(dayjs());
  }, [task]);

  async function createTask() {
    await saveTodo(task);
    Keyboard.dismiss();
    navigation.navigate("Home");
  }

  return (
    <View>
      <Text style={styles.heading}>Let's create a task!</Text>
      <TextInput
        style={styles.titleInput}
        value={task.title}
        placeholder="Title..."
        onChangeText={(text) => setTask((task) => ({ ...task, title: text }))}
      />
      <Text style={styles.heading}>Select deathline</Text>
      <DateTimePicker
        mode="single"
        date={task.deathline}
        minDate={dayjs().subtract(1, "day")}
        selectedItemColor="tomato"
        style={styles.calendar}
        onChange={(params) =>
          setTask((task) => ({ ...task, deathline: params.date }))
        }
      />
      <TouchableOpacity onPress={() => createTask()} style={styles.button}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  titleInput: {
    borderColor: "tomato",
    borderWidth: 1,
    borderRadius: 10,
    width: "70%",
    alignSelf: "center",
    height: 50,
    fontSize: 18,
    marginBottom: 25,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "tomato",
    borderRadius: 16,
    width: "50%",
    padding: 10,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
