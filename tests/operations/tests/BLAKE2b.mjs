/**
 * BitwiseOp tests
 *
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "BLAKE2b: 512 - Hello World",
        input: "Hello World",
        expectedOutput: "4386a08a265111c9896f56456e2cb61a64239115c4784cf438e36cc851221972da3fb0115f73cd02486254001f878ab1fd126aac69844ef1c1ca152379d0a9bd",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["512", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: 384 - Hello World",
        input: "Hello World",
        expectedOutput: "4d388e82ca8f866e606b6f6f0be910abd62ad6e98c0adfc27cf35acf948986d5c5b9c18b6f47261e1e679eb98edf8e2d",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["384", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: 256 - Hello World",
        input: "Hello World",
        expectedOutput: "1dc01772ee0171f5f614c673e3c7fa1107a8cf727bdf5a6dadb379e93c0d1d00",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["256", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: 160 - Hello World",
        input: "Hello World",
        expectedOutput: "6a8489e6fd6e51fae12ab271ec7fc8134dd5d737",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["160", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Key Test",
        input: "message data",
        expectedOutput: "3d363ff7401e02026f4a4687d4863ced",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["128", "Hex", {string: "pseudorandom key", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Custom size 32 - Hello World",
        input: "Hello World",
        expectedOutput: "6ecb6651",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["32", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Custom size 8 - Hello World",
        input: "Hello World",
        expectedOutput: "37",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["8", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Custom size 72 - Key Test",
        input: "message data",
        expectedOutput: "d73e8f3047a18d1207",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["72", "Hex", {string: "pseudorandom key", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 0",
        input: "Hello World",
        expectedOutput: "Size must be greater than or equal to 8.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["0", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 12",
        input: "Hello World",
        expectedOutput: "Size must be a multiple of 8.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["12", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 520",
        input: "Hello World",
        expectedOutput: "Size must be less than or equal to 512.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["520", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size abc",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["abc", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Raw output is not UTF-8 decoded",
        input: "test 565",
        expectedOutput: "c387",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["16", "Raw", {string: "", option: "UTF8"}] },
            { "op": "To Hex",
                "args": ["None", 0] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 0x100",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["0x100", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 2.56e2",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["2.56e2", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid size 256.0",
        input: "Hello World",
        expectedOutput: "Size must be an integer.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["256.0", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Numeric size",
        input: "Hello World",
        expectedOutput: "1dc01772ee0171f5f614c673e3c7fa1107a8cf727bdf5a6dadb379e93c0d1d00",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": [256, "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Size with surrounding whitespace",
        input: "Hello World",
        expectedOutput: "1dc01772ee0171f5f614c673e3c7fa1107a8cf727bdf5a6dadb379e93c0d1d00",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": [" 256 ", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Missing key argument is treated as no key",
        input: "Hello World",
        expectedOutput: "1dc01772ee0171f5f614c673e3c7fa1107a8cf727bdf5a6dadb379e93c0d1d00",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["256", "Hex"] }
        ]
    },
    {
        name: "BLAKE2b: Missing size argument uses the default preset",
        input: "Hello World",
        expectedOutput: "4386a08a265111c9896f56456e2cb61a64239115c4784cf438e36cc851221972da3fb0115f73cd02486254001f878ab1fd126aac69844ef1c1ca152379d0a9bd",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": [] }
        ]
    },
    {
        name: "BLAKE2b: Empty size is rejected",
        input: "Hello World",
        expectedOutput: "Size cannot be empty.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2b: Known answer with Hex key",
        input: "",
        expectedOutput: "10ebb67700b1868efb4417987acf4690ae9d972fb7a590c2f02871799aaa4786b5e996e8f0f4eb981fc214b005f42d2ff4233499391653df7aefcbc13fc51568",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["512", "Hex", {string: "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f", option: "Hex"}] }
        ]
    },
    {
        name: "BLAKE2b: Invalid hex key is rejected rather than read as zero bytes",
        input: "Hello World",
        expectedOutput: "Key is not valid hex: it may only contain the digits 0-9 and a-f, with optional separators.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["256", "Hex", {string: "0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g0g", option: "Hex"}] }
        ]
    },
    {
        name: "BLAKE2b: Decimal key byte above 255 is rejected",
        input: "Hello World",
        expectedOutput: "Key is not valid Decimal: \"300\" is not a byte value from 0 to 255.",
        recipeConfig: [
            { "op": "BLAKE2b",
                "args": ["256", "Hex", {string: "1 2 300", option: "Decimal"}] }
        ]
    }
]);
