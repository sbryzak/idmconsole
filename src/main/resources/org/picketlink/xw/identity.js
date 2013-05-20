package("org.picketlink.xw");

org.picketlink.xw.Identity = function() {
  xw.NonVisual.call(this);
  
  this.loggedIn = false;
  this.attribs = {};
};

org.picketlink.xw.Identity.prototype = new xw.NonVisual();
    
org.picketlink.xw.Identity.prototype.open = function() {
  xw.EL.registerResolver(this);
};

org.picketlink.xw.Identity.prototype.login = function(username, password) {
  var that = this;
  var cb = function(r) { that.loginCallback(r); };
  this.identityBean.login(username, password, cb);
};

org.picketlink.xw.Identity.prototype.logout = function() {
  var that = this;
  var cb = function() { 
    that.loggedIn = false;
    xw.EL.notify("identity");
  };
  this.identityBean.logout(cb);
};

org.picketlink.xw.Identity.prototype.loginCallback = function(result) {
  if (result.success) {
    this.loggedIn = true;
        
    this.attribs.firstName = result.getAttributes().get("firstName");
    this.attribs.lastName = result.getAttributes().get("lastName");
    
    xw.EL.notify("identity");
    xw.Event.fire("org.picketlink.identity.loggedIn");
  }
};

org.picketlink.xw.Identity.prototype.canResolve = function(rootName) {
  return rootName === "identity";
};

org.picketlink.xw.Identity.prototype.resolve = function(rootName) {
  if (rootName === "identity") {
    return this;
  }
};

org.picketlink.xw.Identity.prototype.toString = function() {
  return "org.picketlink.xw.Identity[]";
};
