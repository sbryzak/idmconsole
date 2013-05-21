package org.picketlink.idmconsole;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

import org.picketlink.idm.IdentityManager;
import org.picketlink.idm.credential.Password;
import org.picketlink.idm.model.SimpleUser;
import org.picketlink.idm.model.User;

/**
 * Creates some default accounts
 *
 * @author Shane Bryzak
 *
 */
@Singleton
@Startup
public class IDMInitializer {
    @Inject
    private IdentityManager identityManager;

    @PostConstruct
    public void create() {

        User shane = new SimpleUser("shane");
        shane.setFirstName("Shane");
        shane.setLastName("Bryzak");
        identityManager.add(shane);
        identityManager.updateCredential(shane, new Password("password"));
    }
}
