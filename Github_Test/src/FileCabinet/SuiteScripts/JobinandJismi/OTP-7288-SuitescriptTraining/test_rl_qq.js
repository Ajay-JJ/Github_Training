//Q4:
try {
    var customer = record.create({
        type: record.Type.CUSTOMER,
        isDynamic: true
    });

    // Set customer fields from request body
    if (requestBody.companyname) {
        customer.setValue({
            fieldId: 'companyname',
            value: requestBody.companyname
        });
    }

    if (requestBody.email) {
        customer.setValue({
            fieldId: 'email',
            value: requestBody.email
        });
    }

    if (requestBody.subsidiary) {
        customer.setValue({
            fieldId: 'subsidiary',
            value: requestBody.subsidiary
        });
    }


    var customerId = customer.save();

    return {
        status: 'success',
        customerId: customerId
    };
} catch (e) {
    return {
        status: 'error',
        message: e.message
    };
}

//Q5:
const put = (requestBody) => {
 
 
    try{
        if(typeof requestBody === 'string')
            {
                requestBody=JSON.parse(requestBody);
            }
            if(!requestBody.salesOrderId){
                return {
                    status : 'Error',
                    message : 'Sales Order Id is Required'
                }
            }
            let salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id : requestBody.salesOrderId,
                isDymanic :true
            })
            if (requestBody.memo) {
                salesOrder.setValue({
                    fieldId: 'memo',
                    value: requestBody.memo
                });
            }

            if (requestBody.salesRep) {
                salesOrder.setValue({
                    fieldId: 'salesrep',
                    value: requestBody.salesrep
                });
            }


            var salesOrderId = salesOrder.save();

            return {
                status: 'success',
                salesOrderId: salesOrderId
            };

    }
    catch(e)
    {
        return {
            status: 'error',
            message: e.message
        };
    }

}

//Q6:

const doDelete = (requestParams) => {
 
    try {
       
        const vendorId = requestParams.id;

        if (!vendorId) {
            return {
                status: 'error',
                message: 'Vendor ID is required'
            };
        }

   
        record.delete({
            type: record.Type.VENDOR,
            id: vendorId
        });

        return {
            status: 'success',
            message: `Vendor with ID ${vendorId} deleted successfully`
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message
        };
    }

}

//Q2:

try {
               
    cusId = requestParams.id
    let customerSearch = search.create({
        type: record.Type.INVOICE,
        filters:[['entity','is','custId'],'AND',['mainline','is','T'],'AND',['daysoverdue','greaterthan','0']],
       
        columns: ['internalid','entity','trandate','daysoverdue','amountremaining'],
       
    })

    let searchResult = customerSearch.run().getRange(0,100);
   

    if(searchResult.length > 0){

        return searchResult.map(i=>({
            internalId: i.getValue('internalid'),
            customerName: i.getText('entity'),
            invoiceDate: i.getValue('trandate'),
            overdueBalance: i.getValue('amountremaining'),
            daysOverdue: i.getValue('daysoverdue')
           
        }))
       

    }
    else{
        return "No records found"
        }
        } catch (e) {
            log.error("Error",e)
            }
