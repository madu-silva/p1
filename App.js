import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setTaskToEdit(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorities = { 'Baixa': 1, 'Média': 2, 'Alta': 3 };
    return sortOrder === 'asc' ? priorities[a.priority] - priorities[b.priority] : priorities[b.priority] - priorities[a.priority];
  });

  return (
    <View style={styles.container}>
      <TaskForm addTask={addTask} taskToEdit={taskToEdit} updateTask={updateTask} cancelEdit={cancelEdit} />
      <Pressable onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>Ordenar por prioridade</Text>
      </Pressable>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            editTask={editTask}
            deleteTask={deleteTask}
            isSelected={taskToEdit && taskToEdit.id === item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fundo neutro que combina com a paleta de cores
    padding: 20,
  },
  sortButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});