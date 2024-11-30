import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';

const priorityIcons = {
  Baixa: require('../assets/arrow-down.png'),
  Média: require('../assets/arrow-right.png'),
  Alta: require('../assets/arrow-up.png'),
};

export default function TaskItem({ task, editTask, deleteTask, isSelected }) {
  const confirmDelete = () => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja apagar esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', onPress: () => deleteTask(task.id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.taskItem, isSelected && styles.selectedTask]}>
      <Image source={priorityIcons[task.priority]} style={styles.icon} />
      <View style={styles.taskDetails}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text>{task.description}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={() => editTask(task)} style={[styles.button, styles.editButton]} accessibilityLabel="Editar tarefa">
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable onPress={confirmDelete} style={[styles.button, styles.deleteButton]} accessibilityLabel="Apagar tarefa">
          <Text style={styles.buttonText}>Apagar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedTask: {
    backgroundColor: '#BB86FC',
  },
  icon: {
    width: 24,
    height: 24,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 15,
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#6200EE',
  },
  deleteButton: {
    backgroundColor: '#B00020',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});