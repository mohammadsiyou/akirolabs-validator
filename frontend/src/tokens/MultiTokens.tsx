import React from 'react';
import style from './style.module.css';
import { getToken } from '../utils/generateToken';
import Token, { TokenProps } from '../token/Token';
import { validateInput } from '../utils/validateInput';
import { useInterval } from '../hooks/useInterval';
import { getValidateReq } from '../utils/getValidateReq';

const MultiTokens = () => {
    const [input, setInput] = React.useState('');
    const [tokens, setTokens] = React.useState<TokenProps[]>([]);
    const [isStarted, setIsStarted] = React.useState(false);

    const error = React.useMemo(() => validateInput(input), [input]);

    const generate = React.useCallback(() => {
        const token = getToken(input);

        setTokens([...tokens, { code: token, id: tokens.length }]);
    }, [input, setTokens, tokens]);

    useInterval(generate, isStarted);

    const generateTokens = () => {
        if (isStarted)
            setIsStarted(false);
        else
            setIsStarted(true);
    }

    const validate = async (id: number) => {
        const index = tokens.findIndex(item => item.id === id);

        const token = tokens[index];

        if (!token)
            return;

        try {
            const data = await getValidateReq(token.code);

            const newToken = { ...token, isValid: data.isValid, isChecked: true };

            const newTokens = [
                ...tokens.slice(0, index),
                newToken,
                ...tokens.slice(index + 1)
            ];

            setTokens(newTokens);
        }
        catch { }
    };

    const statistics = React.useMemo(() => {
        let unchecked = 0;
        let valid = 0;
        let invalid = 0;

        tokens.forEach(token => {
            if (!token.isChecked)
                unchecked++;
            else if (token.isValid)
                valid++;
            else
                invalid++;
        });

        return {
            unchecked,
            valid,
            invalid
        }
    }, [tokens]);

    return (
        <div>
            <h2>Multi Tokens</h2>
            <p>Please add your allowed digits(seperate them by comma character)</p>
            <div>
                <div className={style.form}>
                    <input
                        name="multi-tokens-input"
                        placeholder="1,2,3"
                        className={style.input}
                        value={input}
                        onChange={evt => setInput(evt.target.value.trim())}
                    />
                    <input type="submit" value={isStarted ? "Stop" : "Start"} onClick={generateTokens} disabled={!!error} />
                </div>
                {!!error && <p className={style.error}>{error}</p>}
                <div className={style.statistics}>
                    {
                        !!tokens.length
                        &&
                        <p>Total: {tokens.length} Valid: {statistics.valid} Invalid: {statistics.invalid}</p>
                    }
                </div>
                <ul className={style.list}>
                    {
                        tokens.map((token, index) =>
                            <li key={index}>
                                <Token {...token} validate={() => validate(token.id)} />
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default MultiTokens;
