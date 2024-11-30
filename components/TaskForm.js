import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TaskForm({ addTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = () => {
    const newTask = {
      id: Date.now(),
      name,
      description,
      priority,
    };
    addTask(newTask);
    setName('');
    setDescription('');
    setPriority('Low');
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.priorityContainer}>
        <Button title="Baixa" onPress={() => setPriority('Low')} />
        <Button title="Média" onPress={() => setPriority('Medium')} />
        <Button title="Alta" onPress={() => setPriority('High')} />
      </View>
      <Button title="Adicionar nova tarefa" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});