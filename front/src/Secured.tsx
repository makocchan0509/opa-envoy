import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert'

import KeycloakState from "./KeycloakState";

import Keycloak from 'keycloak-js';
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import RouteService from "./RouteService";
import Button from 'react-bootstrap/Button';

const Secured: React.FC = () => {

    const keycloak = Keycloak('/keycloak.json');
    const [keycloakState, setKeycloakState] = useState<KeycloakState>({keycloak: null, authenticated: false});

    type responseState = { text: String, statusCode: String}
    const [responseContent, setResponseContent] = useState<responseState>({text:"",statusCode:""});

    useEffect(() => {
        keycloak.init({onLoad: 'login-required'})
            .then((authenticated) => {
                setKeycloakState({keycloak: keycloak, authenticated: authenticated});
            });
    }, []);

    const CallApi = () => {

        const accessToken = keycloakState.keycloak?.token
        console.log(accessToken)

        let schema = process.env.REACT_APP_HTTP_SCHEMA
        if(schema ===　undefined){
            schema = "http"
        }
        let apiHost = process.env.REACT_APP_API_ENDPOINT
        if(apiHost === undefined){
            apiHost="localhost:51051"
        }
        let url = schema + "://" + apiHost + "/backend"
        fetch(url,{
            headers:{
                Authorization: "Bearer "+accessToken
            }
        })
            .then(response => {
                const statusCode: number = response.status;
                setResponseContent({text: "", statusCode: statusCode.toString()})
            })
            .catch(error => {
                // エラーハンドリング
                console.error(error);
            });
    }

    if (keycloakState.keycloak !== null) {
        if (keycloakState.authenticated) {
            return (
                <div>
                    <Alert variant="success">
                        <Alert.Heading>Authenticated</Alert.Heading>
                    </Alert>
                    <UserInfo keycloakState={keycloakState}/>
                    {/*<Button variant="outline-info" onClick={() => RouteService("second")}>Second Service</Button>*/}
                    {/*<Button variant="outline-info" onClick={() => RouteService("third")}>Third Service</Button>*/}
                    <Button variant="outline-info" onClick={() => CallApi()}>Call API</Button>
                    <p>APIResponse: response: {responseContent.text} status code: {responseContent.statusCode}</p>
                    <Logout keycloakState={keycloakState}/>
                </div>
            );
        } else {
            return (
                <div>
                    <Alert variant="danger">
                        <Alert.Heading>Unable to authenticate</Alert.Heading>
                    </Alert>
                </div>
            )
        }
    }

    return (
        <div>
            <p>Initializing Keycloak...</p>
        </div>
    );
};



export default Secured;