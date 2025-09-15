import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { SmartTimeInput } from '../../src/smart-time-input'

function renderSut(disabled?: boolean): HTMLElement[] {
    render(<SmartTimeInput data-testid='input' disabled={disabled}/>);
    render(<TestButton />);
    const button = screen.getByTestId('testBtn');
    expect(button).toBeInTheDocument();
    const input: HTMLElement = screen.getByTestId('input');
    expect(input).toBeInTheDocument();

    return [input, button];
}

describe('Editing time', () => {

    test('Single hour handling. 6 -> 06:', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "6");
        expect(input).toHaveValue('06:');
    });

    test('Single hour handling. 2 -> 2', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "2");
        expect(input).toHaveValue('2');
    });

    test('Single hour handling. 69 -> 06:09', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "69");
        expect(input).toHaveValue('06:09');
    });

    test('Double hour handling. 11 -> 11:', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "11");
        expect(input).toHaveValue('11:');
    });

    test('Hour above 24 handling. 24 -> 02:4:', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "24");
        expect(input).toHaveValue('02:4');
    });

    test('Hour above 24 handling. 24 -> 02:4:', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "99");
        expect(input).toHaveValue('09:09');
    });

    test('Whole time provided', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "1234");
        expect(input).toHaveValue('12:34');
    });
});

describe('Blur effect tests', () => {

    test('Single hour is completed if user clicks away', async () => {
        const [input, button] = renderSut();

        await userEvent.type(input, "1");
        await userEvent.click(button);
        expect(input).toHaveValue('01:00');
    });

    test('Double hour is completed if user clicks away', async () => {
        const [input, button] = renderSut();

        await userEvent.type(input, "23");
        await userEvent.click(button);
        expect(input).toHaveValue('23:00');
    });

    test('Double hour and minute is completed if user clicks away', async () => {
        const [input, button] = renderSut();

        await userEvent.type(input, "232");
        await userEvent.click(button);
        expect(input).toHaveValue('23:02');
    });

    test('Already complete time is NOT completed if user clicks away', async () => {
        const [input, button] = renderSut();

        await userEvent.type(input, "1234");
        await userEvent.click(button);
        expect(input).toHaveValue('12:34');
    });

    test('Empty hour is completed if user clicks away', async () => {
        const [input, button] = renderSut();

        await userEvent.click(input);
        await userEvent.click(button);
        expect(input).toHaveValue('00:00');
    });
});

describe('Any other tests', () => {

    test('Cannot interact if disabled', async () => {
        const [input, button] = renderSut(true);

        await userEvent.click(input);
        await userEvent.click(button);
        expect(input).toHaveValue('');
    });

    test('Too long time is cut to fit', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "000000");
        expect(input).toHaveValue('00:00');
    });

    test('Non time string is ignored', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "Ignored");
        expect(input).toHaveValue('');
    });

    test('Wrong time string is ignored', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "12:99");
        expect(input).toHaveValue('12:09');
    });

    test(': is extended to zero hour', async () => {
        const [input] = renderSut();

        await userEvent.type(input, ":");
        expect(input).toHaveValue('00:');
    });

    test(':: is cut ot single :', async () => {
        const [input] = renderSut();

        await userEvent.type(input, "::");
        expect(input).toHaveValue('00:');
    });
});

function TestButton() {
    return (
        <div>
            <button data-testid="testBtn">
                Test
            </button>
        </div>
    )
}