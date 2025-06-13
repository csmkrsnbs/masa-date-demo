import React from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NearbyScreen() {
  const currentUserId = 'user1'; // Gerçek kullanıcı kimliğini buraya entegre et
  const targetUserId = 'user2';  // Gerçek hedef kullanıcı ID'si buraya

  const sendDateRequest = async () => {
    try {
      await addDoc(collection(db, 'matches'), {
        from: currentUserId,
        to: targetUserId,
        status: 'pending',
        timestamp: serverTimestamp()
      });
      alert('Date isteği gönderildi!');
    } catch (error) {
      console.error('Eşleşme gönderilemedi:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Yakındaki masalar:</Text>
      <Text>• Masa 3 - Ayşe (26)</Text>
      <Button title="Ayşe'ye date isteği gönder" onPress={sendDateRequest} />
    </View>
  );
}