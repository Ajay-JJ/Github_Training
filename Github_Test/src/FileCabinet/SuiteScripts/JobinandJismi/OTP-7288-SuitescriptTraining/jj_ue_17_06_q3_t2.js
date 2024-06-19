/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/log', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, log, record, runtime, search) => {
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
                let recordType = scriptContext.newRecord.type;
                let actionType = scriptContext.type === scriptContext.UserEventType.CREATE ? 'created' : 'deleted';
                let currentUser = runtime.getCurrentUser();
                let recipientEmail = currentUser.email;
                let subject, body, entityId, entityName;
   
                if (actionType === 'created') {
                    entityId = scriptContext.newRecord.id;
                    entityName = scriptContext.newRecord.getValue({ fieldId: 'entityid' });
                    subject = recordType + ' Record Created';
                    body = 'A ' + recordType + ' record has been created:\n' +
                           'Internal ID: ' + entityId + '\n' +
                           'Name: ' + entityName + '\n' +
                           'Created by: ' + currentUser.name;
                } else if (actionType === 'deleted') {
                    entityId = scriptContext.oldRecord.id;
                    entityName = scriptContext.oldRecord.getValue({ fieldId: 'entityid' });
                    subject = recordType + ' Record Deleted';
                    body = 'A ' + recordType + ' record has been deleted:\n' +
                           'Internal ID: ' + entityId + '\n' +
                           'Name: ' + entityName + '\n' +
                           'Deleted by: ' + currentUser.name;
                }
   
                email.send({
                    author: currentUser.id,
                    recipients: recipientEmail,
                    subject: subject,
                    body: body
                });
   
                log.debug('Email sent successfully', 'Subject: ' + subject + ', Recipient: ' + recipientEmail);
   
            } catch (e) {
                log.error('Error sending email', e.message);
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });