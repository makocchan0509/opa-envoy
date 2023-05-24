package envoy.authz

import input.attributes.request.http as http_request

default allow = false

allow {
	path
	method
}

path {
	http_request.path == "/backend"
}

method {
  http_request.method == "OPTIONS"
}

method {
	http_request.method == "GET"
  claims.resource_access.web.roles[_] == "extended"
}

claims = payload {
    payload := json.unmarshal(base64url.decode(http_request.headers.payload))
}
