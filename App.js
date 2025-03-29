import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hostel Manager</Text>
      <Text style={{ marginTop: 10 }}>Welcome to the application!</Text>
    </View>
  );
}