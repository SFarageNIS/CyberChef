/**
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import blakejs from "blakejs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { HASH_KEY_FORMATS, parseHashKey } from "../lib/HashKey.mjs";

/**
 * BLAKE2s Operation
 */
class BLAKE2s extends Operation {

    /**
     * BLAKE2s constructor
     */
    constructor() {
        super();

        this.name = "BLAKE2s";
        this.module = "Hashing";
        this.description = `Performs BLAKE2s hashing on the input.  
        <br><br>BLAKE2s is a flavour of the BLAKE cryptographic hash function that is optimized for 8- to 32-bit platforms and produces digests of any size between 1 and 32 bytes.
        <br><br>Size is given in bits, unlike BLAKE3 which uses bytes: it may be any multiple of 8 from 8 to 256 (e.g. 256 bits gives 32 bytes, or 64 hex characters).
        <br><br>Supports the use of an optional key.`;
        this.infoURL = "https://wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "editableOption",
                "value": [
                    {name: "256", value: "256"},
                    {name: "160", value: "160"},
                    {name: "128", value: "128"}
                ],
                "min": 8,
                "max": 256,
                "step": 8,
                "integer": true,
                "allowEmpty": false
            }, {
                "name": "Output Encoding",
                "type": "option",
                "value": ["Hex", "Base64", "Raw"]
            },
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": HASH_KEY_FORMATS
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string} The input having been hashed with BLAKE2s in the encoding format specified.
     */
    run(input, args) {
        // Size is validated against the argument's min, max and step before run() is called. Recipes that
        // omit trailing arguments get the same defaults that validation checked against.
        const [sizeInBits, outFormatArg, keyArg] = args;
        const outSize = Number(sizeInBits ?? this.args[0].value[0].value);
        const outFormat = outFormatArg ?? "Hex";
        let key = parseHashKey(keyArg);
        if (key.length === 0) {
            key = null;
        } else if (key.length > 32) {
            throw new OperationError(["Key cannot be greater than 32 bytes", "It is currently " + key.length + " bytes."].join("\n"));
        }

        input = new Uint8Array(input);
        switch (outFormat) {
            case "Hex":
                return blakejs.blake2sHex(input, key, outSize / 8);
            case "Base64":
                return toBase64(blakejs.blake2s(input, key, outSize / 8));
            case "Raw":
                return Utils.byteArrayToChars(blakejs.blake2s(input, key, outSize / 8));
            default:
                throw new OperationError("Unsupported Output Type");
        }
    }

}

export default BLAKE2s;
