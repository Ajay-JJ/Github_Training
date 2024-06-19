/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/runtime', 'N/search'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (record, runtime, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            let salesOrderId = requestParams.id;
            try {

                let salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: [['internalid', 'anyof', salesOrderId]],
                    columns: ['internalid', 'itemid', 'rate', 'amount','quantity']
                });

                let searchResults = salesOrderSearch.run().getRange({ start: 0, end: 1 });

                if (searchResults.length > 0) {
                    let salesOrder = searchResults[0];
                    return {
                        salesOrder: {
                            id: salesOrder.getValue({ name: 'internalid' }),
                            item: salesOrder.getText({ name: 'itemid' }),
                            amount: salesOrder.getValue({ name: 'amount' }),
                            quantity: salesOrder.getValue({name: 'quantity'}),
                            rate: salesOrder.getValue({name: 'rate'})
                        }
                        

                        
                    };
                    
                } else {
                    return "Does not exist";
                }
                if (searchResults.getText({name: 'itemid'}) > 1){
                    return {
                        status: 'Sales Order contain more than 2 items'
                    };
                }
            }catch (e){
                status: 'error'
            }

        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
