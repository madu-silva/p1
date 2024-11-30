import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
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

  const sortedTasks = tasks.sort((a, b) => {
    const priorities = { 'Baixa': 1, 'Média': 2, 'Alta': 3 };
    return sortOrder === 'asc' ? priorities[a.priority] - priorities[b.priority] : priorities[b.priority] - priorities[a.priority];
  });

  return (
    <View style={styles.container}>
      <TaskForm addTask={addTask} taskToEdit={taskToEdit} updateTask={updateTask} />
      <Button title={`Ordenar por prioridade (${sortOrder === 'asc' ? 'ascendente' : 'descendente'})`} onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} editTask={editTask} deleteTask={deleteTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB6C1', // Fundo rosa bebê
    padding: 20,
  },
});