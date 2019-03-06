importScripts('path-to-regexp.js');

const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_VERSION
};
const FILE_LISTS = ['js','css','png'];
const PATH_FILE = '/:file?'; // 缓存接受的路径文件


var goSaving = function(url){
  for(var file of FILE_LISTS){
    if(url.endsWith(file)) return true;
  }
  return false;
}


// 判断 path/method/contentType

function checkFile(request){
  var matchPath = pathtoRegexp(PATH_FILE);
  var url = location.pathname;
  var method = request.method.toLowerCase();
   url = matchPath.exec(url)[1];
  return !!(goSaving(url) && method === 'get');
}

self.addEventListener('install', function(event) {
  var now = Date.now();
  var urlsToPrefetch = [
    '/',
    "index.html",
    "about.html",
    "contact.html",
    "/assets/img/background.jpeg",
    "/assets/img/codepen.svg",
    "/assets/img/github.svg",
    "/assets/img/linkedin.svg",
    "/assets/img/scroll-grab.svg",
    "/assets/img/site.svg",
    "/assets/img/vertical-nav-arrows.svg",
    "/assets/img/works/elite.png",
    "/assets/img/works/ioslide.png",
    "/assets/img/works/mobile.png",
    "/assets/img/works/osbabyroom.png",
    "/assets/js/main.js",
    "/assets/js/jquery.js",
    "icon/favicon-32x32.png"
  ];

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
      var cachePromises = urlsToPrefetch.map(function(urlToPrefetch) {
        var url = new URL(urlToPrefetch,location.href);

        console.log('now send the request to' + url);

        var request = new Request(url);
        return fetch(request).then(function(response) {
          if (response.status >= 400) {
            throw new Error('request for ' + urlToPrefetch +
              ' failed with status ' + response.statusText);
          }

          return cache.put(urlToPrefetch, response);
        }).catch(function(error) {
          console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
        });
      });

      return Promise.all(cachePromises).then(function() {
        console.log('Pre-fetching complete.');
      });
    }).catch(function(error) {
      console.error('Pre-fetching failed:', error);
    })
  );
});


self.addEventListener('fetch', function (e) {
  // 如果有cache则直接返回，否则通过fetch请求
  e.respondWith(
      caches.match(e.request).then(function (cache) {
          return cache || fetch(e.request);
      }).catch(function (err) {
          console.log(err);
          return fetch(e.request);
      })
  );
});

// method
// resource


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (CURRENT_CACHES.prefetch.includes(key)) {
          console.log('sw.js will be updated');
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('Handle fetches!');
    })
  );
});

self.addEventListener('message',event =>{
  sendNote();
  console.log("receive message" + event.data);
  var url = self.location.href;
  console.log("update root file " + url);
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(cache=>{
        return fetch(url)
          .then(res=>{
            cache.put(url,res);
          })
    })
  )
});

self.addEventListener('push', function (e) {
  var data = e.data;
  if (e.data) {
      data = data.json();
      console.log('push的数据为：', data);
      var title = 'PWA即学即用';
      var options = {
          body: data,
          icon: '/img/icons/book-128.png',
          image: '/img/icons/book-521.png', // no effect
          actions: [{
              action: 'show-book',
              title: '去看看'
          }, {
              action: 'contact-me',
              title: '联系我'
          }],
          tag: 'pwa-starter',
          renotify: true
      };
      self.registration.showNotification(title, options);        
  } 
  else {
      console.log('push没有任何数据');
  }
});

// self.addEventListener('notificationclick', function(event) {
//   var messageId = event.notification.data;
//   event.notification.close();
//   if(event.action === "focus"){
//     focusOpen();
//   }
// });

self.addEventListener('notificationclick', function (e) {
  var action = e.action;
  console.log(`action tag: ${e.notification.tag}`, `action: ${action}`);
  
  switch (action) {
      case 'show-book':
          console.log('show-book');
          break;
      case 'contact-me':
          console.log('contact-me');
          break;
      default:
          console.log(`未处理的action: ${e.action}`);
          action = 'default';
          break;
  }
  e.notification.close();

  e.waitUntil(
      // 获取所有clients
      self.clients.matchAll().then(function (clients) {
          if (!clients || clients.length === 0) {
              self.clients.openWindow && self.clients.openWindow('http://127.0.0.1:8085');
              return;
          }
          clients[0].focus && clients[0].focus();
          clients.forEach(function (client) {
              // 使用postMessage进行通信
              client.postMessage(action);
          });
      })
  );
});


function sendNote(){
  console.log('send Note');
  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = '/student.png';
  var tag = 'simple-push-demo-notification-tag'+ Math.random();
  var data = {
    doge: {
      wow: 'such amaze notification data'
    }
  };
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: data,
      actions:[
        {
          action:"focus",
          title:"focus"
        }]
    })
}

function focusOpen(){
  var url = location.href;
  clients.matchAll({
    type:'window',
    includeUncontrolled: true
  }).then(clients=>{
    for(var client of clients){
      if(client.url = url) return client.focus(); 
    }
    console.log('not focus');
    clients.openWindow(location.origin);
  })
}
 


function registerServiceWorker(file) {
  return navigator.serviceWorker.register(file);
}
function subscribeUserToPush(registration, publicKey) {
  var subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: window.urlBase64ToUint8Array(publicKey)
  }; 
  return registration.pushManager.subscribe(subscribeOptions).then(function (pushSubscription) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
  });
}

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'assets/img/background.jpeg',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


