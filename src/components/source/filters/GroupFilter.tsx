/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItemButton, ListItemText, Stack, Box } from '@mui/material';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { SourceFilters } from '@/typings';
import { Options } from '@/components/source/SourceOptions';

interface Props {
    state: ExtractByKeyValue<SourceFilters, '__typename', 'GroupFilter'>['filters'];
    name: string;
    position: number;
    updateFilterValue: Function;
    update: any;
}

export const GroupFilter: React.FC<Props> = (props: Props) => {
    const { state, name, position, updateFilterValue, update } = props;

    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ mx: -2 }}>
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                {/* Container is moved outside 2, so content has to go inside 4 */}
                <Stack sx={{ mx: 4 }}>
                    <Options
                        sourceFilter={state as SourceFilters[]}
                        group={position}
                        updateFilterValue={updateFilterValue}
                        update={update}
                    />
                </Stack>
            </Collapse>
        </Box>
    );
};
