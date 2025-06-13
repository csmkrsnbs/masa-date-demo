import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function MatchRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const currentUserId = 'user2'; // Bu kullanıcıya gelen istekleri göreceğiz

  useEffect(() => {
    const q = query(
      collection(db, 'matches'),
      where('to', '==', currentUserId),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(data);
    });

    return () => unsubscribe();
  }, []);

  const handleResponse = async (id, response) => {
    const ref = doc(db, 'matches', id);
    await updateDoc(ref, { status: response });
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Gelen Date İstekleri:</Text>
      {requests.map((req, index) => (
        <View key={req.id} style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
          <Text>Kimden: {req.from}</Text>
          <Button title="Kabul Et" onPress={() => handleResponse(req.id, 'accepted')} />
          <Button title="Reddet" onPress={() => handleResponse(req.id, 'rejected')} color="red" />
        </View>
      ))}
    </ScrollView>
  );
}