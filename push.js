var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEtm6g5f-E-PDQsmlCLJR4tDnHMG_Dmh1Z7HVn18CSFYWOLJxJFefWIzz5669f79NHl_zj3r_2Lbxuf0UEEm9Z4",
   "privateKey": "SCi3IYPfNdj6KnPXZW5hKzqT1cUF8rAEJjV3GUJtPos"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fSypDeUz_Y0:APA91bHJw9Ji9_kmruETTqNRA-1xGeD6Mz3a5Smt5Pt0WeqScuqZE1nWfOaTqVhA_iuVAa0dSQ6glu3Jkfy78ptbT6-7UqNCeXFNnVRU6dFZMg_FWCCbf1cau3HkqzZvEUVowfR3p_Gn",
   "keys": {
       "p256dh": "BGQ8tt1xKKCs6q2ILkgd1Xz3Ncf5YDrRG0jUzjyCw2xWpo8tSHKU7udTk0DaSWeZ68gHcK+9G9rep97FReuwL3E=",
       "auth": "2guDsO1EkNjTnHWPgghnkQ=="
   }
};
var payload = 'Push notification from PUSH.JS';
 
var options = {
   gcmAPIKey: '326509478995',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);