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
                let filters = [
                    ['status', 'is', ['CustCred:A','or','CustCred:B']],
                    'AND',
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['entity', 'is', 875]
                ];
 
                let columns = [
                    search.createColumn({ name: 'tranid', label: 'Document Number' }),
                    search.createColumn({ name: 'trandate', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'status', label: 'Status' }),
                    search.createColumn({ name: 'amount', label: 'Amount' })
                ];
 
                let creditmemoSearch = search.create({
                    title: 'Credit Memos Statu11 JJ',
                    id: 'customsearch_jj_credit_3',
                    type: search.Type.CREDIT_MEMO,
                    filters: filters,
                    columns: columns
                });
 
                let searchResults = creditmemoSearch.run().getRange({ start: 0, end: 20 });
                creditmemoSearch.save();

 
 
                searchResults.forEach(function (result) {
                    let documentNumber = result.getValue({ name: 'tranid' });
                    let date = result.getValue({ name: 'trandate' });
                    let customerName = result.getText({ name: 'entity' });
                    let Status = result.getValue({ name: 'status'});
                    let amount = result.getValue({ name: 'amount' });
 
                    log.debug('14-06 Exam Answer: ', 'Document Number: ' + documentNumber + ', Date: ' + date +
                        ', Customer Name: ' + customerName + ', Status: ' + Status +
                        ', Amount: ' + amount);
 
                    return true;
 
                });
 
 
            } catch (e) {
                log.error('Error while creating the Search', e.toString());
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
