import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TaskItem({ task, editTask, deleteTask }) {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text>{task.description}</Text>
      <Text>{task.priority}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => editTask(task)} />
        <Button title="Delete" onPress={() => deleteTask(task.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskName: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});