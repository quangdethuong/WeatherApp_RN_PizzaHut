import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, TextInput, TouchableOpacity, View, Text, FlatList, StyleSheet, ScrollView, Button } from "react-native";
import { theme } from "../theme";

import { MagnifyingGlassIcon, PlusIcon, MapPinIcon, ChevronRightIcon, EllipsisHorizontalCircleIcon, EllipsisVerticalIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useState } from "react";
export default function ForecastSection() {
    return (
        <View className=" flex-1 mx-4 justify-around mb-2 bottom-5">
            <View className=" flex-col ">

                <Text className="justify-center text-white text-center text-2xl font-bold">
                    London,
                    <Text className="text-lg font-semibold text-gray-300">
                        United Kingdom
                    </Text>
                </Text>
                <Text className="text-white text-center text-xs tracking-tight">
                    Tuesday, April 05
                </Text>
            </View>
            {/* weather images */}
            <View className="flex-row justify-center">
                <Image className="w-52 h-52 mt-3 mb-2" source={require('../assets/images/partlycloudy.png')} />
            </View>
            {/* degree */}
            <View className="space-y-1">
                <Text className="text-center font-bold text-white text-8xl  ml-5 tracking-widest">
                    23&#176;C
                </Text>
                <View className="flex-row justify-center items-center">
                    <Text style={{ backgroundColor: theme.bgWhite(0.3) }} className=" text-white py-1 px-4 rounded-sm">
                        Haze
                    </Text>
                    <Text className="text-white text-sm ml-3">

                        Feel like 15&#176;C
                    </Text>
                </View>
            </View>
            {/* other weather */}
            <View className="flex-row justify-center mx-4 mt-12">
                <View className="border-r border-white p-3 flex-row space-x-2 items-center">
                    <Image className="h-6 w-6" source={require('../assets/icons/wind.png')} />
                    <Text className=" text-white font-semibold text-base">
                        22km
                    </Text>
                </View>
                <View className="border-r border-white p-3 flex-row space-x-2 items-center">
                    <Image className="h-6 w-6" source={require('../assets/icons/drop.png')} />
                    <Text className=" text-white font-semibold text-base">
                        23%
                    </Text>
                </View>
                <View className=" p-3 flex-row space-x-2 items-center">
                    <Image className="h-6 w-6" source={require('../assets/icons/sun.png')} />
                    < Text className=" text-white font-semibold text-base" >
                        9:00PM
                    </Text>
                </View>
            </View>
            {/* forecast next day */}
            <View className="mt-4 mb-2">
                <View className="flex-row justify-between mb-6">
                    <Text className="text-white items-center mx-3 space-x-2">
                        Today
                    </Text>
                    <Text className="flex text-white items-center mx-3 space-x-2">
                        Next 7 days &gt;
                    </Text>
                </View>
                <ScrollView horizontal
                    contentContainerStyle={{ paddingHorizontal: 5, paddingTop: 5 }}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                    <View style={{ backgroundColor: theme.bgWhite(0.15) }}
                        className="flex justify-center py-2 w-20 items-center rounded-3xl space-y-1 mr-4">
                        <Text className="text-white">11:00</Text>

                        <Image className="h-11 w-11" source={require('../assets/images/heavyrain.png')} />
                        <Text className="text-white">19&#176;C</Text>
                    </View>
                </ScrollView>
            </View>

        </View>)
}