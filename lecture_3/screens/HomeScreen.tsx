import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavOptions from '../components/NavOptions';


const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1117",
        }}
      >
        <View style={{ alignItems: "center", padding: 10 }}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/GOOGLE.png')}
        />
        </View>


        <View>
        <TextInput style={styles.searchInput}
          placeholder="Search Google or Type URL"
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          autoCapitalize='none'
        />
        </View>

        <View style = {{flexDirection: "row"}}>
        <View style={styles.buttonStyle }>
            <NavOptions term={search} /> 
        </View>
        </View>

        <View style={styles.view}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 310,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    backgroundColor: "#282828",
    borderRadius: 20,
    borderColor: "#404040",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tinyLogo: {
    width: 210,
    height: 70,
    padding: 10, 
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    textDecorationColor: "blue",
    alignItems: "center",
  },
  view: {
    margin: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},
searchInput: {
  width: 300,
  height: 40,
  backgroundColor: '#fff',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 15,
  fontSize: 16,
  padding: 10, 
},
});

export default HomeScreen
