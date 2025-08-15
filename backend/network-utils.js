// Network Utility - Automatically detect network IP
const os = require('os');

function getNetworkIP() {
  const networkInterfaces = os.networkInterfaces();
  
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const networkInterface of interfaces) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
  
  return 'localhost'; // Fallback to localhost if no network IP found
}

function getAPIBaseURL(port = 5002) {
  const networkIP = getNetworkIP();
  return `http://${networkIP}:${port}`;
}

module.exports = {
  getNetworkIP,
  getAPIBaseURL
};

// For testing - you can run this file directly
if (require.main === module) {
  console.log('🌐 Network IP Detection:');
  console.log('   Your Network IP:', getNetworkIP());
  console.log('   API Base URL:', getAPIBaseURL());
  console.log('');
  console.log('📱 Access your website from other devices using:');
  console.log('   Frontend: http://' + getNetworkIP() + ':5173');
  console.log('   Backend:  http://' + getNetworkIP() + ':5002');
}
