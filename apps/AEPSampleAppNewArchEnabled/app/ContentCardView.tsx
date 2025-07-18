/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React, {useState} from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import styles from '../styles/styles';
import {useRouter} from 'expo-router';

const ContentCardView = () => {
  const [version, setVersion] = useState('1.0.0');
  const [contentCards, setContentCards] = useState('');
  const router = useRouter();

  function getContentCards() {
    // Placeholder function for getting content cards
    // This would typically call the Adobe Experience Platform SDK
    const mockContentCards = {
      cards: [
        {
          id: 'card1',
          title: 'Welcome Card',
          content: 'Welcome to our app!',
          actionUrl: 'https://example.com'
        },
        {
          id: 'card2',
          title: 'Promotion Card',
          content: 'Check out our latest offers',
          actionUrl: 'https://example.com/offers'
        }
      ]
    };
    
    let cardsStr = JSON.stringify(mockContentCards, null, 2);
    setContentCards(cardsStr);
    console.log('ContentCard: Retrieved content cards: ', cardsStr);
  }

  function refreshContentCards() {
    // Placeholder function for refreshing content cards
    console.log('ContentCard: Refreshing content cards...');
    setContentCards('');
    // Simulate network delay
    setTimeout(() => {
      getContentCards();
    }, 1000);
  }

  function clearContentCards() {
    setContentCards('');
    console.log('ContentCard: Cleared content cards');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{marginTop: 75}}>
        <Button onPress={router.back} title="Go to main page" />
        <Text style={styles.welcome}>Content Card & Container v{version}</Text>
        <Button
          title="Get Content Cards"
          onPress={getContentCards}
        />
        <Button
          title="Refresh Content Cards"
          onPress={refreshContentCards}
        />
        <Button
          title="Clear Content Cards"
          onPress={clearContentCards}
        />
        <View style={styles.breakLine} />
        <Text style={styles.text}>{contentCards}</Text>
      </ScrollView>
    </View>
  );
};

export default ContentCardView; 