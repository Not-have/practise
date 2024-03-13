import React from 'react';

import {
    useName
} from '../hook';

export default function Ui(): JSX.Element {
    const name = useName();

    return <>{name}</>;
}