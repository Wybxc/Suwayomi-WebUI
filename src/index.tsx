/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import '@/polyfill.manual';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Workbox } from 'workbox-window';
import { App } from '@/App';
import '@/index.css';
// roboto font
import '@fontsource/roboto';
import '@/lib/dayjs/Setup.ts';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });

    // 监听新的 Service Worker 安装
    wb.addEventListener('waiting', () => {
        // 发送消息让新的 Service Worker 激活
        wb.messageSW({ type: 'SKIP_WAITING' });
    });

    // 监听 Service Worker 控制权变化
    wb.addEventListener('controlling', () => {
        // Service Worker 更新完成后刷新页面
        window.location.reload();
    });

    wb.register();
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
