import React, { useState } from "react";
import { useEffect } from "react";
import * as axios from 'axios';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import ListScreen2 from "./ListScreen2";
import Carousel from "../components/Carousel"

const SearchResults = () => {
  const route = useRoute<RouteProps>();
  const { term } = route.params;

  const [country, setCountry] = useState<GeocodeResult>();
  const [universities, setUniversity] = useState<University[]>();
  const [_, setViewport] = useState<Region>();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  let latitudeDelta, longitudeDelta;
  if (country) {
    latitudeDelta = country.geometry.bounds.northeast.latitude - country.geometry.bounds.northeast.longitude;
    longitudeDelta = latitudeDelta * ASPECT_RATIO;
  }

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.100.11:3000/locations/${term}`),
      axios.default.get(`http://192.168.100.11:3000/universities/${term}`),
    ])
      .then(([{ data: locationResults }, { data: universitiesResults }]) => {
        if (locationResults) setCountry(locationResults);
        if (universitiesResults) setUniversity(universitiesResults);
      });
  }, []);
  

  const navigation = useNavigation() ; 
  return (
   

    <SafeAreaView>
      <Button
        onPress={() => {navigation.navigate('ListScreen2', {
          term: term, 
        });
      }}
        title="List Universities"
        color="#000000"
      />

<Button
        onPress={() => {navigation.navigate('Carousel', {
          term: term, 
        });
      }}
        title="Universities Carousel View"
        color="#000334"
      />

      {country && term && latitudeDelta && longitudeDelta &&
        <MapView
          userInterfaceStyle={'dark'}
          style={styles.map}
          zoomControlEnabled={true}
          provider='google'
          onRegionChange={(region) => setViewport({ region })}
          initialRegion={{
            latitude: country.geometry.location.latitude,
            longitude: country.geometry.location.longitude,
            latitudeDelta, // delta between origin bounds and client viewport
            longitudeDelta, // delta between origin bounds and client viewport
          }}
        >
          {
            universities?.map((marker: University, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng,
                }}
                title={marker.name}
                description={marker.slug}>
              </Marker>
            ))
          }
        </MapView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams
  name: string;
  key: string;
};

type GeometryCoordinates = {
  latitude: number;
  longitude: number;
}
type GeometryBounds = {
  northeast: GeometryCoordinates;
  southwest: GeometryCoordinates;
}
type GeometryResult = {
  bounds: GeometryBounds;
  location: GeometryCoordinates;
}
type GeocodeResult = {
  geometry: GeometryResult;
}

type RegionCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
type Region = {
  region: RegionCoordinates;
}
type University = {
  name: string;
  lat: number;
  lng: number;
  slug: string;
}
export default SearchResults