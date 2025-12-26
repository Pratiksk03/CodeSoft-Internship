import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export default function AlarmSetScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const saveAlarm = async () => {
    // Build alarm object
    const alarm = {
      id: Date.now().toString(),
      time: date.toISOString(),
      active: true,
    };

    // Save to storage
    const stored = await AsyncStorage.getItem('alarms');
    const alarms = stored ? JSON.parse(stored) : [];
    alarms.push(alarm);
    await AsyncStorage.setItem('alarms', JSON.stringify(alarms));

    // Schedule notification
    PushNotification.localNotificationSchedule({
      // The ID helps to cancel if needed
      id: alarm.id,
      message: "Alarm! It's time.",
      date: date, // JS Date object
      allowWhileIdle: true,
      // you can specify soundName etc here
    });

    Alert.alert('Alarm set', `Alarm for ${date.toLocaleTimeString()} is set.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pick Time for Alarm:</Text>
      <Button title="Show Time Picker" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{ marginTop: 30 }}>
        <Button title="Save Alarm" onPress={saveAlarm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  label: { fontSize:18, marginBottom:20 },
});
