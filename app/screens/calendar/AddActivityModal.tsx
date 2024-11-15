// app/screens/calendar/AddActivityModal.tsx
import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextBold from '../../components/CustomTextBold';
import CustomText from '../../components/CustomTextReg';

interface AddActivityModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (activity: any) => void;
  selectedDate: string;
}

const AddActivityModal = ({ visible, onClose, onSave, selectedDate }: AddActivityModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const newActivity = {
      id: Date.now().toString(),
      title,
      description,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: selectedDate,
      type: 'activity',
    };
    onSave(newActivity);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTime(new Date());
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <CustomTextBold style={styles.title}>Add New Activity</CustomTextBold>
            <TouchableOpacity onPress={onClose}>
              <CustomText style={styles.closeButton}>✕</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <CustomText style={styles.label}>Title</CustomText>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter activity title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <CustomText style={styles.label}>Description</CustomText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter activity description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <CustomText style={styles.label}>Time</CustomText>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <CustomText>
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </CustomText>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <CustomTextBold style={styles.saveButtonText}>Save Activity</CustomTextBold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
  },
  form: {
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  saveButton: {
    backgroundColor: '#FCC3D2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddActivityModal;