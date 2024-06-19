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
            try{
                if(record.Type.PURCHASE_ORDER && scriptContext.UserEventType.CREATE){
                    let itemId = 'itemid';
                    let prefVend = record.load({
                        type: record.Type.ITEMS,
                        id: itemId

                    }).getValue({fieldId: 'itemvendor'});

                    let itemname = getText({fieldId: 'itemid'});

                    if(prefVend === null){
                        let recipientEmail= runtime.getCurrentUser().email;
                        let senderId = runtime.getCurrentUser().id;
                        let emailSubject;
                        let emailBody;

                        emailSubject = 'Attention please';
                        emailBody = 'No preffered vendor is added for the item ' + itemname;

                        email.send({
                            author: senderId,
                            recipients: recipientEmail,
                            subject: emailSubject,
                            body: emailBody


                        });
                        log.debug('Email sent successfully', 'Subject: ' + subject + ', Recipient: ' + recipientEmail);
                    }
                }
            } catch(e) {
                log.error({title: 'Error sending the email', details: e});

            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
