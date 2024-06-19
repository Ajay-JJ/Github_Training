/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @AppliesTo RecordType.SALES_ORDER
 */
define(['N/record'], function(record) {
    function beforeSubmit(context) {
        if (context.type === context.UserEventType.CREATE) {
            try {
                var newSalesOrder = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true
                });

                // Set Sales Order fields
                newSalesOrder.setValue('entity', 875); // Replace with the actual customer internal ID
                newSalesOrder.setValue('trandate', new Date());
                newSalesOrder.setText('orderstatus', 'Pending Fulfillment');
                newSalesOrder.setValue('memo', 'Sales Order created programmatically');

                // Add an item to the Sales Order
                newSalesOrder.selectNewLine({
                    sublistId: 'item'
                });
                newSalesOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 44 // Replace with the actual item internal ID
                });
                newSalesOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 1 // Replace with the desired quantity
                });
                newSalesOrder.commitLine();

                // Save the Sales Order
                var salesOrderId = newSalesOrder.save();
                log.debug('Sales Order Created', 'Internal ID: ' + salesOrderId);
            } catch (e) {
                log.error('Error creating Sales Order', e.toString());
            }
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
