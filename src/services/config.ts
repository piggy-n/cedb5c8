export const requestPrefix = '/resource/device/';
export const devOnlinePrefix = 'wss://lzz.enbo12119.com';
export const devLocationPrefix = 'ws://192.168.9.148';
export const wsPrefix = location.protocol.includes('https') ? 'wss://' : 'ws://';
export const token = `?token=${localStorage.getItem('accessToken')}`;
export const locationHost = window.location.host;
