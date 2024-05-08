import { apiKey } from '../constants/apiKey'
import { http } from '../utils/config'
const getWeatherApi = async (q, day) => {
    try {
        const responseData = await http.get(`forecast.json`, {
            params: {
                key: apiKey,
                q: q,
                days: day,
                aqi: 'yes',
                alerts: 'no'
            }
            // headers: {
            //   pageSize: 4,
            //   pageNumber: 1
            // }
        });
        //console.log('response seasonDetail: ', responseData);
        return responseData.data;
    } catch (error) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}

export default getWeatherApi;