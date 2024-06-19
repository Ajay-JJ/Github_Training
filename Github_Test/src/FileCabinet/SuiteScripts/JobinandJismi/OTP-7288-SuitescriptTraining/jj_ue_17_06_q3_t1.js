/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {
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
            try {
                let eventType = scriptContext.type;
                let  newRecord = scriptContext.newRecord;

                let entityType;
                let entityId = newRecord.id;
                let entityName = newRecord.getValue({ fieldId: 'entityid'});

                if(newRecord.type === record.type.CUSTOMER) {
                    entityType = 'Customer';
                }else if(newRecord.type === record.type.VENDOR) {
                    entityType = 'Vendor';
                }else if(newRecord.type === record.type.CONTACT) {
                    entityType = 'Contact';
                } else {
                    return;
                }

                let senderId = runtime.getCurrentUser().id;
                let senderEmail = runtime.getCurrentUser().email;

                let creatorId = newRecord.getValue({fieldId: 'createdby'});
                let recipientEmail = record.load({
                    type: record.type.EMPLOYEE,
                    id: creatorId
                }).getValue({fieldId: 'email'});

                let emailSubject;
                let emailBody;

                if(eventType === scriptContext.UserEventType.CREATE){
                    emailSubject = 'Record created: '+ entityType;
                    emailBody = 'A new ' + entityType + ' record has been created.\n\n';
                    emailBody += 'Entity Type: ' + entityType + '\n';
                    emailBody += 'Internal ID: ' + entityId + '\n';
                    emailBody += 'Name: ' + entityName + '\n';
                } else if (eventType === context.UserEventType.DELETE) {
                emailSubject = 'Record deleted: ' + entityType;
                emailBody = 'A ' + entityType + ' record has been deleted.\n\n';
                emailBody += 'Entity Type: ' + entityType + '\n';
                emailBody += 'Internal ID: ' + entityId + '\n';
                } else {
                return;
                }
            
            email.send({
                author: senderId,
                recipients: recipientEmail,
                subject: emailSubject,
                body: emailBody
            });

            } catch(e) {
                log.error({
                    title: 'Error Processing Record',
                    details: e
                });
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
