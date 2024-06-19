/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            let salesOrderId = 65; // Specify the internal ID of the sales order
        let salesOrderRecord = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId,
        });

        let documentNumber = salesOrderRecord.getValue({ fieldId: 'tranid' });
        let customerName = salesOrderRecord.getText({ fieldId: 'entity' });

        context.response.write('Document Number: ' + documentNumber + '<br>');
        context.response.write('Customer Name: ' + customerName);

        log.debug('Sales Order Details', 'Document Number: ' + documentNumber + ', Customer Name: ' + customerName);

    

        }

        return {onRequest}

    });
