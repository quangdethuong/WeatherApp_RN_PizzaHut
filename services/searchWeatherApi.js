import { apiKey } from '../constants/apiKey'
import { http } from '../utils/config'
const searchWeatherApi = async (q) => {
    try {
        const responseData = await http.get(`search.json`, {
            params: {
                key: apiKey,
                q: q
            }
            // headers: {
            //   pageSize: 4,
            //   pageNumber: 1
            // }
        });
        //console.log('response seasonDetail: ', responseData?.data.data);
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

export default searchWeatherApi;