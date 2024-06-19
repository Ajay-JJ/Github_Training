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
 
            if (scriptContext.type === scriptContext.UserEventType.CREATE) {
                const salesOrderId = scriptContext.newRecord.id;
                const customerId = scriptContext.newRecord.getValue('entity');
                const checkboxId = 'custentity_jj_q1_checkbox_170624';
     
                log.debug({
                    title: 'Sales Order Created',
                    details: 'Sales Order ID: ' + salesOrderId + ', Customer ID: ' + customerId
                });
     
                if (customerId) {
                    try {
                        record.submitFields({
                            type: record.Type.CUSTOMER,
                            id: customerId,
                            values: {
                                [checkboxId]: true
                            }
                        });
                        log.debug({
                            title: 'Customer Record Updated',
                            details: 'Customer ID: ' + customerId
                        });
                    } catch (e) {
                        log.error({
                            title: 'Error Updating Customer Record',
                            details: e.message
                        });
                    }
                } else {
                    log.error({
                        title: 'Customer ID is Invalid',
                        details: 'Customer ID: ' + customerId
                    });
                }
     
                const purchaseOrderId = scriptContext.newRecord.id;
                const vendorId = scriptContext.newRecord.getValue('entity');
                const checkboxId1 = 'custentity_jj_q1_checkbox_170624';
     
                log.debug({
                    title: 'Purchase Order Created',
                    details: 'Purchase Order ID: ' + purchaseOrderId + ', Vendor ID: ' + vendorId
                });
     
                if (vendorId) {
                    try {
                        record.submitFields({
                            type: record.Type.VENDOR,
                            id: vendorId,
                            values: {
                                [checkboxId1]: true
                            }
                        });
                        log.debug({
                            title: 'Vendor Record Updated',
                            details: 'Vendor ID: ' + vendorId
                        });
                    } catch (e) {
                        log.error({
                            title: 'Error Updating Vendor Record',
                            details: e.message
                        });
                    }
                } else {
                    log.error({
                        title: 'Vendor ID is Invalid',
                        details: 'Vendor ID: ' + vendorId
                    });
        }}
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


