(function() {
    /**
     * 获取该请求的缓存数据
     * @param {string} url 请求的url
     * @return {Promise}
     */
    function getApiDataFromCache(url) {
        if ('caches' in window) {
            return caches.match(url).then(function (cache) {
                if (!cache) {
                    return;
                }
                return cache.json();
            });
        }
        else {
            return Promise.resolve();
        }
    }

    function getApiDataRemote(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 60000;
            xhr.onreadystatechange = function () {
                var response = {};
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        response = xhr.responseText;
                    }
                    resolve(response);
                }
                else if (xhr.readyState === 4) {
                    resolve();
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.open('GET', url, true);
            xhr.send(null);
        });
    }

    /* ========================================== */
    /* service worker push 与 notification 相关部分 */
    /* ========================================== */
    /**
      @param {string} file 
      @return {Promise}
     */
    function registerServiceWorker(file) {
        return navigator.serviceWorker.register(file);
    }

    /**
     * 用户订阅相关的push信息
     * 会生成对应的pushSubscription数据，用于标识用户与安全验证
     * @param {ServiceWorker Registration} registration
     * @param {string} publicKey 公钥
     * @return {Promise}
     */
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

    /**
     * 将浏览器生成的subscription信息提交到服务端
     * 服务端保存该信息用于向特定的客户端用户推送
     * @param {string} body 请求体
     * @param {string} url 提交的api路径，默认为/subscription
     * @return {Promise}
     */
    function sendSubscriptionToServer(body, url) {
        url = url || '/subscription';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 60000;
            xhr.onreadystatechange = function () {
                var response = {};
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        response = xhr.responseText;
                    }
                    resolve(response);
                }
                else if (xhr.readyState === 4) {
                    resolve();
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);
        });
    }

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        var publicKey = 'BA2Z_4a8gbhQDYNjmga8zFwBwYXSzwZfzUnQIHQ3aH9ReCCo3Qux16ekbhB92C54gsHdv0w4UYg8gnacy3NLaQY';
        // 注册service worker
        registerServiceWorker('sw.js').then(function (registration) {
            return Promise.all([
                registration,
                askPermission()
            ])
        }).then(function (result) {
            var registration = result[0];
            /* ===== 添加提醒功能 ====== */
            document.querySelector('#js-notification-btn').addEventListener('click', function () {
                var title = 'XHY';
                var options = {
                    body: 'Hello!',
                    icon: '/icon/android-icon-144x144.png',
                    actions: [{
                        action: 'Home-page',
                        title: 'Home page'
                    }, {
                        action: 'contact-me',
                        title: 'contact me'
                    }],
                    tag: 'pwa-starter',
                    renotify: true
                };
                registration.showNotification(title, options);
            });
            /* ======================= */

            console.log('Service Worker 注册成功');

            // 开启该客户端的消息推送订阅功能
            return subscribeUserToPush(registration, publicKey);

        }).then(function (subscription) {
            var body = {subscription: subscription};

            // 为了方便之后的推送，为每个客户端简单生成一个标识
            body.uniqueid = new Date().getTime();
            console.log('uniqueid', body.uniqueid);

            // 将生成的客户端订阅信息存储在自己的服务器上
            return sendSubscriptionToServer(JSON.stringify(body));
        }).then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    }

    /* ======= 消息通信 ======= */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', function (e) {
            var action = e.data;
            console.log(`receive post-message from sw, action is '${e.data}'`);
            switch (action) {
                case 'Home-page':
                    location.href = 'https://xhy.im';
                    break;
                case 'contact-me':
                    location.href = 'mailto:hello@ioslide.com';
                    break;
                default:
                    document.querySelector('.panel').classList.add('show');
                    break;
            }
        });
    }
    /* ======================= */

    /**
     * 获取用户授权
     */
    function askPermission() {
        return new Promise(function (resolve, reject) {
            var permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });
      
            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        }).then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            }
        });
    }

})();