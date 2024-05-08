import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, TextInput, TouchableOpacity, View, Text, FlatList, StyleSheet, ScrollView, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "../theme";
import { MagnifyingGlassIcon, XMarkIcon, ChevronLeftIcon, MapPinIcon, ChevronRightIcon, EllipsisHorizontalCircleIcon, EllipsisVerticalIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import _ from 'lodash';
import searchWeatherApi from "../services/searchWeatherApi";
import getWeatherApi from "../services/getWeatherApi"
export default function SearchScreen({ navigation, route }) {
    const [selectedId, setSelectedId] = useState();

    // const data = [
    //     {
    //         id: 1,
    //         name: 'First Item',
    //         country: 'VN',
    //         minDegree: 19,
    //         maxDegree: 24,
    //         aqi: 100
    //     }
    // ];
    const [showSearch, toggleSearch] = useState();
    const [getWeatherSearch, setWeatherSearch] = useState();

    const [locations, setLocation] = useState([]);
    const [listItemWeather, setListItemWeather] = useState([]);

    const handleDeleteItem = (id) => {
        // Filter out the item with the given id
        const updatedList = listItemWeather.filter(item => item.id !== id);
        // Update the state with the filtered list
        setListItemWeather(updatedList);
        // Save the updated list to AsyncStorage
        storeData(updatedList);
    };
    const loadData = async () => {
        try {
            const savedData = await getData();
            if (savedData) {
                //console.log('savedData', savedData);
                setListItemWeather(savedData);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    };
    const { name } = route?.params?.locations?.location

    useEffect(() => {


        // Load stored data when component mounts
        loadData();
        //  console.log('getData ', name);
    }, []);



    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('listItem');
            //    console.log('jsonValue: ', jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    const storeData = async (value) => {
        try {
            // console.log('store data: ', value);
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('listItem', jsonValue);
        } catch (e) {
            // saving error
        }
    };
    const handleLocation = async (loc) => {



        try {
            const data = await getWeatherApi(loc?.name, 1);

            const updateList = {
                id: loc?.id,
                name: loc?.name,
                country: data?.location?.country,
                minDegree: data?.current?.temp_c,
                maxDegree: data?.current?.feelslike_c,
                aqi: data?.current?.air_quality?.so2
            };

            // Check if the item with the same ID already exists in the array
            const existingIndex = listItemWeather.findIndex(item => item.id === loc?.id);

            let newState;
            if (existingIndex !== -1) {
                // If the item with the same ID exists, replace it in the array
                newState = [...listItemWeather];
                newState[existingIndex] = updateList;
            } else {
                // If the item with the same ID doesn't exist, add it to the array
                newState = [...listItemWeather, updateList];
            }

            // Update the state with the new array
            setListItemWeather(newState);
            // Save the updated state to AsyncStorage
            await storeData(newState);

            toggleSearch(false);
            setLocation([]);
        } catch (error) {
            console.error('Error handling location:', error);
        }


    }

    const handleSearch = (value) => {
        if (value.length > 2) {
            searchWeatherApi(value).then(data => {
                // console.log('api call location ', data);
                setLocation(data)
            })
        }

    }
    // debounce search from lodash

    const searchDebounce = useCallback(debounce(handleSearch, 1200), [])


    const Item = ({ item, onPress, backgroundColor, textColor }) => (

        <TouchableOpacity className="flex-row justify-between rounded-2xl mb-5 items-center border-0 p-4" onPress={onPress} style={{ backgroundColor: backgroundColor }} >
            <View>
                <Text style={{ color: textColor }} className="">
                    {item?.name}, {item?.country}
                </Text>
                <Text style={{ color: textColor }} className="">
                    AQI {item?.aqi}, {item?.minDegree}&deg;C/{item?.maxDegree}&deg;C
                </Text>
            </View>
            <Text style={{ color: textColor }} className="text-xl">
                {item.minDegree}&deg;C
            </Text>
            <TouchableOpacity className="absolute right-2 top-1" onPress={() => handleDeleteItem(item.id)}>
                <XMarkIcon size={18} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        const backgroundColor = item?.id === selectedId
            ? theme.bgWhite(1)
            : item?.name === name
                ? theme.bgWhite(1)
                : theme.bgWhite(0.4);
        const color = item?.id === selectedId ? theme.bgTextPress(0.6) : item?.name === name ? theme.bgTextPress(0.6) : theme.bgWhite(0.4);

        return (
            <Item
                item={item}

                onPress={() => {
                    setSelectedId(item?.id)
                    console.log('item', item);
                    navigation.navigate("Home", {
                        id: item?.id,
                        name: item?.name,
                        day: '1'
                    })
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };
    return (
        <View className="flex-1 relative">
            <StatusBar style="light"></StatusBar>
            {/* <Image blurRadius={70} source={require('../assets/images/bg.png')} className="absolute h-full w-full" /> */}
            <View style={{ backgroundColor: 'rgb(60,129,246)' }} className="absolute h-full w-full"></View>
            <SafeAreaView className="flex mt-6 flex-1">
                {/* search */}
                <View className="flex-row items-center  mx-3">
                    <TouchableOpacity onPress={() => navigation.popToTop()} className="w-8 h-8 z-50 flex rounded-full items-center justify-center">
                        <ChevronLeftIcon size={18} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white flex text-sm ml-20">
                        Manage cities
                    </Text>

                </View>
                <View style={{ height: '7%' }} className="flex justify-between items-center flex-row mx-4 z-50" >
                    <View className="flex-row pl-2 items-center w-10/12 rounded-full"
                        style={{ backgroundColor: theme.bgWhite(0.3) }}>


                        <MagnifyingGlassIcon onPress={() => {
                            toggleSearch(!showSearch)
                        }} size={25} color="white" />

                        <TextInput
                            onChangeText={searchDebounce}
                            placeholder="Search location"
                            placeholderTextColor={'lightgray'}

                            className="p-2 pl-3 rounded-full h-10 items-center justify-start text-base text-white" >

                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={() => {
                        toggleSearch(!showSearch)
                    }} className="flex h-10 items-center justify-center w-10 rounded-full" style={{ backgroundColor: theme.bgWhite(0.3) }} >


                        <MapPinIcon size={24} color='white' />
                    </TouchableOpacity>
                    {/* locations sections */}
                    {
                        locations?.length > 0 && !showSearch ? (
                            <View className="absolute w-full bg-gray-300 top-12 rounded-3xl z-50">
                                {
                                    locations.map((loc, index) => {
                                        let showBorder = index + 1 != locations.length;
                                        let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(loc)}
                                                key={index}
                                                className={"flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}>
                                                <MapPinIcon size="20" color="gray" />
                                                <Text className="text-black text-lg ml-2">
                                                    {loc?.name}, {loc?.country}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }

                    <SafeAreaView className="absolute w-full top-16 rounded-3xl">
                        <FlatList
                            data={listItemWeather}
                            // renderItem={({ item }) => <Item className="bg-gray-300" title={item.title} />}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}


                        />
                    </SafeAreaView>


                </View>
                {/* fore cast section */}

            </SafeAreaView >
        </View >
    )
}