import { ContentTypeSnippetResponses } from '../../lib';
import * as responseJson from '../fake-responses/content-type-snippets/fake-modify-content-type-snippet.json';
import { cmLiveClient, getTestClientWithJson, testProjectId } from '../setup';

describe('Modify content type snippet', () => {
    let response: ContentTypeSnippetResponses.ModifyContentTypeSnippetResponse;

    beforeAll(done => {
        getTestClientWithJson(responseJson)
            .modifyContentTypeSnippet()
            .byTypeCodename('x')
            .withData([])
            .toObservable()
            .subscribe(result => {
                response = result;
                done();
            });
    });

    it(`url should be correct`, () => {
        const urlByCodename = cmLiveClient
            .modifyContentTypeSnippet()
            .byTypeCodename('x')
            .withData([])
            .getUrl();
        const urlByInternalId = cmLiveClient
            .modifyContentTypeSnippet()
            .byTypeId('y')
            .withData([])
            .getUrl();
        const urlByExternalId = cmLiveClient
            .modifyContentTypeSnippet()
            .byTypeExternalId('c')
            .withData([])
            .getUrl();

        expect(urlByCodename).toEqual(`https://manage.kontent.ai/v2/projects/${testProjectId}/snippets/codename/x`);
        expect(urlByInternalId).toEqual(`https://manage.kontent.ai/v2/projects/${testProjectId}/snippets/y`);
        expect(urlByExternalId).toEqual(
            `https://manage.kontent.ai/v2/projects/${testProjectId}/snippets/external-id/c`
        );
    });

    it(`response should be instance of ModifyContentTypeSnippetsResponse class`, () => {
        expect(response).toEqual(jasmine.any(ContentTypeSnippetResponses.ModifyContentTypeSnippetResponse));
    });

    it(`response should contain debug data`, () => {
        expect(response.debug).toBeDefined();
    });

    it(`response should contain data`, () => {
        expect(response.data).toBeDefined();
    });

    it(`content type properties should be mapped`, () => {
        const originalItem = responseJson;
        const contentType = response.data;

        expect(contentType.codename).toEqual(originalItem.codename);
        expect(contentType.name).toEqual(originalItem.name);
        expect(contentType.lastModified).toEqual(new Date(originalItem.last_modified));
        expect(contentType.elements.length).toEqual(originalItem.elements.length);
        expect(Array.isArray(contentType.elements)).toBeTruthy();

        contentType.elements.forEach(element => {
            const originalElement = originalItem.elements.find(m => m.id === element.id);
            if (!originalElement) {
                throw Error(`Invalid element with id '${element.id}'`);
            }

            expect(element.codename).toEqual(originalElement.codename);
            expect(element.name).toEqual(originalElement.name);
            expect(element.type.toString().toLowerCase()).toEqual(originalElement.type.toLowerCase());
        });
    });
});
