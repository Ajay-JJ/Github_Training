/**
 * User Event Script: Search Invoices with Open Status
 * Trigger: Before Load (or other relevant trigger)
 * Record Type: Invoice
 */

function searchOpenInvoices(context) {
    const invoiceSearch = search.create({
        type: search.Type.INVOICE,
        filters: [
            ['status', 'is', 'Open']
        ],
        columns: [
            search.createColumn({ name: 'tranid', label: 'Document Number' }),
            search.createColumn({ name: 'trandate', label: 'Date' }),
            search.createColumn({ name: 'entity', join: 'customer', label: 'Customer Name' }),
            search.createColumn({ name: 'email', join: 'customer', label: 'Customer Email' }),
            search.createColumn({ name: 'amountremaining', label: 'Amount' })
        ]
    });

    // Process search results (e.g., log or display data)
    invoiceSearch.run().each(result => {
        const docNumber = result.getValue({ name: 'tranid' });
        const date = result.getValue({ name: 'trandate' });
        const customerName = result.getText({ name: 'entity', join: 'customer' });
        const customerEmail = result.getValue({ name: 'email', join: 'customer' });
        const amount = result.getValue({ name: 'amountremaining' });

        // Handle the data as needed (e.g., log or display)
        console.log(`Invoice: ${docNumber}, Date: ${date}, Customer: ${customerName}, Email: ${customerEmail}, Amount: ${amount}`);
        return true; // Continue iterating through results
    });
}

searchOpenInvoices();
