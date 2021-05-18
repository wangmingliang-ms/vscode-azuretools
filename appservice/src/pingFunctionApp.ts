/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceClient } from '@azure/ms-rest-js';
import { createGenericClient } from 'vscode-azureextensionui';
import { localize } from './localize';
import { SiteClient } from './SiteClient';

export async function pingFunctionApp(siteClient: SiteClient): Promise<void> {
    if (siteClient.listHostKeys) {
        const client: ServiceClient = await createGenericClient();
        await client.sendRequest({
            method: 'GET',
            url: `${siteClient.defaultHostUrl}/admin/host/status`,
            headers: {
                'x-functions-key': (await siteClient.listHostKeys()).masterKey
            }
        });
    } else {
        throw Error(localize('listHostKeysNotSupported', 'Listing host keys is not supported.'));
    }
}
