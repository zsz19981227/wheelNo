const sendRequest = (url , type = 'GET', body={})=>{
    if(/\?/.test(url)){
        url += '&_='+new Date();
    }else{
        url += '?_'+new Date();
    }
    return fetch(url,{
        type,
        body
    }).then(res=>res.json());
}
/*
   * @param id
*/
const host = /localhost:8080/ig.test(window.location.host)?'http://baojia.chelun.com':'https://baojia.chelun.com'
export let getBrandList = ()=>{
    return sendRequest(`${host}/v2-car-getMasterBrandList.html`)
}
export let getMakeList = (id)=>{
    return sendRequest(`${host}/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
}
export let getDetails = (id)=>{
    return sendRequest(`${host}/v2-car-getInfoAndListById.html?SerialID=${id}`)
}
export let getImg = (id,colorId,carId)=>{
    let search = `SerialID=${id}`;
    if(colorId){
        search+= `&ColorID=${colorId}`;
    }
    if(carId){
        search += `&CarID=${carId}`
    }
    return sendRequest(`${host}/v2-car-getImageList.html?${search}`)
}

export let getImgDetailList = (id, imgId,page = 1, PageSize = 30)=>{
    let search = `SerialID=${id}&ImageID=${imgId}&Page=${page}&PageSize=${PageSize}`;
    return sendRequest(`${host}/v2-car-getCategoryImageList.html?${search}`)
}

export let getColorList = (id)=>{
    return sendRequest(`${host}/v2-car-getModelImageYearColor.html?SerialID=${id}`)
}

export let getCityList = (provinceId)=>{
    let search = ``;
    if(provinceId){
        search += `provinceid=${provinceId}`
    }
    return sendRequest(`${host}/v1-city-alllist.html?${search}`)
}

export let getDealerList = (carId,cityId = 201) =>{
    return sendRequest(`${host}/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`)
}
export let submit = (info) =>{
    let search = ``;
    for(let item  in info){
        search += `&${item}=${info[item]}`
    }
    search[0] = '?'
    return sendRequest(`${host}/v2-submit-lowprice.html${search}`)
}