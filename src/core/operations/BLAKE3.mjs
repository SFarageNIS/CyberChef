/**
 * @author SFarageNIS []
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { blake3 } from "hash-wasm";

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
        this.description = `Performs BLAKE3 hashing on the input.  
        <br><br> BLAKE3 is a flavour of the BLAKE cryptographic hash function that is optimized for 64-bit platforms and produces digests of any size between 1 and 64 bytes.
        <br><br> Supports the use of an optional key.`;
        this.infoURL = "https://wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE3"; // Usually a Wikipedia link. Remember to remove localisation (i.e. https://wikipedia.org/etc rather than https://en.wikipedia.org/etc)
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "type": "number",
                "name": "Output Size (1-64 bytes)",
                "value": 256
            }, {
                "name": "Output Encoding",
                "type": "option",
                "value": ["Hex", "Base64"]
            }, {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["UTF8", "Decimal", "Base64", "Hex", "Latin1"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [outSize, outFormat] = args;
        const outputLength = args[0];
        let key = Utils.convertToByteString(args[2].string || "", args[2].option);

        if (outputLength % 8 !== 0) {
            throw new OperationError("Invalid length! Valid values: 8, 16, ..., 512");
        }

        if (key.length === 0) {
            key = null;
        } else if (key.length > 64) {
            throw new OperationError(["Key cannot be greater than 64 bytes", "It is currently " + key.length + " bytes."].join("\n"));
        }

        input = new Uint8Array(input);

        const blake3Result = await blake3(input, outSize, key);

        switch (outFormat) {
            case "Hex":
                return blake3Result;
            case "Base64":
                return toBase64(blake3Result);
            default:
                return new OperationError("Unsupported Output Type");
        }
    }

}

export default BLAKE3;
