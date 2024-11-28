import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

interface PlaceSuggestion {
  description: string;
  place_id: string;
}

const PlaceSearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestions = async (input: string): Promise<void> => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        'https://maps.gomaps.pro/maps/api/place/autocomplete/json',
        
        {
          params: {
            input,
            key: 'AlzaSy8Vt_9_wDVwKv5CcoXSVKIYScEJio7_Iqx', // Replace with your API key
            sessiontoken: '123abc', // Replace with session token logic if needed
            components: 'country:in',
            language: 'en',
          },
        }
      );

      if (response.data && response.data.predictions) {
        const results: PlaceSuggestion[] = response.data.predictions.map(
          (prediction: any) => ({
            description: prediction.description,
            place_id: prediction.place_id,
          })
        );
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: PlaceSuggestion): void => {
    console.log('Selected place:', place);
    setQuery(place.description);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search places"
          value={query}
          onChangeText={(text: string) => {
            setQuery(text);
            fetchSuggestions(text);
          }}
        />
      </View>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.suggestionText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loadingText: {
    marginVertical: 5,
    textAlign: 'center',
    color: '#999',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default PlaceSearchBar;
