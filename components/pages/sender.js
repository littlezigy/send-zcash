module.exports = {
    template: function(config) {
        return `
            <style>
                p.bold {
                    font-size: 2em;
                }
                p.subtitle {
                    font-weight: bold;
                }
                h3 {
                    font-size: 5em;
                    text-align: center;
                }
            </style>
            <main id = 'page'>
                <h3>Send ${ config.receiver } money</h3>

                <p class = 'bold strong'>${ config.amount } ZCash</p>
                <p class = 'subtitle'>${ config.amount * 55.27 } USD</p>

                <form method = 'post'>
                    <!-- <input type = 'number' placeholder = '500.00' required /> -->

                    <label>Send a message too (optional)</label>
                    <input type = 'text' placeholder = 'Enter message here'>

                    <input type = 'submit' value = 'Send money'>
                </form>
            </main>
        `;
    }
}
