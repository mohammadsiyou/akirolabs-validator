import React from 'react';
import style from './style.module.css';
import { getToken } from '../utils/generateToken';
import Token, { TokenProps } from '../token/Token';
import { validateInput } from '../utils/validateInput';
import { getValidateReq } from '../utils/getValidateReq';

const SingleToken = () => {
    const [input, setInput] = React.useState('');
    const [tokens, setTokens] = React.useState<TokenProps[]>([]);

    const error = React.useMemo(() => validateInput(input), [input]);

    const generate = () => {
        const token = getToken(input);

        setTokens([...tokens, { code: token, id: tokens.length }]);
    };

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

    return (
        <div>
            <h2>Single Token</h2>
            <p>Please add your allowed digits(seperate them by comma character)</p>
            <div>
                <div className={style.form}>
                    <input
                        name="single-token-input"
                        placeholder="1,2,3"
                        className={style.input}
                        value={input}
                        onChange={evt => setInput(evt.target.value.trim())}
                    />
                    <input type="submit" value="Generate" onClick={generate} disabled={!!error} />
                </div>
                {!!error && <p className={style.error}>{error}</p>}
                <ul className={style.list}>
                    {
                        tokens.map((token, index) =>
                            <li key={index}>
                                <Token {...token} validate={validate} />
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default SingleToken;
