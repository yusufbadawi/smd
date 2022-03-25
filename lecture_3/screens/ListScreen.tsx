import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

type CardsComponentsProps = {};

const ListScreen: React.FunctionComponent<CardsComponentsProps> = () => {
  const route = useRoute<RouteProps>();
  const { termList } = route.params;

  const [universities, setUniversity] = useState<University[]>();

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.100.11:3000/universities/${termList}`),
    ]).then(([{ data: universitiesResults }]) => {
      if (universitiesResults) setUniversity(universitiesResults);
    });
  }, []);

  return (
    <>
      <ScrollView>
        {termList && (
          <View>
            {universities?.map((u, i) => {
              return (
                <Card>
                  <Card.Title>
                    <View key={i} style={styles.user}>
                      <Text style={styles.name}>{u.name}</Text>
                    </View>
                  </Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{ padding: 0 }}
                    source={{
                      uri: u.image,
                    }}
                  />
                  <Text style={{ marginBottom: 10 }}>{u.addressFmt}</Text>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

type RouteParams = {
  termList: string;
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
  image: string;
};

export default ListScreen;
