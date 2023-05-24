import React, {useEffect,useState} from "react";
import KeycloakState from "./KeycloakState";

type User = { name:String,id:String} | null

interface Props {
    keycloakState: KeycloakState;
}

const UserInfo: React.FC<Props> = (props) => {
    const keycloakState = props.keycloakState;
    const [user,setUser] = useState<User>();

    useEffect(() =>{
        if(keycloakState.keycloak == null){
            throw Error('keycloak is not initialized')
        }
        keycloakState.keycloak.loadUserInfo().then((user:any) =>{
            console.log(user);
            setUser({name: user.name,id: user.id})
        });
    }, []);

    return(
        <div className="UserInfo">
            <p>Welcome {user != null ? user.name:""}</p>
        </div>
    );
};

export default UserInfo