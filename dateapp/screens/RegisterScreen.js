import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Telefon numarası"
        onChangeText={setPhone}
        value={phone}
        keyboardType="phone-pad"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <Button
        title="Devam Et"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}