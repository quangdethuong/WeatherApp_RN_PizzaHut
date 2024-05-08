import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, TextInput, TouchableOpacity, View, Text, FlatList, StyleSheet, ScrollView, Button } from "react-native";
import { theme } from "../theme";
import dayjs from "dayjs"
import { PlusIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline'
import { useEffect, useState } from "react";
import getWeatherApi from "../services/getWeatherApi";


export default function HomeScreen({ route, navigation }) {
    const [showSearch, toggleSearch] = useState();
    const [locations, setLocation] = useState([]);
    const [weather, setWeather] = useState({});



    useEffect(() => {
        if (route.params) {
            fetchLocation(route.params?.name, route.params?.day)
            //console.log('route.params', route.params?.id);
        }
        else {
            fetchLocation("Ho Chi Minh", '7')
        }


    }, [route.params?.name, route.params?.day])


    const fetchLocation = async (name, day) => {
        await getWeatherApi(name, day).then(data => {

            setLocation(data)
            setWeather(data)
        }).catch(e => console.error(e)
        )

    }
    // Define a function to format the date
    const formatDate = (dateString) => {
        // Create a dayjs object with the provided date
        const date = dayjs(dateString);

        // Get the day of the week, month, and day
        const dayOfWeek = date.format('dddd'); // Day of the week (e.g., "Thursday")
        const month = date.format('MMMM'); // Month (e.g., "May")
        const dayOfMonth = date.format('DD'); // Day of the month (e.g., "09")

        // Return the formatted date
        return `${dayOfWeek}, ${month} ${dayOfMonth}, ${date.year()}`;
    };
    return (
        <View className="flex-1 relative">
            <StatusBar style="light"></StatusBar>
            {/* <Image blurRadius={70} source={require('../assets/images/bg.png')} className="absolute h-full w-full" /> */}
            <View style={{ backgroundColor: 'rgb(60,129,246)' }} className="absolute h-full w-full"></View>
            <SafeAreaView className="flex mt-8 flex-1">
                {/* search */}
                <View className="flex-row items-center justify-between mx-3 ">
                    <TouchableOpacity style={{ backgroundColor: theme.bgWhite(0.2) }} onPress={() => {
                        navigation.navigate("Search", {
                            locations: weather
                        })
                    }} className="w-8 h-8 z-50 flex rounded-full items-center justify-center">
                        <PlusIcon size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: theme.bgWhite(0.2) }} onPress={() => {
                        navigation.navigate("Search", {
                            locations: weather
                        })
                    }} className="w-8 h-8 z-50 flex rounded-full items-center justify-center">
                        <EllipsisVerticalIcon size={25} color="white" />

                    </TouchableOpacity>

                </View>
                {/* fore cast section */}
                <View className="flex-1 mx-4 justify-around mb-1 bottom-6">
                    <View className=" flex-col ">

                        <Text className="justify-center text-white text-center text-lg font-bold">
                            {locations?.location?.name},
                            <Text className="text-lg font-semibold text-gray-300">
                                {locations?.location?.country}
                            </Text>
                        </Text>
                        <Text className="text-white text-center text-xs tracking-tight">


                            {formatDate(new Date().toLocaleDateString())}
                        </Text>
                    </View>
                    {/* weather images */}
                    <View className="flex-row justify-center">
                        <Image className="w-52 h-52 mt-3 mb-2"
                            //source={require('../assets/images/partlycloudy.png')} 
                            source={{ uri: 'https:' + locations?.current?.condition?.icon }}
                        />
                    </View>
                    {/* degree */}
                    <View className="space-y-1">
                        <Text className="text-center font-bold text-white text-8xl  ml-5 tracking-widest">
                            {Math.ceil(locations?.current?.temp_c)}&#176;C
                        </Text>
                        <View className="flex-row justify-center items-center">
                            <Text style={{ backgroundColor: theme.bgWhite(0.3) }} className=" text-white py-1 px-4 rounded-sm">
                                {locations?.current?.condition?.text}
                            </Text>
                            <Text className="text-white text-sm ml-3">

                                Feel like {locations?.current?.feelslike_c}&#176;C
                            </Text>
                        </View>
                    </View>
                    {/* other weather */}
                    <View className="flex-row justify-center mx-4 mt-12">
                        <View className="border-r border-white p-3 flex-row space-x-2 items-center">
                            <Image className="h-6 w-6" source={require('../assets/icons/wind.png')} />
                            <Text className=" text-white font-semibold text-base">
                                {locations?.current?.wind_kph}km
                            </Text>
                        </View>
                        <View className="border-r border-white p-3 flex-row space-x-2 items-center">
                            <Image className="h-6 w-6" source={require('../assets/icons/drop.png')} />
                            <Text className=" text-white font-semibold text-base">
                                {locations?.current?.humidity}%
                            </Text>
                        </View>
                        <View className=" p-3 flex-row space-x-2 items-center">
                            <Image className="h-6 w-6" source={require('../assets/icons/sun.png')} />
                            < Text className=" text-white font-semibold text-base" >
                                {locations?.current?.uv}
                            </Text>
                        </View>
                    </View>
                    {/* forecast next day */}
                    <View className="mt-4 mb-2">
                        <View className="flex-row justify-between mb-6">
                            <Text className="text-white items-center mx-3 space-x-2">
                                Today
                            </Text>
                            <TouchableOpacity cla>
                                <Text className="flex text-white items-center mx-3 space-x-2">
                                    Next 7 days &gt;
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal
                            contentContainerStyle={{ paddingHorizontal: 5, paddingTop: 5 }}
                            showsHorizontalScrollIndicator={false}
                        >

                            {locations?.forecast?.forecastday?.map((forecast, forecastIndex) => (
                                forecast?.hour?.map((hour, hourIndex) => (
                                    <View key={`${forecastIndex}-${hourIndex}`} style={{ backgroundColor: theme.bgWhite(0.15) }} className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                                        <Text className="text-white">{dayjs(hour?.time).format('HH:mm')}</Text>
                                        <Image className="h-11 w-11" source={{ uri: 'https:' + hour?.condition?.icon }} />
                                        <Text className="text-white">{Math.ceil(hour?.temp_c)}&#176;C</Text>
                                    </View>
                                ))
                            ))}

                        </ScrollView>
                    </View>

                </View>

            </SafeAreaView >
        </View >
    )
}


