// "StAuth10244: I Bikash Shiwakoti, 000891600 certify that this material is my original work.
//  No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, FlatList, StyleSheet, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const API_KEY = 'ba2c0600017859ff3beb6beb586adae8'; 
const NEWS_API_KEY = '7572afe1bb0a4e1fbae4b810fc38ee1b';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (response.data.cod && response.data.cod !== 200) {
        setErrorMessage(response.data.message);
        setWeatherData(null);
      } else {
        setErrorMessage('');
        setWeatherData(response.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setErrorMessage('Error fetching weather data. Please try again later.');
      setWeatherData(null);
    }
  };

  const fetchNews = async () => {
    const url = `https://api.worldnewsapi.com/search-news?text=weather&language=en&number=10&api-key=${NEWS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setNewsArticles(data.news || []);
      } else {
        console.error('Failed to retrieve news articles:', data.message);
      }
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  };

  const handleArticlePress = (url) => {
    Linking.openURL(url);
  };

  const renderWeatherNewsButton = () => (
    <TouchableOpacity style={styles.weatherNewsButton} onPress={fetchNews}>
      <Text style={styles.weatherNewsButtonText}>Weather News</Text>
    </TouchableOpacity>
  );

  const renderArticle = (article, index) => (
    <TouchableOpacity key={index} style={styles.articleContainer} onPress={() => handleArticlePress(article.url)}>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleSummary}>{article.summary}</Text>
    </TouchableOpacity>
  );

  return (
    // Inside your return statement
<View style={styles.container}>
  <Text style={styles.title}>Weather App</Text>
  <Text style={styles.subtitle}>To know the weather condition of a city, enter the city name and press the 'Get Weather' button</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter city name"
    value={city}
    onChangeText={setCity}
  />
  <TouchableOpacity style={styles.weatherButton} onPress={fetchWeatherData}>
    <Text style={styles.weatherButtonText}>Get Weather</Text>
  </TouchableOpacity>

  {errorMessage ? (
    <Text style={styles.error}>{errorMessage}</Text>
  ) : null}

  {weatherData && (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherCity}>{weatherData.name}</Text>
      <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
      <Image
        style={styles.weatherIcon}
        source={{ uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
      />
      <Text style={styles.weatherTemp}>{`${weatherData.main.temp}°C`}</Text>
    </View>
  )}

  <Text style={styles.weatherNewsTitle}>For weather info around the globe, click the button below</Text>
  {renderWeatherNewsButton()}

  <ScrollView style={styles.newsContainer}>
    {newsArticles.map((article, index) => renderArticle(article, index))}
  </ScrollView>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  weatherButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  weatherButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherCity: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherNewsTitle: {
    marginBottom: 10,
    fontSize: 16,
  },
  weatherNewsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  weatherNewsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  newsContainer: {
    width: '100%',
  },
  articleContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  articleSummary: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  
});

export default WeatherApp;
