import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, editTask, deleteTask }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem task={item} editTask={editTask} deleteTask={deleteTask} />
      )}
    />
  );
}