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
        const beforeLoad = (scriptContext) => {
            try {
                

                let columns = [
                    search.createColumn({name: 'entityid', label: 'Vendor Name'}),
                    search.createColumn({name: 'subsidiary', label: 'Subsidiary'})
                ];

                let vendorSearch = search.create({
                    title: 'List Vendors JJ',
                    id: 'customsearch_jj_list_vendors',
                    type: search.Type.VENDOR,
                    columns: columns

                });

                let searchResults = vendorSearch.run().getRange({start:0, end:20});
                vendorSearch.save();

                searchResults.forEach(function(result){
                    let Vendor = result.getValue({name: 'entityId'});
                    let Subsidiary = result.getValue({name: 'subsidiary'});

                    log.debug('Search3','Vendor Name: '+ Vendor + 'Subsidiary: '+ Subsidiary);
                });

            }catch(e) {
                log.error('error while creating the search',e.toString());
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
