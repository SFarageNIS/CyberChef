/**
 * BLAKE3 tests.
 * @author xumptex [xumptex@outlook.fr]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "BLAKE3: 8 - Hello world",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [8, ""] }
        ]
    },
    {
        name: "BLAKE3: 16 - Hello world 2",
        input: "Hello world 2",
        expectedOutput: "2a3df5fe5f0d3fcdd995fc203c7f7c52",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [16, ""] }
        ]
    },
    {
        name: "BLAKE3: 32 - Hello world",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, ""] }
        ]
    },
    {
        name: "BLAKE3: Key Test",
        input: "Hello world",
        expectedOutput: "59dd23ac9d025690",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [8, "ThiskeyisexactlythirtytwoBytesLo"] }
        ]
    },
    {
        name: "BLAKE3: Key Test 2",
        input: "Hello world",
        expectedOutput: "c8302c9634c1da42",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [8, "ThiskeyisexactlythirtytwoByteslo"] }
        ]
    },
    {
        name: "BLAKE3: 16390 - test",
        input: "test",
        expectedMatch: /4878.{32760}555fe06b242738d5/,
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [16390, ""] }
        ]
    },
    {
        name: "BLAKE3: 16390 - key test",
        input: "test",
        expectedMatch: /a8d0.{32760}19ccd9b9726b46ae/,
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [16390, "ThiskeyisexactlythirtytwoBytesLo"] }
        ]
    },
// test vectors from https://github.com/BLAKE3-team/BLAKE3/blob/master/test_vectors/test_vectors.json
    {
        name: "BLAKE3: Std test vector - 0 bytes input, plain hash",
        input: "",
        expectedOutput: "af1349b9f5f9a1a6a0404dea36dcc9499bcb25c9adc112b7cc9a93cae41f3262e00f03e7b69af26b7faaf09fcd333050338ddfe085b8cc869ca98b206c08243a26f5487789e8f660afe6c99ef9e0c52b92e7393024a80459cf91f476f9ffdbda7001c22e159b402631f277ca96f2defdf1078282314e763699a31c5363165421cce14d",
        recipeConfig: [
            {
                "op": "BLAKE3",
                "args": [131, ""]
            }
        ]
    },
    {
        name: "BLAKE3: Std test vector - 0 bytes input, keyed hash",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26b18171a2f22a4b94822c701f107153dba24918c4bae4d2945c20ece13387627d3b73cbf97b797d5e59948c7ef788f54372df45e45e4293c7dc18c1d41144a9758be58960856be1eabbe22c2653190de560ca3b2ac4aa692a9210694254c371e851bc8f",
        recipeConfig: [
            {
                "op": "BLAKE3",
                "args": [131, "whats the Elvish word for friend"]
            }
        ]
    },
    {
        name: "BLAKE3: Std test vector - 7 bytes input, keyed hash",
        input: "00010203040506",
        expectedOutput: "af0a7ec382aedc0cfd626e49e7628bc7a353a4cb108855541a5651bf64fbb28a7c5035ba0f48a9c73dabb2be0533d02e8fd5d0d5639a18b2803ba6bf527e1d145d5fd6406c437b79bcaad6c7bdf1cf4bd56a893c3eb9510335a7a798548c6753f74617bede88bef924ba4b334f8852476d90b26c5dc4c3668a2519266a562c6c8034a6",
        recipeConfig: [
            {
                "op": "From Hex",
                args: [],
            },
            {
                "op": "BLAKE3",
                "args": [131, "whats the Elvish word for friend"]
            }
        ]
    },
    {
        name: "BLAKE3: Std test vector - 8 bytes input, keyed hash",
        input: "0001020304050607",
        expectedOutput: "be2f5495c61cba1bb348a34948c004045e3bd4dae8f0fe82bf44d0da245a060048eb5e68ce6dea1eb0229e144f578b3aa7e9f4f85febd135df8525e6fe40c6f0340d13dd09b255ccd5112a94238f2be3c0b5b7ecde06580426a93e0708555a265305abf86d874e34b4995b788e37a823491f25127a502fe0704baa6bfdf04e76c13276",
        recipeConfig: [
            {
                "op": "From Hex",
                args: [],
            },
            {
                "op": "BLAKE3",
                "args": [131, "whats the Elvish word for friend"]
            }
        ]
    },
    {
        name: "BLAKE3: Multi-byte UTF-8 input is hashed as raw bytes",
        input: "c3a9",
        expectedOutput: "46d0ec742ceaad149f9a3d109d1bd9e9ece7858161b43cf0008906478418e807",
        recipeConfig: [
            {
                "op": "From Hex",
                args: [],
            },
            {
                "op": "BLAKE3",
                "args": [32, ""]
            }
        ]
    },
    {
        name: "BLAKE3: Output encoding - Hex",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Output encoding - Base64",
        input: "Hello world",
        expectedOutput: "5+b7fShp0Qm2LNsSJyCNQBbNqgr2YD2VIjxqaYE32UU=",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "", "Base64"] }
        ]
    },
    {
        name: "BLAKE3: Output encoding - Raw preserves every byte",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "", "Raw"] },
            { "op": "To Hex",
                "args": ["None", 0] }
        ]
    },
    {
        name: "BLAKE3: Output encoding - Raw is not UTF-8 decoded",
        input: "test 565",
        expectedOutput: "c28c",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [2, "", "Raw"] },
            { "op": "To Hex",
                "args": ["None", 0] }
        ]
    },
    {
        name: "BLAKE3: Key with Latin-1 range characters is UTF-8 encoded",
        input: "Hello world",
        expectedOutput: "c9e4b1a063f548ac5ac9eb082d36c12dfad63601170a3406392ab40adf030860",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "ééééééééüüüüüüüü"] }
        ]
    },
    {
        name: "BLAKE3: Key of 32 Latin-1 range characters is too long when UTF-8 encoded",
        input: "Hello world",
        expectedOutput: "The key must be exactly 32 bytes long (it is currently 64 bytes)",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "éééééééééééééééééééééééééééééééé"] }
        ]
    },
    {
        name: "BLAKE3: Key shorter than 32 bytes is rejected",
        input: "Hello world",
        expectedOutput: "The key must be exactly 32 bytes long (it is currently 31 bytes)",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "ThiskeyisexactlythirtyoneBytesL"] }
        ]
    },
    {
        name: "BLAKE3: Missing key argument is treated as no key",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [8] }
        ]
    },
    {
        name: "BLAKE3: Missing size argument uses the default of 32 bytes",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [] }
        ]
    },
    {
        name: "BLAKE3: Unsupported output encoding is rejected",
        input: "Hello world",
        expectedOutput: "Output Encoding must be one of the following: Hex, Base64, Raw.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [8, "", "Octal"] }
        ]
    },
    {
        name: "BLAKE3: Size as a preset string",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["32", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Size typed outside the presets",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d9455f",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["33", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Size with surrounding whitespace",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d40",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [" 16 ", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Size below minimum is rejected",
        input: "Hello world",
        expectedOutput: "Size (bytes) must be greater than or equal to 1.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["0", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Size above maximum is rejected",
        input: "Hello world",
        expectedOutput: "Size (bytes) must be less than or equal to 65535.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["65536", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Fractional size is rejected",
        input: "Hello world",
        expectedOutput: "Size (bytes) must be an integer.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["1.5", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Hexadecimal size is rejected",
        input: "Hello world",
        expectedOutput: "Size (bytes) must be a number.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["0x20", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Empty size is rejected",
        input: "Hello world",
        expectedOutput: "Size (bytes) cannot be empty.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["", "", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with UTF8 key",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "whats the Elvish word for friend", option: "UTF8"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Hex key",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "77686174732074686520456c7669736820776f726420666f7220667269656e64", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Hex key with spaces",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "77 68 61 74 73 20 74 68 65 20 45 6c 76 69 73 68 20 77 6f 72 64 20 66 6f 72 20 66 72 69 65 6e 64", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Base64 key",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "d2hhdHMgdGhlIEVsdmlzaCB3b3JkIGZvciBmcmllbmQ=", option: "Base64"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Base64 key without padding",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "d2hhdHMgdGhlIEVsdmlzaCB3b3JkIGZvciBmcmllbmQ", option: "Base64"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Decimal key",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "119 104 97 116 115 32 116 104 101 32 69 108 118 105 115 104 32 119 111 114 100 32 102 111 114 32 102 114 105 101 110 100", option: "Decimal"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Official vector keyed hash with Latin1 key",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "whats the Elvish word for friend", option: "Latin1"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Binary key that is not valid UTF-8, as Hex",
        input: "Hello world",
        expectedOutput: "75ee39754ac8e17478e88f5f9c6393f4e8c1f714816c24f0189b5b0723bba228",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "e0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Binary key that is not valid UTF-8, as Latin1",
        input: "Hello world",
        expectedOutput: "75ee39754ac8e17478e88f5f9c6393f4e8c1f714816c24f0189b5b0723bba228",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00e6\u00e7\u00e8\u00e9\u00ea\u00eb\u00ec\u00ed\u00ee\u00ef\u00f0\u00f1\u00f2\u00f3\u00f4\u00f5\u00f6\u00f7\u00f8\u00f9\u00fa\u00fb\u00fc\u00fd\u00fe\u00ff", option: "Latin1"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Plain string key from older recipes is read as UTF-8",
        input: "",
        expectedOutput: "92b2b75604ed3c761f9d6f62392c8a9227ad0ea3f09573e783f1498a4ed60d26",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, "whats the Elvish word for friend", "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Empty Hex key means no key",
        input: "Hello world",
        expectedOutput: "e7e6fb7d2869d109b62cdb1227208d4016cdaa0af6603d95223c6a698137d945",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Hex key of 31 bytes is rejected",
        input: "Hello world",
        expectedOutput: "The key must be exactly 32 bytes long (it is currently 31 bytes)",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "e0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfe", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Invalid hex key is rejected rather than read as zero bytes",
        input: "Hello world",
        expectedOutput: "Key is not valid hex: it may only contain the digits 0-9 and a-f, with optional separators.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Odd-length hex key is rejected",
        input: "Hello world",
        expectedOutput: "Key is not valid hex: it must contain an even number of hex digits.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "e0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff0", option: "Hex"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Invalid Base64 key is rejected",
        input: "Hello world",
        expectedOutput: "Key is not valid Base64: it may only contain A-Z, a-z, 0-9, + and /, with = padding at the end.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "d2hhdHMgdGhlIEVsdmlzaCB3b3JkIGZvciBmcmllbmQ!", option: "Base64"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Decimal key byte above 255 is rejected",
        input: "Hello world",
        expectedOutput: "Key is not valid Decimal: \"300\" is not a byte value from 0 to 255.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "300", option: "Decimal"}, "Hex"] }
        ]
    },
    {
        name: "BLAKE3: Latin1 key with a character above U+00FF is rejected",
        input: "Hello world",
        expectedOutput: "Key is not valid Latin1: \"€\" is outside the Latin-1 range; choose UTF8 instead.",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": [32, {string: "€", option: "Latin1"}, "Hex"] }
        ]
    },
]);
