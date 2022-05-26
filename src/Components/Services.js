import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

async function get(setData,url){
    try{
        const {data} = await axios.get(baseUrl + url);
        setData(data)
    } catch(err) {
        console.log(err)
    }
}

async function post(data,url){
    try{
        await axios.post(baseUrl + url,data);
    } catch(err) {
        console.log(err)
    }
}

export {get,post};