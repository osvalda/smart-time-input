import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { SmartTimeInput } from '../../src/smart-time-input'

describe('Editing time', () => {

    test('Single hour handling. 6 -> 06:', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "6");
        expect(input).toHaveValue('06:');
    });

    test('Single hour handling. 2 -> 2', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "2");
        expect(input).toHaveValue('2');
    });

    test('Single hour handling. 69 -> 06:09', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "69");
        expect(input).toHaveValue('06:09');
    });

    test('Double hour handling. 11 -> 11:', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "11");
        expect(input).toHaveValue('11:');
    });

    test('Hour above 24 handling. 24 -> 02:4:', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "24");
        expect(input).toHaveValue('02:4');
    });

    test('Hour above 24 handling. 24 -> 02:4:', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "99");
        expect(input).toHaveValue('09:09');
    });

    test('Whole time provided', async () => {
        render(<SmartTimeInput placeholder='hh:mm' />);
        const input = screen.getByPlaceholderText('hh:mm');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "1234");
        expect(input).toHaveValue('12:34');
    });
});

describe('Blur effect tests', () => {

    test('Single hour is completed if user clicks away', async () => {
        render(<SmartTimeInput data-testid='input' />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(input, "1");
        await userEvent.click(button);
        expect(input).toHaveValue('01:00');
    });

    test('Double hour is completed if user clicks away', async () => {
        render(<SmartTimeInput data-testid='input' />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(input, "23");
        await userEvent.click(button);
        expect(input).toHaveValue('23:00');
    });

    test('Double hour and minute is completed if user clicks away', async () => {
        render(<SmartTimeInput data-testid='input' />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(input, "232");
        await userEvent.click(button);
        expect(input).toHaveValue('23:02');
    });

    test('Already complete time is NOT completed if user clicks away', async () => {
        render(<SmartTimeInput data-testid='input' />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(input, "1234");
        await userEvent.click(button);
        expect(input).toHaveValue('12:34');
    });

    test('Empty hour is completed if user clicks away', async () => {
        render(<SmartTimeInput data-testid='input' />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.click(input);
        await userEvent.click(button);
        expect(input).toHaveValue('00:00');
    });
});

describe('Any other tests', () => {

    test('Cannot interact if disabled', async () => {
        render(<SmartTimeInput data-testid='input' disabled={true} />);
        render(<TestButton />);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('testBtn');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.click(input);
        await userEvent.click(button);
        expect(input).toHaveValue('');
    });

    test('Too long time is cut to fit', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "000000");
        expect(input).toHaveValue('00:00');
    });

    test('Non time string is ignored', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "Ignored");
        expect(input).toHaveValue('');
    });

    test('Wrong time string is ignored', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, "12:99");
        expect(input).toHaveValue('12:09');
    });

    test(': is extended to zero hour', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, ":");
        expect(input).toHaveValue('00:');
    });

    test(':: is cut ot single :', async () => {
        render(<SmartTimeInput data-testid='input' />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();

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