import React from 'react';
import style from './style.module.css';

export interface TokenProps {
    id: number;
    code: string;
    isChecked?: boolean;
    isValid?: boolean;
    validate?: (id: number) => Promise<void>;
}

const Token = (props: TokenProps) => {
    const { id, code, isChecked = false, isValid = false, validate = async () => { } } = props;

    const [loading, setLoading] = React.useState(false);

    const onClick = async () => {
        setLoading(true);

        validate(id).finally(() => {
            setLoading(false);
        })
    };

    return (
        <div className={style.token}>
            <div>
                <span>{code}</span>
            </div>
            <div>
                {!isChecked ?
                    <input type="submit" value={loading ? "...loading" : "Validate"} onClick={onClick} disabled={loading} />
                    :
                    <span>{isValid ? 'Valid' : 'Invalid'}</span>}
            </div>
        </div>
    );
};

export default Token;
