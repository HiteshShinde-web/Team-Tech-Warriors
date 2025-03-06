import { View, Text, TextInput, StyleSheet, Pressable, Button, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Color from '../../constant/Color';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GenerateTopicAIModel } from '../../config/AiModel';

export default function Addcourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);

  const onGenerateTopic = async () => {
    if (!userInput.trim()) {
      alert('Please enter a course idea.');
      return;
    }

    setLoading(true);
    const PROMPT = `${userInput} Idea`;

    try {
      const aiResp = await GenerateTopicAIModel.sendMessage(PROMPT);
      const responseText = await aiResp.response.text(); // Ensure we properly await text()
      console.log("AI Response:", responseText); // Debugging output

      // Parse the AI response
      const parsedResponse = JSON.parse(responseText);
      const topicsArray = parsedResponse?.python_learning_ideas || []; // Ensure correct key from AI response

      if (!Array.isArray(topicsArray)) {
        throw new Error("AI response is not in the expected format.");
      }

      // Extract topic names from the response
      const topicNames = topicsArray.map((item) => item.project_name);
      setTopics(topicNames);
    } catch (error) {
      console.error("Error generating topics:", error);
      alert("Failed to generate topics. Please try again.");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const onTopicSelect = (topic) => {
    setSelectedTopic((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const isTopicSelected = (topic) => selectedTopic.includes(topic);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Course</Text>
      <Text style={styles.subHeader}>What Do You Want to Learn Today?</Text>
      <Text style={styles.description}>
        Write what course you want to create (e.g., Learn React.js, Digital Marketing Guide, 10th Science Chapter)
      </Text>

      <TextInput
        placeholder="(e.g., Learn Python, Learn 12th Chemistry)"
        style={styles.textInput}
        onChangeText={setUserInput}
        value={userInput}
        multiline
      />

      {loading ? (
        <ActivityIndicator size="small" color={Color.PRIMARY} style={styles.loading} />
      ) : (
        <Button title="Generate Topics" onPress={onGenerateTopic} disabled={loading} />
      )}

      <Text style={styles.sectionTitle}>Select Topics to Add in the Course</Text>

      <ScrollView style={styles.scrollContainer}>
        {topics.length > 0 ? (
          topics.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.topicContainer,
                isTopicSelected(item) && styles.selectedTopicContainer,
              ]}
              onPress={() => onTopicSelect(item)}
            >
              <Text style={styles.topicText}>{item}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noTopicText}>No topics generated yet.</Text>
        )}
      </ScrollView>

      {selectedTopic.length > 0 && (
        <>
          <Text style={styles.selectedTitle}>Selected Topics</Text>
          <Text style={styles.selectedTopics}>
            {selectedTopic.join(', ')}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Color.WHITE,
    flex: 1,
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    color: Color.PRIMARY,
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: 'outfit',
    fontSize: 25,
    color: Color.SECONDARY,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginTop: 8,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 18,
    borderColor: Color.LIGHT_GRAY,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    color: Color.PRIMARY,
  },
  scrollContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  topicContainer: {
    backgroundColor: Color.LIGHT_GRAY,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedTopicContainer: {
    backgroundColor: Color.PRIMARY,
  },
  topicText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Color.BLACK,
  },
  noTopicText: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    textAlign: 'center',
  },
  selectedTitle: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginTop: 15,
    color: Color.PRIMARY,
  },
  selectedTopics: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    marginTop: 6,
  },
  loading: {
    marginTop: 20,
  },
});