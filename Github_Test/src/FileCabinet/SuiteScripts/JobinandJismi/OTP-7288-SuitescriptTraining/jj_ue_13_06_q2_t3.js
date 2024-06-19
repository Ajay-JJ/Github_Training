/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (context) => {
            if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT) {
                // Define search filters
                let filters = [
                    search.createFilter({
                        name: 'status',
                        operator: search.Operator.IS,
                        values: ['Open']
                    })
                ];
    
                // Define search columns
                let columns = [
                    search.createColumn({ name: 'tranid' }), // Document number
                    search.createColumn({ name: 'trandate' }), // Date
                    search.createColumn({ name: 'entity', join: 'customer' }), // Customer Name
                    search.createColumn({ name: 'email', join: 'customer' }), // Customer Email
                    search.createColumn({ name: 'amount' }) // Amount
                ];

                // Create the search
            let invoiceSearch = search.create({
                type: search.Type.INVOICE,
                filters: filters,
                columns: columns
            });

            // Run the search
            let searchResults = invoiceSearch.run().getRange({ start: 0, end: 10 });

            // Process search results
            searchResults.forEach(function(result) {
                var documentNumber = result.getValue({ name: 'tranid' });
                var date = result.getValue({ name: 'trandate' });
                var customerName = result.getText({ name: 'entity', join: 'customer' });
                var customerEmail = result.getValue({ name: 'email', join: 'customer' });
                var amount = result.getValue({ name: 'amount' });

                // Log or display the details as per your requirement
                log.debug('Invoice Details', {
                    'Document Number': documentNumber,
                    'Date': date,
                    'Customer Name': customerName,
                    'Customer Email': customerEmail,
                    'Amount': amount
                });
            });
        }

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            
        }

        

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
