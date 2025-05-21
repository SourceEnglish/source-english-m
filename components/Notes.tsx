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
  const [collapsed, setCollapsed] = useState(() => {
    // Default to true (closed) until we check storage
    return true;
  });
  const [collapsedLoaded, setCollapsedLoaded] = useState(false);
  const [inputHeight, setInputHeight] = useState(60);

  useEffect(() => {
    // Always load note from storage directly
    const noteKeyStorage = `note_${noteKey}`;
    if (Platform.OS === 'web') {
      const storedNote = localStorage.getItem(noteKeyStorage);
      setValue(storedNote ?? '');
      setLoaded(true);
    } else {
      import('@react-native-async-storage/async-storage').then(AsyncStorage => {
        AsyncStorage.default.getItem(noteKeyStorage).then((storedNote: string | null) => {
          setValue(storedNote ?? '');
          setLoaded(true);
        });
      });
    }
    // Load collapsed state from storage
    const collapsedKey = `collapsed_${noteKey}`;
    if (Platform.OS === 'web') {
      const storedCollapsed = localStorage.getItem(collapsedKey);
      if (storedCollapsed !== null) {
        setCollapsed(storedCollapsed === 'true');
        setCollapsedLoaded(true);
      } else {
        // If note is not empty, default to open
        setCollapsed(value.trim() === '' ? true : false);
        setCollapsedLoaded(true);
      }
    } else {
      import('@react-native-async-storage/async-storage').then(AsyncStorage => {
        AsyncStorage.default.getItem(collapsedKey).then((storedCollapsed: string | null) => {
          if (storedCollapsed !== null) {
            setCollapsed(storedCollapsed === 'true');
            setCollapsedLoaded(true);
          } else {
            setCollapsed(value.trim() === '' ? true : false);
            setCollapsedLoaded(true);
          }
        });
      });
    }
  }, [noteKey]);

  const handleChange = (text: string) => {
    if (text.length <= MAX_LENGTH) {
      setValue(text);
      setNote(noteKey, text);
    }
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const newCollapsed = !prev;
      const collapsedKey = `collapsed_${noteKey}`;
      if (Platform.OS === 'web') {
        localStorage.setItem(collapsedKey, newCollapsed.toString());
      } else {
        import('@react-native-async-storage/async-storage').then(
          (AsyncStorage) => {
            AsyncStorage.default.setItem(collapsedKey, newCollapsed.toString());
          }
        );
      }
      return newCollapsed;
    });
  };

  if (!loaded || !collapsedLoaded) return <NotesLoading />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.collapseHeader}>
        <Text style={styles.label}>Notes (max 1000 chars):</Text>
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
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  collapseHeader: {
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
    fontWeight: 'bold',
  },
  input: {
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
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#888',
  },
});

export default Notes;
