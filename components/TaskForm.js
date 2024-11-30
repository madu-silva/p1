import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import RadioButton from './RadioButton';

const priorityIcons = {
  Baixa: require('../assets/arrow-down.png'),
  Média: require('../assets/arrow-right.png'),
  Alta: require('../assets/arrow-up.png'),
};

export default function TaskForm({ addTask, taskToEdit, updateTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Baixa');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (taskToEdit) {
      updateTask({ ...taskToEdit, name, description, priority });
    } else {
      const newTask = {
        id: Date.now(),
        name,
        description,
        priority,
      };
      addTask(newTask);
    }
    setName('');
    setDescription('');
    setPriority('Baixa');
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Tarefa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.priorityContainer}>
        {['Baixa', 'Média', 'Alta'].map((level) => (
          <RadioButton
            key={level}
            label={level}
            selected={priority === level}
            onPress={() => setPriority(level)}
            icon={priorityIcons[level]}
          />
        ))}
      </View>
      <Button title={taskToEdit ? "Atualizar tarefa" : "Adicionar nova tarefa"} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  priorityContainer: {
    marginBottom: 10,
  },
});