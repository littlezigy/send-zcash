module.exports = function(currencies) {
    let currencyOptions = '<select name = "currency">';


    for (key in currencies) {
        let currencyStr = currencies[key].replace(/'/g, "\\'");
        currencyOptions += `<option value = "${ key }">${ key } ${ currencyStr }</option>`;
    }

    currencyOptions += '</select>';
    return `
        <main id = 'page'>
            <h3>Request money and Receive ZCash</h3>
            
            <form method = 'post'>
                <label>Set your display name</label>
                <input type = 'text' name = 'displayName' placeholder = 'Display Name' required>

                <label>Enter your ZCash Shielded Wallet Address</label>
                <input name = 'shieldedAddress' type = 'text' placeholder = 'Shielded Wallet Address' required>

                <label>How much money do you want to request?</label>
                <label><input type = 'radio' name = 'currencyType' value = 'zec' onclick = 'hideFiat()'/> ZEC (ZCash)</label>
                <label><input type = 'radio' name = 'currencyType' value = 'fiat' onclick = 'showFiat()' checked /> Fiat Currency</label>
                <div id = 'currencyChooserDiv'>
                    ${ currencyOptions }
                </div>

                <br />
                <br />

                <input type = 'number' name = 'amount' placeholder = "5.00" step = '0.0001'>

                <p>Approximately <span id = 'approximator'></span></p>

                <label>Enter the receiver\'s email if you want them to be automatically sent an email when you create this request</label>
                <input type = 'email' name = 'email' placeholder = "Receiver's email address">

                <label>Enter a name or label to identify the entity sending you money. This will only be shown to you and be used to identify their payment</label>
                <input type = 'text' name = 'senderName' placeholder = 'Monday Pond' required>

                <input type = 'submit' value = 'Create Request'>
            </form>
        </main>

        <script>
            let currencyChooserDiv = document.getElementById('currencyChooserDiv');
            let hideFiat = function() {
                currencyChooserDiv.innerHTML = "";
            }
            let showFiat = function() {
                currencyChooserDiv.innerHTML = '${ currencyOptions }';
            }
        </script>
    `;
}
