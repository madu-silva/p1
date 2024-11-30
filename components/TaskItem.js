import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const priorityIcons = {
  Baixa: require('../assets/arrow-down.png'),
  Média: require('../assets/arrow-rigth.png'),
  Alta: require('../assets/arrow-up.png'),
};

export default function TaskItem({ task, editTask, deleteTask }) {
  return (
    <View style={styles.taskItem}>
      <Image source={priorityIcons[task.priority]} style={styles.icon} />
      <View style={styles.taskDetails}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text>{task.description}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => editTask(task)} />
        <Button title="Delete" onPress={() => deleteTask(task.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 20,
    height: 20,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskName: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});