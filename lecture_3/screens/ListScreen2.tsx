import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, {  ReactNode, useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { Text, Card , Button, Icon } from "react-native-elements";
import { CardStyleInterpolators } from "react-navigation-stack";
import Carousel from 'react-native-snap-carousel';

const ListScreen2 = () => {
  const route = useRoute<RouteProps>();
  const term = route.params;
  const [universities, setUniversity] = useState<University[]>();

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.100.11:3000/universities/${term.term}`),
    ]).then(([{ data: universitiesResults }]) => {
      if (universitiesResults) setUniversity(universitiesResults);
    });
  }, []);

  const renderItem2 = ({ item }) => (
    
  <View>
    <Image
      style={{ resizeMode: "contain", width: 300, height: 250 }}
      source={
          item
            ? {
                uri: item,
              }
            : require("../assets/NotFound.jpg")
        }
      />
    </View>

  );



  const renderItem = ({ item }) => (
    
    <Card>
      <Card.Title style={{flex:1}}>{item.name}
     
      </Card.Title>
      <Card.Divider />
      <Carousel
          data={item.image}
          renderItem={renderItem2}
          layout={"default"}
          itemWidth={300}
                    itemHeight={100}
                    sliderWidth={300}
      />

      
      <Card.Divider />
      <Text style={{ marginBottom: 10,}}> Address: {item.addressFmt} </Text>
    </Card>


  );

  return (
    <View style={styles.container}>
      <FlatList
        data={universities}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );

  type RouteParams = {
    term: string;
  };
  
  type RouteProps = {
    params: RouteParams;
    name: string;
    key: string;
  };
  
  type University = {
    name: string;
    lat: number;
    lng: number;
    addressFmt: string;
    image: Array<string>;
};
  
}

const styles = StyleSheet.create ({
    container: {
        flex: 1 , 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#000000"
    }, 
    CardStyle: {
      backgroundColor: "#000000"

    }
})

export default ListScreen2; 


