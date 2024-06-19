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
                 if(record.Type.SALES_ORDER && scriptContext.UserEventType.CREATE){
                    let salesSearch = search.load({id: 'customsearch_jj_pls_work1_ex1'});
                    let searchResults = salesSearch.run().getRange({ start: 0, end: 60 });
                    searchResults.forEach(function (result) {
                        let customer = result.getValue({ name: 'entity' });
                        return true;
                    });
                    if(customer>5){
                        let salesRepId = 'salesrep';
                        let recipientEmail = record.load({
                            type: record.Type.EMPLOYEE,
                            id: salesRepId

                        }).getValue({fieldId: 'email'});

                    }

                    let senderEmail = runtime.getCurrentUser().email;
                    let senderId = runtime.getCurrentUser().id;
                    let emailSubject;
                    let emailBody;

                    emailSubject = 'Attention Please';
                    emailBody = 'This guy has more than 5 open sales order pls stop';

                    email.send({
                        author: senderId,
                        recipients: recipientEmail,
                        subject: emailSubject,
                        body: emailBody
                    });

                    log.debug('Email sent successfully', 'Subject: ' + subject + ', Recipient: ' + recipientEmail);


                
                 }
        
                
                 
            }catch(e) {
                log.error({
                    title: 'Error Processing Record',details: e
                });
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
