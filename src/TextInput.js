import {
    ErrorMessage,
    Field,
    getIn,
    isFunction
} from "formik";

import React from "react";

/**
 * TextInput
 */
export const TextInput = ({
        render,
        name,
        label,
        horizontal,
        help,
        required,
        style,
        component: Component,
        ...rest
    }) => ( <
        Field name = {
            name
        }
        render = {
            ({
                field,
                form
            }) => {
                const touched = getIn(form.touched, name);
                const error = getIn(form.errors, name);
                const status = touched && getIn(form.status, name);
                const controlId = rest.id ? rest.id : name;
                const hasError = (touched || form.submitCount > 0) && !!error; // eslint-disable-line
                const {
                    children
                } = rest

                //
                return ( <
                    div > {
                        label && ( <
                            label htmlFor = {
                                controlId
                            } > {
                                label
                            } {
                                required && < span className = "has-text-danger" > * < /span>} <
                                    /label>
                            )
                        } <
                        div > {
                            isFunction(children) ?
                            children({
                                field,
                                form,
                                id: controlId,
                                ...rest
                            }) :
                                null
                        } {
                            render ? (
                                render({
                                    field,
                                    form,
                                    id: controlId,
                                    ...rest
                                }) // render prop inception
                            ) : typeof Component === "string" ? (
                                React.createElement(Component, {
                                    id: controlId,
                                    ...field,
                                    ...rest
                                })
                            ) : Component ? ( <
                                Component id = {
                                    controlId
                                } { ...field
                                } { ...rest
                                }
                                />
                            ) : ( <
                                input id = {
                                    controlId
                                } { ...field
                                } { ...rest
                                }
                                />
                            )
                        }

                        <
                        ErrorMessage name = {
                            name
                        }
                        color = "danger" / > {
                            status && < p color = "danger" > {
                                status
                            } < /p>} {
                                help && < p color = "dark" > {
                                        help
                                    } < /p>} <
                                    /div> <
                                    /div>
                            );
                        }
                    }
                    />
                );

                export default TextInput;