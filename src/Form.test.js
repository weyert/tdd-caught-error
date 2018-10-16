import {
    cleanup,
    fireEvent,
    render,
    wait
} from "react-testing-library";

import {
    Form
} from "./Form";
import React from "react";
import userEvent from "user-event";

afterEach(cleanup);

const collectionOptions = [{
        id: "option1",
        description: "Option 1"
    },
    {
        id: "option2",
        description: "Option 2"
    },
    {
        id: "option3",
        description: "Option 3"
    }
];

describe("<Form />", () => {

    test(
        "ensure onFormCompleted gets called",
        async () => {
            const handleFormCompleted = jest.fn();
            const {
                getByText,
            } = render( <
                Form mode = "create"
                onFormCompleted = {
                    handleFormCompleted
                }
                />
            );

            userEvent.click(getByText("Post"));
            await wait(() => {
                expect(handleFormCompleted).toHaveBeenCalledTimes(1);
            });
        },
    );

    describe('crashes', () => {
        afterEach(() => {
            console.error.mockClear();
        });

        test("selecting and unselecting option should not crash", async () => {
            const {
                getByText
            } = render( <
                Form mode = "create"
                collectionOptions = {
                    collectionOptions
                }
                />
            );

            console.error = jest.fn()

            userEvent.click(getByText("Option 1"));
            userEvent.click(getByText("Option 2"));
            await Promise.resolve()
            expect(() => {
                userEvent.click(getByText("Option 1"));
            }).toThrowError()
        });
    })
});