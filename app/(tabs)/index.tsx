import { Homepage } from "@/Types/Types";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {
  const [intro, setIntro] = useState<Homepage[] | undefined>([]);

  useEffect(() => {
    fetch("https://harmony-run-backend.onrender.com/homepage")
      .then((response) => response.json())
      .then((result: Homepage[]) => {
        setIntro(result);
        console.log(result);
      });
  }, []);

  return (
    <SafeAreaView>
      {intro && (
        <FlatList
          data={intro}
          keyExtractor={(intro) => intro.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>{item.headline}</Text>
              </View>
              <View>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* {intro &&
        intro.map((intros) => (
          <View key={intros.id} style={styles.container}>
            <View>
              <Text style={styles.title}>{intros.headline}</Text>
            </View>
            <View>
              <Text style={styles.description}>{intros.description}</Text>
            </View>
          </View>
        ))} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a01d5d",
    color: "white",
    margin: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    margin: 10,
    color: "white",
  },
});
