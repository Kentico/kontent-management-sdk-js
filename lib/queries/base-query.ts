import { IQueryParameter, Parameters, IHeader } from '@kentico/kontent-core';
import { Observable } from 'rxjs';

import { IManagementClientConfig } from '../config/imanagement-client-config.interface';
import { ContentManagementApiEndpoints, contentManagementApiEndpoints, IContentManagementQueryConfig } from '../models';
import { BaseResponses } from '../responses';
import { ContentManagementQueryService } from '../services';

export abstract class BaseQuery<TResponse extends BaseResponses.IContentManagementResponse> {
    protected readonly queryConfig: IContentManagementQueryConfig = {
        headers: []
    };
    protected readonly parameters: IQueryParameter[] = [];
    protected readonly apiEndpoints: ContentManagementApiEndpoints = contentManagementApiEndpoints;

    private _customUrl?: string;
    protected _addSlashToUrl: boolean = true;

    constructor(
        protected config: IManagementClientConfig,
        protected queryService: ContentManagementQueryService
    ) {}

    /**
     * Gets url for this query
     */
    getUrl(): string {
        // use custom URL if user specified it
        if (this._customUrl) {
            return this._customUrl;
        }

        return encodeURI(this.queryService.getFullUrl(this.getAction(), this.getParameters(), this._addSlashToUrl));
    }

    /**
     * Gets Promise to resolve this query
     */
    toPromise(): Promise<TResponse> {
        return this.toObservable().toPromise();
    }

    /**
     * Adds header to request
     * @param header Header to add
     */
    withHeader(header: IHeader): this {
        this.queryConfig.headers.push(header);
        return this;
    }

     /**
     * Adds headers to request
     * @param headers Headers to add
     */
    withHeaders(headers: IHeader[]): this {
        this.queryConfig.headers.push(...headers);
        return this;
    }

    /**
     * Gets array of currently set headers
     */
    getHeaders(): IHeader[] {
        return this.queryConfig.headers;
    }

    /**
     * Sets custom query parmeter that will be added to URL
     * @param name Parameter name
     * @param value Parameter value
     */
    withCustomParameter(name: string, value: string): this {
        this.parameters.push(new Parameters.CustomParameter(name, value));
        return this;
    }

    /**
     * Overrides default url resolver and resolves this query with a custom one
     * @param url Custom url to resolve query
     */
    withUrl(url: string): this {
        this._customUrl = url;
        return this;
    }

    /**
     * Gets parameters assigned to this query
     */
    getParameters(): IQueryParameter[] {
        return this.parameters;
    }

    /**
     * Gets Observable to resolve this query
     */
    abstract toObservable(): Observable<TResponse>;

    /**
     * Gets action for this query
     */
    protected abstract getAction(): string;
}
