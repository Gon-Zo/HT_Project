import axios from "axios";
import { IBaseReducer } from "../../shared/component/component.interface";
import { FAILURE, REQUEST, SUCCESS } from "../../shared/utils/action.utils";

// @ts-ignore
import secret from '../../../secret/secret.json'

const ACTION_TYPES = {
    FETCH_NEWS_DATA: 'news/FETCH_NEWS_DATA'
}

interface INewsData extends IBaseReducer {
    data: Array<any>
}

const initialState = {
    newsData: {
        load: false,
        error: null,
        data: []
    } as INewsData
}

export type NewsState = Readonly<typeof initialState>

export default (state = initialState, action: any): NewsState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FETCH_NEWS_DATA): {
            return {
                ...state,
                newsData: {
                    load: false,
                    error: null,
                    data: action.payload.data
                }
            }
        }
        case REQUEST(ACTION_TYPES.FETCH_NEWS_DATA): {
            return {
                ...state,
                newsData: {
                    load: true,
                    error: null,
                    data: state.newsData.data
                }
            }
        }
        case FAILURE(ACTION_TYPES.FETCH_NEWS_DATA): {
            return {
                ...state,
                newsData: {
                    load: false,
                    error: action.payload,
                    data: []
                }
            }
        }


        default : {
            return state
        }
    }
}

export const getByNewsData = (page: number) => {
    const query = "아파트,부동산"
    return ({
        type: ACTION_TYPES.FETCH_NEWS_DATA,
        payload: axios.get(`https://openapi.naver.com/v1/search/news.json?query=${query}&display=50&start=${page}`, {
            headers: {
                "X-Naver-Client-Id": secret.NEVER_ID,
                "X-Naver-Client-Secret": secret.NEVER_SECRET
            }
        })
    })
}
