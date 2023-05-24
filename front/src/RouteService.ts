function RouteService (destination:string){

    let destApp= "";

    if(destination === "second"){
        if(process.env.REACT_APP_SECOND_SERVICE_HOST){
            destApp = process.env.REACT_APP_SECOND_SERVICE_HOST;
        }else{
            return
        }
    }else if(destination === "third"){
        if(process.env.REACT_APP_THIRD_SERVICE_HOST){
            destApp = process.env.REACT_APP_THIRD_SERVICE_HOST;
        }else{
            return
        }
    }else{
        return
    }
    window.location.href = destApp
}

export default RouteService;