const fs = require('fs');
const crypto = require('crypto');
const { createHash } = require('crypto');
const bs58 = require('bs58');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function generateTronAddress() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const privateKeyBigInt = BigInt('0x' + privateKey);
    const publicKey = ec.keyFromPrivate(privateKeyBigInt).getPublic('hex');
    const publicKeyBytes = Buffer.from(publicKey, 'hex');
    const sha256Hash = createHash('sha256').update(publicKeyBytes).digest();
    const ripemd160Hash = createHash('ripemd160').update(sha256Hash).digest();
    const addressBytes = Buffer.concat([Buffer.from('41', 'hex'), ripemd160Hash]);
    const checksum = createHash('sha256').update(createHash('sha256').update(addressBytes).digest()).digest().slice(0, 4);
    const addressWithChecksum = Buffer.concat([addressBytes, checksum]);
    const tronAddress = bs58.encode(addressWithChecksum);

    return { privateKey, publicKey, tronAddress: tronAddress.toString() };
}

function writeToFile(data) {
    fs.appendFileSync('ppt.txt', `${data.privateKey}\n${data.publicKey}\n${data.tronAddress}\n---------------------------\n`, 'utf8');

}

function writeTronAddressToFile(address) {
    fs.appendFileSync('tron_addresses_only.txt', `${address}\n`, 'utf8');
}

while (true) {
    const result = generateTronAddress();
    writeTronAddressToFile(result.tronAddress);
    writeToFile(result);
    console.log(`Private Key: ${result.privateKey}`);
    console.log(`Public Key: ${result.publicKey}`);
    console.log(`TRON Address: ${result.tronAddress}`);
    console.log('---------------------------');
}