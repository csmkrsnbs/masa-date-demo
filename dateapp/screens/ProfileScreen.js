import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Adınız"
        onChangeText={setName}
        value={name}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Yaşınız"
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <Button
        title="Yakındaki Kişilere Geç"
        onPress={() => navigation.navigate('Nearby')}
      />
    </View>
  );
}