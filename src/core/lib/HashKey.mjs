/**
 * Strict parsing of hash keys entered as text.
 *
 * Utils.convertToByteArray is deliberately lenient (e.g. "0g" is read as hex 00, and a Latin1 string containing
 * "€" falls back to UTF-8), which is unsafe for keys: a mistyped key could silently hash with different bytes.
 * These functions return the same bytes as Utils.convertToByteArray for valid input and throw for anything else.
 *
 * @author SFarageNIS
 * @copyright Crown Copyright 2026
 * @license Apache-2.0
 */

import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { fromBase64 } from "./Base64.mjs";

/** Key formats offered by the BLAKE operations, in the order shown in the UI. */
export const HASH_KEY_FORMATS = ["UTF8", "Decimal", "Base64", "Hex", "Latin1"];

/**
 * Parses hex text, allowing whitespace, ",", ";", ":" separators and "0x", "\x" or "%" byte prefixes.
 *
 * @param {string} text
 * @returns {number[]}
 */
function parseHexKey(text) {
    const digits = text.replace(/0x|\\x|%/gi, "").replace(/[\s,;:]/g, "");
    if (!/^[0-9a-f]*$/i.test(digits)) {
        throw new OperationError("Key is not valid hex: it may only contain the digits 0-9 and a-f, with optional separators.");
    }
    if (digits.length % 2 !== 0) {
        throw new OperationError("Key is not valid hex: it must contain an even number of hex digits.");
    }
    return digits.match(/../g)?.map(byte => parseInt(byte, 16)) ?? [];
}

/**
 * Parses standard Base64 text, allowing whitespace and optional padding.
 *
 * @param {string} text
 * @returns {number[]}
 */
function parseBase64Key(text) {
    const encoded = text.replace(/\s/g, "");
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
        throw new OperationError("Key is not valid Base64: it may only contain A-Z, a-z, 0-9, + and /, with = padding at the end.");
    }
    const unpadded = encoded.replace(/=+$/, "");
    if (unpadded.length % 4 === 1) {
        throw new OperationError("Key is not valid Base64: its length is impossible for Base64 data.");
    }
    if (encoded !== unpadded && encoded.length % 4 !== 0) {
        throw new OperationError("Key is not valid Base64: it is padded to the wrong length.");
    }
    // Padding is optional, so restore it before decoding in strict mode
    const padded = unpadded + "=".repeat((4 - unpadded.length % 4) % 4);
    return Array.from(fromBase64(padded, "A-Za-z0-9+/=", "byteArray", false, true));
}

/**
 * Parses decimal byte values separated by whitespace or commas.
 *
 * @param {string} text
 * @returns {number[]}
 */
function parseDecimalKey(text) {
    const tokens = text.split(/[\s,]+/).filter(token => token !== "");
    return tokens.map(token => {
        if (!/^\d+$/.test(token) || Number(token) > 255) {
            throw new OperationError(`Key is not valid Decimal: "${Utils.truncate(token, 10)}" is not a byte value from 0 to 255.`);
        }
        return Number(token);
    });
}

/**
 * Parses text whose characters are all single Latin-1 bytes (U+0000 to U+00FF).
 *
 * @param {string} text
 * @returns {number[]}
 */
function parseLatin1Key(text) {
    return Array.from(text, character => {
        const code = character.codePointAt(0);
        if (code > 0xff) {
            throw new OperationError(`Key is not valid Latin1: "${character}" is outside the Latin-1 range; choose UTF8 instead.`);
        }
        return code;
    });
}

/**
 * Converts a key argument to bytes.
 *
 * Accepts a toggleString value ({string, option}), or a plain string, which is read as UTF-8 so that recipes saved
 * when the key was a plain UTF-8 text argument keep producing the same key bytes.
 *
 * @param {Object|string|undefined} keyArg
 * @returns {Uint8Array}
 */
export function parseHashKey(keyArg) {
    const isPlainString = typeof keyArg === "string";
    const text = (isPlainString ? keyArg : keyArg?.string) ?? "";
    const format = isPlainString ? "UTF8" : (keyArg?.option ?? "UTF8");

    switch (format) {
        case "UTF8":
            return new Uint8Array(Utils.strToUtf8ByteArray(text));
        case "Hex":
            return new Uint8Array(parseHexKey(text));
        case "Base64":
            return new Uint8Array(parseBase64Key(text));
        case "Decimal":
            return new Uint8Array(parseDecimalKey(text));
        case "Latin1":
            return new Uint8Array(parseLatin1Key(text));
        default:
            throw new OperationError(`Unsupported key format: ${format}`);
    }
}
