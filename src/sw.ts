/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Service Worker's dependencies should be devDependencies
/* eslint-disable import/no-extraneous-dependencies */

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope;

// Set workbox cache prefix
setCacheNameDetails({
    prefix: 'suwayomi-webui',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
});

cleanupOutdatedCaches();

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

// Install event handler
self.addEventListener('install', () => {
    self.skipWaiting(); // 强制激活新的 Service Worker
});

// 消息处理
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

clientsClaim();
