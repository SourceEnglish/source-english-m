import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNotes } from '@/contexts/NotesContext';
import ChevronsUp from '@/assets/icons/open_source/chevrons-up.svg';
import ChevronsDown from '@/assets/icons/open_source/chevrons-down.svg';
import NotesLoading from './NotesLoading';
import NotebookPen from '@/assets/icons/open_source/notebook-pen.svg';

interface NotesProps {
  noteKey: string;
}

const MAX_LENGTH = 1000;
const screenHeight = Dimensions.get('window').height;
const MAX_INPUT_HEIGHT = screenHeight * 0.7;

const Notes: React.FC<NotesProps> = ({ noteKey }) => {
  const { setNote } = useNotes();
  const [value, setValue] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [inputHeight, setInputHeight] = useState(60);

  useEffect(() => {
    // Always load note from storage directly
    const noteKeyStorage = `note_${noteKey}`;
    if (Platform.OS === 'web') {
      const storedNote = localStorage.getItem(noteKeyStorage);
      setValue(storedNote ?? '');
      setLoaded(true);
    } else {
      import('@react-native-async-storage/async-storage').then(
        (AsyncStorage) => {
          AsyncStorage.default
            .getItem(noteKeyStorage)
            .then((storedNote: string | null) => {
              setValue(storedNote ?? '');
              setLoaded(true);
            });
        }
      );
    }
  }, [noteKey]);

  const handleChange = (text: string) => {
    if (text.length <= MAX_LENGTH) {
      setValue(text);
      setNote(noteKey, text);
    }
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  if (!loaded) return <NotesLoading expanded={!collapsed} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.collapseHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotebookPen width={20} height={20} style={{ marginRight: 6 }} />
          <Text style={styles.label}>Notes</Text>
        </View>
        {collapsed ? (
          <ChevronsDown width={24} height={24} />
        ) : (
          <ChevronsUp width={24} height={24} />
        )}
      </TouchableOpacity>
      {!collapsed && (
        <>
          <TextInput
            style={[
              styles.input,
              { height: inputHeight, maxHeight: MAX_INPUT_HEIGHT },
            ]}
            value={value}
            onChangeText={handleChange}
            placeholder="Type your notes here..."
            multiline
            maxLength={MAX_LENGTH}
            editable={loaded}
            onContentSizeChange={(e) => {
              const newHeight = Math.max(
                60,
                Math.min(MAX_INPUT_HEIGHT, e.nativeEvent.contentSize.height)
              );
              if (value === '' && inputHeight !== 60) {
                setInputHeight(60);
              } else if (inputHeight !== newHeight) {
                setInputHeight(newHeight);
              }
            }}
          />
          <Text style={styles.counter}>
            {value.length} / {MAX_LENGTH}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    fontFamily: 'Lexend_400Regular',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  collapseHeader: {
    fontFamily: 'Lexend_400Regular',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontFamily: 'Lexend',
    fontWeight: 'bold',
  },
  input: {
    fontFamily: 'Lexend_400Regular',
    minHeight: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    backgroundColor: 'white',
    fontSize: 16,
    marginBottom: 4,
    textAlignVertical: 'top',
  },
  counter: {
    fontFamily: 'Lexend_400Regular',
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#888',
  },
});

export default Notes;
