let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4500';
        break;

    case 'jkv-allfitnessclient.herokuapp.com':
        APIURL = 'https://jkv-allfitness.herokuapp.com'

}

export default APIURL;