/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
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
                let newRecord = scriptContext.newRecord;
          
                if (newRecord.type === record.Type.CUSTOMER) {
                    let name = newRecord.getValue("companyname") || newRecord.getValue("firstname");
                    let recId = newRecord.id;
          
                    if (name) {
                      let firstTwoLetter = name.substring(0, 2);
                      let dateCreated = new Date(newRecord.getValue("datecreated"));
          
                      let month = ("0" + (dateCreated.getMonth() + 1)).slice(-2);
          
                      let shortName = `${firstTwoLetter}: ${month}`;
                      record.submitFields({
                       type: record.Type.CUSTOMER,
                       id: recId,
                       values: {
                        custentitycustentity_jj_shortname: shortName
                       }
                      });
                      log.debug("Short name updated", `Short name set to ${shortName}`);
                    }
          
                    else {
                      log.error('Missing Name', 'The customer name is missing.');
                    }  
                }
              } catch (e) {
                log.error("Error updating shortname field", e);
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
