/**
 * Automated Parameter Validation tests
 *
 * @author CyberChef
 * @copyright Crown Copyright 2026
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Automated Validation: Valid values",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Integer Number under min limit",
        input: "test",
        expectedOutput: "Integer Number must be greater than or equal to 5.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [4, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Integer Number over max limit",
        input: "test",
        expectedOutput: "Integer Number must be less than or equal to 10.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [11, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Integer Number not an integer",
        input: "test",
        expectedOutput: "Integer Number must be an integer.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5.5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Real Number under min limit",
        input: "test",
        expectedOutput: "Real Number must be greater than or equal to 1.5.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.4, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Real Number over max limit",
        input: "test",
        expectedOutput: "Real Number must be less than or equal to 5.5.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 5.6, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Non Empty String over maxLength limit",
        input: "test",
        expectedOutput: "Non Empty String length cannot exceed 5.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "helloooo", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Non Empty String is empty",
        input: "test",
        expectedOutput: "Non Empty String cannot be empty.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Empty Allowed String is empty (allowed)",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Non Empty Toggle String is empty",
        input: "test",
        expectedOutput: "Non Empty Toggle String cannot be empty.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "" }, "Option 1"]
            }
        ]
    },
    {
        name: "Automated Validation: Invalid Option value",
        input: "test",
        expectedOutput: "Option Ingredient must be one of the following: Option 1, Option 2, Option 3.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 4"]
            }
        ]
    },
    {
        name: "Automated Validation: Option value as optgroup heading (invalid)",
        input: "test",
        expectedOutput: "Option Ingredient must be one of the following: Option 1, Option 2, Option 3.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "[Group 1]"]
            }
        ]
    },
    {
        name: "Automated Validation: Option value empty (invalid)",
        input: "test",
        expectedOutput: "Option Ingredient cannot be empty.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, ""]
            }
        ]
    },
    {
        name: "Automated Validation: Valid Arg Selector value",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 2"]
            }
        ]
    },
    {
        name: "Automated Validation: Invalid Arg Selector value",
        input: "test",
        expectedOutput: "Arg Selector Ingredient must be one of the following: Option 1, Option 2.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 3"]
            }
        ]
    },
    {
        name: "Automated Validation: Arg Selector value empty (invalid)",
        input: "test",
        expectedOutput: "Arg Selector Ingredient cannot be empty.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", ""]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option valid preset",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "16"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option valid typed value",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "40"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option valid number",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", 48]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option surrounding whitespace",
        input: "test",
        expectedOutput: "Success",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", " 32 "]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option under min limit",
        input: "test",
        expectedOutput: "Numeric Editable Option must be greater than or equal to 8.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "0"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option over max limit",
        input: "test",
        expectedOutput: "Numeric Editable Option must be less than or equal to 64.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "72"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option not a multiple of step",
        input: "test",
        expectedOutput: "Numeric Editable Option must be a multiple of 8.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "12"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option not an integer",
        input: "test",
        expectedOutput: "Numeric Editable Option must be an integer.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "16.0"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option hexadecimal notation",
        input: "test",
        expectedOutput: "Numeric Editable Option must be a number.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "0x10"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option exponent notation",
        input: "test",
        expectedOutput: "Numeric Editable Option must be a number.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "1.6e1"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option not a number",
        input: "test",
        expectedOutput: "Numeric Editable Option must be a number.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", "abc"]
            }
        ]
    },
    {
        name: "Automated Validation: Numeric Editable Option empty",
        input: "test",
        expectedOutput: "Numeric Editable Option cannot be empty.",
        recipeConfig: [
            {
                op: "Automated Validation Test Op",
                args: [5, 1.5, "hello", "", { "option": "Option A", "string": "test" }, "Option 1", "Option 1", ""]
            }
        ]
    }
]);
