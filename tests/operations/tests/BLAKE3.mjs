/**
 * BitwiseOp tests
 *
 * @author SFarageNIS
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "BLAKE3: 512 - Hello World",
        input: "Hello World",
        expectedOutput: "41f8394111eb713a22165c46c90ab8f0fd9399c92028fd6d288944b23ff5bf76e45cedbdb50ab870649057754d1b640a04d0df928646c6b625357117a5e1af73",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["512", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 384 - Hello World",
        input: "Hello World",
        expectedOutput: "41f8394111eb713a22165c46c90ab8f0fd9399c92028fd6d288944b23ff5bf76e45cedbdb50ab870649057754d1b640a",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["384", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 256 - Hello World",
        input: "Hello World",
        expectedOutput: "41f8394111eb713a22165c46c90ab8f0fd9399c92028fd6d288944b23ff5bf76",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["256", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 160 - Hello World",
        input: "Hello World",
        expectedOutput: "41f8394111eb713a22165c46c90ab8f0fd9399c9",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["160", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 32 - Hello World",
        input: "Hello World",
        expectedOutput: "41f83941",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["32", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 31 - Invalid Hello World",
        input: "Hello World",
        expectedOutput: "Invalid length! Valid values: 8, 16, ..., 512",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["31", "Hex", {string: "", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: 31 - Invalid Hello World with key",
        input: "Hello World",
        expectedOutput: "Invalid length! Valid values: 8, 16, ..., 512",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["31", "Hex", {string: "valid_key", option: "UTF8"}] }
        ]
    },
    {
        name: "BLAKE3: Key Test",
        input: "message data",
        expectedOutput: "f9d030480ce4da3899277c077e0cd461",
        recipeConfig: [
            { "op": "BLAKE3",
                "args": ["128", "Hex", {string: "pseudorandom key32 bytes of data", option: "UTF8"}] }
        ]
    }
]);
