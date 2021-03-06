(function() {
  var hostname = document.getElementById("sso-override").getAttribute("data-hostname");

  // we chronicle login status with a "loggedin" class on the <html> tag
  var html = document.getElementsByTagName("html")[0],
      userElement = $( "div.user" ),
      placeHolder = $( "#identity" ),
      lang = html && html.lang ? html.lang : "en-US",
      loginButtonSpan = $("#webmaker-nav .loginbutton"),
      logoutButtonSpan = $("#webmaker-nav .logoutbutton");

  function displayLogin(userData) {

    if (userData) {
      placeHolder.html('<a href="' + hostname + '/' + lang + '/account">' + userData.displayName + "</a>");
      placeHolder.before("<img src='https://secure.gravatar.com/avatar/" +
                          userData.emailHash + "?s=26&d=https%3A%2F%2Fstuff.webmaker.org%2Favatars%2Fwebmaker-avatar-44x44.png'" +
                          " alt=''>");
      userElement.show();
    } else {
      placeHolder.text("");
      userElement.hide();
    }
  }

  var userfield = $("#identity");

  function enable(user) {
    displayLogin(user);
    html.classList.add("loggedin");
    loginButtonSpan.addClass("hidden");
    logoutButtonSpan.removeClass("hidden");
  };

  function disable() {
    displayLogin();
    html.classList.remove("loggedin");
    loginButtonSpan.removeClass("hidden");
    logoutButtonSpan.addClass("hidden");
  }

  // Attach event listeners!
  gogglesAuth.on('login', function(user, debuggingInfo) {
    enable(user);
  });

  gogglesAuth.on('logout', function() {
    disable();
  });

  disable();
  gogglesAuth.verify();
}());
