package org.picketlink.idmconsole;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.picketlink.Identity;

@Path("/identity")
public class IdmApplication {

    @Inject Identity identity;

    @GET
    @Path("/status")
    @Produces({ "application/json" })
    public String getStatus() {
        return "{\"loggedIn\":\"" + (identity.isLoggedIn() ? "true" : "false") + "\"}";
    }
}
