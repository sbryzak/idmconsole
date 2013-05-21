package org.picketlink.idmconsole;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.picketlink.Identity;
import org.picketlink.Identity.AuthenticationResult;
import org.picketlink.credential.DefaultLoginCredentials;
import org.picketlink.idm.model.User;

@Path("/identity")
public class IdmApplication {

    @Inject Identity identity;
    
    @Inject DefaultLoginCredentials credentials;

    @GET
    @Path("/status")
    @Produces({"application/json"})
    public String getStatus() {
        return "{\"loggedIn\":" + (identity.isLoggedIn() ? "true" : "false") + "}";
    }

    @POST
    @Path("/login/{username}/{password}")
    @Produces({"application/json"})
    public String login(@PathParam("username") String username, @PathParam("password") String password) {
        credentials.setUserId(username);
        credentials.setPassword(password);

        if (AuthenticationResult.SUCCESS.equals(identity.login())) {
            User user = (User) identity.getUser();

            return "{\"success\":true," + 
            		"\"firstName\":\"" + user.getFirstName() + "\"," + 
            		"\"lastName\":\"" + user.getLastName() + "\"" +
            		"}";
        } else {
            return "{\"success\":false}";
        }
    }

    @POST
    @Path("/logout")
    @Produces({"application/json"})
    public String logout() {
        identity.logout();
        return "{\"success\":true}";
    }
}
