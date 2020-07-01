module.exports = function() {
    return `
        <main id = 'page'>
            <h3>Request money and Receive ZCash</h3>
            
            <form method = 'post'>
                <label>Set your display name</label>
                <input type = 'text' name = 'displayName' placeholder = 'Display Name' required>

                <label>Enter your ZCash Shielded Wallet Address</label>
                <input name = 'shieldedAddress' type = 'text' placeholder = 'Shielded Wallet Address' required>

                <label>How much are you do you want to request?</label>
                <input type = 'number' name = 'amount' placeholder = "0.1" step = '0.0001'>

                <label>Enter the receiver\'s email if you want them to be automatically sent an email when you create this request</label>
                <input type = 'email' name = 'email' placeholder = "Receiver's email address">

                <label>Enter a name or label to identify the entity sending you money. This will only be shown to you and be used to identify their payment</label>
                <input type = 'text' name = 'senderName' placeholder = 'Monday Pond' required>

                <input type = 'submit' value = 'Create Request'>
            </form>
        </main>
    `;
}
