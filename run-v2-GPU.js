const fs = require('fs');
const crypto = require('crypto');
const { createHash } = require('crypto');
const bs58 = require('bs58');
const EC = require('elliptic').ec;
const { GPU } = require('gpu.js');
const ec = new EC('secp256k1');
const gpu = new GPU();

function generateTronAddress() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const privateKeyBigInt = BigInt('0x' + privateKey);
    const key = ec.keyFromPrivate(privateKeyBigInt);
    const publicKey = key.getPublic('hex');
    const publicKeyBytes = Buffer.from(publicKey, 'hex');
    const sha256Hash = createHash('sha256').update(publicKeyBytes).digest();
    const ripemd160Hash = createHash('ripemd160').update(sha256Hash).digest();
    const addressBytes = Buffer.concat([Buffer.from('41', 'hex'), ripemd160Hash]);
    const checksum = createHash('sha256').update(createHash('sha256').update(addressBytes).digest()).digest().slice(0, 4);
    const addressWithChecksum = Buffer.concat([addressBytes, checksum]);
    const tronAddress = bs58.encode(addressWithChecksum);

    return { privateKey, publicKey, tronAddress: tronAddress.toString() };
}

function writeAllResultsToFile(data) {
    fs.appendFileSync('tron_addresses.txt', `${data.privateKey}\n${data.publicKey}\n${data.tronAddress}\n---------------------------\n`, 'utf8');
}

function writeTronAddressToFile(address) {
    fs.appendFileSync('tron_addresses_only.txt', `${address}\n`, 'utf8');
}

const hasVanityAddress = gpu.createKernel(function (address) {
    for (let i = 0; i < this.constants.length - 3; i++) {
        if (address[i] === address[i + 1] && address[i] === address[i + 2] && address[i] === address[i + 3]) {
            return 1;
        }
    }
    return 0;
}).setConstants({ length: 34 }).setOutput([1]);

while (true) {
    const result = generateTronAddress();
    writeAllResultsToFile(result);
    writeTronAddressToFile(result.tronAddress);

    const isVanity = hasVanityAddress(result.tronAddress.split('').map(char => char.charCodeAt(0)));
    if (isVanity[0]) {
        console.log(`Vanity TRON Address: ${result.tronAddress}`);
    }

    console.log(`Private Key: ${result.privateKey}`);
    console.log(`Public Key: ${result.publicKey}`);
    console.log(`TRON Address: ${result.tronAddress}`);
    console.log('---------------------------');
}
