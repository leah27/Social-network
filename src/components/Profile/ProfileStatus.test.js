import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="react" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("react");
    });

    test("after creation <span /> should be displyed", () => {
        const component = create(<ProfileStatus status="react" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });

    test("after creation <input /> shouldn't be displyed", () => {
        const component = create(<ProfileStatus status="react" />);
        const root = component.root;

        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });

    test("after creation <span /> should contain correct status", () => {
        const component = create(<ProfileStatus status="react" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("react");
    });

    test("in editMode input should be displayed instead of span", () => {
        const component = create(<ProfileStatus status="react" />);
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("react");
    });

    test("callback should be called", () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status="react" updateStatus={mockCallBack} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
})