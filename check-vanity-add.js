const fs = require('fs');

function hasVanityAddress(address) {
    for (let i = 0; i < address.length - 3; i++) {
        if (address[i] === address[i + 1] && address[i] === address[i + 2] && address[i] === address[i + 3] && address[i] === address[i + 4]) {
            return true;
        }
    }
    return false;
}

fs.readFile('tron_addresses_only.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const addresses = data.split('\n').filter(address => address.trim().length > 0);
    const vanityAddresses = addresses.filter(hasVanityAddress);
    console.log('Vanity Addresses:');
    vanityAddresses.forEach(address => console.log(address));
});
