import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, Alert } from 'react-native';
import RadioButton from './RadioButton';

const priorityIcons = {
  Baixa: require('../assets/arrow-down.png'),
  Média: require('../assets/arrow-right.png'),
  Alta: require('../assets/arrow-up.png'),
};

export default function TaskForm({ addTask, taskToEdit, updateTask, cancelEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    } else {
      setName('');
      setDescription('');
      setPriority('Baixa');
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Nome da Tarefa e Descrição são obrigatórios.');
      return;
    }
    setError('');
    if (taskToEdit) {
      updateTask({ ...taskToEdit, name, description, priority });
      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
    } else {
      const newTask = {
        id: Date.now(),
        name,
        description,
        priority,
      };
      addTask(newTask);
      Alert.alert('Sucesso', 'Nova tarefa adicionada com sucesso!');
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
        accessibilityLabel="Nome da Tarefa"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        accessibilityLabel="Descrição da Tarefa"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={styles.button} accessibilityLabel={taskToEdit ? "Atualizar tarefa" : "Adicionar nova tarefa"}>
          <Text style={styles.buttonText}>{taskToEdit ? "Atualizar tarefa" : "Adicionar nova tarefa"}</Text>
        </Pressable>
        {taskToEdit && (
          <Pressable onPress={cancelEdit} style={[styles.button, styles.cancelButton]} accessibilityLabel="Cancelar edição">
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
        )}
      </View>
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7CCD9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#BF754B',
    marginBottom: 10,
  },
  priorityContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3F7373',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#BF754B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});