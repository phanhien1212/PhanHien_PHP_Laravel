import React, { useEffect } from 'react';

const FacebookComment = ({ appId, pageUrl }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [appId, pageUrl]);

  return (
    <div  className="fb-comments" data-href={pageUrl} data-width="100%" data-numposts="5"></div>
  );
}

export default FacebookComment;
