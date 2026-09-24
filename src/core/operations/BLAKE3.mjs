/**
 * @author xumptex [xumptex@outlook.fr]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { blake3 } from "@noble/hashes/blake3.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { toBase64 } from "../lib/Base64.mjs";
import { HASH_KEY_FORMATS, parseHashKey } from "../lib/HashKey.mjs";

/**
 * BLAKE3 operation
 */
class BLAKE3 extends Operation {

    /**
     * BLAKE3 constructor
     */
    constructor() {
        super();

        this.name = "BLAKE3";
        this.module = "Hashing";
        this.description = `Hashes the input using BLAKE3, with an optional 32-byte key, and outputs the result as Hex, Base64 or raw bytes.
        <br><br>Size is given in bytes, unlike BLAKE2b and BLAKE2s which use bits: 32 bytes gives the standard 256-bit digest (64 hex characters), and any size from 1 to 65535 bytes is supported.`;
        this.infoURL = "https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE3";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size (bytes)",
                "type": "editableOption",
                "value": [
                    {name: "64 (512-bit)", value: "64"},
                    {name: "48 (384-bit)", value: "48"},
                    {name: "32 (256-bit, standard)", value: "32"},
                    {name: "20 (160-bit)", value: "20"},
                    {name: "16 (128-bit)", value: "16"}
                ],
                "defaultIndex": 2,
                "min": 1,
                "max": 65535, // arbitrary limit to prevent resource exhaustion
                "integer": true,
                "allowEmpty": false
            }, {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": HASH_KEY_FORMATS
            }, {
                "name": "Output Encoding",
                "type": "option",
                "value": ["Hex", "Base64", "Raw"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // Size is validated against the argument's min and max before run() is called. Hand-written or older
        // recipes may omit trailing arguments, so fall back to the defaults that validation checked against.
        const sizeArg = this.args[0];
        const size = Number(args[0] ?? sizeArg.value[sizeArg.defaultIndex].value);
        // Recipes saved before the key format option existed hold the key as a plain UTF-8 string
        const keyBytes = parseHashKey(args[1]);
        const outputEncoding = args[2] ?? "Hex";
        const opts = { dkLen: size };
        const inputBytes = new Uint8Array(input);
        if (keyBytes.length > 0) {
            // BLAKE3's keyed hash mode is only defined for 32-byte keys
            if (keyBytes.length !== 32) {
                throw new OperationError(`The key must be exactly 32 bytes long (it is currently ${keyBytes.length} bytes)`);
            }
            opts.key = keyBytes;
        }
        const digest = blake3(inputBytes, opts);
        switch (outputEncoding) {
            case "Hex":
                return bytesToHex(digest);
            case "Base64":
                return toBase64(digest);
            case "Raw":
                return Utils.byteArrayToChars(digest);
            default:
                throw new OperationError(`Unsupported output encoding: ${outputEncoding}`);
        }
    }

}

export default BLAKE3;
