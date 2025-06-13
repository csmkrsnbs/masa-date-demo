import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';

const incomingRequests = [
  { id: '2', name: 'Mehmet', age: 27 },
];

export default function DateRequestsScreen() {
  const [requests, setRequests] = useState(incomingRequests);

  const handleAccept = (user) => {
    Alert.alert("Tebrikler!", `${user.name} ile eşleştiniz.`);
    // eşleşme backend'e kaydedilir, chat başlatılabilir
  };

  const handleReject = (userId) => {
    setRequests(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <View>
      <Text>Gelen Date İstekleri</Text>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}, {item.age}</Text>
            <Button title="Kabul Et" onPress={() => handleAccept(item)} />
            <Button title="Reddet" onPress={() => handleReject(item.id)} />
          </View>
        )}
      />
    </View>
  );
}