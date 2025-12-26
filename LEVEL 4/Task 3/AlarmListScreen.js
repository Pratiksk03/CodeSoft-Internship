import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmItem from '../components/AlarmItem';

export default function AlarmListScreen() {
  const [alarms, setAlarms] = useState([]);

  const loadAlarms = async () => {
    const stored = await AsyncStorage.getItem('alarms');
    setAlarms(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAlarms();
    });
    loadAlarms();
    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    const filtered = alarms.filter(a => a.id !== id);
    await AsyncStorage.setItem('alarms', JSON.stringify(filtered));
    // also cancel notif
    PushNotification.cancelLocalNotifications({ id: id });
    setAlarms(filtered);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AlarmItem alarm={item} onDelete={handleDelete} onToggle={loadAlarms} />
        )}
        ListEmptyComponent={<View><Text>No alarms set</Text></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', paddingTop:20 }
});
