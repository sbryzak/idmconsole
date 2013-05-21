package("org.picketlink.xw");

org.picketlink.xw.Identity = function() {
  xw.NonVisual.call(this);
  
  this.loggedIn = false;
  this.endPoint = null;
  this.attribs = {};
};

org.picketlink.xw.Identity.prototype = new xw.NonVisual();
    
org.picketlink.xw.Identity.prototype.open = function() {
  xw.EL.registerResolver(this);
};

org.picketlink.xw.Identity.prototype.login = function(username, password) {
  var that = this;
  var cb = function(r) { that.loginCallback(r); }; 
  
  var req = xw.Sys.createHttpRequest("text/plain");
  
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200 || req.status === 0) {
        alert("Got response: " + req.responseText);
        var ret = eval ('('+req.responseText+')');
        cb(ret);
      } else if (req.status === 404) {
        window.alert("404 error: the identity service could not be found.");
      }
    }  
  }
    
  req.open("POST", this.endPoint + "/login/" + username + "/" + password, true);
  req.send(null);
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
        
    this.attribs.firstName = result.firstName;
    this.attribs.lastName = result.lastName;
    
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
