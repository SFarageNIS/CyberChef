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
        name: "BLAKE2s: 256 - Hello World",
        input: "Hello World",
        expectedOutput: "7706af019148849e516f95ba630307a2018bb7bf03803eca5ed7ed2c3c013513",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["256", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: 160 - Hello World",
        input: "Hello World",
        expectedOutput: "0e4fcfc2ee0097ac1d72d70b595a39e09a3c7c7e",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["160", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: 128 - Hello World",
        input: "Hello World",
        expectedOutput: "9964ee6f36126626bf864363edfa96f6",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["128", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Key Test",
        input: "message data",
        expectedOutput: "ea0078ad4910a6e5c411bc62dc84a8c7",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["128", "Hex", {string: "pseudorandom key", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Custom size 24 - Hello World",
        input: "Hello World",
        expectedOutput: "b5ae98",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["24", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Custom size 224 - Hello World",
        input: "Hello World",
        expectedOutput: "8a74d9e5c5de9c8a0cb1c292f65808831717e422302f3d58853d58ed",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["224", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Custom size 96 - Key Test",
        input: "message data",
        expectedOutput: "5551a00efde0fb1c08910fc8",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["96", "Hex", {string: "pseudorandom key", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 0",
        input: "Hello World",
        expectedOutput: "Size must be greater than or equal to 8.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["0", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 12",
        input: "Hello World",
        expectedOutput: "Size must be a multiple of 8.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["12", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 264",
        input: "Hello World",
        expectedOutput: "Size must be less than or equal to 256.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["264", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size abc",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["abc", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Raw output is not UTF-8 decoded",
        input: "test 10",
        expectedOutput: "c280",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["16", "Raw", {string: "", option: "UTF8"}] },
            { "op": "To Hex",
                "args": ["None", 0] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 0x100",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["0x100", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 2.56e2",
        input: "Hello World",
        expectedOutput: "Size must be a number.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["2.56e2", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Invalid size 256.0",
        input: "Hello World",
        expectedOutput: "Size must be an integer.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["256.0", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Numeric size",
        input: "Hello World",
        expectedOutput: "7706af019148849e516f95ba630307a2018bb7bf03803eca5ed7ed2c3c013513",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": [256, "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Size with surrounding whitespace",
        input: "Hello World",
        expectedOutput: "7706af019148849e516f95ba630307a2018bb7bf03803eca5ed7ed2c3c013513",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": [" 256 ", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE2s: Missing key argument is treated as no key",
        input: "Hello World",
        expectedOutput: "7706af019148849e516f95ba630307a2018bb7bf03803eca5ed7ed2c3c013513",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["256", "Hex"] }
        ]
    },
    {
        name: "BLAKE2s: Missing size argument uses the default preset",
        input: "Hello World",
        expectedOutput: "7706af019148849e516f95ba630307a2018bb7bf03803eca5ed7ed2c3c013513",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": [] }
        ]
    },
    {
        name: "BLAKE2s: Empty size is rejected",
        input: "Hello World",
        expectedOutput: "Size cannot be empty.",
        recipeConfig: [
            { "op": "BLAKE2s",
                "args": ["", "Hex", {string: "", option: "UTF8"}] }
        ]
    }
]);
