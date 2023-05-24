import Keycloak from "keycloak-js";

type KeycloakState = { keycloak: Keycloak.KeycloakInstance | null, authenticated: Boolean}

export default KeycloakState