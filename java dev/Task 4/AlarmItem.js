import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlarmItem({ alarm, onToggle, onDelete }) {
  const [isEnabled, setIsEnabled] = useState(alarm.active);

  const toggleSwitch = async () => {
    const newVal = !isEnabled;
    setIsEnabled(newVal);
    // Update storage
    const stored = await AsyncStorage.getItem('alarms');
    let alarms = stored ? JSON.parse(stored) : [];
    alarms = alarms.map(a => {
      if (a.id === alarm.id) {
        a.active = newVal;
      }
      return a;
    });
    await AsyncStorage.setItem('alarms', JSON.stringify(alarms));

    // Cancel or schedule notification
    if (newVal) {
      // schedule again
      PushNotification.localNotificationSchedule({
        id: alarm.id,
        message: "Alarm! It's time.",
        date: new Date(alarm.time),
        allowWhileIdle: true,
      });
    } else {
      // cancel
      PushNotification.cancelLocalNotifications({ id: alarm.id });
    }

    onToggle && onToggle(alarm.id, newVal);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.timeText}>
        {new Date(alarm.time).toLocaleTimeString()}
      </Text>
      <Switch value={isEnabled} onValueChange={toggleSwitch} />
      <Button title="Delete" onPress={() => onDelete(alarm.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding: 15, backgroundColor:'#eee', marginVertical:5, marginHorizontal:15, borderRadius:8 },
  timeText: { fontSize:18 }
});
